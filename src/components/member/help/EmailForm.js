import React, { useContext } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { SearchIdContext } from './IdSearchForm';

export const EmailForm = () => {

  // 외부 상태, 변수, 메서드 불러오기
  const {loding, handleDataChange, handleSearchIdSubmit, error, data} = useContext(SearchIdContext);

  // 작업 처리 중일 때 view
  if(loding) return <div>요청 처리 중...</div> 

  return (
    <Form onSubmit={handleSearchIdSubmit}>
        <Form.Group className="mb-3">
            <Form.Label>이름</Form.Label>
            <Form.Control type="text" name="name" value={data.name} placeholder="Enter NAME" onChange={handleDataChange} />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>이메일</Form.Label>
            <Form.Control type="text" name="email" value={data.email} placeholder="이메일" onChange={handleDataChange} />
        </Form.Group>

        {/* errorMsg box */}
        <Form.Group>
          <Col className="error">
            {error}
          </Col>
        </Form.Group>
       
        <Button variant="primary" type="submit">
        찾기
        </Button>
    </Form>
  )
}

export default EmailForm;
