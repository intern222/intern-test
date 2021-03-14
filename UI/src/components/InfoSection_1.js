import React from 'react';
import './InfoSection_1.css';


function InfoSection_1() {
  return (
    <div className="info_container_1">
      <div className="info_text_1" style={{color:"black"}}>
        <h2>Qual o Problema?</h2>
        <p></p>
        <h3>
          {/*Enquanto estudantes podemos verificar que é extremamente difícil encontrar um estágio extracurricular.
          Para além da procura ser muito superior à oferta podemos observar através de várias plataformas que cada uma tem os seus estágios.*/}
          Ao contrário da realidade existente no panorama Europeu, Portugal é um país onde a média de conclusão do curso
          é mais valorizada em contexto social do que propriamente a experiência profissional com que se chega ao mundo do trabalho.
          Uma das melhores formas de adquirir competências é realizar estágios que enriqueçam o conhecimento e a prática em cada setor.
          <p></p>
          Embora as empresas valorizem cada vez mais a experiência profissional à curricular a oferta de estágios, que existem para estudantes, é extremamente escassa.
        </h3>
        <p></p>
        <h2>Há Solução?</h2>
        <h3>
          A proposta desta plataforma é tornar todo o processo mais simples e acessível, agregando, de forma organizada, todas as opções de estágios em qualquer
          área.   
          <p></p>
          Com isto pretendemos criar ainda mais procura por posições para estudantes para que as empresas comecem a disponibilizar mais estágios.      
        </h3>
      </div>
      <div className="info_img_1">
      <img className="info" src='/images/solving.svg'></img>
      </div>
    </div>
  );
}

export default InfoSection_1;