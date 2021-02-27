import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  return (
    <>
      <li className='cardsitem'>
        <Link className='cardsitemlink' to={props.path}>
          <figure className='cardsitempic-wrap' data-category={props.label}>
            <img
              className='cardsitemimg'
              alt='Travel Image'
              src={props.src}
            />
          </figure>
          <div className='cardsiteminfo'>
            <h5 className='cardsitem__text'>{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;