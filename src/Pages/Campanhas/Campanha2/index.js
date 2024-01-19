import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';

export default function Campanha2() {
    const [campanha, setCampanha] = useState('Periodo a definir');
    const [nome, setNome] = useState('Campanha a definir');

    var id;
    var cod;
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
    useEffect(() => {
      return () => {
        TrazerCampanha();
      };
    }, [])
  return (
    <div className="tamanho container-fluid body d-flex align-items-center justify-content-center p-5" >
        <ToastContainer/>
      <Card className="text-center container body" >
        <Card.Header>
          <h1>
            <b style={{ fontFamily: 'Croissant One' }}>{nome}</b>
          </h1>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <p style={{ fontFamily: 'Roboto', fontSize: 20 }}>
        
            </p>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <b>{campanha}</b>
        </Card.Footer>
      </Card>
    </div>
  );
}
