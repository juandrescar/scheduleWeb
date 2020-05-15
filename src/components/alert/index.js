import React from 'react';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function AlertTask(props) {
  const {
    errors,
    success,
    message,
  } = props;

  return(
    <Alert variant={success ? 'success' : 'danger'} show={message!=null}>
      <Alert.Heading>{message}</Alert.Heading>
      <ul>
        {errors.map((error, i) =>
          <li
            key={i}
          >
            {error.msg}
          </li>
        )}
      </ul>
    </Alert>
  );
}

export default AlertTask;