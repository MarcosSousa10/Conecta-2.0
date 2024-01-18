import React, { useState } from 'react';
import axios from 'axios';
import './email.css';
import { Button, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';

export default function Redefinicao() {
  const [destinatario, setDestinatario] = useState('');
  const [errors, setErrors] = useState({
    destinatario: ''
  });

  const validateFields = () => {
    let valid = true;
    const newErrors = {};
    if (valid = true) {
        newErrors.destinatario = ' Email não encontrado ou não cadastrado. Favor ligar para 2103-3094 para revalidar o cadastro.';
        valid = false;
    }
    setErrors(newErrors);
    return valid;
};
  const handleSubmit = async (email, senha) => {

    try {
      const response = await axios.post('https://othondecarvalho.com.br:5555/email', null, {
        params: {
          destinatario: email,
          assunto: "Mudança de Senha",
          corpo: `A Senha para a sua conta no CONECTA é ${senha}`,
        },
      }).then(Response => {
        notify();
      }).catch(
        err => {
          errorr();
        }
      );
    } catch (error) {
      console.error('Error ao enviar  email:', error);
    }
  };
  const trocasenha = async (e) => {

    e.preventDefault();
    try {
      const response = await axios.get(`https://othondecarvalho.com.br:5555/pc/senha/${destinatario}`).then(
        Response => {
          handleSubmit(Response.data.email, Response.data.senha);
          setDestinatario("");
        }
      ).catch(
        Response => {
          errorr();
        }
      )
    } catch (error) {
      console.error('Error ao enviar  email:', error);
    }
  };
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
  const errorr = () => {
    validateFields();
    toast.error('Email Não Encontrado! ou Não Cadastrado', {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  return (
    <div className='corpo' style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ToastContainer />

      <Row>
        <Col>
          <h1>Esqueceu a Senha</h1>
        </Col>
        <Form.Text id="passwordHelpBlock" muted>
          Esqueceu sua senha? Digite seu endereço de e-mail. Você receberá um link por e-mail informando sua senha.
        </Form.Text>
        <Form onSubmit={trocasenha}>
          <Form.Control
            type="text"
            value={destinatario}
            onChange={(e) => setDestinatario(e.target.value.toUpperCase())}
          />
          <Form.Text className='text-danger'>{errors.destinatario} 
</Form.Text><br></br>
        <Button type="submit">Enviar</Button>
      </Form>
    </Row>
    </div >
  );
}

