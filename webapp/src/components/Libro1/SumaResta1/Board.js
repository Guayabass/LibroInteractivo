import React from 'react'

function Board(props) {

    const drop = e => {
        e.preventDefault();
        const block_id = e.dataTransfer.getData('block_id');

        const block = document.getElementById(block_id);
        block.style.display = 'block';

        e.target.appendChild(block);
    }

    const dragOver = e => {
        e.preventDefault();
    }

    return (
        <div
            id={props.id}
            className={props.className}
            onDrop={drop}
            onDragOver={dragOver}
        >
            {props.children}
        </div>
    )

}

export default Board