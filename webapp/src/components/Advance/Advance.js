import React, { useState } from 'react';
import axios from 'axios';
import { Alert, Spinner, Container, Form, Col, Button } from 'react-bootstrap';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiContants'
import './Advance.css'

import Search from './Search'
import FormGroup from '../Forms/FormGroup'

const createPrice = () => {
    return {
        tax: {
            updateKey: 'tax',
            label: 'Tax',
            value: 0
        },
        shipping: {
            updateKey: 'shipping',
            label: 'Shipping',
            value: 0
        },
        savings: {
            updateKey: 'savings',
            label: 'Savings',
            value: 0
        },
        value: {
            updateKey: 'value',
            label: 'Price',
            value: 0
        }
    }
}

/* 
    Este componente EJEMPLO es una version avanzada que usa FORM de react-bootstrap para guardar con una llamada al servidor 
    los datos que provee el usuario, este ejemplo ademas usa un componente personalizado (FormGroup) el cual es una adaptacion 
    de los componentes que tiene el componente Form de react-bootstrap. 
    Ademas este ejemplo maneja eventos mas avanzados como referencia para posibles implementaciones en las actividades.
*/
function Advance(props) {
    const [showSaveMessageResult, setShowSaveMessage] = useState(false)
    const [saveMessage, setSaveMessage] = useState('')
    const [savingProduct, setSavingProduct] = useState(false)

    const [productState, setProductState] = useState({        
        productInfo: {
            name: {
                updateKey: 'name',
                label: 'Name',
                value: ''
            },
            sku: {
                updateKey: 'sku',
                label: 'Sku',
                value: ''
            },
            description: {
                updateKey: 'description',
                label: 'Description',
                value: ''
            }
        },
        retailPrice: createPrice(),
        employeePrice: createPrice(),        
    })

    const changeProductState = ({ groupKey, inputData }) => {        
        const productGroup = productState[groupKey]
        productGroup[inputData.key]['value'] = inputData.value

        setProductState({
            ...productState,
            [groupKey]: {
                ...productGroup
            }
        })
    }

    const updateStateUsingKeys = (groupKey, data, keys) => {        
        keys.forEach(key => {
            changeProductState({ groupKey, inputData: { key, value: data[key] } })
        })
    }

    const onProductFound = (product) => {
        console.log('product found ', product)

        updateStateUsingKeys('productInfo', product.productInfo, Object.keys(product.productInfo))
        updateStateUsingKeys('retailPrice', product.retailPrice, Object.keys(product.retailPrice))
        updateStateUsingKeys('employeePrice', product.employeePrice, Object.keys(product.employeePrice))        
    }

    const handleSubmit = (e) => {
        console.log('saving ', productState)
        e.preventDefault();
        setSavingProduct(true)
        setSaveMessage('')
        setShowSaveMessage(false)        

        axios.post(API_BASE_URL + `/save/${productState.productInfo.sku.value}`, productState, { headers: { 'Authorization': localStorage.getItem(ACCESS_TOKEN_NAME) } })
            .then((response) => {
                if (response.status === 201) {
                    window.location.reload()
                } else {
                    setSaveMessage(`Error saving product ${productState.productInfo.sku.value}`)
                    setShowSaveMessage(true)
                }
            })
            .catch((error) => {
                console.error(error)
                setShowSaveMessage(true)
                setSaveMessage(`Error saving product ${productState.productInfo.sku.value}`)
            }).finally(() => {
                setSavingProduct(false)
            })
    }

    return (
        <Container>
            <Alert className="save-message" variant="danger" dismissible show={showSaveMessageResult} onClick={() => setShowSaveMessage(false)}>
                <Alert.Heading>{saveMessage}</Alert.Heading>
            </Alert>
            <Search productFound={onProductFound} />
            <Form onSubmit={handleSubmit}>
                <Form.Row className="mt-2">
                    <Col md={4}>
                        <FormGroup title={"Product Info"} formGroupKey={"productInfo"} updateEvent={changeProductState} data={productState.productInfo} columns={2} />
                    </Col>
                    <Col md={4}>
                        <FormGroup title={"Retail Pricing"} formGroupKey={"retailPrice"} updateEvent={changeProductState} data={productState.retailPrice} columns={2} />
                    </Col>
                    <Col md={4}>
                        <FormGroup title={"Employee Pricing"} formGroupKey={"employeePrice"} updateEvent={changeProductState} data={productState.employeePrice} columns={2} />
                    </Col>                                        
                </Form.Row>                
                <Form.Row className="mt-3 justify-content-center" disabled={savingProduct}>
                    <Button type="submit" variant="outline-primary">
                        {savingProduct ? <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner> :
                            'Save'}
                    </Button>
                </Form.Row>
            </Form>

        </Container>
    )
}

export default Advance;