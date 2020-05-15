import React from 'react';
import './style.css';
import logo from '../../logo.svg';

import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function TaskPage(props) {
  return(
    <React.Fragment>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Scheduler
        </Navbar.Brand>
      </Navbar>
      
      <div className="page">
        {props.children}
      </div>
    </React.Fragment>
  );
}

export default TaskPage;