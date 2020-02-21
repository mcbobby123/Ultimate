import React from 'react';
import './Spot.css';

function Spot(props){
    return (
        <div className="Spot">
            {props.children}
        </div>
    );
}

export default Spot;
