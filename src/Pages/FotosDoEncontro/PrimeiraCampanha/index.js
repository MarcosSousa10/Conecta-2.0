import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './Primeira.style.css';

export default function PrimeiraCampanha() {
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

  return (
    <div className="tamanho body" >
      <div style={{display:'flex',flexDirection:'row', flexWrap:'wrap'}}>
         {imageToShowt.map((image, index) => (
        <Card style={{ width: '20rem',margin:7}} key={index} className="custom-card body">
          <Card.Img
            variant="top"
            src={image}
            alt={`Imagem ${index + 1}`}
          />
        </Card>
      ))}
      </div>
     
    </div>
  );
}
