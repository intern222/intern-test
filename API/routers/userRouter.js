import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken, isAdmin, isAuth } from '../utilities.js';

const userRouter = express.Router();

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isInstitution: user.isInstitution,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      isInstitution: user.isInstitution,
      token: generateToken(createdUser),
    });
  })
);

userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);
userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if(user.isInstitution){
        user.institution.name = req.body.institutionName || user.institution.name;
        user.institution.logo = req.body.institutionLogo || user.institution.logo;
        user.institution.description = req.body.institutionDescription || user.institution.description;
      }
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isInstitution: user.isInstitution,
        token: generateToken(updatedUser),
      });
    }
  })
);

userRouter.get(
  '/', 
  isAuth, 
  isAdmin, 
  expressAsyncHandler(async(req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.delete(
  '/:id', 
  isAuth, 
  isAdmin, 
  expressAsyncHandler(async(req, res) =>{
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.isAdmin === true) {
        res.status(400).send({ message: 'Can Not Delete Admin User' });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ message: 'User Deleted', user: deleteUser });
    } else{
      res.send(404).send({message: 'User Not Found'});
    }
  })
);

userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isInstitution = Boolean(req.body.isInstitution);
      user.isAdmin = Boolean(req.body.isAdmin);
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

export default userRouter;