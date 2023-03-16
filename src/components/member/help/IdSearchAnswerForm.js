import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const IdSearchAnswerForm = ({name, ids}) => {

  // navigation 생성
  const navigation = useNavigate();
  /// 메서드 모음
  // 비밀번호 찾기로 이동
  function handleSearchIdClick() {
    navigation("/help/search/pwd");
  }
  // 로그인으로 이동
  function handleLoginClick() {
    navigation("/login");
  }
  
  const result = ids.map((id, num) => {
    return (
      <Row className="d-flex justify-content-center">
        <Col sm={4}>
          {id}
        </Col>
      </Row>
    );
  });
  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col sm={4}>
          {name}님의 아이디는
        </Col>
      </Row>
      {result}
      <Row className="d-flex justify-content-center">
        <Col sm={2}>
          <Button onClick={handleSearchIdClick}>비밀번호찾기</Button>
        </Col>
        <Col sm={2}>
          <Button onClick={handleLoginClick}>로그인</Button>
        </Col>  
      </Row>
    </Container>
  )
}

export default IdSearchAnswerForm