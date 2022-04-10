import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiContants';

import axios from 'axios'

import './Search.css'

const ProductSearch = ({ productFound }) => {
    const [showSearchMessageResult, setShowSearchMessage] = useState(false)
    const [searchMessage, setSearchMessage] = useState('')
    const [searchingProduct, setSearchingProduct] = useState(false)
    const [state, updateState] = useState({
        category: 'Cat1',
        sku: ''
    })

    const onChange = (e) => {
        const { id, value } = e.target
        updateState({
            ...state,
            [id]: value
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        setSearchingProduct(true)
        setSearchMessage('')
        setShowSearchMessage(false)
        axios.get(API_BASE_URL + `/search/${state.sku}`, { headers: { 'Authorization': localStorage.getItem(ACCESS_TOKEN_NAME) } })
            .then((response) => {
                if (response.status === 200) {
                    productFound(response.data)
                } else {
                    setSearchMessage(`Product ${state.sku} not found`)
                    setShowSearchMessage(true)
                }
            })
            .catch((error) => {                
                console.error(error)
                const errorMessage = error.response.status === 404 ? `Product ${state.sku} not found` : 'An error occurred while searching product'
                setShowSearchMessage(true)
                setSearchMessage(errorMessage)
            }).finally(() => {
                setSearchingProduct(false)
            })
    }

    return (
        <>
            <Alert className="product-search-message" variant="danger" dismissible show={showSearchMessageResult} onClick={() => setShowSearchMessage(false)}>
                <Alert.Heading>{searchMessage}</Alert.Heading>
            </Alert>

            <Form inline onSubmit={onFormSubmit}>
                <Form.Label className="my-1 mr-2" htmlFor="category">
                    Category
                </Form.Label>
                <Form.Control
                    as="select"
                    className="my-1 mr-sm-2"
                    id="category"
                    custom
                    value={state.category}
                    onChange={onChange}
                >
                    <option value="CAT1">CAT1</option>
                    <option value="CAT2">CAT2</option>
                </Form.Control>
                <Form.Label className="mr-2">Sku</Form.Label>
                <Form.Control className="mr-2"
                    id='sku'
                    required
                    placeholder="Sku"
                    value={state.sku}
                    onChange={onChange}
                />
                <Button type="submit" variant="outline-info" disabled={searchingProduct}>
                    {searchingProduct ? <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner> :
                        'Search'}
                </Button>
            </Form>
        </>
    )
}

export default ProductSearch