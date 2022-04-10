import { Button, Modal, Container, Row, Col, Form } from 'react-bootstrap'
import React, { useState } from 'react'
import Brick from './Brick'
import {textColors} from './Operation'
// import './ModalTemp.css'

function ModalTemp({ onSelected, show, header }) {    
    const [selected, setSelected] = useState([]);
  
    const handleClose = () => {          
        onSelected(selected.join(''))
    };

    const handleClick = (e) => {
      var list = [...selected]
      list.push(e.target.textContent)
      setSelected(list)
    }

    const handleDelete = (e) => {
      var list = [...selected]
      list.pop()
      setSelected(list)
    }

    return (
      <>        
        <Modal animation={false} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{header}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row className="justify-content-md-center">
                <Col xs lg="3"><Brick color={textColors[1]} text={1} size="sm" onClick={handleClick}/></Col>
                <Col xs lg="3"><Brick color={textColors[2]} text={2} size="sm" onClick={handleClick}/></Col>
                <Col xs lg="3"><Brick color={textColors[3]} text={3} size="sm" onClick={handleClick}/></Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col xs lg="3"><Brick color={textColors[4]} text={4} size="sm" onClick={handleClick}/></Col>
                <Col xs lg="3"><Brick color={textColors[5]} text={5} size="sm" onClick={handleClick}/></Col>
                <Col xs lg="3"><Brick color={textColors[6]} text={6} size="sm" onClick={handleClick}/></Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col xs lg="3"><Brick color={textColors[7]} text={7} size="sm" onClick={handleClick}/></Col>
                <Col xs lg="3"><Brick color={textColors[8]} text={8} size="sm" onClick={handleClick}/></Col>
                <Col xs lg="3"><Brick color={textColors[9]} text={9} size="sm" onClick={handleClick}/></Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col xs lg="3"><Brick color={textColors[""]} text={"-"} size="sm" onClick={handleClick}/></Col>
                <Col xs lg="3"><Brick color={textColors[0]} text={0} size="sm" onClick={handleClick}/></Col>
                <Col xs lg="3"><Brick color={textColors[""]} text={"<"} size="sm" onClick={handleDelete}/></Col>
              </Row>
            </Container>
            <Form>
              <Form.Group controlId="resultado">
                <Form.Label>Resultado</Form.Label>
                <Form.Control type="text" plaintext readOnly value={selected.length > 0 ? selected.join("") : "0"}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>            
            <Button variant="primary" onClick={handleClose}>
              Enviar Resultado
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  export default ModalTemp