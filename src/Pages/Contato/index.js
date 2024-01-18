import { useState } from "react";
import "./Contato.style.css";

export default function Contato() {
    const [texto, setTexto] = useState('')
    return (
        <div className="contato body">
             <form className="body" style={{textAlign:'center', alignItems:'center'}}>
            <h1>Fale Conosco </h1>
           
                <input className="body"  type="Assunto" placeholder="Assunto" style={{width:'50%'}} />
                <textarea
                    className="body" 
                    placeholder="Descricao"
                    value={texto}
                    onChange={(txt) => setTexto(txt.target.value)}
                    rows={15}
                    cols={100}
                />
                <input className="bg-dark"  type="submit" />
            </form>
        </div>
    )
}