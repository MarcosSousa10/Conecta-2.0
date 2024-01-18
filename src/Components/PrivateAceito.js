import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import imagem from './3D Text-1s-280px (1).gif';

export default function PrivateAceito({ children }) {
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);


    useEffect(() => {
        const savedUserData = localStorage.getItem("@detailUser");
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            var id = userData.uid;
            var cod = userData.email;
        } else {
            console.log("Nenhuma informação encontrada no localStorage.");
        }
         axios.get(`https://othondecarvalho.com.br:5555/pc/aceitarCampanha/${cod}`, {
          headers: { 'Authorization': `Bearer ${id}` },
      }).then(Response => {
          if (Response.data === 'Achei') {
            setSigned(true);
          } else {
            setSigned(false);
          }
      }).catch(error => {
          alert("VOCÊ NÃO TEM PERMISSÃO PARA ACESSAR ESTA PÁGINA");
      });
         function checkLogin() {
            
            try {
                const savedUserData = localStorage.getItem("@detailUser");

                if (savedUserData) {
                    const userData = JSON.parse(savedUserData);
                    const token = userData.uid;
                    const cnpj = userData.email;

                    if (token && cnpj) {

                        setSigned(true);

                    } else {
                        setSigned(false);
                    }
                } else {
                    console.log("Nenhuma informação encontrada no localStorage.");
                }
            } catch (error) {
                setSigned(false);
            } finally {
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 110px)' }}>
                <img
                    src={imagem} // Verifique o caminho do arquivo GIF
                    alt="Pagamento Ícones"
                    width="30%"
                    height="30%"

                />
            </div>
        );
    }

    if (!signed) {
        return <Navigate to="/Subtela" />;
    }

    // If the user is authenticated, render the children components.
    return <>{children}</>;
}
