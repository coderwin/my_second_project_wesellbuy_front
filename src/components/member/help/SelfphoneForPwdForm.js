import React, { useContext } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { SearchPwdContext } from './PwdSearchForm';

export const SelfphoneForPwdForm = () => {

  // 외부 상태, 변수, 메서드 불러오기
  const {loding, handleDataChange, handleSearchPwdSubmit, error, data} = useContext(SearchPwdContext);

  // 작업 처리 중일 때 view
  if(loding) return <div>요청 처리 중...</div> 

  return (
    <Form onSubmit={handleSearchPwdSubmit}>
        <Form.Group className="mb-3">
            <Form.Label>아이디</Form.Label>
            <Form.Control type="text" name="id" value={data.name} placeholder="Enter ID" onChange={handleDataChange} />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>휴대전화</Form.Label>
            <Form.Control type="text" placeholder="휴대전화 번호" name="selfPhone" value={data.selfPhone} onChange={handleDataChange} />
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

export default SelfphoneForPwdForm;
