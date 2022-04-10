import React from 'react'
import './Brick.scss'

const dragStart = e => {
    const target = e.target;

    //console.log(target.id);

    e.dataTransfer.setData('block_id', target.id);

    /*setTimeout(() => {
        target.style.display = "none";
    }, 0);*/
}

const dragOver = e => {
    e.stopPropagation();
}

const buildColor = (color) => {
    return {
        color
    }
}

function Brick({ color, text, onClick, size, id, draggable }, props) {
    return (
        <div id={'brick-container-' + id} className="brick-container" onClick={onClick}>
            <div id={id} draggable={draggable} onDragStart={dragStart} onDragOver={dragOver} className={"brick" + (size ? "-" + size : "")} style={buildColor(color)}>
                <p id={'num-' + id} className="vertical-center">{text}</p>
            </div>
            {props.children}
        </div>
    )
}

export default Brick