import { Button, Col, Row, Table } from 'react-bootstrap';
import React from 'react';
import { noop } from '../helpers';

const DisplayTodoItemsComponent = (props) => {
  const {
    todos = [], handleMarkAsComplete = noop, getItems = noop
  } = props;
  return (
    <Row>
      <Col>
        <h1>
          Showing {todos.length} Item(s){' '}
          <Button variant='primary' className='pull-right' onClick={() => getItems()}>
            Refresh
          </Button>
        </h1>
        <Table striped bordered hover>
          <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody data-testid="TodoComponentList">
          {todos.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.description}</td>
              <td>
                {!item.isCompleted ?
                  <Button variant='warning' size='sm' onClick={() => handleMarkAsComplete(item, true)}>
                    Mark as completed
                  </Button>
                  :
                  <Button variant='success' size='sm' onClick={() => handleMarkAsComplete(item, false)}>
                    Mark as not completed
                  </Button>
                }
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default DisplayTodoItemsComponent;