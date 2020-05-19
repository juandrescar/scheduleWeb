import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ListTask(props) {
  const {
    items,
    onEditItem,
    onRemoveItem,
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
                {/* <Button 
                  variant="success"
                  type="button"
                  size="sm" 
                  onClick={() => onToggledItemComplete(task)}
                >
                  Ejecutar
                </Button> */}
                <Button 
                  variant="danger"
                  type="button"
                  size="sm"
                  onClick={() => onRemoveItem(task)}
                >
                  Eliminar
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
