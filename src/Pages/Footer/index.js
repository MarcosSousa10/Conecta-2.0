/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import './foter.css';
import './footer.css'
import { useEffect, useState } from 'react';
import watermarkImage from '../../Components/image/LOGOOTHONBRANCO.png';

export default function ModalFooter() {
    const [menuVisible, setMenuVisible] = useState(false);
    useEffect(() => {
        const savedUserData = localStorage.getItem("@detailUser");
        setMenuVisible(!!savedUserData);
    }, []);
    return (
        <footer className="site-footer footer-v1 bg-dark container-md-fluid" style={{ display: menuVisible ? '' : 'none', width: '100%', margin: 0, padding: 0 }}>
            <div className="footer-content" style={{ width: '100%', margin: 0, padding: 0 }}>
                <div className="container row">
                    <div className="footer-logo-social col-1">
                        <div className="footer-logo">
                            <a href="/conecta" className="footer-logo-link"> </a>
                            <a href="/conecta" className="custom-logo-link" rel="home" aria-current="page" >
                                <div style={{ width: 250, marginLeft: '-10%' }}>
                                    <img src={watermarkImage} width={200} alt={``} />
                                </div>

                            </a>
                            <span className="footer-logo-text"></span>
                        </div>
                    </div>
                    <div className="footer-widgets fix col">
                        <div className="block footer-widget-1">
                            <div id="text-1" className="widget widget_text">
                                <span className="gamma widget-title1">Atendimento</span>
                                <div className="textwidget">
                                    <ul className="contact-details list-unstyled">
                                        <li>Ligue:
                                            <br />
                                            <a href="#"> 31 8225-2486 / 31 2103-3000
</a>
                                        </li>
                                        <li>Instagram:<br/>
                                            <a href="https://www.instagram.com/luminatobh/">
                                                https://www.instagram.com/luminatobh/
                                            </a>
                                        </li>
                                        <li>Facebook:<br/>
                                             <a href="https://www.facebook.com/luminatobh">
                                                https://www.facebook.com/luminatobh

                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="block footer-widget-2">
                            <div id="nav_menu-5" className="widget widget_nav_menu">
                                <span className="gamma widget-title">Ajuda e Suporte</span>
                                <div className="menu-ajuda-e-suporte-container">
                                    <ul id="menu-ajuda-e-suporte" className="menu">
                                        <li id="menu-item-2596" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2596">
                                            <a href="https://www.othondecarvalho.com.br/politica-de-trocas-e-devolucoes/">Política de Trocas e Devoluções</a>
                                        </li>
                                        <li id="menu-item-2600" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-2600">
                                            <a rel="privacy-policy" href="https://www.othondecarvalho.com.br/politicas-de-privacidade/">Políticas de Privacidade</a></li>
                                        <li id="menu-item-2115" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2115">
                                            <a href="https://www.othondecarvalho.com.br/formas-de-pagamento/">Formas de Pagamento</a></li>
                                        <li id="menu-item-2114" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2114">
                                            <a href="https://www.othondecarvalho.com.br/prazos-e-envio/">Prazos e Envio</a></li>
                                    </ul></div></div>								</div>
                        <div className="block footer-widget-3">
                            <div id="nav_menu-6" className="widget widget_nav_menu">
                                <span className="gamma widget-title">Institucional</span>
                                <div className="menu-institucional-container">
                                    <ul id="menu-institucional-2" className="menu">
                                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2592">
                                            <a href="https://www.othondecarvalho.com.br/sobre-a-othon-de-carvalho/">Sobre a Othon de Carvalho</a></li>
                                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2120">
                                            <a href="https://www.othondecarvalho.com.br/fornecedores/">Fornecedores</a>
                                        </li>
                                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2595">
                                            <a href="https://www.othondecarvalho.com.br/faq/">FAQ</a></li>
                                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-23920">
                                            <a href="https://www.othondecarvalho.com.br/contatos/">Contatos</a></li>
                                    </ul></div></div>								</div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom-bar">
                <div className="copyright-info celular" style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }} >© 2023 Todos direitos reservados a Othon De Carvalho-
                    <a href="https://www.linkedin.com/in/marcos-pego-de-sousa/"
                        target="_blank" rel="noopener">Designed and develope by Marcos Sousa
                    </a>
                </div>
                <div className="container">
                    <div className="footer-bottom-bar-inner">
                        <div className="payment-icons">
                            <div className="payment-icon-text computer">Nós aceitamos</div>

                            <div className="payment-icons">
                                <div className="footer-payment-logo">
                                    <img className="payment-icons-img" src="https://www.othondecarvalho.com.br/wp-content/uploads/2023/01/BandeirasCartoesBancos.2.fw_.png"
                                        alt="Pagamento Ícones" width="397" height="50" />
                                </div>
                            </div>
                        </div>
                        <div className='computer'>

                            <div className="copyright-info">© 2023 Todos direitos reservados a Othon De Carvalho-
                                <a href="https://www.linkedin.com/in/marcos-pego-de-sousa/"
                                    target="_blank" rel="noopener">Designed and develope by Marcos Sousa
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    )
}   