import React, { useState } from 'react';

export default function SearchBox(props){

    const [name, setName] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        props.history.push(`/search/name/${name}`);
    };

    return(
        <form className="center search" onSubmit={submitHandler}>
            <div className="nav">
                {/*<div className="row">
                    <input 
                        type="text" 
                        name="q" 
                       id="q" 
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </div>*/}
                <button className="primary" type="submit">
                    <i className="fa fa-search" color="black"></i>
                </button>
            </div>
        </form>
    );
}