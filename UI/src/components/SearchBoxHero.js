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
                <button style={{marginTop:"100px", paddingBottom:"30px", width:"210px", height:"40px", backgroundColor:"white", color:"#085078", border: "2px solid #085078", opacity:"0.90"}} type="submit">
                    Pesquisa posições aqui
                </button>
        </form>
    );
}