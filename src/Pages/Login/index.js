import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './longin.css';
import { Col, Row } from 'react-bootstrap';
import imagem from '../../Components/image/preto conecta.png';
import imagem1 from '../../Components/image/preto Luminato.png';
import { ToastContainer, toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import watermarkImage from '../../Components/image/fundo.png';

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  var token;
  useEffect(() => {
    const savedUserData = localStorage.getItem("@detailUser");
    if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      token = userData.uid;
      navigate(`/Principal`);

    } else {
      console.log("Nenhuma informação encontrada no localStorage.");
    }
  }, []);
  const test = (a) => {
    axios.get(`https://othondecarvalho.com.br:5555/pc/codprof/${usuario}`, {
      headers: { 'Authorization': `Bearer ${a}` },
    }).then(Response => {
      if (Response.data.codprofissional === null) {
        localStorage.removeItem("@detailUser");
        setIsLoading(false);
        toast.error('So é Permitido Fazer Login Na Plataforma Como Decorador(a), Designer Ou Arquiteto(a) ', {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        const userData = {
          uid: a,
          email: Response.data.codprofissional,
        };
        localStorage.setItem("@detailUser", JSON.stringify(userData));

        navigate(`/Principal`);
        window.location.reload(true);
      }
    }
    ).catch(
      Responses => {
        localStorage.removeItem("@detailUser");
      }
    )
  }
  const login = () => {

    axios.post('https://othondecarvalho.com.br:5555/auth/login', {
      login: usuario,
      password: senha
    }).then(Response => {
      setIsLoading(true);
      const a = Response.data.token;
      test(a);
    }
    ).catch(Response => {
      toast.error('Usuario e/ou a senha estão incorretas', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.removeItem("@detailUser");
      setIsLoading(false);

    })
  }
  const cadastro = () => {
    navigate(`/Cadastro`);

  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  }
  const handleKeyPresss = (e) => {
    if (e.key === 'Enter') {
      document.querySelector('.inputt').focus();
    }
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', margin: 0, padding: 0 }}>
    <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${watermarkImage})`,
            backgroundSize: 'cover',
            opacity: '0.9',
            zIndex: -1, 
          }}
        ></div>  {isLoading ? (
        <div>
          <div className="card tamanho" style={{ textAlign: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}
          >
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </div>
        </div>) :
        <div>
          <div style={{ display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center', paddingBottom: '200px' }} className='container tamanho' >
            <ToastContainer />


            <div >
              <div>
                <img src={imagem}  width={'20%'} alt={``} />
                <br />
                <img src={imagem1}  width={'10%'} alt={``} />

              </div>



              <div>
                <Form.Label htmlFor="inputPassword5" style={{fontWeight: 'bold'}}>CPF ou CPNJ</Form.Label>
                <Form.Control
                  style={{ maxWidth:  window.innerWidth > 600 ? '30%' : '100%' , margin: 'auto',border: '2px solid #000',fontWeight: 'bold' }}
                  type="number"
                  id="inputPassword5"
                  aria-describedby="passwordHelpBlock"
                  onChange={txt => { setUsuario(txt.target.value) }}
                  onKeyPress={handleKeyPresss}
                />
                <Form.Text id="passwordHelpBlock" muted>

                </Form.Text>
              </div>
              <div style={{ alignContent: 'center' }}>
                <Form.Label htmlFor="inputPassword5" style={{fontWeight: 'bold'}}>Senha</Form.Label>
                <Form.Control
                  style={{ maxWidth:  window.innerWidth > 600 ? '30%' : '100%', margin: 'auto',border: '2px solid #000',fontWeight: 'bold' }}
                  type="password"
                  id="inputPassword5"
                  className='inputt'
                  aria-describedby="passwordHelpBlock"
                  onChange={txt => { setSenha(txt.target.value) }}
                  onKeyPress={handleKeyPress}
                />
                {/* <Form.Text id="passwordHelpBlock" muted>
          Sua senha deve ter de 8 a 10 caracteres, conter letras maiusculas, minusculas, números e caracteres especiais,
            e não deve conter espaços, ou emoji.
          </Form.Text> */}
              </div>
              <Row style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
              <Col xl={window.innerWidth > 1200 ? 2 : 0} style={{ marginRight: window.innerWidth < 600 ? 0 : -50 }}>
                  <Button variant="primary" style={{ borderRadius: "10", margin: 10, width: window.innerWidth > 1200 ? '50%' : '20%' && window.innerWidth > 600 ? '20%' : '50%', background: '#333333', fontSize:15 }} onClick={login}>Entrar</Button>
                </Col>

                <Col xl={window.innerWidth > 1200 ? 2 : 0}  style={{ marginLeft: window.innerWidth < 600 ? 0 : -50 }}>
                  <Button variant="primary" style={{ borderRadius: "10", margin: 10, width: window.innerWidth > 1200 ? '50%' : '20%' && window.innerWidth > 600 ? '20%' : '50%' , background: '#333333', fontSize:15 }} onClick={cadastro}>Cadastro</Button>
                </Col>
                <Form.Text id="passwordHelpBlock" muted>
                  <Link to={'/Redefinicao'} style={{ fontSize: 11 }}>Esqueceu sua senha</Link>
                </Form.Text>
              </Row>

            </div>

          </div>
        </div>
      }
    </div>
  )
}