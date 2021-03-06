import React from 'react';
import { Form, Button, Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css"

function FormTask(props) {
  const {
    errors,
    item,
    channels,
    method,
    onNewItem,
    onUpdateItem,
    handleSubmit,
    handleChange,
  } = props;

  var validations = errors.map(function (msg){
    var error = {};
    error[msg.field] = msg.msg
    return error;
  })

  validations = validations.reduce(function(result, item) {
    var key = Object.keys(item)[0];
    result[key] = item[key];
    return result;
  }, {});

  return(
    <Container className='mt-5'>
      <h2>Task Form</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={10}>
            <Form.Row>
              <Form.Label column="sm" lg={2}>
                Task title
              </Form.Label>
              <Col>
                <Form.Control name="title" value={item.title} onChange={handleChange} size="sm" type="text" placeholder="Add a title" isInvalid={!!validations.title}/>
                <Form.Control.Feedback type="invalid">
                  {validations.title}
                </Form.Control.Feedback>
              </Col>
            </Form.Row>
            <Form.Row>
              <Form.Label column="sm" lg={2}>
                Slack's channel
              </Form.Label>
              <Col>
                <Form.Control as="select" size="sm" name="slackChannel" placeholder="Select channel" value={item.slackChannel} onChange={handleChange} custom isInvalid={!!validations.slackChannel}>
                  {channels.map((channel, i) =>
                    <option
                      key={i}
                      value={channel}
                    >              
                      {channel.name}
                    </option>
                  )} 
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {validations.slackChannel}
                </Form.Control.Feedback>
              </Col>
            </Form.Row>
            <Form.Row>
              <Form.Label column="sm" lg={2}>
                Date
              </Form.Label>
              <Col>
                <DatePicker
                  selected={item.date}
                  onChange={handleChange}
                  minDate={new Date()}
                  isClearable
                  dateFormat="yyyy/MM/dd"
                  className={"form-control form-control-sm " + ((!!validations.date) ? "is-invalid" : '')}
                />
                <span className="is-invalid"></span>
                <div className="invalid-feedback">{validations.date}</div>
              </Col>
            </Form.Row>
            <Form.Row>
              <Form.Label column="sm" sm={2}>
                Description
              </Form.Label>
              <Col>
                <Form.Control name="description" value={item.description} onChange={handleChange} as="textarea" size="sm" type="text" placeholder="Task description" />
              </Col>
            </Form.Row>
          </Col>
          <Col xs={2}>
            <Button variant="primary" type="button" size="sm" block onClick={onNewItem}>
              Submit
            </Button>
            <Button variant="primary" type="button" size="sm" block disabled={method !== 'update'} onClick={onUpdateItem}>
              Update
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default FormTask;