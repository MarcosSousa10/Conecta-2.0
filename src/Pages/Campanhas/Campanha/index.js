import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
export default function Campanha() {
  const [campanha, setCampanha] = useState('Periodo a definir');
  const [nome, setNome] = useState('Campanha a definir');
  const [imageToShowt, setImageToShowt] = useState([]);
  const [nomeCampanha1, setNomeCampanha1] = useState('Campanha Segundo Semestre 2023');

  var id;
  var cod;
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
  const TrazerCampanha = async () => {
    const savedUserData = localStorage.getItem("@detailUser");
    if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      id = userData.uid;
      cod = userData.email;
    } else {
      console.log("Nenhuma informação encontrada no localStorage.");
    }

    await axios.get(`https://othondecarvalho.com.br:5555/pc/Campanha1`, {
      headers: { 'Authorization': `Bearer ${id}` },
    }).then(Response => {
      setCampanha(Response.data.periodo);
      setNome(Response.data.nome);
    })
      .catch(Response => {
        console.log(Response);

      });
  }
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
      await axios.get(`https://www.othondecarvalho.com.br:5555/pc/Saibamais/1`, {
          headers: { 'Authorization': `Bearer ${id}` },
      }).then(Response => {
          setTexto(Response.data.texto);
      })
          .catch(Response => {
              console.log(Response)
          });
  }
  useEffect(() => {
    return () => {
      TrazerCampanha();
      fetchImages();
      informa();
    };
  }, [])
  
  return (
    <div>
<Row className="tamanho container-fluid body d-flex align-items-start justify-content-center pt-2">      
    <Col className='text-center ' xs={ window.innerWidth > 1000 ? 4 : 12}>
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
        <Col xs={ window.innerWidth > 1000 ? 8 : 12}>
          <Card className="text-center body" >
            <Card.Header>
              <h1>
                <b style={{ fontFamily: 'Croissant One' }}>{nome}</b>
              </h1>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <p style={{ fontFamily: 'Roboto', fontSize: 20 }}>
                 {texto}
                            
                </p>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
              <b>{campanha}</b>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      </div>
  );
}
