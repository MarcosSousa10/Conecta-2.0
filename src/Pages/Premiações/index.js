import { useEffect, useState } from 'react';
import imagem from '../../Components/image/fundo.png';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';

export default function Premiacoes() {
    const [campanha, setCampanha] = useState('Periodo a definir');
    const [campanha1, setCampanha1] = useState('Periodo a definir');
    const [campanha2, setCampanha2] = useState('Periodo a definir');
    const [nome, setNome] = useState('Campanha a definir');
    const [nome1, setNome1] = useState('Campanha a definir');
    const [nome2, setNome2] = useState('Campanha a definir');
    const [nomeCampanha, setNomeCampanha] = useState('Campanha Segundo Semestre 2023');
    const [nomeCampanha1, setNomeCampanha1] = useState('Campanha Primeiro Semestre 2024');
    const [nomeCampanha2, setNomeCampanha2] = useState('Nome Campanha a definir');
    const [imageToShowt, setImageToShowt] = useState([]);
    const [imageToShowt1, setImageToShowt1] = useState([]);
    const [imageToShowt2, setImageToShowt2] = useState([]);

    var id;
    var cod;
    const TrazerCampanha = async (ID) => {
        const savedUserData = localStorage.getItem("@detailUser");
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            id = userData.uid;
            cod = userData.email;
        } else {
            console.log("Nenhuma informação encontrada no localStorage.");
        }

        await axios.get(`https://othondecarvalho.com.br:5555/pc/Campanha/${ID}`, {
            headers: { 'Authorization': `Bearer ${id}` },
        }).then(Response => {
            if (ID === '1') {
                setCampanha(Response.data.periodo);
                setNome(Response.data.nome);
            }
            else if (ID === '2') {
                setCampanha1(Response.data.periodo);
                setNome1(Response.data.nome);
            }
            else if (ID === '3') {
                setCampanha2(Response.data.periodo);
                setNome2(Response.data.nome);
            }
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
    const fetchImages1 = async () => {
        try {
            const savedUserData = localStorage.getItem('@detailUser');
            if (!savedUserData) {
                console.log('Nenhuma informação encontrada no localStorage.');
                return;
            }
            const userData = JSON.parse(savedUserData);
            const token = userData.uid;
            const response = await axios.get('https://othondecarvalho.com.br:5555/imagemCarrosselFAntigas1', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (response.data.length > 0) {

                setImageToShowt1(response.data);

            }
        } catch (error) {
            console.error(error);
        }
    };
    const fetchImages2 = async () => {
        try {
            const savedUserData = localStorage.getItem('@detailUser');
            if (!savedUserData) {
                console.log('Nenhuma informação encontrada no localStorage.');
                return;
            }
            const userData = JSON.parse(savedUserData);
            const token = userData.uid;
            const response = await axios.get('https://othondecarvalho.com.br:5555/imagemCarrosselFAntigas2', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (response.data.length > 0) {

                setImageToShowt2(response.data);

            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        TrazerCampanha('1');
        TrazerCampanha('2');
        TrazerCampanha('3');
        fetchImages();
        fetchImages1();
        fetchImages2();
    }, [])
    return (
        <div className="tamanho container-md-fluid body" style={{ textAlign: 'center', alignItems: 'center' }}>
            <ToastContainer />
            <Row>
                <Col xs={12} className="d-flex justify-content-center">
                    <h1>Premiações</h1>
                </Col>
            </Row>
            <Row className="row row-cols-1 row-cols-md-3 g-4 ">
                <Col style={{ display: nome === '' ? 'none' : '' }}>
                    <Card.Link href="/PrimeiraCampanha" style={{ textDecoration: 'none' }}>
                        <div className="card  h-100 body" style={{ marginLeft: '5px' }}>
                            <h3 className="card-title">{nomeCampanha1}</h3>
                            <h5 className="card-text">{nome}</h5>
                            {/* <img style={{ width: '100%', height: 'auto' }} src={imagem} alt="Logo" /> */}
                            <Col>
                                <Carousel >
                                    {imageToShowt.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                className="d-block w-100"
                                                src={image}
                                                alt={`Imagem ${index + 1}`}
                                                style={{ height: '500px', width: 'auto' }} // Defina o tamanho desejado aqui
                                            />
                                            <Carousel.Caption>
                                                {/* Adicione título e descrição se disponíveis */}
                                                {/* <h3>{image.title}</h3> */}
                                                {/* <p>{image.description}</p> */}
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </Col>
                            <div className="card-body">
                                <p className="card-title">{campanha}</p>
                            </div>
                        </div>
                    </Card.Link>
                </Col>
                <Col style={{ display: nome1 === '' ? 'none' : '' }}>
                    <Card.Link href="/SegundaCampanha" style={{ textDecoration: 'none' }}>
                        <div className="card h-100 body " >
                            <h3 className="card-title">{nomeCampanha}</h3>
                            <h5 className="card-text">{nome1}</h5>
                            <Col>
                                <Carousel >
                                    {imageToShowt1.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                className="d-block w-100"
                                                src={image}
                                                alt={`Imagem ${index + 1}`}
                                                style={{ height: '500px', width: 'auto' }}
                                            />
                                            <Carousel.Caption>
                                                {/* Adicione título e descrição se disponíveis */}
                                                {/* <h3>{image.title}</h3> */}
                                                {/* <p>{image.description}</p> */}
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </Col>                            <div className="card-body">
                                <p className="card-title">{campanha1}</p>
                            </div>
                        </div>
                    </Card.Link>

                </Col>
                <Col style={{ display: nome2 === '' ? 'none' : '' }}>
                    <Card.Link href="/TerceiraCampanha" style={{ textDecoration: 'none' }}>

                        <div className="card h-100 body" style={{ marginRight: '5px' }}>
                            <h3 className="card-title">{nomeCampanha2}</h3>
                            <h5 className="card-text">{nome2}</h5>
                            <Col>
                                <Carousel >
                                    {imageToShowt2.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                className="d-block w-100"
                                                src={image}
                                                alt={`Imagem ${index + 1}`}
                                                style={{ height: '500px', width: 'auto' }} // Defina o tamanho desejado aqui
                                            />
                                            <Carousel.Caption>
                                                {/* Adicione título e descrição se disponíveis */}
                                                {/* <h3>{image.title}</h3> */}
                                                {/* <p>{image.description}</p> */}
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </Col>                            <div className="card-body">
                                <p className="card-title">{campanha2}</p>
                            </div>
                        </div>
                    </Card.Link>
                </Col>
            </Row>
        </div>
    );
}
