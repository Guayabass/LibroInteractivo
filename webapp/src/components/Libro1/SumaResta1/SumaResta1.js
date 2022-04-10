import React, { useState, useEffect } from 'react';
import Brick from './Brick'
import Board from './Board';
import { Pagination, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { CheckCircle, XCircle } from 'react-bootstrap-icons';
import './SumaResta1.css';

const SumaResta1 = () => {

    const [numBlock, setNumBlock] = useState(1);
    const [numOperation, setNumOperation] = useState(0);
    const [final, setFinal] = useState(1);
    const [puntos, setPuntos] = useState(0);
    const [resultadosMalos, setResultadosMalos] = useState([]);
    const [resultadosBuenos, setResultadosBuenos] = useState([]);

    const [display, setDisplay] = useState(false);

    //<================================>
    const ope = ['sums', 'subt', 'mixt'];

    useEffect(() => {

        if (final === 3) {
            setDisplay(true);
        }

    }, [final]);

    useEffect(() => {
        randomResultBricks();
    }, [nextBlock])

    function randomResultBricks() {

        var bricksTemp = [];
        var containerChild = document.getElementsByClassName("brick-container");

        for (let index = 0; index < containerChild.length; index++) {
            if (!containerChild[index].id.includes("brick-container-static")) {
                var child = document.getElementById(containerChild[index].id);
                bricksTemp.push(child.childNodes[0]);
                child.removeChild(child.childNodes[0]);
            }
        }
        bricksTemp.forEach(e => {
            console.log(e);
            for (let index = 0; index < containerChild.length; index++) {
                if (!containerChild[index].id.includes("brick-container-static")) {
                    var child = document.getElementById(containerChild[index].id);
                    if (!child.id.includes(e.id) && child.childElementCount === 0) {
                        child.appendChild(e);
                    } else {
                        for (let index = 0; index < containerChild.length; index++) {
                            if (!containerChild[index].id.includes("brick-container-static")) {
                                var child = document.getElementById(containerChild[index].id);
                                if (child.childElementCount === 0) {
                                    child.appendChild(e);
                                }
                            }
                        }
                    }

                }
            }
        });
    }

    //Reset drag on drop
    function reset1() {

        var childs = [];
        var container = document.getElementsByClassName("board");

        for (let index = 0; index < container.length; index++) {
            if (container[index].childElementCount > 0) {

                if (container[index].childElementCount > 0) {
                    childs.push(container[index].childNodes[0]);
                    container[index].removeChild(container[index].childNodes[0]);
                }
            }
        }

        var containerChild = document.getElementsByClassName("brick-container");
        let countChild = 0;

        for (let index = 0; index < containerChild.length; index++) {
            if (!containerChild[index].id.includes("brick-container-static")) {
                var child = document.getElementById(containerChild[index].id);
                child.appendChild(childs[countChild]);
                countChild += 1;
            }
        }

    }

    //pass to the next block and pass to the next num1 if y', 'sign': 'u', 'num2': 'fin 'equals': '=',ish [addition, subtraction, mixed]
    function nextBlock() {

        var numNextBlock = numBlock + 1;

        if (numNextBlock > 1) {

            var numNextOperation = numOperation + 1;
            setFinal(numNextOperation);

            if (numNextOperation > 2) {
                setNumOperation(0);
            } else {
                setNumOperation(numOperation => numOperation + 1);
            }

            setNumBlock(1);
        } else {
            setNumBlock(numBlock => numBlock + 1);
        }

    }

    function checkAnswers(num) {

        var count = 0;

        var results = [];
        var container = document.getElementsByClassName("board");
        for (let index = 0; index < container.length; index++) {
            if (container[index].childElementCount > 0) {
                var child = document.getElementById(container[index].childNodes[0].id);
                console.log("Result ==> " + child.textContent);
                results.push(child.textContent);
                count += 1;
            }

        }

        var object = operations[ope[numOperation] + numBlock]

        for (let index = 0; index < results.length; index++) {
            const oper = object[numbersRandom[index]];
            console.log(oper.num1 + oper.sign + oper.num2 + oper.equals);
            const result = results[index];

            if (oper.result === result) {
                setPuntos(puntos => puntos + 1);
                resultadosBuenos.push(oper.num1 + " " + oper.sign + " " + oper.num2 + " = " + result + " Correcto");
            } else {

                resultadosMalos.push(oper.num1 + " " + oper.sign + " " + oper.num2 + " = " + result + "    La respuesta correcta es : " + oper.result);

            }
        }

        if (count === num) {
            reset1();
            nextBlock();
            var error = document.getElementById('error');
            error.textContent = '';
        } else {
            var error = document.getElementById('error');
            error.textContent = 'Se deben completar todas las operaciones';
        }

    }

    const operations = {
        'sums1': [
            { 'num1': '1', 'sign': '+', 'num2': '5', 'equals': '=', 'result': '6' },
            { 'num1': '2', 'sign': '+', 'num2': '7', 'equals': '=', 'result': '9' },
            { 'num1': '2', 'sign': '+', 'num2': '2', 'equals': '=', 'result': '4' },
            { 'num1': '1', 'sign': '+', 'num2': '6', 'equals': '=', 'result': '7' },
            { 'num1': '5', 'sign': '+', 'num2': '3', 'equals': '=', 'result': '8' },
        ],
        'sums2': [
            { 'num1': '3', 'sign': '+', 'num2': '2', 'equals': '=', 'result': '5' },
            { 'num1': '9', 'sign': '+', 'num2': '1', 'equals': '=', 'result': '10' },
            { 'num1': '3', 'sign': '+', 'num2': '6', 'equals': '=', 'result': '9' },
            { 'num1': '3', 'sign': '+', 'num2': '3', 'equals': '=', 'result': '6' },
            { 'num1': '3', 'sign': '+', 'num2': '4', 'equals': '=', 'result': '7' },
        ],
        'sums3': [
            { 'num1': '6', 'sign': '+', 'num2': '2', 'equals': '=', 'result': '8' },
            { 'num1': '7', 'sign': '+', 'num2': '3', 'equals': '=', 'result': '10' },
            { 'num1': '1', 'sign': '+', 'num2': '1', 'equals': '=', 'result': '2' },
            { 'num1': '0', 'sign': '+', 'num2': '1', 'equals': '=', 'result': '1' },
            { 'num1': '4', 'sign': '+', 'num2': '0', 'equals': '=', 'result': '4' }
        ],
        'subt1': [
            { 'num1': '6', 'sign': '-', 'num2': '0', 'equals': '=', 'result': '6' },
            { 'num1': '9', 'sign': '-', 'num2': '2', 'equals': '=', 'result': '7' },
            { 'num1': '8', 'sign': '-', 'num2': '3', 'equals': '=', 'result': '5' },
            { 'num1': '7', 'sign': '-', 'num2': '6', 'equals': '=', 'result': '1' },
            { 'num1': '6', 'sign': '-', 'num2': '2', 'equals': '=', 'result': '4' },
        ],
        'subt2': [
            { 'num1': '5', 'sign': '-', 'num2': '3', 'equals': '=', 'result': '2' },
            { 'num1': '2', 'sign': '-', 'num2': '1', 'equals': '=', 'result': '1' },
            { 'num1': '4', 'sign': '-', 'num2': '1', 'equals': '=', 'result': '3' },
            { 'num1': '9', 'sign': '-', 'num2': '3', 'equals': '=', 'result': '6' },
            { 'num1': '3', 'sign': '-', 'num2': '2', 'equals': '=', 'result': '1' },
        ],
        'subt3': [
            { 'num1': '8', 'sign': '-', 'num2': '7', 'equals': '=', 'result': '1' },
            { 'num1': '8', 'sign': '-', 'num2': '2', 'equals': '=', 'result': '6' },
            { 'num1': '6', 'sign': '-', 'num2': '1', 'equals': '=', 'result': '5' },
            { 'num1': '3', 'sign': '-', 'num2': '1', 'equals': '=', 'result': '2' },
            { 'num1': '5', 'sign': '-', 'num2': '1', 'equals': '=', 'result': '4' },
        ],
        'mixt1': [
            { 'num1': '4', 'sign': '+', 'num2': '5', 'equals': '=', 'result': '9' },
            { 'num1': '5', 'sign': '-', 'num2': '2', 'equals': '=', 'result': '3' },
            { 'num1': '2', 'sign': '+', 'num2': '8', 'equals': '=', 'result': '10' },
            { 'num1': '9', 'sign': '-', 'num2': '3', 'equals': '=', 'result': '6' },
            { 'num1': '3', 'sign': '+', 'num2': '1', 'equals': '=', 'result': '4' },
        ],
        'mixt2': [
            { 'num1': '3', 'sign': '+', 'num2': '2', 'equals': '=', 'result': '5' },
            { 'num1': '9', 'sign': '-', 'num2': '4', 'equals': '=', 'result': '5' },
            { 'num1': '9', 'sign': '+', 'num2': '1', 'equals': '=', 'result': '10' },
            { 'num1': '6', 'sign': '-', 'num2': '5', 'equals': '=', 'result': '1' },
            { 'num1': '4', 'sign': '-', 'num2': '2', 'equals': '=', 'result': '2' },

        ],
        'mixt3': [

            { 'num1': '4', 'sign': '-', 'num2': '2', 'equals': '=', 'result': '2' },
            { 'num1': '2', 'sign': '+', 'num2': '2', 'equals': '=', 'result': '4' },
            { 'num1': '8', 'sign': '-', 'num2': '6', 'equals': '=', 'result': '2' },
            { 'num1': '1', 'sign': '+', 'num2': '5', 'equals': '=', 'result': '6' },
            { 'num1': '1', 'sign': '-', 'num2': '5', 'equals': '=', 'result': '4' },
        ],

    }


    //Numbers
    const numbers = [0, 1, 2, 3, 4];

    //Numbers for colors
    const numbersColors = [0, 1, 2, 3, 4, 5];
    const numbersColors2 = [0, 1, 2, 3, 4, 5];

    var numbersRandom;

    function createBricksOperations(num) {

        var bricks = [];
        var numbersRandomColor;
        var numbersRandomColor2;

        //comment
        numbersRandom = numbers.sort(function () { return Math.random() - 0.5 });

        //comment
        numbersRandomColor = numbersColors.sort(function () { return Math.random() - 0.5 });
        numbersRandomColor2 = numbersColors2.sort(function () { return Math.random() - 0.5 });

        var sumsObject = operations[ope[numOperation] + numBlock];

        for (let index = 0; index < num; index++) {
            bricks.push(<div style={{ display: "flex", justifyContent: "space-between" }} ><div style={{ display: 'flex', justifyContent: "space-between" }}>
                <Brick id={"static_" + index} color={colors[numbersRandomColor[index]]} text={sumsObject[numbersRandom[index]].num1} /><main className="flexboxB"></main>
                <Brick id={"static_" + index} color={colors[numbersRandomColor[index + 1]]} text={sumsObject[numbersRandom[index]].sign} /><main className="flexboxB"></main>
                <Brick id={"static_" + index} color={colors[numbersRandomColor[index + 2]]} text={sumsObject[numbersRandom[index]].num2} /><main className="flexboxB"></main>
                <Brick id={"static_" + index} color={colors[numbersRandomColor[index + 1]]} text={sumsObject[numbersRandom[index]].equals} /><main className="flexboxB"></main>
                <main className="flexbox"><Board id={"board" + index} className="board"></Board></main></div>
                <Brick id={index} draggable={true} color={colors[numbersRandomColor2[index]]} text={sumsObject[numbersRandom[index]].result} /> <br /> </div>, <br />);
        }

        return <div>{bricks}</div>
    }


    function renderResults() {

        const results = []

        for (let index = 0; index < resultadosBuenos.length; index++) {
            //console.log(resultadosMalos[index]);
            results.push(
                <ListGroupItem style={{ color: "green" }}>
                    <CheckCircle /> &nbsp;
                    {resultadosBuenos[index]}
                </ListGroupItem>
            )
        }

        for (let index = 0; index < resultadosMalos.length; index++) {
            //console.log(resultadosMalos[index]);
            results.push(
                <ListGroupItem style={{ color: "red" }}>
                    <XCircle /> &nbsp;
                    {resultadosMalos[index]}
                </ListGroupItem>
            )
        }

        return results
    }

    const renderGeneralResult = (num) => {

        var result = puntos / (num * 3);

        return (<div style={{ color: result >= 70 ? "green" : "red", fontSize: 30 }}>{(result * 100).toFixed(2)} %</div>)
    }

    const colors =
        [
            "#ff8500",
            "#00861c",
            "#0055bf",
            "#51a5db",
            "#ffed00",
            "#e3000b",
        ]

    let displayContent = <div>
        <h1>
            Suma y Resta #1
        </h1>
        <hr />

        <h3>
            Revisar y arrastrar el resultado a la operación correspondiente.
        </h3>

        <div style={{ fontSize: '20px', color: 'red' }} id='error'>

        </div>

        <br></br>

        {display == false ? <div>{createBricksOperations(3)}</div> : ""}

        {display ? <p style={{ backgroundColor: "#F8F9FA", textAlign: "center" }} >Fin del juego</p> : <button className='button' onClick={() => { checkAnswers(3); }}>
            Continuar
        </button>}

        <br></br>
        <br></br>

        {display ? <div>
            {renderResults()}
        </div> : ''}

        <br />
        <br />
        {display ? <div>{renderGeneralResult(3)}</div> : ''}
        <br></br>
        <hr />
    </div>

    return (
        <>
            <div>
                {displayContent}
            </div>
        </>
    )

}


export default SumaResta1