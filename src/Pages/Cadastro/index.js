/* eslint-disable react-hooks/exhaustive-deps */
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { IMaskInput } from 'react-imask';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import DownloadButton from '../../Components/TermosDeUso/DownloadButton';
import AgreementCheckbox from '../../Components/TermosDeUso/AgreementCheckbox';
export default function Cadastro() {
    const [valorSelecionado, setValorSelecionado] = useState('Profissão');
    const [descricao, setDescricao] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [dtnasc, setDtnasc] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");
    const [email, setEmail] = useState("");
    const [endereco, setEndereco] = useState("");
    const [celular, setCelular] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cep, setCep] = useState("");
    const [rg_ie, setRg_ie] = useState("");
    const [bairro, setBairro] = useState("");
    const [senha, setSenha] = useState("");
    const [dtcadastro, setDtcadastro] = useState("");
    const [codprofissional, setCodprofissional] = useState("");
    const [isAgreed, setIsAgreed] = useState(0);

    const handleAgreementChange = (event) => {
        const newValue = event.target.value === '1' ? 1 : 0;
        setIsAgreed(newValue);
    };
    const handleDropdownChange = (eventKey) => {
        setValorSelecionado(eventKey);
    };
    const ufsValidas = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
        'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
        'SP', 'SE', 'TO', 'ac', 'al', 'ap', 'am', 'ba', 'ce', 'df', 'es', 'go', 'ma', 'mt', 'ms',
        'mg', 'pa', 'pb', 'pr', 'pe', 'pi', 'rj', 'rn', 'rs', 'ro', 'rr', 'sc',
        'sp', 'se', 'to',
    ];
    const [errors, setErrors] = useState({
        descricao: '',
        email: '',
        senha: '',
        cidade: '',
        uf: '',
        cep: '',
        bairro: '',
        endereco: '',
        rg_ie: '',
        dtnasc: '',
        celular: '',
        cnpj: '',
        valorSelecionado: '',
        isAgreed: '',
    });
    const dateOfBirthRegex = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-(19|20)\d{2}$/;
    const isValidDateOfBirth = dateOfBirthRegex.test(dtnasc);
    const celularRegex = /^\(\d{2}\)\d{5}-\d{4}$/;
    const isValidCelular = celularRegex.test(celular);
    const cepRegex = /^\d{5}-\d{3}$/;
    const isValidCep = cepRegex.test(cep);
    const isValidUf = ufsValidas.includes(uf);
    const cidadeRegex = /^[A-Za-z\s]+$/;
    const isValidCidade = cidadeRegex.test(cidade);
    // const rgRegex = /^\d{2}\.\d{3}\.\d{3}-\d{1}$/;
    const rgRegex = /^\d{2}\.\d{3}\.\d{3}/;
    const isValidRg = rgRegex.test(rg_ie);
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,10}$/;
    const isValidPassword = passwordRegex.test(senha);
    //    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/; // Expresión regular para formato 00.000.000/0000-00
    const cnpjRegex = /^\d{14}$/;
    //  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; // Expresión regular para formato 000.000.000-00 
    const cpfRegex = /^\d{11}$/;
    let isValid;
    if (cnpj.length === 14) {
        isValid = cnpjRegex.test(cnpj);
    } else if (cnpj.length === 11) {
        isValid = cpfRegex.test(cnpj);
    } else {
        isValid = false;
    }
    const validateField = () => {
        let valid = true;
        const newErrors = {};
        if (descricao === '') {
            newErrors.descricao = 'Campo Nome obrigatório ';
            valid = false;
        }
        if (valorSelecionado === "Profissão") {
            newErrors.valorSelecionado = 'Favor Selecione uma Profissão Valida';
            valid = false;
        }
        if (bairro === '') {
            newErrors.bairro = 'Campo Bairro obrigatório';
            valid = false;
        }
        if (endereco === '') {
            newErrors.endereco = 'Campo Endereço obrigatório';
            valid = false;
        }
        if (cidade == null) {
            newErrors.cidade = 'Campo cidade obrigatório';
            valid = false;
        }

        if (email == null) {
            newErrors.email = 'Campo email obrigatório';
            valid = false;
        }

        if (senha == null) {
            newErrors.senha = 'Campo senha obrigatório';
            valid = false;
        }
        if (cnpj == null) {
            newErrors.cnpj = 'Campo cpf ou cnpj obrigatório';
            valid = false;
        }
        if (isValid === false) {
            newErrors.cnpj = 'CNPJ o CPF inválido, Somente Numeros';
            valid = false;
        }
        if (celular == null) {
            newErrors.celular = 'Campo celular obrigatório';
            valid = false;
        }
        if (isValidUf === false) {
            newErrors.uf = 'UF inválida';
            valid = false;
        }

        if (uf == null) {
            newErrors.uf = 'Campo UF obrigatório';
            valid = false;
        }
        if (isValidCelular === false) {
            newErrors.celular = 'Celular inválido';
            valid = false;
        }
        if (dtnasc === '') {
            newErrors.dtnasc = 'Campo Data de Nascimento obrigatório';
            valid = false;
        }
        if (isValidCep === false) {
            newErrors.cep = 'CEP inválido';
            valid = false;
        }

        if (isValidCidade === false) {
            newErrors.cidade = 'Digite uma cidade válida (sem caracteres especiais ou números)';
            valid = false;
        }
        if (isValidRg === false) {
            newErrors.rg_ie = 'RG inválido';
            valid = false;
        }
        if (isValidPassword === false) {
            newErrors.senha = 'Senha Inválida é Nescessario Caracteres Especiais, Numeros e Letras.Totalizando Minimo 8 e no Maximo 10 Caracteres';
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };
    const validateFields = () => {
        let valid = true;
        const newErrors = {};
        if (descricao === '') {
            newErrors.descricao = 'Campo Nome obrigatório ';
            valid = false;
        }
        if (valorSelecionado === "Profissão") {
            newErrors.valorSelecionado = 'Favor Selecione uma Profissão Valida';
            valid = false;
        }
        if (bairro === '') {
            newErrors.bairro = 'Campo Bairro obrigatório';
            valid = false;
        }
        if (endereco === '') {
            newErrors.endereco = 'Campo Endereço obrigatório';
            valid = false;
        }
        if (cidade == null) {
            newErrors.cidade = 'Campo cidade obrigatório';
            valid = false;
        }

        if (email == null) {
            newErrors.email = 'Campo email obrigatório';
            valid = false;
        }

        if (senha == null) {
            newErrors.senha = 'Campo senha obrigatório';
            valid = false;
        }
        if (cnpj == null) {
            newErrors.cnpj = 'Campo cpf ou cnpj obrigatório';
            valid = false;
        }
        if (isValid === false) {
            newErrors.cnpj = 'CNPJ o CPF inválido, Somente Numeros';
            valid = false;
        }
        if (celular == null) {
            newErrors.celular = 'Campo celular obrigatório';
            valid = false;
        }
        if (isValidUf === false) {
            newErrors.uf = 'UF inválida';
            valid = false;
        }

        if (uf == null) {
            newErrors.uf = 'Campo UF obrigatório';
            valid = false;
        }
        if (isValidCelular === false) {
            newErrors.celular = 'Celular inválido';
            valid = false;
        }
        if (dtnasc === '') {
            newErrors.dtnasc = 'Campo Data de Nascimento obrigatório';
            valid = false;
        }
        if (isValidCep === false) {
            newErrors.cep = 'CEP inválido';
            valid = false;
        }

        if (isValidCidade === false) {
            newErrors.cidade = 'Digite uma cidade válida (sem caracteres especiais ou números)';
            valid = false;
        }
        if (isValidRg === false) {
            newErrors.rg_ie = 'RG inválido';
            valid = false;
        }
        if (isValidPassword === false) {
            newErrors.senha = 'Senha Inválida é Nescessario Caracteres Especiais, Numeros e Letras.Totalizando Minimo 8 e no Maximo 10 Caracteres';
            valid = false;
        }
        if (isAgreed === 0) {
            newErrors.isAgreed = 'Para criar uma conta Conecta, você deve aceitar as políticas de contrato do usuário.';
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };


    var token;
    var id;
    const { ids } = useParams()
    useEffect(() => {
        informacoes()
    }, [])
    const validarCNPJ = () => {
        const savedUserData = localStorage.getItem("@detailUser");
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            token = userData.uid;
            id = userData.email;
        } else {
            // Caso não haja dados salvos, você pode tratar o caso de acordo
            console.log("Nenhuma informação encontrada no localStorage.");
        }
        axios.get(`https://othondecarvalho.com.br:5555/pc/validar/${cnpj}`).then(Response => {
            if (Response.data === 'Achei') {
                toast.error('Usuario Já Cadastrado', {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })

            } else {
                salvar();
            }

        }
        ).catch(
            Response => {
                localStorage.removeItem("@detailUser");
            }
        )
    }
    const validarCEP = () => {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`).then(Response => {
            setUf(Response.data.uf);
            setBairro(Response.data.bairro);
            setEndereco(Response.data.logradouro);
            setCidade(Response.data.localidade);
        }).catch(Response =>{
            toast.error('CEP Não Existente Ou Não Localizado', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
            
        )
    }

    const informacoes = async () => {
        const savedUserData = localStorage.getItem("@detailUser");
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            token = userData.uid;
            id = userData.email;
        } else {
            // Caso não haja dados salvos, você pode tratar o caso de acordo
            console.log("Nenhuma informação encontrada no localStorage.");
        }
        await axios.get(`https://othondecarvalho.com.br:5555/pc/informacao/${ids}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        }).then(Response => {
            setUf(Response.data.uf);
            setRg_ie(Response.data.rg_ie)
            setBairro(Response.data.bairro);
            setDescricao(Response.data.descricao);
            setEmail(Response.data.email);
            setCnpj(Response.data.cnpj);
            setEndereco(Response.data.endereco);
            setCidade(Response.data.cidade);
            setCelular(Response.data.celular);
            setTelefone(Response.data.fone);
            setCelular(Response.data.celular);
            setCep(Response.data.cep);
            setSenha(Response.data.senha);
            setValorSelecionado(Response.data.profissao);
            setDtcadastro(Response.data.dtcadastro);
            setCodprofissional(Response.data.codprofissional);
            setDtnasc(Response.data.dtnasc)
        })
            .catch(error => {
                console.log("Error Na Informacao");

            });
    }
    const notify = () => toast.success('Salvo Com Sucesso!', {
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
        toast.error('Ops Algo Deu Errado!', {
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
    const editar = async () => {
        const isValid = validateField();
        if (isValid) {
            const savedUserData = localStorage.getItem("@detailUser");
            if (savedUserData) {
                const userData = JSON.parse(savedUserData);
                token = userData.uid;
                id = userData.email;
            } else {
                // Caso não haja dados salvos, você pode tratar o caso de acordo
                console.log("Nenhuma informação encontrada no localStorage.");
            }
            await axios.put(`https://othondecarvalho.com.br:5555/pc/teste/${codprofissional}`, {
                descricao: descricao,
                cnpj: cnpj,
                fone: telefone,
                email: email,
                tipoprof: "PC",
                percomprof: "2",
                senha: senha,
                uf: uf,
                dtnasc: dtnasc,
                rg_ie: rg_ie,
                profissao: valorSelecionado,
                bairro: bairro,
                celular: celular,
                cep: cep,
                cidade: cidade,
                endereco: endereco,
                dtcadastro: dtcadastro
            }).then(Response => {

                notify();
            })
                .catch(error => {
                    errorr();

                });
        } else {
            errorr();

        }
    }

    const salvar = async () => {
        const isValid = validateFields();

        if (isValid) {


            const savedUserData = localStorage.getItem("@detailUser");
            if (savedUserData) {
                const userData = JSON.parse(savedUserData);
                token = userData.uid;
                id = userData.email;
            } else {
                // Caso não haja dados salvos, você pode tratar o caso de acordo
                console.log("Nenhuma informação encontrada no localStorage.");
            }
            await axios.get(`https://othondecarvalho.com.br:5555/pc/Salvar/${senha}/${email}/${uf}/${dtnasc}/${rg_ie}/'0000000000'/${valorSelecionado}/${bairro}/${celular}/${cep}/${cidade}/${descricao}/${endereco}/${cnpj}/${isAgreed}`)
                .then(Response => {
                    notify();
                    setUf("");
                    setBairro("");
                    setDescricao("");
                    setEmail("");
                    setCnpj("");
                    setEndereco("");
                    setCidade("");
                    setCelular("");
                    setTelefone("");
                    setRg_ie("");
                    setCep("");
                    setSenha("");
                    setValorSelecionado("Profissão");
                    setDtcadastro("");
                    setCodprofissional("");
                    setDtnasc("")
                    setIsAgreed(0)
                })
                .catch(error => {
                    errorr();

                });
        } else {
            errorr();
        }



    }


    return (
        <div className='container mt-5'>

            <ToastContainer />
            {
                ids === undefined
                    ?
                    <div className='container mt-5'>
                        <div style={{ textAlign: 'center' }}>
                            <h1>Cadastro de Profissionais</h1></div>
                        <div className="mb-3">
                            <label htmlFor="basic-url" className="form-label"></label>
                            <div className="input-group mb-3" >

                                <span className="input-group-text" id="basic-addon1">Nome*</span>
                                <input type="text" value={descricao} onChange={(txt) => setDescricao(txt.target.value)} className="form-control" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <div style={{ margin: 0, padding: 0, textAlign: 'center' }}>

                                <Form.Text className='text-danger'>{errors.descricao}</Form.Text>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="basic-url" className="form-label">Email*</label>
                            <div className="input-group mb-3">

                                <input
                                    type="text"
                                    className="form-control"
                                    value={email}
                                    onChange={(txt) => setEmail(txt.target.value.toUpperCase())}
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                />
                                <span
                                    className="input-group-text"
                                    id="basic-addon2">@example.com</span>
                            </div>
                            <div style={{ margin: 0, padding: 0, textAlign: 'center' }}>

                                <Form.Text className='text-danger'>{errors.email}</Form.Text>
                            </div></div>
                        <div style={{ flexDirection: "row", display: "flex" }}>
                            <Dropdown onSelect={handleDropdownChange} style={{}}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {valorSelecionado}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="DECORADOR">DECORADOR(A)</Dropdown.Item>
                                    <Dropdown.Item eventKey="ARQUITETO">ARQUITETO(A)</Dropdown.Item>
                                    <Dropdown.Item eventKey="DESIGNER">DESIGNER</Dropdown.Item>
                                </Dropdown.Menu>
                                <Form.Text className="text-danger">{errors.valorSelecionado}</Form.Text>
                            </Dropdown>
                        </div>
                        <Row>
                            <Col>

                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>CNPJ ou CPF*</Form.Label>
                                        <Form.Control
                                            type='number'
                                            min={0}
                                            value={cnpj}
                                            onChange={(txt) => setCnpj(txt.target.value)}
                                        />
                                        <Form.Text className='text-danger'>{errors.cnpj}</Form.Text>

                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col>
                                <Form.Label>RG</Form.Label>
                                <Form.Control
                                    value={rg_ie}
                                    as={IMaskInput}
                                    mask='00.000.000-0'
                                    onChange={(txt) => setRg_ie(txt.target.value)}
                                />
                                <Form.Text className="text-danger">{errors.rg_ie}</Form.Text>

                            </Col>
                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>UF</Form.Label>
                                <Form.Control
                                    value={uf}
                                    onChange={(txt) => setUf(txt.target.value)}
                                    maxLength={2}
                                />
                                <Form.Text className="text-danger">{errors.uf}</Form.Text>

                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Data de Nascimento*</Form.Label>
                                <Form.Control
                                    as={IMaskInput}
                                    mask='00-00-0000'
                                    value={dtnasc}
                                    onChange={(txt) => setDtnasc(txt.target.value)}
                                />
                                <Form.Text className='text-danger'>{errors.dtnasc}</Form.Text>

                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control
                                value={endereco}
                                onChange={(txt) => setEndereco(txt.target.value)}
                            />
                            <Form.Text
                                className="text-danger">{errors.endereco}
                            </Form.Text>

                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control
                                    value={cidade}
                                    onChange={(txt) => setCidade(txt.target.value)}
                                />
                                <Form.Text className="text-danger">{errors.cidade}</Form.Text>

                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCisty">
                                <Form.Label>Bairro</Form.Label>
                                <Form.Control
                                    value={bairro}
                                    onChange={(txt) => setBairro(txt.target.value)} />
                                <Form.Text className="text-danger">{errors.bairro}</Form.Text>

                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>CEP</Form.Label>
                                <Form.Control
                                    value={cep}
                                    as={IMaskInput}
                                    mask='00000-000'
                                    onChange={(txt) => setCep(txt.target.value)}
                                />
                                <Form.Text className="text-danger">{errors.cep}</Form.Text>
                                <div style={{ textAlign: 'center', paddingTop: 10 }}>
                                    <Button onClick={validarCEP}>Pesquisar CEP</Button>
                                </div>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Celular*</Form.Label>
                                <Form.Control
                                    value={celular}
                                    as={IMaskInput}
                                    mask='(00)00000-0000'
                                    onChange={(txt) => setCelular(txt.target.value)}
                                />
                                <Form.Text
                                    className='text-danger'>
                                    {errors.celular}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Senha*</Form.Label>
                                <Form.Control
                                    type='password'
                                    value={senha}
                                    onChange={(txt) => setSenha(txt.target.value)} />
                                <Form.Text className='text-danger'>{errors.senha}</Form.Text>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Row>
                                <Col>
                                    <label>
                                        <input
                                            type="radio"
                                            name="agreement"
                                            value="1"
                                            checked={isAgreed === 1}
                                            onChange={handleAgreementChange}
                                            style={{ margin: 10 }}
                                        />
                                        Concordo com os Termos de Uso e li a Política de Privacidade
                                    </label>
                                </Col>
                                <Col >
                                    <label>
                                        <input
                                            type="radio"
                                            name="agreement"
                                            value="0"
                                            checked={isAgreed === 0}
                                            onChange={handleAgreementChange}
                                            style={{ margin: 10 }}
                                        />
                                        Não concordo com os termos
                                    </label>
                                </Col>
                            </Row>
                            <Form.Text className='text-danger'>{errors.isAgreed}</Form.Text>

                            <DownloadButton />
                        </Row>
                        <Button onClick={validarCNPJ}>Salvar</Button>
                    </div >
                    :
                    <div className='container mt-5'>
                        <div style={{ textAlign: 'center' }}>
                            <h1>Editar Cadastro</h1></div>
                        <div className="mb-3">
                            <label htmlFor="basic-url" className="form-label"></label>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Nome</span>
                                <input type="text" value={descricao} onChange={(txt) => setDescricao(txt.target.value)} className="form-control" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <div style={{ margin: 0, padding: 0, textAlign: 'center' }}>

                                <Form.Text className='text-danger'>{errors.descricao}</Form.Text>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="basic-url" className="form-label">Email*</label>
                            <div className="input-group mb-3">

                                <input type="text" className="form-control" value={email} onChange={(txt) => setEmail(txt.target.value.toUpperCase())} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <span className="input-group-text" id="basic-addon2">@example.com</span>
                            </div>
                            <div style={{ margin: 0, padding: 0, textAlign: 'center' }}>

                                <Form.Text className='text-danger'>{errors.email}</Form.Text>
                            </div>
                        </div>
                        <div style={{ flexDirection: "row", display: "flex" }}>
                            <Dropdown onSelect={handleDropdownChange} style={{}}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {valorSelecionado}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="DECODAROR">DECODAROR(A)</Dropdown.Item>
                                    <Dropdown.Item eventKey="ARQUITETO">ARQUITETO(A)</Dropdown.Item>
                                    <Dropdown.Item eventKey="DESIGNER">DESIGNER</Dropdown.Item>
                                </Dropdown.Menu>
                                <Form.Text className="text-danger">{errors.valorSelecionado}</Form.Text>

                            </Dropdown>
                        </div>
                        <Row>
                            <Col>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>CNPJ</Form.Label>
                                        <Form.Control
                                            value={cnpj}
                                            onChange={(txt) => setCnpj(txt.target.value)}
                                        />
                                        <Form.Text className="text-danger">{errors.cnpj}</Form.Text>

                                    </Form.Group>
                                </Form>

                            </Col>
                            <Col>
                                <Form.Label>RG</Form.Label>
                                <Form.Control
                                    as={IMaskInput}
                                    mask='00.000.000'
                                    value={rg_ie}
                                    onChange={(txt) => setRg_ie(txt.target.value)}>
                                </Form.Control>
                                <Form.Text className="text-danger">{errors.rg_ie}</Form.Text>

                            </Col>
                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>UF</Form.Label>
                                <Form.Control

                                    value={uf}
                                    onChange={(txt) => setUf(txt.target.value)}
                                />
                                <Form.Text className="text-danger">{errors.uf}</Form.Text>

                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Data de Nascimento *</Form.Label>
                                <Form.Control
                                    disabled
                                    value={moment(dtnasc).format("DD-MM-YYYY")}
                                    as={IMaskInput}
                                    mask='00-00-0000'
                                />
                                <Form.Text className="text-danger">{errors.dtnasc}
                                </Form.Text>

                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control
                                value={endereco}
                                onChange={(txt) => setEndereco(txt.target.value)}
                            />
                            <Form.Text className="text-danger">{errors.endereco}</Form.Text>

                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control
                                    value={cidade}
                                    onChange={(txt) => setCidade(txt.target.value)}
                                />
                                <Form.Text className="text-danger">{errors.cidade}</Form.Text>

                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCisty">
                                <Form.Label>Bairro</Form.Label>
                                <Form.Control
                                    value={bairro}
                                    onChange={(txt) => setBairro(txt.target.value)}
                                />
                                <Form.Text className="text-danger"> {errors.bairro} </Form.Text>
                            </Form.Group>

                            <Form.Group
                                as={Col}
                                controlId="formGridZip">
                                <Form.Label> CEP </Form.Label>
                                <Form.Control
                                    value={cep}
                                    as={IMaskInput}
                                    mask='00000-000'
                                    onChange={(txt) => setCep(txt.target.value)}
                                />
                                <Form.Text className="text-danger">{errors.cep} </Form.Text>

                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group
                                as={Col}
                                controlId="formGridZip">
                                <Form.Label>
                                    Telefone*
                                </Form.Label>
                                <Form.Control
                                    value={telefone}
                                    as={IMaskInput}
                                    mask='(00)0000-0000'
                                    onChange={(txt) => setTelefone(txt.target.value)}
                                />

                            </Form.Group>
                            <Form.Group
                                as={Col}
                                controlId="formGridZip">
                                <Form.Label> Celular </Form.Label>
                                <Form.Control
                                    value={celular}
                                    as={IMaskInput}
                                    mask='(00)00000-0000'
                                    onChange={(txt) => setCelular(txt.target.value)} />
                                <Form.Text className="text-danger">{errors.celular}  </Form.Text>

                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group
                                as={Col}
                                controlId="formGridZip">
                                <Form.Label>
                                    Senha *
                                </Form.Label>
                                <Form.Control
                                    type='password'
                                    value={senha}
                                    onChange={(txt) => setSenha(txt.target.value)} />
                                <Form.Text className="text-danger">{errors.senha}  </Form.Text>

                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Data De Cadastro</Form.Label>
                                <Form.Control
                                    disabled
                                    value={moment(dtcadastro).format("DD-MM-YYYY")}
                                />
                            </Form.Group>
                        </Row>

                        <div
                            style={{ textAlign: 'center', paddingTop: 10 }}>

                            <Button
                                onClick={editar}>
                                Salvar
                            </Button>

                        </div>

                    </div >

            }
        </div >
    )
}