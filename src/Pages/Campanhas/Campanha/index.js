import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';

export default function Campanha() {
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
              Já imaginou passar um fim de semana na deslumbrante Pousada Carumbé, na Serra do Cipó? Com o Conecta, 
              programa de relacionamento da Othon e do do Luminato, é possível! O Conecta visa celebrar e recompensar
               a excelência em arquitetura e design, incentivando a criatividade e a inovação através de premiações bimestrais,
                semestrais e anuais. O escritório premiado em primeiro lugar terá direito a uma semana na Pousada Carumbé, que oferece uma
                 fusão perfeita entre aconchego e natureza. Já o segundo escritório parceiro será contemplado com uma noite na luxuosa Estagem do Mirante,
                  situada na Serra da Moeda. Esta é uma oportunidade de vivenciar o charme arquitetônico e o conforto excepcional oferecidos por este estabelecimento.
                  Cada projeto é uma oportunidade única de se destacar.
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
