import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PwdSearchAnswerForm = ({id, pwd}) => {

  // navigation 생성
  const navigation = useNavigate();
  /// 메서드 모음
  
  // 로그인으로 이동
  function handleLoginClick() {
    navigation("/login");
  }
  

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col sm={3}>
          {id}님의 아이디는
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col sm={3}>
          {pwd}
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col sm={3} className="d-grid gap-2">
          <Button onClick={handleLoginClick} size="lg">로그인</Button>
        </Col>  
      </Row>
    </Container>
  )
}

export default PwdSearchAnswerForm