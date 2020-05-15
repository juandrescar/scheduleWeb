import React from 'react';
import { Form, Button, Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function FormTask(props) {
  const {
    errors,
    item,
    method,
    onNewItem,
    onUpdateItem,
    handleSubmit,
    handleChange
  } = props;

  var validations = errors.map(function (msg){
    var error = {};
    error[msg.field] = msg.msg
    return error;
  })

  var validations = validations.reduce(function(result, item) {
    var key = Object.keys(item)[0];
    result[key] = item[key];
    return result;
  }, {});

  return(
    <Container className='mt-5'>
      <h2>Formulario de Tareas</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={10}>
            <Form.Row>
              <Form.Label column="sm" lg={2}>
                Titulo de la tarea
              </Form.Label>
              <Col>
                <Form.Control name="title" value={item.title} onChange={handleChange} size="sm" type="text" placeholder="Agregue un titulo" isInvalid={!!validations.title}/>
                <Form.Control.Feedback type="invalid">
                  {validations.title}
                </Form.Control.Feedback>
              </Col>
            </Form.Row>
            <Form.Row>
              <Form.Label column="sm" lg={2}>
                Canal de Slack
              </Form.Label>
              <Col>
                <Form.Control name="slackChannel" value={item.slackChannel} size="sm" type="text" onChange={handleChange} placeholder="Indique canal de slack a conectarse" isInvalid={!!validations.slackChannel}/>
                <Form.Control.Feedback type="invalid">
                  {validations.slackChannel}
                </Form.Control.Feedback>
              </Col>
            </Form.Row>
            <Form.Row>
              <Form.Label column="sm" lg={2}>
                Fecha
              </Form.Label>
              <Col>
                <Form.Control name="date" value={item.date} size="sm" type="text" onChange={handleChange} placeholder="Indique canal de slack a conectarse" isInvalid={!!validations.date}/>
                <Form.Control.Feedback type="invalid">
                  {validations.date}
                </Form.Control.Feedback>
              </Col>
            </Form.Row>
            <Form.Row>
              <Form.Label column="sm" sm={2}>
                Descripción
              </Form.Label>
              <Col>
                <Form.Control name="description" value={item.description} onChange={handleChange} as="textarea" size="sm" type="text" placeholder="Descripción de la tarea" />
              </Col>
            </Form.Row>
          </Col>
          <Col xs={2}>
            <Button variant="primary" type="button" size="sm" block onClick={onNewItem}>
              Submit
            </Button>
            <Button variant="primary" type="button" size="sm" block disabled={method != 'update'} onClick={onUpdateItem}>
              Actualizar
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default FormTask;