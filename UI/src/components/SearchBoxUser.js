import React, { useState } from 'react';
import { Row } from 'reactstrap';

export default function SearchBox(props){

    const [name, setName] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        props.history.push(`/searchuser/name/${name}`);
    };

    return (
        <form className="search3" onSubmit={submitHandler}>

          <div className="row12345">
            <input
              type="search"
              name="q"
              id="q"
              onChange={(e) => setName(e.target.value)}
            ></input>

            <button className="primary" type="submit">
              <i className="fa fa-search"></i>
            </button>
          </div>

        </form>
      );
}