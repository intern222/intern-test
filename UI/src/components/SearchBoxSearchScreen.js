import React, { useState } from 'react';

export default function SearchBoxSearchScreen(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form className="search2" onSubmit={submitHandler}>

      <div className="row1234">
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