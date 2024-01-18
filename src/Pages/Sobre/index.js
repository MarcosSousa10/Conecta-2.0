import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import { RotatingLines } from 'react-loader-spinner';


export default function Sobre() {
    const [isLoading1, setIsLoading1] = useState(true);
    var id,cod;
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
    useEffect(() => {
        informacoes();
    }, []);
    return (
        <div className="tamanho container-fluid body d-flex align-items-center justify-content-center p-5"    style={{padding:0,marginLeft:0,width:'100%',marginTop: window.innerWidth > 600 ? '0' : '3%' , textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>


            <Card className="text-center container body" style={{}}>
                <Card.Header>  
                    <h1>
                        <b style={{fontFamily: "Croissant One",}}>
                            Institucional 
                        </b>   
                    </h1>  
                </Card.Header>
                <Card.Body>
                    <Card.Title>Luminato</Card.Title>
                    <Card.Text>
                    {isLoading1 ? (
                                        <div>
                                            <div className="card body" style={{ textAlign: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}
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
                                            <div>
                                                {texto}
                                            </div>
                                    )}
                               
             </Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
                <Card.Footer className="text-muted">
                    <b>
                        Othon de Carvalho
                    </b>
                </Card.Footer>
            </Card>

        </div>

    )
}