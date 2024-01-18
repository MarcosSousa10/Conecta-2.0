import Carousel from 'react-bootstrap/Carousel';
import './css.css'
// function Carrossel({ imagem1, imagem2, imagem3, imagem4, imagem5, imagem6, imagem7, imagem8, imagem9, imagem10, imagem11, imagem12, imagem13, imagem14, imagem15}) {
  
function Carrossel({ imagem1, imagem2,imagem3,imagem4,imagem5}) {

  return (
    <Carousel   
    >
      <Carousel.Item>
        {imagem1}
        <Carousel.Caption>
          {/* <h3>{titulo1}</h3>
          <p>{descricao1}</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        {imagem2}
        <Carousel.Caption>
          {/* <h3>{titulo2}</h3>
          <p>{descricao2}</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        {imagem3}
        <Carousel.Caption>
          {/* <h3>{titulo2}</h3>
          <p>{descricao2}</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        {imagem4}
        <Carousel.Caption>
          {/* <h3>{titulo2}</h3>
          <p>{descricao2}</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        {imagem5}
        <Carousel.Caption>
          {/* <h3>{titulo2}</h3>
          <p>{descricao2}</p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carrossel;