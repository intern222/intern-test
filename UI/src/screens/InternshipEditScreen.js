import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsInternship, updatedInternship } from '../actions/internshipActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { INTERNSHIP_UPDATE_RESET } from '../constants/internshipConstants';

export default function InternshipEditScreen(props) {
    const internshipId = props.match.params.id;
    const [name, setName] = useState('');
    const [url, setURL] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [skills, setSkills] = useState('');
    const [payment, setPayment] = useState('');
    const [position, setPosition] = useState('');
    const [duration, setDuration] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [candidates, setCandidates] = useState('');
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const internshipDetails = useSelector(state => state.internshipDetails);
    const { loading, error, internship } = internshipDetails;

    const internshipUpdate = useSelector(state => state.internshipUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = internshipUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
        if (successUpdate && userInfo.isAdmin && userInfo.isInstitution) {
            props.history.push('/internshiplist');
        }
        else if (successUpdate && userInfo.isInstitution) {
            props.history.push('/internshiplist/institution');
        }
        if (!internship || (internship._id !== internshipId) || successUpdate) {
            dispatch({ type: INTERNSHIP_UPDATE_RESET });
            dispatch(detailsInternship(internshipId));
        } else {
            setName(internship.name);
            setURL(internship.url);
            setImage(internship.image);
            setCategory(internship.category);
            setSkills(internship.skills);
            setPayment(internship.payment);
            setPosition(internship.position);
            setDuration(internship.duration);
            setCompany(internship.company);
            setLocation(internship.location);
            setCandidates(internship.candidates);
            setStatus(internship.status);
            setType(internship.type);
            setDate(internship.date);
            setDescription(internship.description);
        }
    }, [
        internship,
        dispatch,
        internshipId,
        successUpdate,
        props.history
    ]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updatedInternship({
                _id: internshipId,
                name,
                url,
                image,
                category,
                skills,
                payment,
                position,
                duration,
                company,
                location,
                candidates,
                status,
                type,
                date,
                description,
            })
        );
    };

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try {
            const { data } = await Axios.post('/api/uploads/s3', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            setImage(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    };

    return (
        <div className="signinContainer">
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Editar Estágio</h1>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                        <div style={{ width: "100%" }}>
                            <h3 style={{ margin: "5px" , fontWeight: "600",fontFamily:"'Nunito Sans', sans-serif"}} htmlFor="name">Nome do Estágio</h3>
                            <h5 style={{ paddingLeft: "6px", fontWeight:"lighter", fontStyle:"italic" ,margin:"0px" }}>Nota: tamanho máximo de 65 caracteres</h5>
                            <input
                                style={{ margin: "0", width: "95%" , fontWeight:"lighter"}}
                                id="name"
                                type="text"
                                placeholder="Insira Nome"
                                maxlength="65"
                                className="un"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </div >
                        <div style={{ width: "100%" }}>
                            <h3 style={{ margin: "5px" , fontWeight: "600",fontFamily:"'Nunito Sans', sans-serif"}} htmlFor="name">URL da Posição</h3>
                            <input
                                style={{ margin: "0", width: "95%" , fontWeight:"lighter"}}
                                id="url"
                                type="text"
                                placeholder="Insira URL da posição"
                                className="un"
                                required
                                value={url}
                                onChange={(e) => setURL(e.target.value)}
                            ></input>
                        </div>
                        <div style={{ width: "100%" }}>
                            <h3 style={{ margin: "5px" , fontWeight: "600",fontFamily:"'Nunito Sans', sans-serif"}} htmlFor="image">URL da Imagem</h3>
                            <h5 style={{ paddingLeft: "6px", fontWeight:"lighter", fontStyle:"italic", margin:"0" }}>Nota: se tiver problemas envie-nos um email</h5>
                            <input
                                style={{ margin: "0", width: "95%" , fontWeight:"lighter"}}
                                className="un"
                                id="image"
                                type="text"
                                placeholder="Insira URL de Imagem"
                                required
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></input>
                        </div>
                        {/*<div>
                                    <label htmlFor="imageFile">Image File</label>
                                    <input
                                        type="file"
                                        id="imageFile"
                                        label="Choose Image"
                                        onChange={uploadFileHandler}
                                    ></input>
                                    {loadingUpload && <LoadingBox></LoadingBox>}
                                    {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
                                </div>*/}
                        <div style={{ width: "100%" }}>
                            <h3 style={{ margin: "5px" , fontWeight: "600",fontFamily:"'Nunito Sans', sans-serif"}} htmlFor="skills">Skills</h3>
                            <input
                                style={{ margin: "0", width: "95%" , fontWeight:"lighter"}}
                                className="un"
                                id="skills"
                                type="text"
                                placeholder="Insira skills"
                                required
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                            ></input>
                        </div>
                        <div style={{ width: "100%" }}>
                            <h3 style={{ margin: "5px" , fontWeight: "600",fontFamily:"'Nunito Sans', sans-serif"}} htmlFor="categoria">Setor</h3>
                            <h5 style={{ paddingLeft: "6px", fontWeight:"lighter", fontStyle:"italic", margin:"0" }}>Nota: se o seu setor não existir envie-nos um email</h5>

                            <select
                                style={{ margin: "0", width: "95%" , fontWeight:"lighter"}}
                                className="un"
                                required
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="Artes">Artes</option>
                                <option value="Consultoria">Consultoria</option>
                                <option value="Desporto">Desporto</option>
                                <option value="Educação">Educação</option>
                                <option value="Gestão">Gestão</option>
                                <option value="Imobiliário e Construção">Imobiliário e Construção</option>
                                <option value="Indústria e Engenharia">Indústria e Engenharia</option>
                                <option value="Indústria automotiva">Indústria automotiva</option>
                                <option value="Informática e Tecnologia">Informática e Tecnologia</option>
                                <option value="Jurídico">Jurídico</option>
                                <option value="Marketing e Comunicação">Marketing e Comunicação</option>
                                <option value="Recursos Humanos">Recursos Humanos</option>
                                <option value="Retalho e Comércio">Retalho e Comércio</option>
                                <option value="Saúde">Saúde</option>
                                <option value="Serviços Financeiros">Serviços Financeiros</option>
                                <option value="Tecnologia da informação">Tecnologia da informação</option>
                                <option value="Transportes e Logística">Transportes e Logística</option>
                                <option value="Turismo e Hotelaria">Turismo e Hotelaria</option>
                                <option value="Telecomunicações">Telecomunicações</option>
                            </select>
                        </div>
                        {/*<div style={{width:"100%"}}>
                                    <h3 style={{margin:"5px"}} htmlFor="empresa">Empresa</h3>
                                    <input
                                        style={{ margin:"0", width:"95%"}}
                                        className="un"
                                        id="company"
                                        type="text"
                                        placeholder="Enter company"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                    ></input>
                            </div>*/}
                        <div style={{ width: "100%" }}>
                            <h3 style={{ margin: "5px" , fontWeight: "600",fontFamily:"'Nunito Sans', sans-serif"}} htmlFor="localização">Localização</h3>
                            <h5 style={{ paddingLeft: "6px", fontWeight:"lighter", fontStyle:"italic", margin:"0" }}>Nota: se a sua localização não existir envie-nos um email</h5>
                            <select
                                style={{ margin: "0", width: "95%" , fontWeight:"lighter"}}
                                className="un"
                                required
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            >
                                <option value="Lisboa">Lisboa</option>
                                <option value="Porto">Porto</option>
                                <option value="Remoto">Remoto</option>
                            </select>
                        </div>
                        {/*<div style={{width:"100%"}}>
                                    <h3 style={{margin:"5px"}} htmlFor="candidatos">Candidatos</h3>
                                    <input
                                        style={{ margin:"0"}}
                                        className="un"
                                        id="candidates"
                                        type="text"
                                        placeholder="Enter candidates"
                                        value={candidates}
                                        onChange={(e) => setCandidates(e.target.value)}
                                    ></input>
                                </div>
                                <div style={{width:"100%"}}>
                                    <h3 style={{margin:"5px"}} htmlFor="status">Status</h3>
                                    <input
                                        style={{ margin:"0"}}
                                        className="un"
                                        id="status"
                                        type="text"
                                        placeholder="Enter status"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    ></input>
                            </div>*/}
                        <div style={{ width: "100%" }}>
                            <h3 style={{ margin: "5px" , fontWeight: "600",fontFamily:"'Nunito Sans', sans-serif"}} htmlFor="tipo">Posição</h3>
                            <select
                                style={{ margin: "0", width: "95%" , fontWeight:"lighter"}}
                                className="un"
                                required
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                            >
                                <option value="Estágio">Estágio</option>
                                <option value="Núcleo de Faculdade">Núcleo de Faculdade</option>
                            </select>
                        </div>
                        <div style={{ width: "100%" }}>
                            <h3 style={{ margin: "5px" , fontWeight: "600",fontFamily:"'Nunito Sans', sans-serif"}} htmlFor="tipo">Tipo</h3>
                            <select
                                style={{ margin: "0", width: "95%" , fontWeight:"lighter"}}
                                className="un"
                                required
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="Part-time">Part-time</option>
                                <option value="Full-time">Full-time</option>
                            </select>
                        </div>
                        <div style={{ width: "100%" }}>
                            <h3 style={{ margin: "5px" , fontWeight: "600",fontFamily:"'Nunito Sans', sans-serif"}} htmlFor="duração">Duração</h3>
                            <select
                                style={{ margin: "0", width: "95%" , fontWeight:"lighter"}}
                                className="un"
                                required
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            >
                                <option value="1 mês">1 mês</option>
                                <option value="1 - 3 meses">1 a 3 meses</option>
                                <option value="3 - 6 meses">3 a 6 meses</option>
                                <option value="6 - 12 meses">6 a 12 meses</option>
                                <option value="Indefinido">Indefinido</option>
                            </select>
                        </div>
                        <div style={{ width: "100%" }}>
                            <h3 style={{ margin: "5px" , fontWeight: "600",fontFamily:"'Nunito Sans', sans-serif"}} htmlFor="pagamento">Compensação</h3>
                            <select
                                style={{ margin: "0", width: "95%" , fontWeight:"lighter"}}
                                className="un"
                                required
                                value={payment}
                                onChange={(e) => setPayment(e.target.value)}
                            >
                                <option value="Remunerado">Remunerado</option>
                                <option value="Não Remunerado">Não Remunerado</option>
                                <option value="Não especifico">Não Especifico</option>
                            </select>
                        </div>
                        <div style={{ width: "100%" }}>
                            <h3 style={{ margin: "5px" , fontWeight: "600",fontFamily:"'Nunito Sans', sans-serif"}} htmlFor="data">Candidatar até:</h3>
                            <h5 style={{ paddingLeft: "6px", fontWeight:"lighter", fontStyle:"italic", margin:"0" }} htmlFor="data">Nota: formato "dd / mm / aaaa" ou "Não aplicável"</h5>
                            <input
                                style={{ margin: "0", width: "95%" , fontWeight:"lighter"}}
                                className="un"
                                maxlength="15"
                                placeholder="Insira Data"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            ></input>
                        </div>
                        <div style={{ width: "100%" }}>
                            <h3 style={{ margin: "5px" , fontWeight: "600",fontFamily:"'Nunito Sans', sans-serif"}} htmlFor="descrição">Descrição</h3>
                            <textarea
                                style={{ margin: "0", width: "95%" , fontWeight:"lighter"}}
                                className="un"
                                id="description"
                                rows="3"
                                type="textarea"
                                placeholder="Insira Descrição"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <label>
                                <button className="signinButton" type="submit">
                                    Atualizar
                                </button>
                            </label>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}