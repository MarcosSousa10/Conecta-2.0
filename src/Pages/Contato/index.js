import React, { useState } from 'react';
import './Contato.style.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';

import axios from 'axios';
export default function Contato() {
  const [assunto, setAssunto] = useState();

  const [texto, setTexto] = useState('');
  const notify = () => toast.success('Email Enviado Com Sucesso!', {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  const EnviarEmail = async () => {
    try {
      const savedUserData = localStorage.getItem('@detailUser');
      if (!savedUserData) {
        console.log('Nenhuma informação encontrada no localStorage.');
        return;
      }

      const userData = JSON.parse(savedUserData);
      const token = userData.uid;
      await axios.get(`https://othondecarvalho.com.br:5555/email?assunto=${assunto}&corpo=${texto}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then(Response => {
        notify();
        setTexto('');
      }).catch(Response => {
        toast.error("Error Ao Enviar E-mail", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="tamanho body" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ToastContainer />

      <Form className="contato body container" style={{ textAlign: 'center', width: '50%' }}>
        <Row>
          <h1>Fale Conosco</h1>
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
            <Form.Label>Assunto</Form.Label>
            <Form.Select
              aria-label="Selecione o Assunto"
              onChange={(e) => {
                setAssunto(e.target.value);
              }}
            >
              <option value="Duvidas">Dúvidas</option>
              <option value="Sugestões">Sugestões</option>
              <option value="Reclamações">Reclamações</option>
              <option value="Elogios">Elogios</option>
              <option value="Vendas">Vendas</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Descrição</Form.Label>
          <Form.Control as="textarea" placeholder="Descrição" value={texto} onChange={(txt) => setTexto(txt.target.value)} rows={10} style={{ marginBottom: 10 }} />

        </Form.Group>
        <Button variant="dark" onClick={EnviarEmail} >Enviar</Button>
      </Form>
    </div>
  );
}
