import React, { useState } from 'react';

import { Form } from 'react-bootstrap';

function FormInput({ updateEvent, data}) {
    const [state, updateValue] = useState(data)    
    function handleChange(e) {        
        updateValue({
            ...state,
            value: e.target.value
        })
        updateEvent({ key: data.updateKey, value: e.target.value })
    }
    
    return (
        <Form.Group controlId={`input${data.updateKey}`} className="text-left">
            <Form.Label>{state.label}</Form.Label>
            <Form.Control
                required
                placeholder={`Enter ${state.label}`}
                value={state.value}
                onChange={(e) => handleChange(e)}
            />
        </Form.Group>
    )
}

export default FormInput;