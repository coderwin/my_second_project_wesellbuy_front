import React from 'react';
import { Button, Form } from 'react-bootstrap';

export const SelfphoneForm = () => {
  return (
    <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>이름</Form.Label>
            <Form.Control type="text" placeholder="Enter NAME" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>휴대전화</Form.Label>
            <Form.Control type="text" placeholder="휴대전화 번호" />
        </Form.Group>
        <Button variant="primary" type="submit">
        찾기
        </Button>

        
    </Form>
  )
}

export default SelfphoneForm;
