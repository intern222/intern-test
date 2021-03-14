import React from 'react';
import { Link } from 'react-router-dom';

function CardItem_3(props) {
  return (
    <>
      <li className='cards__item'>
        <div className='cards__item__link' >
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='Travel Image'
              src={props.src}
            />
          </figure>
            <div className='cards__item__info'>
            <h2>Pedro Silva</h2>
            <h4>Programação</h4>
            <h6>Estudante de Engenharia Informática na Faculdade de Ciências e Tecnologias</h6>
            <div className="card_icons">
                <ul className="fab fa-linkedin" onClick={() => window.location.href = `https://www.linkedin.com/in/pedro-silva-8507b219a/`}></ul>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}

export default CardItem_3;
