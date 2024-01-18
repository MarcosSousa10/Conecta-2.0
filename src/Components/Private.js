// import { useState, useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import axios from "axios";
// export default function Private ({children}){
//     const [loading, setLoading] = useState(true);
//     const [signed, setSigned] = useState(false);

//     useEffect(() => {
//         async function checkLogin(){
// var user ;
// if (user){
//     const userData = { 
//         uid: "1",
//         email:"marcospegodesousa@gmail.com",
//     }
//     localStorage.setItem("@detailUser", JSON.stringify(userData));
//     setLoading(false);
//     setSigned(true);
// }else{
//     setLoading(false);
//     setSigned(false);
// }        }
//         checkLogin();
//     }, [])
//     if(loading){
//         return(
//             <div>

//             </div>
//         )
//     } 
//     if(!signed){
//         return <Navigate to="/"/>
//     }

//     return children;
// }
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import imagem from './3D Text-1s-280px (1).gif';

export default function Private({ children }) {
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        async function checkLogin() {
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
                    // Caso não haja dados salvos, você pode tratar o caso de acordo
                    console.log("Nenhuma informação encontrada no localStorage.");
                }
            } catch (error) {
                // Handle any errors that occurred during the authentication process.
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
        // Redirect the user to the login page or any other appropriate route.
        return <Navigate to="/conecta" />;
    }

    // If the user is authenticated, render the children components.
    return <>{children}</>;
}
