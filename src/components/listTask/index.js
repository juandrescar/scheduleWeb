import React from 'react';
import { Table, Button, Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons'
import "./style.css"

function ListTask(props) {
  const {
    items,
    onEditItem,
    onRemoveItem,
    onToggledItemComplete
  } = props;

  return(
    <Container className='mt-5'>
      <h2>Listado de Tareas</h2>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Titulo</th>
            <th>Descripción</th>
            <th>Canal Slack</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((task, i) =>
            <tr
              key={i}
              onClick={() => onEditItem(task)}
            >
              <td>{i + 1}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.slackChannel.name}</td>
              <td>{task.customDate}</td>
              <td>
                <Button 
                  variant="outline-success"
                  type="button"
                  size="lg" 
                  onClick={() => onToggledItemComplete(task)}
                >
                  <FontAwesomeIcon icon={(task.status) ? faToggleOn:faToggleOff} />
                </Button>
                <Button 
                  variant="outline-danger"
                  type="button"
                  size="lg"
                  disabled={task.status}
                  onClick={() => onRemoveItem(task)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          )} 
        </tbody>
      </Table>
    </Container>
  );
}

export default ListTask;
