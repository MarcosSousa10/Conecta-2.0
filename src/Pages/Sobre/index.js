import { useEffect, useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { RotatingLines } from 'react-loader-spinner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carrossel from "../../Components/carrossel";


export default function Sobre() {
    const [isLoading1, setIsLoading1] = useState(true);
    const [imageToShow, setImageToShow] = useState('');
    const [imageToShow2, setImageToShow2] = useState('');
    const [imageToShow3, setImageToShow3] = useState('');
    const [imageToShow4, setImageToShow4] = useState('');
    const [imageToShow5, setImageToShow5] = useState('');
    var id, cod;
    const [texto, setTexto] = useState('');
    const informacoes = async () => {
        const savedUserData = localStorage.getItem("@detailUser");
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            id = userData.uid;
            cod = userData.email;
        } else {
            console.log("Nenhuma informação encontrada no localStorage.");
        }
        await axios.get(`https://www.othondecarvalho.com.br:5555/pc/Sobre`, {
            headers: { 'Authorization': `Bearer ${id}` },
        }).then(Response => {
            setTexto(Response.data.texto);
            setIsLoading1(false);

        })
            .catch(Response => {
                console.log(Response)
            });
    }
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
    useEffect(() => {
        informacoes();
        fetchImages4();
    }, []);
    return (
        <div className="tamanho container-fluid bodyalign-items-center justify-content-center body" style={{ padding: 0, margin: 0, width: '100%', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>


            <Row className="mb-5" style={{ display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center', padding: 0, width: '100%', margin: '0' }}> 
                <Col xs={12} style={{ margin: 0, padding: 0, width: '100%' }} >
                       <img src={imageToShow} style={{ borderRadius: 10 }} width={'100%'} alt={``} />
                      
                </Col>
            </Row>
            <Row>
                <Col>
                <div className="text-center container body" style={{}}>
                    <Card.Header>
                        <h1>
                            <b style={{ fontFamily: "Croissant One",fontSize:50 }}>
                                Institucional
                            </b>
                        </h1>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>Luminato</Card.Title>
                        <Card.Text>

                            {isLoading1 ? (
                                <div>
                                    <div className="card body" style={{ textAlign: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center', }}
                                    >
                                        <RotatingLines
                                            strokeColor="grey"
                                            strokeWidth="5"
                                            animationDuration="0.75"
                                            width="96"
                                            visible={true}
                                        />
                                    </div>
                                </div>) : (
                                <div style={{fontSize:25}}>
                                    {texto}
                                </div>
                            )}

                        </Card.Text>
                        {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>

                </div>
                </Col>
            </Row>
        </div>

    )
}