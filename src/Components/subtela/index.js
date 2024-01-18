import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Subtela() {  
      const navigate = useNavigate();

    const [mostrarTermos, setMostrarTermos] = useState(true);
    const [aceitouTermos, setAceitouTermos] = useState(false);
    const aceitar=()=>{
        toast.error('ACEITE OS TERMOS DE USO PARA ULTILIZAR O CONECTA', {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }
    const aceitarTermos = () => {
        
        const savedUserData = localStorage.getItem("@detailUser");
      if (savedUserData) {
          const userData = JSON.parse(savedUserData);
          var id = userData.uid;
          var cod = userData.email;
      } else {
          console.log("Nenhuma informação encontrada no localStorage.");
      }
      axios.get(`https://othondecarvalho.com.br:5555/pc/updateTermos/${cod}`, {
        headers: { 'Authorization': `Bearer ${id}` },
      }).then(Responses => {
        if (Responses.data === 'Aceito') {
            
        setAceitouTermos(true);
        setMostrarTermos(false); 
          navigate(`/Principal`);
          window.location.reload(true);
           
        } else {
            setAceitouTermos(false);
        setMostrarTermos(true);  
        }
      }
      ).catch(
        Responses => {
          localStorage.removeItem("@detailUser");
        }
      )
    };
    // navigate(`/Principal`)
    // window.location.reload(true);

    return (
        <div className='tamanho' style={{ textAlign: 'center' }}>
            <ToastContainer />
            {aceitar()}
            {mostrarTermos && (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        padding: '25px',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <h2>Termos de Uso Conecta</h2>
                    <div style={{
                        overflowY: 'scroll',
                        maxHeight: '600px',
                        textAlign: 'left'
                    }}>
                        <p><b>Contrato de Parceria entre profissionais (Arquiteto - Decorador – Designer - Lighting Designer)
                            junto à Othon de Carvalho</b><br /></p>

                        <p><b>Cláusula 1. Objeto do contrato</b></p>

                        <p>
                            O presente contrato tem como objeto a parceria comercial entre as Partes, para promover o fomento, assessoria e indicação de vendas de produtos comercializados pela <b>Othon de Carvalho (Othon).</b>
                        </p>

                        <p>Parágrafo 1º- O Profissional deverá fazer cadastro na Othon via link, via site ou presencialmente na loja antes de iniciar a parceria, esclarecendo eventuais dúvidas pelo telefone: (31) 982252486.</p>

                        <p><b>Cláusula 2. Descrição da parceria.</b></p>

                        <p>2.1. Ao cumprir o objeto deste contrato o Profissional receberá o percentual de 10% (dez por cento) sobre as vendas de <b>produtos de iluminação</b>(mercadorias de iluminação decorativa,
                            tais como pendente, arandela, plafon, lustres, spots, perfil e seus acessórios, abajur, coluna, luminária de mesa, fita de led, trilho e projetores especiais).</p>

                        <p>2.2. Em relação a participação do profissional nas vendas de acessórios e materiais elétricos (inserindo, nessa modalidade,
                            produtos como drives e lâmpadas), será devido ao Profissional o percentual de 2% (dois por cento) sobre as vendas efetivamente realizadas.</p>

                        <p>2.3. O percentual previsto nos itens 2.1 e 2.2 a ser repassado ao Profissional será calculado com base no valor líquido das vendas
                            efetuadas devido à sua intervenção, assessoria e indicação presenciais, ressaltando-se que, caso seja emitida nota fiscal pelo parceiro,
                            o valor dos impostos incidentes na operação será descontado do percentual a ser repassado pela Othon.</p>

                        <p>2.3.1. Em nenhuma hipótese será concedido ao Profissional percentual sobre
                            eventuais vendas que o mesmo não tenha participado da negociação presencialmente
                            ou com comunicado formal por escrito (com o vendedor ou equipe Luminato) antes do orçamento. .</p>

                        <p>2.3.2. Todas as vendas serão consideradas efetivadas quando o consumidor final efetuar o pagamento devido à Othon, conforme descrito das respectivas notas fiscais.</p>

                        <p>Parágrafo 1º. O Profissional se compromete a solicitar ao vendedor sua vinculação no orçamento, sob pena de não recebimento do percentual
                            sobre a venda na qual efetivamente participou (assessorou/participou), sendo este procedimento de sua inteira responsabilidade.</p>

                        <p>Parágrafo 2º. Os dados do Profissional (CPF ou CNPJ) devem ser inseridos no pedido/orçamento, sob pena de não receber qualquer percentual sobre a venda dos produtos em que tenha efetivamente participado.</p>

                        <p>2.4. Ao celebrar este contrato, o Profissional se compromete a cadastrar e participar do programa de pontuação da Othon, denominado Conecta,
                            por meio do qual a cada R$1,00 (um real) em venda que efetivamente participar, o Profissional ganhará 1 (um) ponto, exceto nos casos de vendas de condutores elétricos.</p>

                        <p>2.5. A participação do Profissional no programa Conecta poderá, a critério da Othon, propiciar ao Profissional diversos benefícios, tais como prêmios bimestrais,
                            semestrais e anuais, a serem previa e periodicamente divulgados pela Othon, através de canais próprios, a depender da campanha publicitária vigente à época,
                            devendo ser observadas pelo Profissional habilitado as regras de pulverização, ranking e pontuação mínima para fazer jus aos benefícios.</p>

                        <p><b>Cláusula 3. Pagamentos.</b></p>

                        <p>A Othon realizará o pagamento dos percentuais sobre as vendas das mercadorias ao Profissional somente após a emissão da Nota Fiscal de remessa das mercadorias ao consumidor final,
                            por meio de depósito bancário, ou no cartão presente.</p>

                        <p>Parágrafo 1º. A Othon, em estrito cumprimento à legislação, só realizará pagamentos aos Parceiros, da seguinte forma e prazos:</p>

                        <p>I - Pessoa Jurídica: Emissão de Nota Fiscal de Serviços pelo Parceiro ao setor responsável da Othon, com dedução de impostos devidos para o tipo de serviço prestado;
                            II - Pessoa Física: Depósito em cartão presente.
                            <b>III -  O pagamento acontecerá no mês subsequente à venda efetivada, com apuração dos valores até o 5º dia útil com pagamentos nos dias 15 e 30 de cada mês.</b></p>

                        <p><b>Cláusula 4. Prazos</b></p>

                        <p>Após a data da emissão da Nota Fiscal de remessa de mercadorias ao consumidor final, a Othon concederá um prazo máximo de 90 (noventa)
                            dias corridos para que o Profissional requeira e apresente os documentos para recebimento da contraprestação, observados os parágrafos 1 e 2 da Cláusula 3.</p>

                        <p><b>Parágrafo 1º.</b> Uma vez expirado o prazo de 90 (noventa) dias corridos, sem que o Profissional apresente a Nota Fiscal de Serviços ou solicite o pagamento via cartão presente,
                            o saldo será automaticamente baixado no sistema, sem possibilidade de resgate posterior.</p>

                        <p><b>Cláusula 5. Disposições gerais.</b></p>

                        <p>Nenhuma retribuição será devida ao Profissional se a falta de pagamento resultar de insolvência do comprador/consumidor,
                            bem como, se o negócio vier a ser desfeito pelo consumidor, ou for sustada a entrega da mercadoria por ser duvidosa a liquidação.</p>

                        <p>Parágrafo 1º. A Othon se reserva o direito de auditar todas as vendas para certificar que o Profissional de fato prestou serviço de intervenção, assessoria e indicação presencial de vendas.</p>

                        <p>Parágrafo 2º. Verificada qualquer irregularidade na indicação do Profissional, bem como declaração do Cliente final,
                            verbal ou escrita, de que desconhece o Profissional ou que o mesmo não realizou o serviço objeto do presente termo, a comissão será automaticamente excluída.
                        </p>
                        <p><b>Cláusula 6.</b> O presente contrato não cria entre as partes qualquer espécie de vínculo empregatício, sociedade, agência, associação ou consórcio.</p>

                        <p><b>Cláusula 7.</b> A Othon se resguarda no direito de alterar os termos deste contrato, sobretudo para criar novas regras ao programa de prêmios e pontuação,
                         sendo que as alterações terão validade apenas após a comunicação ao Profissional.</p>

                        <p><b>Cláusula 8.</b> O presente contrato é firmado por prazo indeterminado, podendo ser rescindido unilateralmente e imotivadamente por qualquer uma das partes,
                         sem prévio e qualquer necessidade de pagamento de multa contratual.</p>

                        <p><b>Cláusula 9.</b> As Partes deverão manter a confidencialidade dos termos e condições deste Contrato, observado que qualquer divulgação relativa a
                         este Contrato tão-somente poderá ocorrer para cumprimento de legislação aplicável ou exigência de órgão regulador.</p>
                        <p><b>Cláusula 10.</b> As <b>PARTES</b> declaram neste ato que estão cientes, conhecem e entendem os termos das normas anticorrupção brasileiras,
                         especialmente a lei 12.846/2013, além de quaisquer outras aplicáveis sobre o objeto do presente Contrato ("Regras Anticorrupção"),
                          comprometendo-se a abster-se de qualquer atividade que constitua uma violação das disposições destas.</p>
                        <p>Parágrafo Único - Para os fins da presente cláusula, as <b>PARTES</b> declaram, ainda,
                         que: (a) não violaram ou violarão as Regras Anticorrupção; (b) tem ciência que qualquer atividade que viole as Regras Anticorrupção é proibida e que conhecem as consequências possíveis de tal violação.</p>
                        <p><b>Cláusula 11.</b> As <b>PARTES</b>, em comum acordo, estabelecem que cumprirão os deveres e as obrigações referentes à proteção e ao tratamento de dados pessoais 
                        relacionados com o presente Contrato (“Dados Pessoais”) de acordo com a legislação vigente aplicável, incluindo, mas não se limitando à  nº 12.965/2014 
                        e Decreto Federal nº 8.771/2016 (“Marco Civil da Internet”), Lei Federal nº 13.709/2018 (“Lei Geral de Proteção de Dados” ou “LGPD”)
                         e a regulamentação porventura editada pela Autoridade Nacional de Proteção de Dados (“ANPD”), bem como respeitarão as políticas de proteção de
                          dados pessoais e segurança da informação estabelecidas por cada PARTE (legislação, regulamentação e políticas em conjunto denominadas “Normas de Proteção de Dados Pessoais”).</p>
                        <p><b><u>Parágrafo primeiro. O Parceiro declara de forma expressa a sua ciência e o seu consentimento quanto ao processamento, tratamento e armazenamento,
                         pela Othon de Carvalho, dos seus dados, inclusive os dados sensíveis, que sejam necessários para o fiel cumprimento deste contrato, autorizando expressamente que tais dados,
                          inclusive os dados sensíveis, poderão ser compartilhados com terceiros, sobretudo para propiciar ao Profissional os benefícios oriundos do programa conecta.</u></b></p>
                        <p><b><u>Parágrafo segundo. O Parceiro consente expressamente com a divulgação de seus dados pessoais nas redes sociais da Othon.</u></b></p>
                        <p><b><u>Parágrafo terceiro. O consentimento ora expresso engloba todos os dados fornecidos à Othon pelo Parceiro ou que venham a ser obtidos por esta, 
                            seja de qual natureza for, inclusive os dados sensíveis. O Parceiro concorda expressamente que os seus dados poderão ser processados, tratados e armazenados mesmo após o encerramento da parceria.</u></b></p>
                        <p><b>Clausula 12</b>. O Parceiro concede à Othon o direito não exclusivo e irrevogável de usar, reproduzir,
                         distribuir, exibir, publicar, modificar e adaptar sua imagem nas Redes Sociais da Othon, sem qualquer restrição quanto ao tempo ou território,
                          em conformidade com as políticas e diretrizes das Redes Sociais.</p>
                        <p><b>Parágrafo primeiro.</b> A autorização abrange o uso da imagem em qualquer tipo de conteúdo produzido pela Empresa, incluindo, mas não se limitando a, posts, stories, vídeos, anúncios e material promocional.</p>
                        <p><b>Parágrafo segundo.</b> O Titular da Imagem declara que a autorização concedida é gratuita, ou seja, não implica o pagamento de qualquer quantia pelo uso de sua imagem nas Redes Sociais da Empresa.</p>
                        <p><b>Cláusula 13.</b> As <b>PARTES</b> elegem o foro da Comarca da Cidade de Belo Horizonte/MG, com renúncia expressa a qualquer outro por mais privilegiado que seja, 
                        para dirimir dúvidas decorrentes do presente Contrato e de sua execução.</p>
                        <p>E, por estarem assim justas e acordadas, as <b>PARTES</b> assinam o presente instrumento em 2 (duas) vias de igual teor e para um só efeito, na presença das testemunhas abaixo.</p>
<br/><br/>

                        <p><b>OTHON DE CARVALHO E CIA LTDA</b><br/>
                        (CNPJ nº: 17.185.679/0001-33)</p>





                    </div>
                    <button onClick={aceitarTermos}>Concordo com os Termos de Uso e li a Política de Privacidade</button>
                </div>
            )}

            {/* {aceitouTermos && navigate(`/Principal`)} */}
        </div>
    );
}

export default Subtela;
