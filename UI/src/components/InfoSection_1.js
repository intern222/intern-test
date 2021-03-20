import React from 'react';
import './InfoSection_1.css';


function InfoSection_1() {
  return (
    <div className="info_container_1">
      <div className="info_text_1">
        <div className="textarea">
          <div className="avatar_holder_1">
            <img className="icon1" 
              src='/images/goal17.svg'
            />
          </div>
          <div className="hi">
            És um estudante e estás à procura de entrar no mercado de trabalho?
           <p></p>
            Connosco cumpres os teus objetivos.
          </div>
        </div>
        <div className="textarea_1">
          <div className="avatar_holder_1">
            <img className="icon" 
              src='/images/stopwatch.svg'
            />
          </div>
          <div className="hi_1">
           Não sabes o que fazer com o teu tempo livre?
           <p></p>
           Com esta plataforma tudo se torna mais acessível.
          </div>
        </div>
        <div className="textarea_2">
          <div className="avatar_holder_1">
            <img className="icon" 
              src='/images/checked.svg'
            />
          </div>
          <div className="hi_2">
          Qualquer que seja a tua área ou formação, nós temos as oportunidades que procuras.

          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection_1;