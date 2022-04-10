import React, { useState } from 'react';
import axios from 'axios';
import { Spinner, Alert, Card, Form, Row, Col, Button } from 'react-bootstrap';

import FormInput from '../Forms/FormInput'

import './Simple.css';
import { API_BASE_URL } from '../../constants/apiContants';

const createInputState = (updateKey, label, value) => {
    return {
        updateKey,
        label,
        value
    }
}

/* 
    Este componente EJEMPLO usa FORM de react-bootstrap para guardar con una llamada al servidor los datos que provee el usuario, 
    este ejemplo ademas usa un componente personalizado (FormInput) el cual es una adaptacion de los componentes que tiene 
    el componente Form de react-bootstrap. 
    Como se puede observar este componente Simple.js tiene su propio CSS, asi cada actividad puede tener sus propios estilos.
*/
function Simple(props) {
    const [showMessageResult, setShowMessage] = useState(false)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const [state, setState] = useState({
        username: createInputState('username', 'username', ''),
        firstname: createInputState('firstname', 'firstname', ''),
        lastname: createInputState('lastname', 'lastname', '')
    })
    const handleChange = (e) => {        
        const newState = {
            ...state[e.key],
            value: e.value
        }

        setState({
            ...state,
            [e.key]: newState
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('state ' , state)

        setShowMessage(false)
        setMessage('')
        setLoading(true)

        const payload = {
            "username": state.username.value,
            'data': state
        }

        console.log('saving ' , payload)
        axios.post(API_BASE_URL + '/save', payload)
            .then(function (response) {
                if (response.status === 200) {                    
                    console.log('saved')
                }
                else {
                    setShowMessage(true)
                    setMessage('Error')
                }
            })
            .catch(function (error) {
                console.log(error);
                setShowMessage(true)
                setMessage('Error')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <Row>
            <Col>
                <Card className="simple-form m-auto p-5">
                    <Form onSubmit={handleSubmit}>
                        <FormInput updateEvent={handleChange} data={state.username}/> 
                        <FormInput updateEvent={handleChange} data={state.firstname}/> 
                        <FormInput updateEvent={handleChange} data={state.lastname}/>   

                        <Form.Row className="justify-content-center">
                            <Button type="submit" variant="outline-primary" disabled={loading}>
                                {loading ? <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner> :
                                    'Save'}
                            </Button>
                        </Form.Row>
                    </Form>
                    <Alert className="simple-message mt-5" variant="danger" dismissible show={showMessageResult} onClick={() => setShowMessage(false)}>
                        <Alert.Heading>{message}</Alert.Heading>
                    </Alert>
                </Card>
            </Col>
        </Row>
    )
}

export default Simple;