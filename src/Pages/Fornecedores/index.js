
import watermarkImage from '../../Components/image/pagina-em-manutencao.png';
export default function Fornecedores() {

    return (
<div className="tamanho body container" style={{ margin: 0, padding: 0, height: '100vh', overflow: 'hidden' }}>
<div className='tamanho body container-fluid'
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: `url(${watermarkImage})`,
            backgroundSize: 'cover',
          }}
        ></div>
        </div>

    )
}
