import React, { useState } from 'react'
import Brick from './Brick'
import ModalTemp from './ModalTemp'

import './Operation.css'

const randomExpression = (max) => {
   return Math.floor(Math.random() * (max - 0)) + 0
}

export const textColors = {
    0: '#6d4c41',
    1: '#e53935',
    2: '#d81b60',
    3: '#8e24aa',
    4: '#3949ab',
    5: '#1e88e5',
    6: '#039be5',
    7: '#00acc1',
    8: '#00897b',   
    9: '#43a047',
    10: '#7cb342',
    '+': '#fdd835',
    '-': '#ffb300',
    '=': '#fb8c00',
}

const maxNumbers = 10

const getOperator = () => {
    const operators = ['+', '-']    
    return operators[randomExpression(operators.length)]
}

const calculateResult = (operator, firstValue, secondValue) => {
    return operator === '+' ? firstValue + secondValue : firstValue - secondValue
}

const getInitialState = () => {
    const operator = getOperator()
    const firstValue =   randomExpression(maxNumbers)
    const secondValue =   randomExpression(maxNumbers)
    return {
        operator,
        firstValue,
        secondValue,
        result : calculateResult(operator, firstValue, secondValue),
        selectedResult: ''
    }
}

function Operation({ id, onSelectedResult }) {    
    const [showSelectResult, setShowSelectResult] = useState(false);
    const [operationState, setOperationState] = useState(getInitialState())

    const showModal = (e) => {     
        e.preventDefault()   
        setShowSelectResult(true)
    }

    const selectResult = (value) => {            
        const intValue = parseInt(value)        
        setShowSelectResult(false)                
        setOperationState({
            ...operationState,
            selectedResult: value
        })
        onSelectedResult({
            id,
            firstValue: operationState.firstValue,
            operator: operationState.operator,
            secondValue: operationState.secondValue,
            correctResult: operationState.result,
            selectedResult: intValue,
            correct: operationState.result === intValue
        })
    }

    return(
        <div className="operation-container">
            <Brick color={textColors[operationState.firstValue]} text={operationState.firstValue}/>
            <Brick color={textColors[operationState.operator]} text={operationState.operator}/>
            <Brick color={textColors[operationState.secondValue]} text={operationState.secondValue}/>
            <Brick color={textColors['=']} text={'='}/>
            <Brick color={'#fffff0'} text={operationState.selectedResult} onClick={showModal}/>
            <ModalTemp onSelected={selectResult} show={showSelectResult} header={`Utilice el Numpad para digitar su respuesta de ${operationState.firstValue} ${operationState.operator} ${operationState.secondValue}`}/>
        </div>        
    )
}

export default Operation