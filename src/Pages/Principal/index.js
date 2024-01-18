/* eslint-disable react-hooks/exhaustive-deps */
import './principal.css';
import axios from "axios";
import { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import moment from 'moment';
import Carrossel from "../../Components/carrossel";
import icone from '../../Components/image/recompensa.svg';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Table from 'react-bootstrap/Table';

export default function Principal() {

    const [pontucao, setPontuacao] = useState(0);
    const [informacao, setInfromacao] = useState('');

    const [nome, setNome] = useState('Campanha a definir');
    const [nome1, setNome1] = useState('Campanha a definir');
    const [nome2, setNome2] = useState('Campanha a definir');

    const [clientespositivado, setClientespositivado] = useState('');
    const [campanha, setCampanha] = useState('Periodo a definir');
    const [campanha1, setCampanha1] = useState('Periodo a definir');
    const [campanha2, setCampanha2] = useState('Periodo a definir');
    var id;
    var cod;

    useEffect(() => {
        const savedUserData = localStorage.getItem("@detailUser");
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            id = userData.uid;
            cod = userData.email;
        } else {

            console.log("Nenhuma informação encontrada no localStorage.");
        }
        pontuacao();
        informacoes();
        TrazerCampanha();
        clientespositivados();
        fetchImages4();

    }, []);
    const pontuacao = async () => {
        const savedUserData = localStorage.getItem("@detailUser");
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            id = userData.uid;
            cod = userData.email;
        } else {
            console.log("Nenhuma informação encontrada no localStorage.");
        }
        await axios.get(`https://othondecarvalho.com.br:5555/pc/pontuacao/${cod}`, {
            headers: { 'Authorization': `Bearer ${id}` },
        }).then(Response => {
            setPontuacao(Response.data);
        })
            .catch(error => {
                toast.error("Error Na Pontuaçao Ou Pontuaçao Não Encontrado", {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                sair();
            });
    }

    const informacoes = async () => {
        const savedUserData = localStorage.getItem("@detailUser");
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            id = userData.uid;
            cod = userData.email;
        } else {
            console.log("Nenhuma informação encontrada no localStorage.");
        }
        await axios.get(`https://othondecarvalho.com.br:5555/pc/informacao/${cod}`, {
            headers: { 'Authorization': `Bearer ${id}` },
        }).then(Response => {
            setInfromacao(Response.data);
        })
            .catch(Response => {
                toast.error("Error Na Pontuaçao", {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                sair();
            });
    }




    const sair = () => {
        localStorage.removeItem("@detailUser");
        window.location.href = "/conecta";
    }

    const [imageToShow, setImageToShow] = useState('');
    const [imageToShow2, setImageToShow2] = useState('');
    const [imageToShow3, setImageToShow3] = useState('');
    const [imageToShow4, setImageToShow4] = useState('');
    const [imageToShow5, setImageToShow5] = useState('');


    const fetchImages4 = async () => {
        try {
            const savedUserData = localStorage.getItem('@detailUser');
            if (!savedUserData) {
                console.log('Nenhuma informação encontrada no localStorage.');
                return;
            }
            const userData = JSON.parse(savedUserData);
            const token = userData.uid;
            const response = await axios.get('https://othondecarvalho.com.br:5555/imagemCarrossel', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (response.data.length > 0) {
                setImageToShow5(response.data[4]);
                setImageToShow4(response.data[3]);
                setImageToShow3(response.data[2]);
                setImageToShow2(response.data[1]);
                setImageToShow(response.data[0]);

            }
        } catch (error) {
            console.error(error);
        }
    };


    const TrazerCampanha = async () => {
        const savedUserData = localStorage.getItem("@detailUser");
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            id = userData.uid;
            cod = userData.email;
        } else {
            console.log("Nenhuma informação encontrada no localStorage.");
        }

        await axios.get(`https://othondecarvalho.com.br:5555/pc/Campanha`, {
            headers: { 'Authorization': `Bearer ${id}` },
        }).then(Response => {
            setCampanha(Response.data.periodo);
            setNome(Response.data.nome);
        })
            .catch(Response => {
                toast.error("Não Foram Encontrados Dasdos Para Esta Consulta", {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
    }

    const clientespositivados = async () => {
        const savedUserData = localStorage.getItem("@detailUser");
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            id = userData.uid;
            cod = userData.email;
        } else {
            console.log("Nenhuma informação encontrada no localStorage.");
        }

        await axios.get(`https://othondecarvalho.com.br:5555/pc/clientespositivados/${cod}`, {
            headers: { 'Authorization': `Bearer ${id}` },
        }).then(Response => {
            setClientespositivado(Response.data.pontuacao);
        })
            .catch(Response => {
                toast.error("Não Foram Encontrados Dasdos Para Esta Consulta Clientes Positivados", {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
    }
    return (
        <div className="marcado tamanho body " style={{ marginLeft: 0, width: '100%', textAlign: 'center', alignItems: 'center', justifyContent: 'center', paddingLeft: '12px' }} >

            <ToastContainer />

            <div className="container-md-fluid body" style={{ padding: 0, margin: 0 }}>

                <div className="row body" style={{ padding: 0, width: '100%' }} >

                    <div style={{ marginTop: window.innerWidth > 600 ? 0 : 70, padding: 0, width: '100%' }} >

                        <Row style={{ display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center', padding: 0, width: '100%', margin: '0' }}>
                            <Col xs={11} style={{ margin: 0, padding: 0, width: '100%' }} >
                                <Carrossel
                                    imagem5={<img src={imageToShow5} style={{ borderRadius: 10 }} width={'100%'} alt={``} />}
                                    imagem1={<img src={imageToShow} style={{ borderRadius: 10 }} width={'100%'} alt={``} />}
                                    imagem2={<img src={imageToShow2} style={{ borderRadius: 10 }} width={'100%'} alt={``} />}
                                    imagem3={<img src={imageToShow3} style={{ borderRadius: 10 }} width={'100%'} alt={``} />}
                                    imagem4={<img src={imageToShow4} style={{ borderRadius: 10 }} width={'100%'} alt={``} />}
                                />
                            </Col>
                        </Row>

                        <Row className="mt-3 " style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Col style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                <Row style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginLeft: '20px' }}>


                                    <Table striped bordered hover style={{  border: 'black' }}>
                                        <thead >
                                            <tr >
                                                <th style={{ background: '#e2e1e1', color: 'black' }}>#</th>
                                                <th style={{ background: '#e2e1e1', color: 'black' }}>Campanha vigente :</th>
                                                <th style={{ background: '#e2e1e1', color: 'black' }}>Periodo:</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr >
                                                <td style={{ background: '#e2e1e1', color: 'black' }}>1</td>
                                                <td style={{ background: '#e2e1e1', color: 'black' }}><h4 style={{ fontSize: '15px' }}> <Link to={'/Campanha'} style={{ textDecoration: 'none', color: 'black' }}>{nome}</Link></h4></td>
                                                <td style={{ background: '#e2e1e1', color: 'black' }}><h4 style={{ fontSize: '15px' }}> {campanha}</h4></td>
                                            </tr>
                                            <tr>
                                                <td style={{ background: '#e2e1e1', color: 'black' }}>2</td>
                                                <td style={{ background: '#e2e1e1', color: 'black' }}><h4 style={{ fontSize: '15px' }}> <Link to={'/Campanha1'} style={{ textDecoration: 'none', color: 'black' }}>{nome1}</Link></h4></td>
                                                <td style={{ background: '#e2e1e1', color: 'black' }}><h4 style={{ fontSize: '15px' }}> {campanha1}</h4></td>
                                            </tr>
                                            <tr>
                                                <td style={{ background: '#e2e1e1', color: 'black' }}>3</td>
                                                <td style={{ background: '#e2e1e1', color: 'black' }}><h4 style={{ fontSize: '15px' }}> <Link to={'/Campanha2'} style={{ textDecoration: 'none', color: 'black' }}>{nome2}</Link></h4></td>
                                                <td style={{ background: '#e2e1e1', color: 'black' }}><h4 style={{ fontSize: '15px' }}> {campanha2}</h4></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Row>
                            </Col>


                            {/* <Col xs={window.innerWidth <= 1200 ? 12 : 4} style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Carousel style={{ margin: '10px', marginBottom: 20, maxHeight: '500px', maxWidth: '500px' }}>
                                    {imageToShowt.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                className="d-block w-100"
                                                src={image}
                                                alt={`Imagem ${index + 1}`}
                                                style={{ height: '500px', width: 'auto' }} 
                                            />
                                            <Carousel.Caption>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    ))}
                                </Carousel> 

                            </Col> */}
                            <Col className="computer" xs={9} style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                <div className="container-fluid row mb-5"  >
                                    <div className="container-md mt-2 col-md-11" >
                                        <div className="card " style={{ float: 'right', textAlign: 'center', marginLeft: 10, paddingBottom: '20px', backgroundColor: '#e2e1e1' }}>
                                            <div className="card-body">
                                                <p style={{ fontSize: '30px' }} >Pontuação</p>
                                                <h1 style={{ fontSize: '70px' }}>{pontucao.pontuacao ? pontucao.pontuacao.toLocaleString('pt-BR') : 0}</h1>
                                                <img width={'40%'} src={icone} alt={``} />

                                            </div><p>Clientes Positivados {clientespositivado}</p>
                                        </div>
                                        <div className="card" style={{ background: '#e2e1e1' }}>
                                            <div className="card-header">
                                                Informaçoes do Profissinal
                                            </div>
                                            <div className="card-body" style={{ textAlign: 'left' }}>
                                                <h5 style={{ fontSize: '25px' }} className="card-title"> {informacao.descricao}</h5>
                                                <p style={{ fontSize: '18px' }} className="card-text"> Data de Cadastro: {moment(informacao.dtcadastro).format("DD/MM/YY")}</p>
                                                <p style={{ fontSize: '18px' }} className="card-text"> Endereço: {informacao.endereco}</p>
                                                <p style={{ fontSize: '18px' }} className="card-text"> CNPJ ou CPF: {informacao.cnpj}</p>
                                                <p style={{ fontSize: '18px' }} className="card-text"> codigo do Profissional: {informacao.codprofissional}</p>
                                                <p style={{ fontSize: '18px' }} className="card-text"> Data Da Ultima Compra: {moment(informacao.tipoprof).format("DD/MM/YYYY")}</p>
                                                {cod}
                                                <Link to={`/Cadastro/${informacao.codprofissional}`} style={{ background: '#333333' }} className="btn btn-primary">Editar Cadastro</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row style={{ textAlign: 'center' }} className='body'>
                            <Col className="celular ">
                                <div className="container-fluid row mb-5" >
                                    <div className="container-md mt-2 col-md-12">
                                        <div className="card " style={{ float: 'center', textAlign: 'center', marginLeft: 10, paddingBottom: '20px', backgroundColor: '#e2e1e1' }}>
                                            <div className="card-body">
                                                <p style={{ fontSize: '30px' }} >Pontuação</p>
                                                <h1 style={{ fontSize: '70px' }}>{pontucao.pontuacao ? pontucao.pontuacao.toLocaleString('pt-BR') : 0}</h1>
                                                <img width={'40%'} src={icone} alt={``} />
                                                <p>Clientes Positivados {clientespositivado}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Col>
                        </Row>
                        <Row style={{ textAlign: 'center' }}>
                            <Col className="mt-3 celular">
                                <div className="container-fluid row mb-5" >
                                    <div className="container-md mt-2 col-md-12">
                                        <div className="card" style={{ backgroundColor: '#e2e1e1' }}>
                                            <div className="card-header">
                                                Informaçoes do Profissinal
                                            </div>
                                            <div className="card-body" style={{ textAlign: 'left' }}>
                                                <h5 style={{ fontSize: '25px' }} className="card-title"> {informacao.descricao}</h5>
                                                <p style={{ fontSize: '18px' }} className="card-text"> Data de Cadastro: {moment(informacao.dtcadastro).format("DD/MM/YY")}</p>
                                                <p style={{ fontSize: '18px' }} className="card-text"> Endereço: {informacao.endereco}</p>
                                                <p style={{ fontSize: '18px' }} className="card-text"> CNPJ ou CPF: {informacao.cnpj}</p>
                                                <p style={{ fontSize: '18px' }} className="card-text"> codigo do Profissional: {informacao.codprofissional}</p>
                                                <p style={{ fontSize: '18px' }} className="card-text"> Data Da Ultima Compra: {moment(informacao.tipoprof).format("DD/MM/YYYY")}</p>
                                                {cod}
                                                <Link to={`/Cadastro/${informacao.codprofissional}`} style={{ background: '#333333' }} className="btn btn-primary">Editar Cadastro</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>

        </div>
    )
}
