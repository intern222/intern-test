import React from 'react';
import './InfoSection_1.css';


function InfoSection_1() {
  return (
    <div className="info_container_1">
      <div className="info_text_1">

        <h1>Problema?</h1>
        <p></p>
        <h2>
          Enquanto estudantes podemos verificar que é extremamente difícil encontrar um estágio extracurricular.
          Para além da procura ser muito superior à oferta podemos observar através de várias plataformas que cada uma tem os seus estágios. 
          <p></p>
          Atualmente todo o processo de candidatura é bastante demorado e cansativo. A nossa aplicação veio mudar isso!
        </h2>
        
      </div>
      <div className="info_img_1">
      <img className="info" src='/images/solving.svg'></img>
      </div>
    </div>
  );
}

export default InfoSection_1;