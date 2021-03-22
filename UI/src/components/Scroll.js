import React, { useState, useEffect } from 'react';
import { useWindowScroll } from 'react-use';
import './Scroll.css'

const Scroll = () => {

    const {y: pageYOFFset} = useWindowScroll();
    const [visible, setVisiblity] = useState(false);

    useEffect(()=>{
        if(pageYOFFset > 0){
            setVisiblity(true);
        }else{
            setVisiblity(false);
        }

    }, [pageYOFFset]);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior:"smooth"});

    if (!visible) {
        return false;
    }

    return (
        <div 
            className="scrollToTop"
            onClick={scrollToTop}
        >
            <i className ="fas fa-chevron-up"></i>
        </div>
    )
}

export default Scroll;