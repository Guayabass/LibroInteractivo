import React, { useState } from 'react';
import { Col, Row, Card } from 'react-bootstrap';

import FormInput from './FormInput';

function FormGroup({ title, formGroupKey, updateEvent, data, columns = 1 }) {
    const [inputGroup, updateFormInputState] = useState(data)    
    function updateFormInput(formInput) {              
        const newState = Object.assign({}, inputGroup, formInput)          
        updateFormInputState(newState)                  
        updateEvent({'groupKey': formGroupKey, inputData: newState})
    }  

    function buildColumnsPerRow (items, cols) {
        return items.reduce((acc, val, i) => {
          const idx = Math.floor(i / cols)
          const col = acc[idx] || (acc[idx] = [])
          col.push(val)
      
          return acc
        }, [])
      }

      function renderFormInput(formInput) {
            return <Col key={`col${formInput.updateKey}`} ><FormInput key={formInput.updateKey} label={formInput.label} updateKey={formInput.updateKey} updateEvent={updateFormInput}  data={formInput}/></Col>
      }

    function renderFormInputs(inputs) {        
        const rows = buildColumnsPerRow(inputs, columns)          
        
        return rows.map((formInputs, i) => {
            return <Row key={`row${formGroupKey}${i}`}>
                {formInputs.map(renderFormInput)}
            </Row>
        })      
    }

    return (
        <Card className="form-card p-2">
            <Card.Title>{title}</Card.Title>            
            {renderFormInputs(Object.keys(data).map(key => data[key]))}          
        </Card>
    )
}

export default FormGroup;