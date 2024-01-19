

import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { House } from 'react-bootstrap-icons';
import Infor from 'react-bootstrap-icons/dist/icons/info-circle';
import './sidebar.style.css'
import Person from 'react-bootstrap-icons/dist/icons/person-fill';
import Ferramentas from 'react-bootstrap-icons/dist/icons/tools';
import Premio from 'react-bootstrap-icons/dist/icons/award';

const Sidebar = () => {

    const navigate = useNavigate();
    const [activePage, setActivePage] = useState('home'); // Initial active page
    const handlePageClick = (pageName) => {
        setActivePage(pageName);
    };
    const Sobre = (String) => {
        navigate(String);
    }
    return (
        <nav id="sidebarMenu" className=" d-lg-block sidebar   contatos bg-dark container-fluid" style={{ height: '100%', width: '100%', margin: 0, padding: 0 }} >
            <div className="position-sticky" style={{ height: '100%', width: '100%', margin: 0, padding: 0 }}>
                <div className="list-group list-group-flush" style={{ height: '100%', width: '100%', margin: 0, padding: 0 }}>
                    <ul style={{ fontSize: 20, color: 'white', textAlign: 'center', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', margin: 0, padding: 0 }}>
                        <Nav.Link
                            onClick={() => { Sobre("/Principal"); handlePageClick('CAMPANHA VIGENTE') }}
                            className={`list-group-item list-group-item-action py-2 ripple ${activePage === 'CAMPANHA VIGENTE' ? 'active' : ''}`}
                            role="button"
                            title="CAMPANHA VIGENTE"
                            data-bs-toggle="tooltip"
                            data-bs-placement="right"
                            data-bs-original-title="CAMPANHA VIGENTE"
                            style={{
                                color: activePage === 'CAMPANHA VIGENTE' ? 'black' : 'white',
                                backgroundColor: activePage === 'CAMPANHA VIGENTE' ? '#666666' : 'transparent',
                                fontSize: '14px',

                            }}
                        >
                            <div style={{ display: window.innerWidth > 900 ? 'none' : '', }}>
                                <span className="icon-with-name" style={{ marginRight: 5 }}>
                                    <House />
                                </span></div>

                            <div style={{ display: window.innerWidth < 900 ? 'none' : '', }}>
                                <span className="icon-with-name" style={{ marginRight: 5 }}>
                                    <House />
                                </span> CAMPANHA VIGENTE

                            </div>
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => { Sobre("Sobre"); handlePageClick('INSTITUCIONAL'); }}
                            className={`list-group-item list-group-item-action py-2 ripple ${activePage === 'INSTITUCIONAL' ? 'active' : ''}`}
                            role="button"
                            title="INSTITUCIONAL"
                            data-bs-toggle="tooltip"
                            data-bs-placement="right"
                            data-bs-original-title="INSTITUCIONAL"
                            style={{
                                color: activePage === 'INSTITUCIONAL' ? 'black' : 'white',
                                backgroundColor: activePage === 'INSTITUCIONAL' ? '#666666' : 'transparent',
                                fontSize: '14px',
                            }}
                        >
                            <div style={{ display: window.innerWidth > 900 ? 'none' : '', }}>
                                <span className="icon-with-name" style={{ marginRight: 5 }}>
                                    <Infor />
                                </span></div>

                            <div style={{ display: window.innerWidth < 900 ? 'none' : '', }}>
                                <span className="icon-with-name" style={{ marginRight: 5 }}>
                                    <Infor />

                                </span>
                                INSTITUCIONAL
                            </div>
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => { Sobre("/Premiacoes"); handlePageClick('PREMIAÇÕES'); }}
                            className={`list-group-item list-group-item-action py-2 ripple ${activePage === 'PREMIAÇÕES' ? 'active' : ''}`}
                            role="button"
                            title="PREMIAÇÕES"
                            data-bs-toggle="tooltip"
                            data-bs-placement="right"
                            data-bs-original-title="PREMIAÇÕES"
                            style={{
                                color: activePage === 'PREMIAÇÕES' ? 'black' : 'white',
                                backgroundColor: activePage === 'PREMIAÇÕES' ? '#666666' : 'transparent',
                                fontSize: '14px',

                            }}
                        >
                            <div style={{ display: window.innerWidth > 900 ? 'none' : '', }}>
                                <span className="icon-with-name" style={{ marginRight: 5 }}>
                                    <Premio />
                                </span>
                            </div>
                            <div style={{ display: window.innerWidth < 900 ? 'none' : '', }}>
                                <span className="icon-with-name" style={{ marginRight: 5 }}>
                                    <Premio />
                                </span>

                                PREMIAÇÕES
                            </div>
                        </Nav.Link>

                        <Nav.Link
                            onClick={() => { Sobre("/Fornecedores"); handlePageClick('FORNECEDORES'); }}
                            className={`list-group-item list-group-item-action py-2 ripple ${activePage === 'FORNECEDORES' ? 'active' : ''}`}
                            role="button"
                            title="FORNECEDORES"
                            data-bs-toggle="tooltip"
                            data-bs-placement="right"
                            data-bs-original-title="FORNECEDORES"
                            style={{
                                color: activePage === 'FORNECEDORES' ? 'black' : 'white',
                                backgroundColor: activePage === 'FORNECEDORES' ? '#666666' : 'transparent',
                                fontSize: '14px',

                            }}
                        >
                            <div style={{ display: window.innerWidth > 900 ? 'none' : '', }}>
                                <span className="icon-with-name" style={{ marginRight: 5 }}>
                                    <Ferramentas />
                                </span></div>
                            <div style={{ display: window.innerWidth < 900 ? 'none' : '', }}>
                                <span className="icon-with-name" style={{ marginRight: 5 }}>
                                    <Ferramentas />
                                </span>
                                FORNECEDORES
                            </div>
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => { Sobre("Contato"); handlePageClick('DUVIDAS E SUGESTOES'); }}
                            className={`list-group-item list-group-item-action py-2 ripple ${activePage === 'DUVIDAS E SUGESTOES' ? 'active' : ''}`}
                            role="button"
                            title="DUVIDAS E SUGESTOES"
                            data-bs-toggle="tooltip"
                            data-bs-placement="right"
                            data-bs-original-title="DUVIDAS E SUGESTOES"
                            style={{
                                color: activePage === 'DUVIDAS E SUGESTOES' ? 'black' : 'white',
                                backgroundColor: activePage === 'DUVIDAS E SUGESTOES' ? '#666666' : 'transparent',
                                fontSize: '14px',

                            }}
                        >
                            <div style={{ display: window.innerWidth > 900 ? 'none' : '', }}>
                                <span className="icon-with-name" style={{ marginRight: 5 }}>
                                    <Person />
                                </span>
                            </div>
                            <div style={{ display: window.innerWidth < 900 ? 'none' : '', }}>
                                <span className="icon-with-name" style={{ marginRight: 5 }}>
                                    <Person />

                                </span>
                                DUVIDAS E SUGESTOES
                            </div>
                        </Nav.Link>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;
