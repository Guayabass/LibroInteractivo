import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { ACCESS_TOKEN_NAME } from '../../constants/apiContants';

/* 
    Header es un componente que se muestra en todas las paginas como parte del "layout" del app, tiene una barra de 
    navegacion que se puede utilizar como futura referencia para que el usuario pueda ingresar a las diferentes actividades.
*/
function Header(props) {
    function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        props.history.push('/login')
    }
    return (

        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">TCU 2020</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse >
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="simple">Simple example</Nav.Link>
                    <Nav.Link href="advance">Advance example</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default Header;