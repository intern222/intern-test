import React from 'react';
import { Link } from 'react-router-dom';

function CardItem_2(props) {
  return (
    <>
      <li className='cards__item'>
        <div className='cards__item__link'>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='Travel Image'
              src={props.src}
            />
          </figure>
            <div className='cards__item__info'>
            <h2>Afonso Fernandes</h2>
            <h4>Programação</h4>
            <h6>Estudante de Engenharia Mecânica no Instituto Superior Técnico</h6>
            <div className="card_icons">
                <ul className="fab fa-instagram"></ul>
                <ul className="fab fa-linkedin"></ul>
                <ul className="fab fa-facebook-square"></ul>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}

export default CardItem_2;