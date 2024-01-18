import React from 'react';
import Contrato from './Contrato Profissionais com a Othon Final.pdf'
const DownloadButton = () => {
  const handleDownload = () => {
    // Lógica para iniciar o download do PDF
    const pdfUrl = Contrato;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Termos de Uso';
    link.click();
  };

  return (
    <button onClick={handleDownload}>Termos de Uso Conecta</button>
  );
}

export default DownloadButton;
