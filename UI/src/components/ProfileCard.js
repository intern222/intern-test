import React from 'react';
import './ProfileCard.css';
import CardItem_1 from './CardItem_1.js';
import CardItem_2 from './CardItem_2.js';
import CardItem_3 from './CardItem_3.js';

function ProfileCard() {
  return (
    <div className='info_container'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem_1
              src='/images/diogo_1.jpeg'
            />
            <CardItem_2
              src='/images/afonso_1.jpeg'
            />
             <CardItem_3
              src='/images/pedro_1.jpeg'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;