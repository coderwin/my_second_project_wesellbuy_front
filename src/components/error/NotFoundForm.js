import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

/**
 * NotFound for error component
 * writer : 이호진
 * init : 2023.02.21
 * updated by writer :
 * update :
 * description : 404에러(클라이언트의 잘못된 요청 에러) 났을 때 페이지
 */
const NotFoundForm = () => {

  /// 변수 모음
  const navigation = useNavigate();

  /// 메서드 모음
  // "/"으로 이동
  function handleHomeClick() {
    navigation("/");
  }

  return (
    <Container>
      <Row>
        <Col>
          잘못된 요청입니다.
        </Col>
      </Row>
      <Row>
        <Col>
          다시 요청해주세요
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={handleHomeClick}>홈으로</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFoundForm