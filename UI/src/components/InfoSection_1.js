import React from 'react';
import './InfoSection_1.css';


function InfoSection_1() {
  return (
    <div className="info_container_1">
      <div className="info_text_1">
        <h2>Qual o Problema?</h2>
        <p></p>
        <h3>
          {/*Enquanto estudantes podemos verificar que é extremamente difícil encontrar um estágio extracurricular.
          Para além da procura ser muito superior à oferta podemos observar através de várias plataformas que cada uma tem os seus estágios.*/}
          Ao contrário da realidade existente no panorama Europeu, Portugal é um país onde média de conclusão do curso
          é mais valorizada em contexto social do que propriamente a experiencia profissional com que se chega ao mundo do trabalho.
          No entanto, todos sabemos que as empresas valorizam cada vez mais a experiência profissional ao invez da curricular.
          Uma dasa melhores formas de adquirir essas competências é realizar estágios que enriqueçam o conhecimento e a prátca em cada setor.
          <p></p>
          Em consequência disso, o leque de opções que exitem para estudantes são muito limitadas, sendo que as existentes são exclusivas para
          os alunos das faculdades que os disponiblizam.
        </h3>
        <p></p>
        <h2>Há Solução?</h2>
        <h3>
        A proposta desta plataforma é tornar todo o processo mais simples e acessivel, agregando, de forma organizada, o leque de opções em qualquer
        área.
        </h3>
      </div>
      <div className="info_img_1">
      <img className="info" src='/images/solving.svg'></img>
      </div>
    </div>
  );
}

export default InfoSection_1;