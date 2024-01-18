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

function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  useEffect(() => {
      const savedUserData = localStorage.getItem("@detailUser");
      setMenuVisible(!!savedUserData);
      
  }, []);
  return (
    <BrowserRouter >
      <div className="container-fluid" style={{ margin: 0, padding: 0,width: '100%'}}>
      <Header />
        <Row>
        <Col  style={{padding:0, margin: 0, maxWidth: '12.666%' ,display: menuVisible ?  window.innerWidth < 600 ? 'none' : 'flex' : 'none' }}>
            <Sidebar />
          </Col>
          <Col   style={{ margin: 0, padding: 0,width: '100%' }}>
            <div className="m-0" style={{ margin: 0, padding: 0,width: '100%' }}>
              <Routes>
                <Route path='/conecta'  element={<Login />} />
                <Route path='/Cadastro/:ids?' element={<Cadastro />} />
                <Route path="/Principal"  element={<Private><PrivateAceito><Principal /></PrivateAceito></Private>} />
                <Route path="/Administrador" element={<PrivateAdmin><PrivateAceito><Administrador /></PrivateAceito></PrivateAdmin>} />
                <Route path="/Redefinicao" element={<RedefinicaodeSenha />} />
                <Route path="/Sobre" element={<Private><PrivateAceito><Sobre /></PrivateAceito></Private>} />
                <Route path="/Subtela" element={<Subtela />} />
                <Route path="/Fornecedores" element={<Fornecedores />} />
                <Route path="/Contato" element={<Contato />} />
                <Route path="/Premiacoes" element={<Premiacoes />} />
                <Route path="/PrimeiraCampanha" element={<PrimeiraCampanha />} />
                <Route path="/Campanha" element={<Campanha />} />
                <Route path="/Campanha1" element={<Campanha1 />} />
                <Route path="/Campanha2" element={<Campanha2 />} />

                
              </Routes>
            </div>
            </Col>
        </Row>
        <div style={{ margin: 0, padding: 0,width: '100%'}} >
        <ModalFooter    style={{ margin: 0, padding: 0,width: '100%' }}   />           

        </div>

 </div>
    </BrowserRouter>
  );
}

export default App;
