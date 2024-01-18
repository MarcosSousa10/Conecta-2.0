/* eslint-disable react-hooks/exhaustive-deps */
import './principal.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import moment from 'moment';
import Carrossel from "../../Components/carrossel";
import icone from '../../Components/image/recompensa.svg';
import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Infor from 'react-bootstrap-icons/dist/icons/info-circle';
import { ToastContainer, toast } from 'react-toastify';
import Carousel from 'react-bootstrap/Carousel';

export default function Principal() {
    const [datainicio, setDatainicio] = useState();
    const [datafim, setDataFim] = useState();
    const [data, setData] = useState([]);
    const [pontucao, setPontuacao] = useState(0);
    const [informacao, setInfromacao] = useState('');
    const [campo, setCampo] = useState(false);
    const [show, setShow] = useState(false);
    const [nome, setNome] = useState('');
    const [clientespositivado, setClientespositivado] = useState('');
    const [campanha, setCampanha] = useState('');
    const [mostrarTermos, setMostrarTermos] = useState(true);
    const [aceitouTermos, setAceitouTermos] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var id;
    var cod;
    const [texto, setTexto] = useState('');
    const informa = async () => {
        const savedUserData = localStorage.getItem("@detailUser");
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            id = userData.uid;
            cod = userData.email;
        } else {
            console.log("Nenhuma informação encontrada no localStorage.");
        }
        await axios.get(`https://www.othondecarvalho.com.br:5555/pc/Saibamais`, {
            headers: { 'Authorization': `Bearer ${id}` },
        }).then(Response => {
            setTexto(Response.data.texto);
        })
            .catch(Response => {
                console.log(Response)
            });
    }
    useEffect(() => {
        informa();
    }, []);
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
    }, []);

    const aceitarTermos = () => {
        setAceitouTermos(true);
        setMostrarTermos(false);
    };


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
            fetchData(Response.data.cnpj);
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
    const vendas = async () => {
        const savedUserData = localStorage.getItem("@detailUser");
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            id = userData.uid;
            cod = userData.email;
        } else {
            console.log("Nenhuma informação encontrada no localStorage.");
        }
        const formattedDatainicio = datainicio ? format(new Date(datainicio), "dd-MM-yyyy") : "";
        const formattedDatafim = datafim ? format(new Date(datafim), "dd-MM-yyyy") : "";
        await axios.get(`https://othondecarvalho.com.br:5555/pc/vendas/${cod}/${formattedDatainicio}/${formattedDatafim}`, {
            headers: { 'Authorization': `Bearer ${id}` },
        }).then(Response => {
            setData(Response.data);
            alterarCampo();

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



    const sair = () => {
        localStorage.removeItem("@detailUser");
        window.location.href = "/conecta";
    }

    const alterarCampo = () => {
        setCampo(true);
    };

    const [monthsData, setMonthsData] = useState([]);

    const fetchData = async (cnpj) => {
        try {

            const savedUserData = localStorage.getItem("@detailUser");
            if (savedUserData) {
                const userData = JSON.parse(savedUserData);
                id = userData.uid;
                cod = userData.email;
            } else {
                console.log("Nenhuma informação encontrada no localStorage.");
            }
            const requests = Array.from({ length: 12 }, (_, index) =>
                axios.get(`https://othondecarvalho.com.br:5555/pc/dashboard/${cnpj}/${index + 1}`, {
                    headers: { Authorization: `Bearer ${id}` },
                })
            );

            const responses = await Promise.all(requests);
            const data = responses.map((response) => response.data.codbrinde || 0);
            setMonthsData(data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const multiAxisData = {
        labels: [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novenbro',
            'Dezembro',
        ],
        datasets: [
            {
                label: 'Vendas',
                fill: false,
                borderColor: '#42A5F5',
                yAxisID: 'y',
                tension: 0.4,
                data: monthsData,
            },],
    };

    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: .6,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        let multiAxisOptions = {
            stacked: false,
            maintainAspectRatio: false,
            aspectRatio: .6,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y1: {
                    type: 'linear',
                    display: false,
                    position: 'right',
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        return {
            basicOptions,
            multiAxisOptions
        }
    }

    // const { basicOptions, multiAxisOptions } = getLightTheme();
    const { multiAxisOptions } = getLightTheme();

    // eslint-disable-next-line no-unused-vars
    const [images, setImages] = useState([]);


    useEffect(() => {
        const fetchImages = async () => {
            try {
                const savedUserData = localStorage.getItem('@detailUser');
                if (!savedUserData) {
                    console.log('Nenhuma informação encontrada no localStorage.');
                    return;
                }
                const userData = JSON.parse(savedUserData);
                const token = userData.uid;
                const response = await axios.get('https://othondecarvalho.com.br:5555/images', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                setImages(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchImages();
    }, []);
    const [imageToShow, setImageToShow] = useState('');
    const [imageToShow2, setImageToShow2] = useState('');
    const [imageToShow3, setImageToShow3] = useState('');
    const [imageToShow4, setImageToShow4] = useState('');
    const [imageToShow5, setImageToShow5] = useState('');
    const [imageToShowt, setImageToShowt] = useState([]);
    useEffect(() => {
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
        fetchImages4();
    }, []);
    const fetchImages = async () => {
        try {
            const savedUserData = localStorage.getItem('@detailUser');
            if (!savedUserData) {
                console.log('Nenhuma informação encontrada no localStorage.');
                return;
            }
            const userData = JSON.parse(savedUserData);
            const token = userData.uid;
            const response = await axios.get('https://othondecarvalho.com.br:5555/imagemCarrosselFAntigas', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (response.data.length > 0) {

                setImageToShowt(response.data);

            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchImages();
    }, []);




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
        <div className="marcado tamanho body " style={{ marginLeft: 0, width: '100%', textAlign: 'center', alignItems: 'center', justifyContent: 'center', padding: '12px' }} >

            <ToastContainer />

            <div className="container-md-fluid body" style={{ padding: 0, margin: 0 }}>

                <div className="row body" style={{ padding: 0, width: '100%' }} >

                    <div style={{ marginTop: window.innerWidth > 600 ? 0 : 70, padding: 0, width: '100%', marginLeft: '1%' }} >

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
                                {/* <Row style={{marginLeft:"20px"}}>
                                <Col style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, padding: 0, width: '100%', marginBottom:"10px" }}>
                                    <Button style={{ fontSize: '15px', margin: 1, background: '#333333' }} variant="primary" onClick={() => {
                                        handleShow(); informacoes(); pontuacao(); TrazerCampanha(); clientespositivados();
                                    }}>
                                        <Infor style={{ fontSize: '30px' }} /> {window.innerWidth <= 1200 ? "" : "Informações Sobre Campanhas Vigentes"}
                                    </Button>
                                </Col>
                            <Offcanvas show={show} onHide={handleClose} className="bg-dark" style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                <Offcanvas.Header closeButton >
                                    <Offcanvas.Title  > Informações</Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body style={{ textAlign: 'left', width: '100%' }}>
                                    {texto}
                                </Offcanvas.Body>
                            </Offcanvas>
                        </Row> */}
                                <Row style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginLeft: '20px' }}>
                                    <div className="card" style={{ background: '#e2e1e1' }}>
                                        <div className="card-header">
                                            <Row>
                                                <Col style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, padding: 0, width: '100%' }}>
                                                    <h4 style={{ fontSize: '15px' }}>Campanha vigente :</h4>
                                                </Col>

                                                <Col style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, padding: 0, width: '100%' }}>
                                                    <h4 style={{ fontSize: '15px' }}>Período da campanha : </h4>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="card-body" style={{ textAlign: 'left' }}>
                                            <Row>
                                                <Col style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, padding: 0, width: '100%' }}>
                                                    <h4 style={{ fontSize: '15px' }}> {nome}</h4>
                                                </Col>
                                                <Col xs={1}>
                                                    <div style={{ borderLeft: '2px solid #000', height: '100%' }}></div>
                                                </Col>
                                                <Col style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, padding: 0, width: '100%' }}>


                                                    <h4 style={{ fontSize: '15px' }}> {campanha}</h4>
                                                </Col>
                                            </Row>
                                            <hr />
                                            <Row>
                                                <Col style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, padding: 0, width: '100%' }}>
                                                    <h4 style={{ fontSize: '15px' }}> {nome}</h4>
                                                </Col>
                                                <Col xs={1}>
                                                    <div style={{ borderLeft: '2px solid #000', height: '100%' }}></div>
                                                </Col>
                                                <Col style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, padding: 0, width: '100%' }}>
                                                    <h4 style={{ fontSize: '15px' }}> {campanha}</h4>
                                                </Col>
                                            </Row>
                                            <hr />

                                            <Row>
                                                <Col style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, padding: 0, width: '100%' }}>
                                                    <h4 style={{ fontSize: '15px' }}>{nome}</h4>
                                                </Col>
                                                <Col xs={1}>
                                                    <div style={{ borderLeft: '2px solid #000', height: '100%' }}></div>
                                                </Col>
                                                <Col style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, padding: 0, width: '100%' }}>
                                                    <h4 style={{ fontSize: '15px' }}>{campanha}</h4>
                                                </Col>

                                            </Row>
                                        </div>
                                    </div>
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
