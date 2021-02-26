import React, { useState } from 'react';
import { Row } from 'reactstrap';

export default function SearchBox(props){

    const [name, setName] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        props.history.push(`/searchinternship/name/${name}`);
    };

    return(
        <form className="row center search1" onSubmit={submitHandler}>
            <Row>
                <div className="row">
                    <input 
                        type="search" 
                        name="q" 
                        id="q" 
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </div>
                <button className="primary" type="submit">
                    <i className="fa fa-search" color="black"></i>
                </button>
            </Row>
        </form>
    );
}