/* eslint-disable jsx-a11y/anchor-is-valid */

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import House from 'react-bootstrap-icons/dist/icons/house';
import Person from 'react-bootstrap-icons/dist/icons/person-circle';
import './header.css'
import { Nav } from 'react-bootstrap';
import Teacher1 from "../../Components/image/logo.png"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Infor from 'react-bootstrap-icons/dist/icons/info-circle';
import watermarkImage from '../../Components/image/LOGOOTHONBRANCO.png';

const Header = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    let id;
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            const savedUserData = localStorage.getItem("@detailUser");
            if (savedUserData) {
            } else {
                // Caso não haja dados salvos, você pode tratar o caso de acordo
                console.log("Nenhuma informação encontrada no localStorage.");
            }
        };
    }, [])
    const admin = () => {
        const savedUserData = localStorage.getItem("@detailUser");

        if (savedUserData) {
            const userData = JSON.parse(savedUserData);


            const token = userData.uid;
            const cnpj = userData.email;
            axios.get(`https://othondecarvalho.com.br:5555/pc/informacaofitrocnpj/${cnpj}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            }).then(Response => {
                navigate(`/Administrador`);
            }).catch(error => {
                toast.error('Usuario Não Tem Permição De Administrador', {
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
        } else {
            console.log("Nenhuma informação encontrada no localStorage.");
        }
    }
    const Principal = () => {
        const savedUserData = localStorage.getItem("@detailUser");
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            id = userData.uid;
        } else {
            console.log("Nenhuma informação encontrada no localStorage.");
        }
        navigate(`/Principal`);
    }
    const sair = () => {
        localStorage.removeItem("@detailUser");
        window.location.href = "/conecta";
    }

    const Sobre = () => {
        const savedUserData = localStorage.getItem("@detailUser");
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            id = userData.uid;
        } else {
            console.log("Nenhuma informação encontrada no localStorage.");
        }
        navigate(`/Sobre`);
    }
    useEffect(() => {
        const savedUserData = localStorage.getItem("@detailUser");
        setMenuVisible(!!savedUserData);
    }, []);

    return (
        <div className=''>
            <ToastContainer />

            <div className='celulares ' >
                <div className="container-fluid">

                    <div className="row" >
                        <main className="container-main navbar navbar-dark bg-dark row" style={{ display: menuVisible ? 'flex' : 'none' }}>
                            <div className='col-1' >
                                <Link to={'/conecta'} >
                                    <img src={watermarkImage} width={110} alt={``} />

                                </Link>
                            </div>
                            <div className='celular col-3'  >
                                <div className='row'>
                                    <div className='col' >
                                        <img src={Teacher1} width={'100%'} alt={``} />
                                    </div>

                                </div>
                            </div>


                        </main >
                    </div>
                </div>
            </div>
            <div className='media mediam'>
                <main className="container-main navbar navbar-dark bg-dark row" style={{ display: menuVisible ? 'flex' : 'none' }}>
                    <div className='col-1' style={{ textAlign: 'left', maxWidth: 20, marginBottom: 20, marginLeft: '-5%' }}>
                        <Link to={'/conecta'} >
                            <img src={watermarkImage} width={110} alt={``} />
                        </Link>
                    </div>
                    <div className='media mediam col-3' >
                        <div className='row'>
                            <div className='col' style={{}}>
                                <img src={Teacher1} width={230} style={{ marginBottom: 20 }} alt={``} />
                            </div>

                        </div>
                    </div>
                    <ul className='col-1 ' style={{ fontSize: 8, color: 'white', textAlign: 'center', display: menuVisible ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center' }}>
                        <Nav.Link onClick={Principal} className="nav-link py-3 px-2 house" role="button" title="Principal" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
                            <span className="icon-with-name">
                                <House />
                            </span>
                            Home
                        </Nav.Link>
                        <Nav.Link onClick={admin} style={{ marginLeft: 10 }} className="nav-link py-3 px-2 " title="Administrador" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className="icon-with-name">
                                <Person />
                            </span>
                            Administrador
                        </Nav.Link>

                        <Nav.Link onClick={sair} style={{ marginLeft: 10 }} className="nav-link py-3 px-2 " title="Sair" role="button" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
                            <span className="icon-with-name">
                                <i className="bi bi-box-arrow-left"></i>
                            </span>
                            Sair
                        </Nav.Link>

                    </ul>
                </main >
            </div>
            <div className='computer '>

                <main className="container-main navbar navbar-dark bg-dark row" style={{ display: menuVisible ? 'flex' : 'none' }}>

                    <div className='col-1' style={{ textAlign: 'left', maxWidth: 20, marginBottom: 20, marginLeft: '-5%' }}>
                        <Link to={'/conecta'} >
                            <img src={watermarkImage} width={110} alt={``} />

                        </Link>
                    </div>
                    <div className='computer col-11' style={{ textAlign: 'center',marginRight:'-6%' }}>
                        <div className='row'>
                            <div className='col' style={{ margin: 'auto' }}>
                                <img src={Teacher1} width={230} style={{ marginBottom: 20 }} alt={``} />
                            </div>
                        </div>
                    </div>

                    <ul className='col-1 ' style={{ color: 'white', textAlign: 'center', display: menuVisible ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center' }}>

                        <Nav.Link onClick={Principal} className="nav-link py-3 px-2 house" role="button" title="Principal" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">


                            <span className="icon-with-name">
                                <House />

                            </span>
                            Home</Nav.Link>
                        <Nav.Link onClick={admin} style={{ marginLeft: 15 }} className="nav-link py-3 px-2 " title="Administrador" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className="icon-with-name">
                                <Person />
                            </span>
                            Administrador</Nav.Link>
                        <Nav.Link onClick={sair} style={{ marginLeft: 15, marginRight: 20 }} className="nav-link py-3 px-2 " title="Sair" role="button" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
                            <span className="icon-with-name">
                                <i className="bi bi-box-arrow-left"></i>

                            </span>
                            Sair</Nav.Link>
                    </ul>


                </main >
            </div>
        </div>
    )
}
export default Header;





