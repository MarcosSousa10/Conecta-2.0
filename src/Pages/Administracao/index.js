/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button, Form } from 'react-bootstrap';
import { IMaskInput } from 'react-imask';
import moment from "moment";
import { Chart } from 'primereact/chart';
import { RotatingLines } from 'react-loader-spinner';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from "react-router-dom";
export default function Administrador() {
    const [cnpj, setCnpj] = useState("");
    const [cpf, setCpf] = useState("");
    const [inicio, setInicio] = useState("");
    const [fim, setFim] = useState("");
    const [fator, setFator] = useState("");
    const [tudo, setTudo] = useState("");
    const [codprofi, setCodprofi] = useState("");
    const [lista, setLista] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage1, setSelectedImage1] = useState(null);
    const [isLoading1, setIsLoading1] = useState(true);
    const [numero, setNumero] = useState(0);
    const [nome, setNome] = useState('');
    const [periodo, setPeriodo] = useState('');
    const [texto, setTexto] = useState('');
    const [textoSobre, setTextoSobre] = useState('');

    const handleImageChange1 = (e) => {
        setSelectedImage1(e.target.files[0]);
    };
    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };
    const editarSobre = async () => {
        const savedUserData = localStorage.getItem("@detailUser");
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            token = userData.uid;
        } else {
            // Caso não haja dados salvos, você pode tratar o caso de acordo
            console.log("Nenhuma informação encontrada no localStorage.");
        }
        await axios.put(`https://www.othondecarvalho.com.br:5555/pc/EditarSobre/1`, {
            texto: textoSobre
        },
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(Response => {
                notify();
                setTextoSobre("");

            })
            .catch(error => {
                errorr();

            });
    }

    const editarSaibamais= async () => {
        const savedUserData = localStorage.getItem("@detailUser");
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            token = userData.uid;
        } else {
            // Caso não haja dados salvos, você pode tratar o caso de acordo
            console.log("Nenhuma informação encontrada no localStorage.");
        }
        await axios.put(`https://www.othondecarvalho.com.br:5555/pc/EditarSaibamais/1`, {
            texto: texto
        },
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(Response => {
                notify();
                setTexto("");

            })
            .catch(error => {
                errorr();

            });
    }



    const DeleteImage1 = async () => {
        const savedUserData = localStorage.getItem('@detailUser');
        if (!savedUserData) {
            console.log('Nenhuma informação encontrada no localStorage.');
            return;
        }
        const userData = JSON.parse(savedUserData);
        const token = userData.uid;

        if (numero !== 0) {
            try {
                await axios.delete('https://othondecarvalho.com.br:5555/imagemCarrossel', {
                    params: {
                        descricao: numero,
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                // Ação de sucesso após a exclusão
                uploadImage1("Imagem Atualizada com Sucesso!", numero);
            } catch (error) {
                // Tratamento de erro
                errorr();
            }
        } else {
            alert("Selecione o numero da imagem");
        }

    };

    const uploadImage1 = async (string, descricao) => {
        try {
            const savedUserData = localStorage.getItem('@detailUser');
            if (!savedUserData) {
                console.log('Nenhuma informação encontrada no localStorage.');
                return;
            }
            const userData = JSON.parse(savedUserData);
            const token = userData.uid;
            const formData = new FormData();
            formData.append('file', selectedImage1);
            formData.append('descricao', descricao);

            await axios.post('https://othondecarvalho.com.br:5555/imagemCarrossel', formData, {

                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',

                },
            }).then(
                Response => {

                    toast.success(string, {
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
            ).catch(Response => {
                console.error(Response);
                errorr();

            });

        } catch (error) {
            console.error(error);
        }
    };
    const DeleteImageAntiga = async () => {
        const savedUserData = localStorage.getItem('@detailUser');
        if (!savedUserData) {
            console.log('Nenhuma informação encontrada no localStorage.');
            return;
        }
        const userData = JSON.parse(savedUserData);
        const token = userData.uid;

                try {
                await axios.delete('https://othondecarvalho.com.br:5555/imagemCarrosselFAntigas', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                // Ação de sucesso após a exclusão
                toast.success("Imagem Deletada com Sucesso!", {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } catch (error) {
                // Tratamento de erro
                errorr();
            }


    };
    const uploadImageAntiga = async () => {
        try {
            const savedUserData = localStorage.getItem('@detailUser');
            if (!savedUserData) {
                console.log('Nenhuma informação encontrada no localStorage.');
                return;
            }
            const userData = JSON.parse(savedUserData);
            const token = userData.uid;
            const formData = new FormData();
            formData.append('file', selectedImage1);
            await axios.post('https://othondecarvalho.com.br:5555/imagemCarrosselFAntigas', formData, {

                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',

                },
            }).then(
                Response => {

                    toast.success("Imagem Atualizada com Sucesso!", {
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
            ).catch(Response => {
                console.error(Response);
                errorr();

            });

        } catch (error) {
            console.error(error);
        }
    };

    // const navigate = useNavigate();
    var token;
    useEffect(() => {
        const savedUserData = localStorage.getItem("@detailUser");
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            // eslint-disable-next-line react-hooks/exhaustive-deps
            token = userData.uid;
        } else {
            // Caso não haja dados salvos, você pode tratar o caso de acordo
            console.log("Nenhuma informação encontrada no localStorage.");
        }
    }, []); // Empty dependency array ensures this effect runs only once after the initial render
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
    useEffect(() => {
        return () => {
            listar();
            ltudo();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const listar = async () => {
        const savedUserData = localStorage.getItem("@detailUser");
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            token = userData.uid;
        } else {
            console.log("Nenhuma informação encontrada no localStorage.");
        }
        await axios.get(`https://othondecarvalho.com.br:5555/pc/tudo`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(Response => {
            setLista(Response.data)
            setIsLoading1(false);
        })
            .catch(error => {
            });
    }
    const ltudo = async () => {
        const savedUserData = localStorage.getItem("@detailUser");
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            token = userData.uid;
        } else {
            console.log("Nenhuma informação encontrada no localStorage.");
        }
        await axios.get(`https://othondecarvalho.com.br:5555/pc/select`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(Response => {
            setTudo(Response.data)
        })
            .catch(error => {
                sair();
            });
    }

    // const alternarMenu = () => {
    //     setMenuExpandido((anterior) => !anterior);
    // };





    // const admin = () => {
    //     navigate(`/Administrador`);
    // }
    const datainicio = async () => {
        const isValid = validateFields();
        if (isValid) {
            const savedUserData = localStorage.getItem("@detailUser");
            if (savedUserData) {
                const userData = JSON.parse(savedUserData);
                token = userData.uid;
            } else {
                // Caso não haja dados salvos, você pode tratar o caso de acordo
                console.log("Nenhuma informação encontrada no localStorage.");
            }
            await axios.get(`https://othondecarvalho.com.br:5555/pc/updatedtinicio/${inicio}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(Response => {
                notify();
                listar();
                setInicio("");
            })
                .catch(error => {
                    errorr();

                });
        }
    }
    const datafim = async () => {
        const isValid = validateFields2();
        if (isValid) {
            const savedUserData = localStorage.getItem("@detailUser");
            if (savedUserData) {
                const userData = JSON.parse(savedUserData);
                token = userData.uid;
            } else {
                // Caso não haja dados salvos, você pode tratar o caso de acordo
                console.log("Nenhuma informação encontrada no localStorage.");
            }
            await axios.get(`https://othondecarvalho.com.br:5555/pc/update/${fim}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(Response => {
                listar();
                notify();
                setFim("");
            })
                .catch(error => {
                    errorr();

                });
        }
    }
    const divisao = async () => {

        const savedUserData = localStorage.getItem("@detailUser");
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            token = userData.uid;
        } else {
            // Caso não haja dados salvos, você pode tratar o caso de acordo
            console.log("Nenhuma informação encontrada no localStorage.");
        }
        await axios.get(`https://othondecarvalho.com.br:5555/pc/updatefatordivisao/${fator}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(Response => {
            listar();
            notify();
            setFator("");
        })
            .catch(error => {
                errorr();

            });

    }
    const codprof = async () => {
        fetchData()
        const isValid = validateFieldscpf();
        if (isValid) {
            const savedUserData = localStorage.getItem("@detailUser");
            if (savedUserData) {
                const userData = JSON.parse(savedUserData);
                token = userData.uid;
            } else {
                // Caso não haja dados salvos, você pode tratar o caso de acordo
                console.log("Nenhuma informação encontrada no localStorage.");
            }
            await axios.get(`https://othondecarvalho.com.br:5555/pc/informacaofitrocnpj/${cnpj}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(Response => {
                setCodprofi(Response.data)
                listar();
                setCnpj("");
                // eslint-disable-next-line no-lone-blocks
                { Response.data.descricao == null ? alert("Não Foram Encontrados Resultados Nesta Consulta") : console.log(codprofi.descricao) }

            })
                .catch(error => {
                    errorr();

                });
        }
    }

    // const Principal = () => {
    //     const savedUserData = localStorage.getItem("@detailUser");
    //     if (savedUserData) {
    //         const userData = JSON.parse(savedUserData);
    //         token = userData.uid;
    //         cod = userData.email;
    //     } else {
    //         // Caso não haja dados salvos, você pode tratar o caso de acordo
    //         console.log("Nenhuma informação encontrada no localStorage.");
    //     }
    //     navigate(`/Principal/${cod}`);
    // }
    const sair = () => {
        localStorage.removeItem("@detailUser");
        window.location.href = "/conecta";
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            codprof();

        }
    }
    const handleKeyPresss = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            divisao();

        }
    }
    const handleKeyPressss = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            datainicio();

        }
    }
    const handleKeyPresssss = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            datafim();
        }
    }
    const [errors, setErrors] = useState({
        inicio: '',
        fim: '',
        cnpj: ''
    });
    const dateOfBirthRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/;
    const isValidDateOfBirth = dateOfBirthRegex.test(inicio);
    const isValidDateOfBirth2 = dateOfBirthRegex.test(fim);
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
    const validateFields = () => {
        let valid = true;
        const newErrors = {};

        if (isValidDateOfBirth === false) {
            newErrors.inicio = 'Data inválida';
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    }
    const validateFields2 = () => {
        let valid = true;
        const newErrors = {};


        if (isValidDateOfBirth2 === false) {
            newErrors.fim = 'Data inválida';
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    }

    const validateFieldscpf = () => {
        let valid = true;
        const newErrors = {};

        if (isValid === false) {
            newErrors.cnpj = 'CNPJ o CPF inválido';
            valid = false;

        }
        setErrors(newErrors);
        return valid;
    }


    const [monthsData, setMonthsData] = useState([]);

    const fetchData = async () => {
        try {
            const isValid = validateFieldscpf();
            if (isValid) {
                const savedUserData = localStorage.getItem("@detailUser");
                if (savedUserData) {
                    const userData = JSON.parse(savedUserData);
                    token = userData.uid;
                } else {
                    // Caso não haja dados salvos, você pode tratar o caso de acordo
                    console.log("Nenhuma informação encontrada no localStorage.");
                }

                const requests = Array.from({ length: 12 }, (_, index) =>
                    axios.get(`https://othondecarvalho.com.br:5555/pc/dashboard/${cnpj}/${index + 1}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                );
                const responses = await Promise.all(requests);
                const data = responses.map((response) => response.data.codbrinde || 0);
                setMonthsData(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const multiAxisData = {
        labels: [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novenbro',
            'Dezembro',
        ],
        datasets: [
            {
                label: 'Vendas',
                fill: false,
                borderColor: '#42A5F5',
                yAxisID: 'y',
                tension: 0.4,
                data: monthsData,
            },],
    };

    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: .6,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        let multiAxisOptions = {
            stacked: false,
            maintainAspectRatio: false,
            aspectRatio: .6,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y1: {
                    type: 'linear',
                    display: false,
                    position: 'right',
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        return {
            basicOptions,
            multiAxisOptions
        }
    }

    const { basicOptions, multiAxisOptions } = getLightTheme();

    const fetchData1 = async () => {
        try {
            const savedUserData = localStorage.getItem('@detailUser');
            if (!savedUserData) {
                console.log('Nenhuma informação encontrada no localStorage.');
                return;
            }
            const userData = JSON.parse(savedUserData);
            const token = userData.uid;

            axios.get(`https://othondecarvalho.com.br:5555/pc/dashboardcoluna`, {
                headers: { Authorization: `Bearer ${token}` },
            }).then(Response => {

                let data = Response.data
                if (data && data.length > 0) {
                    data.sort((a, b) => b.codbrinde - a.codbrinde);

                    const brindeValues = data.slice(0, 10).map(item => item.codbrinde);

                    const monthNames = data.slice(0, 10).map(item => item.descricao);


                    setBasicDatas({
                        labels: monthNames,
                        datasets: [
                            {
                                label: 'Top 10',
                                backgroundColor: 'red',
                                data: brindeValues,
                            },
                        ],
                    });
                    setIsLoading(false);
                }
                setIsLoading(false);
            }
            )
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const [basicDatas, setBasicDatas] = useState({
        labels: [],
        datasets: [
            {
                label: 'Profissionais',
                backgroundColor: 'red',
                data: [],
            },
        ],
    });
    const DeleteImage = async () => {
        const savedUserData = localStorage.getItem('@detailUser');
        if (!savedUserData) {
            console.log('Nenhuma informação encontrada no localStorage.');
            return;
        }
        const userData = JSON.parse(savedUserData);
        const token = userData.uid;
        await axios.delete('https://othondecarvalho.com.br:5555/images', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }).then(Response => {

            uploadImage("Imagem Atualizada com Sucesso!");
        }).catch(Response => {
            errorr();

        })

    };
    const uploadImage = async (string) => {
        try {
            const savedUserData = localStorage.getItem('@detailUser');
            if (!savedUserData) {
                console.log('Nenhuma informação encontrada no localStorage.');
                return;
            }
            const userData = JSON.parse(savedUserData);
            const token = userData.uid;
            const formData = new FormData();
            formData.append('file', selectedImage);

            await axios.post('https://othondecarvalho.com.br:5555/images', formData, {

                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',

                },
            }).then(
                Response => {

                    toast.success(string, {
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
            ).catch(Response => {
                console.error(Response);
                errorr();

            });

        } catch (error) {
            console.error(error);
        }
    };
    // const uploadVideo = async () => {
    //     const savedUserData = localStorage.getItem('@detailUser');
    //     if (!savedUserData) {
    //         console.log('Nenhuma informação encontrada no localStorage.');
    //         return;
    //     }
    //     const userData = JSON.parse(savedUserData);
    //     const token = userData.uid;
    //     try {
    //        await axios.post('https://othondecarvalho.com.br:5555/pc/video', {
    //             url: video,
    //         }, {
    //             headers: { 'Authorization': `Bearer ${token}` },
    //         });

    //         toast.success("Salvo Com Sucesso!", {
    //             position: "top-right",
    //             autoClose: 2500,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         errorr();
    //     }
    // };

    const informacoesCampanha = async () => {
        const savedUserData = localStorage.getItem("@detailUser");
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            const token = userData.uid;
        } else {
            console.log("Nenhuma informação encontrada no localStorage.");
        }
        await axios.get(``, {
            headers: { 'Authorization': `Bearer ${token}` },
        }).then(Response => {
            setNome(Response.data.nome);
            setPeriodo(Response.data.periodo);
        })
            .catch(error => {
                sair();

            });
    }
    const editarssss = async () => {
        const savedUserData = localStorage.getItem("@detailUser");
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            token = userData.uid;
        } else {
            // Caso não haja dados salvos, você pode tratar o caso de acordo
            console.log("Nenhuma informação encontrada no localStorage.");
        }
        await axios.put(`https://othondecarvalho.com.br:5555/pc/EditarCampanha/1`, {
            nome: nome,
            periodo: periodo
        },
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(Response => {
                notify();
                setNome("");
                setPeriodo("");
            })
            .catch(error => {
                errorr();

            });
    }
    const navigate = useNavigate();

    const editarCadastro = async () => {

        const savedUserData = localStorage.getItem("@detailUser");
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            token = userData.uid;
        } else {
            // Caso não haja dados salvos, você pode tratar o caso de acordo
            console.log("Nenhuma informação encontrada no localStorage.");
        }
        await axios.get(`https://othondecarvalho.com.br:5555/pc/informacaofitrocnpj/${cpf}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(Response => {
            navigate(`/Cadastro/${Response.data.codprofissional}`);
        })
            .catch(error => {
                errorr();

            });

    }


    return (
        <div className=" marcado">
            <ToastContainer />
            <div className="container-fluid">
                <div className="row">
                    {/* <div className="col-sm-auto bg-light sticky-top">
                        <div
                            className={`d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top ${menuExpandido ? 'expandido' : ''
                                }`}
                        >
                            <ul className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">

                                <li>
                                    <a
                                        onClick={alternarMenu}
                                        className="nav-link py-3 px-2"
                                        title="Administrador"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <span className="icon-with-name">
                                            {menuExpandido ? <i className="bi bi-arrows-angle-contract"></i> : <i className="bi bi-arrows-angle-expand"></i>}

                                        </span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={Principal} className="nav-link py-3 px-2 house" role="button" title="Principal" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
                                        <span className="icon-with-name">
                                            <House />
                                            {
                                                menuExpandido ? ' Principal' : ''
                                            }
                                        </span>
                                    </a>
                                </li>

                                <li>
                                    <a onClick={admin} className="nav-link py-3 px-2" title="Administrador" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className="icon-with-name">
                                            <Person />{
                                                menuExpandido ? ' Administrador' : ''
                                            }
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={sair} className="nav-link py-3 px-2" title="Sair" role="button" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
                                        <span className="icon-with-name">
                                            <i className="bi bi-box-arrow-left"></i>{
                                                menuExpandido ? ' Sair' : ''
                                            }
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div> */}
                    <div style={{marginTop: window.innerWidth <= 1200 ? 42 : 0}}>

                    </div>

                    <div className="col-sm p-3 min-vh-100">
                        <div className="container-xl mt-3 ">
                            <Row style={{ display: 'flex' }}>
                                <Col>
                                    <Form className="mb-3">
                                        <Form.Group className="mb-3 input-group-text mb-3" id="basic-addon1" style={{ margin: 0, padding: 0 }}>
                                            <Form.Label htmlFor="basic-url" className="form-label " style={{ margin: 9 }}>CPF ou CNPJ </Form.Label>
                                            <Form.Control
                                                type="number"
                                                value={cnpj}
                                                onChange={(txt) => setCnpj(txt.target.value)}
                                                placeholder="Digite seu CPF ou CNPJ"
                                                onKeyPress={handleKeyPress}
                                            />
                                            <Button
                                                className="cnpj"
                                                onClick={codprof} > Pesquisa</Button>

                                            <Form.Text className='text-danger' style={{ margin: 0, padding: 0 }}>{errors.cnpj}</Form.Text>

                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col>
                                    <Form className="mb-3">
                                        <Form.Group className="mb-3 input-group-text mb-3" id="basic-addon1" style={{ margin: 0, padding: 0 }}>
                                            <Form.Label htmlFor="basic-url" className="form-label " style={{ margin: 9 }}>Fator Divisao </Form.Label>
                                            <Form.Control
                                                type="number"
                                                value={fator}
                                                onChange={(txt) => setFator(txt.target.value)}
                                                placeholder={tudo.fatordivisao}
                                                onKeyPress={handleKeyPresss}
                                            />
                                            <Button className="divisao" onClick={divisao} > Salvar</Button>
                                        </Form.Group>
                                    </Form>

                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form className="mb-3">
                                        <Form.Group className="mb-3 input-group-text mb-3" id="basic-addon1" style={{ margin: 0, padding: 0 }}>
                                            <Form.Label htmlFor="basic-url" className="form-label " style={{ margin: 9 }}>Data inicio </Form.Label>
                                            <Form.Control

                                                as={IMaskInput}
                                                mask='00-00-0000'
                                                value={inicio}
                                                onChange={(txt) => setInicio(txt.target.value)}
                                                placeholder={tudo.dtinicio}
                                                onKeyPress={handleKeyPressss}
                                            />
                                            <Button className="dtinicio" onClick={datainicio}> Salvar</Button>
                                            <Form.Text className='text-danger' style={{ margin: 0, padding: 0 }}>{errors.inicio}</Form.Text>
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col>
                                    <Form className="mb-3">
                                        <Form.Group className="mb-3 input-group-text mb-3" id="basic-addon1" style={{ margin: 0, padding: 0 }}>
                                            <Form.Label htmlFor="basic-url" className="form-label " style={{ margin: 9 }}>Data Fim </Form.Label>
                                            <Form.Control
                                                as={IMaskInput}
                                                mask='00-00-0000'
                                                value={fim}
                                                onChange={(txt) => setFim(txt.target.value)}
                                                placeholder={tudo.dtfim}
                                                onKeyPress={handleKeyPresssss}
                                            />
                                            <Button className="dtfim" onClick={datafim}> Salvar</Button>
                                            <Form.Text className='text-danger' style={{ margin: 0, padding: 0 }}>{errors.fim}</Form.Text>

                                        </Form.Group>

                                    </Form>
                                </Col>
                            </Row>
                            <Row className="mb-3 border border-black" style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>     
                                        {/* <Form.Group className="mb-3 input-group-text mb-3" id="basic-addon1" style={{ margin: 0, padding: 0 }}>  */}
                                        <Col xs={window.innerWidth <= 1200 ? 12 : 6}>
                                         <Form.Label htmlFor="basic-url" className="form-label " style={{ margin: 9 }}>Nome</Form.Label>
                                            <Form.Control
                                                value={nome}
                                                onChange={(txt) => setNome(txt.target.value)}
                                                placeholder={"Nome da Campanha"}
                                            />
                                        </Col>
                                           <Col xs={window.innerWidth <= 1200 ? 12 : 6}>
                                           <Form.Label htmlFor="basic-url" className="form-label " style={{ margin: 9 }}>Periodo</Form.Label>
                                            <Form.Control
                                                value={periodo}
                                                onChange={(txt) => setPeriodo(txt.target.value)}
                                                placeholder={"Periodo Da Campanha"}
                                            />
                                           </Col>
                                            
                                            <Form.Text className='text-danger mb-3' style={{ margin: 0, padding: 0 }}>{errors.inicio}</Form.Text>
                                            <Row style={{ justifyContent: 'center' }}> 
                                                <Col xs={4} ><Button onClick={editarssss} type="button" class="btn btn-primary" > Salvar</Button></Col>
                                            </Row>
                                            
                                        {/* </Form.Group> */}
                            </Row>
                            <Row className="mb-5 container">

                                {/* <Col xs={6}>
                                    <Card style={{ textAlign: "center", alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                                        <ListGroup variant="flush" >
                                            <ListGroup.Item>Imagem Evento</ListGroup.Item>
                                            <div>
                                                <Form.Control type="file" accept=".jpg, .jpeg, .png" onChange={handleImageChange} />

                                                <Button onClick={DeleteImage}>Upload Image</Button>
                                            </div>
                                        <ListGroup.Item>Video</ListGroup.Item>
                                            <div>
                                                <Form.Control placeholder="Insira a Url Do Video" value={video} onChange={(txt) => setVideo(txt.target.value)}
                                                />
                                                <Button onClick={uploadVideo}>Upload Video</Button>
                                            </div>

                                        </ListGroup>
                                    </Card>
                                </Col> */}
                                <Col >
                                    <Card style={{ textAlign: "center", alignItems: 'right', alignContent: 'right', justifyContent: 'right' }}>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>CARROSSEL</ListGroup.Item>
                                            <Row className="m-1">
                                                <Col xs={2}>
                                                    <Form.Control type="number" max={5} min={0} value={numero} onChange={(txt) => setNumero(txt.target.value)} />

                                                </Col>
                                                <Col>
                                                    <div>
                                                        <Form.Control type="file" accept=".jpg, .jpeg, .png" onChange={handleImageChange1} />
                                                        <Button onClick={DeleteImage1}>Upload Image 1</Button>
                                                    </div>
                                                </Col>  
                                                
                                            </Row>
                                        </ListGroup>
                                    </Card>
                                </Col>
                                <Col >
                                    <Card style={{ textAlign: "center", alignItems: 'right', alignContent: 'right', justifyContent: 'right' }}>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>CARROSSEL</ListGroup.Item>
                                            <Row className="m-1">
                                               
                                                <Col>
                                                    <div>
                                                        <Form.Control type="file" accept=".jpg, .jpeg, .png" onChange={handleImageChange1} />
                                                        <Button onClick={uploadImageAntiga}>Upload Image Antiga</Button> <Button onClick={DeleteImageAntiga}>Delete Image Antiga</Button>
                                                    </div>
                                                </Col>
                                                
                                            </Row>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                            <Row  className="mb-5 container">
                                <Col>
                                    <div>
                                        <textarea
                                            value={texto}
                                            onChange={(txt) => setTexto(txt.target.value)}
                                            rows={4} 
                                            cols={50} 
                                        />
                                         <Button onClick={editarSaibamais}> Salvar Saiba Mais</Button>
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <textarea
                                            value={textoSobre}
                                            onChange={(txt) => setTextoSobre(txt.target.value)}
                                            rows={4} 
                                            cols={50}
                                        />
                                         <Button onClick={editarSobre}> Salvar Pagina Sobre</Button>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-5 container">

                                <Col xs={5}>
                                    <Button onClick={() => {
                                        listar();
                                        ltudo(); fetchData1();
                                    }}>Carregar</Button>
                                </Col>
                                <Col>
                                    <Form className="mb-3">
                                        <Form.Group className="mb-3 input-group-text mb-3" id="basic-addon1" style={{ margin: 0, padding: 0 }}>
                                            <Form.Label htmlFor="basic-url" className="form-label " style={{ margin: 9 }}>EDITAR CADASTRO USUARIO</Form.Label>
                                            <Form.Control
                                                value={cpf}
                                                onChange={(txt) => setCpf(txt.target.value)}
                                                placeholder={"CPF OU CNPJ"}
                                            />
                                            <Button onClick={editarCadastro}> Editar</Button>
                                            <Form.Text className='text-danger' style={{ margin: 0, padding: 0 }}>{errors.cpf}</Form.Text>

                                        </Form.Group>

                                    </Form>
                                </Col>
                            </Row>
                            <div className='container-xl' style={{ textAlign: "center", alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>

                                <div className="card">
                                    <h5>Othon de Carvalho</h5>
                                    {isLoading ? (
                                        <div>
                                            <div className="card" style={{ textAlign: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}
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
                                        <Chart type="bar" data={basicDatas} options={basicOptions} />

                                    )}
                                </div>
                            </div>
                            {codprofi.descricao != null ?
                                <div style={{ height: 650, marginTop: 20, flexDirection: 'column', overflowX: 'auto' }}>
                                    <ListGroup as="ol" key={codprofi.numnota}>
                                        <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"

                                        >
                                            <div className="ms-2 me-auto" style={{ display: 'flex', flexDirection: 'column' }}>
                                                <div className="fw-bold">
                                                    {codprofi.descricao}
                                                </div>
                                                <div className="row">
                                                    <div style={{ display: 'flex', flexDirection: 'row' }} >
                                                        <div style={{ fontWeight: 'bold' }}>
                                                            CNPJ:
                                                        </div>

                                                        <div style={{ marginLeft: 10, color: 'purple' }}>
                                                            {codprofi.cnpj}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div style={{ display: 'flex', flexDirection: 'row' }} >
                                                        <div style={{ fontWeight: 'bold' }}>
                                                            Celular :
                                                        </div>

                                                        <div style={{ marginLeft: 10, color: 'purple' }}>
                                                            {codprofi.celular}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div style={{ display: 'flex', flexDirection: 'row' }} >
                                                        <div style={{ fontWeight: 'bold' }}>
                                                            Profissao :
                                                        </div>

                                                        <div style={{ marginLeft: 10, color: 'purple' }}>
                                                            {codprofi.profissao}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div style={{ display: 'flex', flexDirection: 'row' }} >
                                                        <div style={{ fontWeight: 'bold' }}>
                                                            Endereço :
                                                        </div>

                                                        <div style={{ marginLeft: 10, color: 'purple' }}>
                                                            {codprofi.endereco}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div style={{ display: 'flex', flexDirection: 'row' }} >
                                                        <div style={{ fontWeight: 'bold' }}>
                                                            Data de Cadastro :
                                                        </div>

                                                        <div style={{ marginLeft: 10, color: 'purple' }}>
                                                            {moment(codprofi.dtcadastro).format("DD-MM-YYYY")}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <Badge bg="primary" pill>
                                                {codprofi.codbrinde ? codprofi.codbrinde.toLocaleString('pt-BR') : 0}
                                            </Badge>
                                        </ListGroup.Item>
                                    </ListGroup>

                                    <div className="container-xl mt-3">
                                        <div className="card" style={{ textAlign: 'center' }}>
                                            <h5>Othon de Carvalho</h5>
                                            <Chart type="line" style={{ maxHeight: '370px' }} data={multiAxisData} options={multiAxisOptions} />
                                        </div>
                                    </div>

                                </div>

                                :
                                <div>
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
                                        <div style={{ height: 650, margin: 20, flexDirection: 'column', overflowX: 'auto' }}>
                                            {lista.map((item, index) => (
                                                <div key={index}>
                                                    {item.codprofissional !== "" ?
                                                        <ListGroup as="ol" key={item.numnota}>
                                                            <ListGroup.Item
                                                                as="li"
                                                                className="d-flex justify-content-between align-items-start"

                                                            >
                                                                <div className="ms-2 me-auto" style={{ display: 'flex', flexDirection: 'column' }}>
                                                                    <div className="fw-bold">
                                                                        {item.descricao}
                                                                    </div>
                                                                    <div className="row">
                                                                        <div style={{ display: 'flex', flexDirection: 'row' }} >
                                                                            <div style={{ fontWeight: 'bold' }}>
                                                                                CNPJ:
                                                                            </div>

                                                                            <div style={{ marginLeft: 10, color: 'purple' }}>
                                                                                {item.cnpj}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div style={{ display: 'flex', flexDirection: 'row' }} >
                                                                            <div style={{ fontWeight: 'bold' }}>
                                                                                Celular :
                                                                            </div>

                                                                            <div style={{ marginLeft: 10, color: 'purple' }}>
                                                                                {item.celular}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div style={{ display: 'flex', flexDirection: 'row' }} >
                                                                            <div style={{ fontWeight: 'bold' }}>
                                                                                Profissao :
                                                                            </div>

                                                                            <div style={{ marginLeft: 10, color: 'purple' }}>
                                                                                {item.profissao}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div style={{ display: 'flex', flexDirection: 'row' }} >
                                                                            <div style={{ fontWeight: 'bold' }}>
                                                                                Endereço :
                                                                            </div>

                                                                            <div style={{ marginLeft: 10, color: 'purple' }}>
                                                                                {item.endereco}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div style={{ display: 'flex', flexDirection: 'row' }} >
                                                                            <div style={{ fontWeight: 'bold' }}>
                                                                                Data de Cadastro :
                                                                            </div>

                                                                            <div style={{ marginLeft: 10, color: 'purple' }}>
                                                                                {moment(item.dtcadastro).format("DD-MM-YYYY")}
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <Badge bg="primary" pill>
                                                                    {item.codbrinde ? item.codbrinde.toLocaleString('pt-BR') : 0}
                                                                </Badge>
                                                            </ListGroup.Item>
                                                        </ListGroup>
                                                        :
                                                        console.log('')
                                                    }
                                                </div>

                                            )
                                            )
                                            }

                                        </div>
                                    )}
                                </div>

                            }

                        </div>



                    </div>
                </div>
            </div>
        </div >

    )
}