import { Button, Col, Container, Form, Row, Stack } from 'react-bootstrap';
import React from 'react';
import { noop } from '../helpers';

const AddTodoComponent = (props) => {
  const {
    handleClear = noop, handleDescriptionChange = noop, handleAdd = noop,
    description = ''
  } = props;
  return (
    <Row>
      <Col>
        <Container>
          <h1>Add Item</h1>
          <Form.Group as={Row} className='mb-3' controlId='formAddTodoItem'>
            <Form.Label column sm='2'>
              Description
            </Form.Label>
            <Col md='6'>
              <Form.Control
                type='text'
                placeholder='Enter description...'
                value={description}
                onChange={handleDescriptionChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3 offset-md-2' controlId='formAddTodoItem'>
            <Stack direction='horizontal' gap={2}>
              <Button data-testid="AddTodoButton" variant='primary' onClick={() => handleAdd()}>
                Add Item
              </Button>
              <Button variant='secondary' onClick={() => handleClear()}>
                Clear
              </Button>
            </Stack>
          </Form.Group>
        </Container>
      </Col>
    </Row>
  );
};

export default AddTodoComponent;