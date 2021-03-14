import React, { useState } from 'react';

export default function SearchBox(props){

    const [name, setName] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        props.history.push(`/search/name/${name}`);
    };

    return(
        <form onSubmit={submitHandler}>
            
                {/*<div className="row">
                    <input 
                        type="text" 
                        name="q" 
                       id="q" 
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </div>*/}
                <button style={{width:"210px", height:"40px", backgroundColor:"rgb(54, 69, 79)", color:"white"}} type="submit">
                    Pesquise posições aqui
                </button>
        </form>
    );
}