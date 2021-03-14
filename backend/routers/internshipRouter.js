import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Internship from '../models/internshipModel.js';
import { isAdmin, isAuth, isInstitutionOrAdmin } from '../utilities.js';
import data from '../data.js'

const internshipRouter = express.Router();

internshipRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const pageSize =20;
    const page = Number(req.query.pageNumber) || 1;

    const name = req.query.name || '';
    const category = req.query.category || '';
    const type = req.query.type || '';
    const location = req.query.location || '';
    const payment = req.query.payment || '';
    const institution = req.query.institution || '';

    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const institutionFilter = institution ? { institution}: {};
    const categoryFilter = category ? { category}: {};
    const typeFilter = type ? { type}: {};
    const locationFilter = location ? { location}: {};
    const paymentFilter = payment ? { payment}: {};

    const count = await Internship.count({
      ...institutionFilter, 
      ...nameFilter,
      ...categoryFilter,
      ...typeFilter,
      ...locationFilter,
      ...paymentFilter,
    });
    const internships = await Internship.find({
      ...institutionFilter, 
      ...nameFilter,
      ...categoryFilter,
      ...typeFilter,
      ...locationFilter,
      ...paymentFilter,
    })
      .populate('institution', 'institution.name institution.logo')
      .skip(pageSize*(page - 1))
      .limit(pageSize)
      ;
    res.send({internships, page, pages: Math.ceil(count / pageSize)});
  })
);

internshipRouter.get(
  '/categories', 
  expressAsyncHandler(async(req, res) => {
    const categories = await Internship.find().distinct('category');
    const types = await Internship.find().distinct('type');
    const locations = await Internship.find().distinct('location');
    const payments = await Internship.find().distinct('payment');
    res.send({categories, types, locations, payments});
  })
);

internshipRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Internship.remove({});
    const institution = await User.findOne({ isInstitution: true});
    if (institution) {
      const internships = data.internships.map((internship) => ({
        ...internship,
        institution: institution._id,
      }));
      const createdInternship = await Internship.insertMany(internships);
      res.send({ createdInternship });
    } else {
      res 
        .status(500)
        .send({ message: 'No institution found. first run /api/users/seed'});
    }
  })
);

internshipRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const internship = await Internship.findById(req.params.id).populate('institution', 'institution.name institution.logo ');
    if (internship) {
      res.send(internship);
    } else {
      res.status(404).send({ message: 'Internship Not Found' });
    }
  })
);

internshipRouter.post(
  '/',
  isAuth,
  isInstitutionOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const internship = new Internship({
      name: 'Exemplo de nome ',
      institution: req.user._id,
      url: 'Insira o url da posição',
      image: 'Insira o link de uma imagem',
      category: 'Exemplo de Categoria',
      skills: 'Exemplo de skills',
      payment: 'Paid',
      duration: 'Exemplo de duração',
      company: 'Exemplo de empresa',
      location: 'Exemplo de Localização',
      candidates: 0,
      status: 'Open',
      type: 'Part-time',
      date: 'Exemplo de data',
      description: 'Exemplo de descrição',
    });
    const createdInternship = await internship.save();
    res.send({ message: 'Internship Created', internship: createdInternship });
  })
);

internshipRouter.put(
  '/:id',
  isAuth,
  isInstitutionOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const internshipId = req.params.id;
    const internship = await Internship.findById(internshipId);
    if (internship) {
        internship.name = req.body.name;
        internship.url = req.body.url;
        internship.image = req.body.image;
        internship.category = req.body.category;
        internship.skills = req.body.skills;
        internship.payment = req.body.payment;
        internship.duration = req.body.duration;
        internship.company = req.body.company;
        internship.location = req.body.location;
        internship.candidates = req.body.candidates;
        internship.status = req.body.status;
        internship.type = req.body.type;
        internship.date = req.body.date;
        internship.description = req.body.description;
      const updatedInternship = await internship.save();
      res.send({ message: 'Internship Updated', internship: updatedInternship });
    } else {
      res.status(404).send({ message: 'Internship Not Found' });
    }
  })
);

internshipRouter.delete(
  '/:id',
  isAuth,
  isInstitutionOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const internship = await Internship.findById(req.params.id);
    if (internship) {
      const deleteInternship = await internship.remove();
      res.send({ message: 'Internship Deleted', internship: deleteInternship });
    } else {
      res.status(404).send({ message: 'Internship Not Found' });
    }
  })
);

export default internshipRouter;