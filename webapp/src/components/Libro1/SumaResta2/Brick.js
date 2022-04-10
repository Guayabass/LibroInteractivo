import React from 'react'

import './Brick.scss'

const buildColor = (color) => {
    return {
        color 
    }
}

function Brick({ color, text, onClick, size }) {
    return (
        <div className="brick-container" onClick={onClick}>
            <div className={"brick" + (size ? "-" + size : "")} style={buildColor(color)}>
                <p className="vertical-center">{text}</p>
            </div>
        </div>
    )
}

export default Brick