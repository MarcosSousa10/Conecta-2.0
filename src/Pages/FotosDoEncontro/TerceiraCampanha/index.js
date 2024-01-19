import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './Terceira.style.css';

export default function TerceiraCampanha() {
  const [imageToShowt, setImageToShowt] = useState([]);

  const fetchImages = async () => {
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
        setImageToShowt(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="tamanho ">
      <div style={{display:'flex',flexDirection:'row', flexWrap:'wrap'}}>
          {imageToShowt.map((image, index) => (
        <Card style={{ width: '20rem' }} key={index} className="custom-card">
          <Card.Img
            variant="top"
            className="d-block w-100"
            src={image}
            alt={`Imagem ${index + 1}`}
            style={{ width: 'auto' }}
          />
          <Card.Body>
            {/* <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button> */}
          </Card.Body>
        </Card>
      ))}
      </div>
    
    </div>
  );
}
