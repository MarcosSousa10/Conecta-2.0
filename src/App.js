import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./Pages/Cadastro";
import Header from "./Pages/Header";
import Principal from "./Pages/Principal";
import Login from "./Pages/Login";
import Administrador from "./Pages/Administracao";
import Private from "./Components/Private";
import PrivateAdmin from "./Components/PrivateAdmin";
import ModalFooter from "./Pages/Footer";
import RedefinicaodeSenha from "./Pages/RedefinicaodeSenha";
import Sobre from "./Pages/Sobre";
import Subtela from "./Components/subtela";
import PrivateAceito from "./Components/PrivateAceito";
import Sidebar from "./Pages/sidebar/Sidebar";
import { Col, Row } from 'react-bootstrap';
import Fornecedores from "./Pages/Fornecedores";
import Contato from "./Pages/Contato";
import Premiacoes from "./Pages/Premiações";
import PrimeiraCampanha from "./Pages/FotosDoEncontro/PrimeiraCampanha";
import Campanha from "./Pages/Campanhas/Campanha";
import Campanha1 from "./Pages/Campanhas/Campanha1";
import Campanha2 from "./Pages/Campanhas/Campanha2";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SegundaCampanha from "./Pages/FotosDoEncontro/SegundaCampanha";
import TerceiraCampanha from "./Pages/FotosDoEncontro/TerceiraCampanha";
function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const savedUserData = localStorage.getItem("@detailUser");
    setMenuVisible(!!savedUserData);

  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <BrowserRouter >
      <div className="container-fluid" style={{ margin: 0, padding: 0, width: '100%' }}>
        <Header />
        
        {/* <i class="bi bi-arrows-fullscreen" style={{ display: menuVisible ? window.innerWidth > 1000 ? 'none' : 'flex' : 'none' }} onClick={toggleSidebar}></i>

          <div className="container-fluid" style={{ width: '100%', display: sidebarOpen ? window.innerWidth > 1000 ? 'none' : '' : 'none' }}>
                <Sidebar />

          </div> */}
        <Row>
          <Col className="body" style={{ padding: 0, margin: 0, maxWidth: '12.666%', display: menuVisible ? 'flex' : 'none' }}>
                <Sidebar />
          </Col>
          <Col style={{ margin: 0, padding: 0, width: '100%' }}>
            <div className="m-0" style={{ margin: 0, padding: 0, width: '100%'}}>
              <Routes>

                <Route path='/conecta' element={<Login />} />
                <Route path='/Cadastro/:ids?' element={<Cadastro />} />
                <Route path="/Principal" element={<Private><PrivateAceito><Principal /></PrivateAceito></Private>} />
                <Route path="/Administrador" element={<PrivateAdmin><PrivateAceito><Administrador /></PrivateAceito></PrivateAdmin>} />
                <Route path="/Redefinicao" element={<RedefinicaodeSenha />} />
                <Route path="/Sobre" element={<Private><PrivateAceito><Sobre /></PrivateAceito></Private>} />
                <Route path="/Subtela" element={<Subtela />} />
                <Route path="/Fornecedores" element={<Private><PrivateAceito><Fornecedores  /></PrivateAceito></Private>} />
                <Route path="/Contato" element={<Private><PrivateAceito><Contato /></PrivateAceito></Private>} />
                <Route path="/Premiacoes" element={<Private><PrivateAceito><Premiacoes /></PrivateAceito></Private>} />
                <Route path="/PrimeiraCampanha" element={<Private><PrivateAceito><PrimeiraCampanha /></PrivateAceito></Private>} />
                <Route path="/SegundaCampanha" element={<Private><PrivateAceito><SegundaCampanha /></PrivateAceito></Private>} />
                <Route path="/TerceiraCampanha" element={<Private><PrivateAceito><TerceiraCampanha /></PrivateAceito></Private>} />
                <Route path="/Campanha" element={<Private><PrivateAceito><Campanha /></PrivateAceito></Private>} />
                <Route path="/Campanha1" element={<Private><PrivateAceito><Campanha1 /></PrivateAceito></Private>} />
                <Route path="/Campanha2" element={<Private><PrivateAceito><Campanha2 /></PrivateAceito></Private>} />
              </Routes>
            </div>
          </Col>
        </Row>
        <div style={{ width: '100%' }} >
          <ModalFooter style={{ width: '100%'}} />
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
