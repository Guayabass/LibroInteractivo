import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import { Spinner, Alert, Card, Form, Row, Col, Button } from 'react-bootstrap';

import './Login.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiContants';

/* 
    Este componente es utilizado para autorizar el ingreso de los usuarios, este envia un request al servidor 
    el cual verifica los datos y en caso de ser correctos devuelve un token unico que autoriza al usuario a navegar por el app.
*/
function Login(props) {
    const [showMessageResult, setShowMessage] = useState(false)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const [state, setState] = useState({
        username: "",
        password: "",
    })
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setShowMessage(false)
        setMessage('')
        setLoading(true)

        const payload = {
            "username": state.username,
            "password": state.password,
        }
        console.log(API_BASE_URL)
        axios.post(API_BASE_URL + '/user/login', payload)
            .then(function (response) {
                if (response.status === 200) {                    
                    localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                    redirectToHome();
                }
                else {
                    setShowMessage(true)
                    setMessage('Invalid username or password')
                }
            })
            .catch(function (error) {
                console.log(error);
                setShowMessage(true)
                setMessage('Invalid username or password')
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const redirectToHome = () => {
        props.history.push('/');
    }

    return (
        <Row>
            <Col>
                <Card className="login-form m-auto p-5">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username" className="text-left">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                required
                                placeholder="Username"
                                value={state.username}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="password" className="text-left">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Password"
                                value={state.password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Row className="justify-content-center">
                            <Button type="submit" variant="outline-primary" disabled={loading}>
                                {loading ? <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner> :
                                    'Login'}
                            </Button>
                        </Form.Row>
                    </Form>
                    <Alert className="login-message mt-5" variant="danger" dismissible show={showMessageResult} onClick={() => setShowMessage(false)}>
                        <Alert.Heading>{message}</Alert.Heading>
                    </Alert>
                </Card>
            </Col>
        </Row>
    )
}

export default withRouter(Login);