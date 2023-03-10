import React, { useContext } from 'react'
import { Button, Col, Container, Form, Nav, Navbar, Row } from 'react-bootstrap';
import { ItemRankContext } from '../ItemRankForm';

/**
 * Item rank list search component
 * writer : 이호진
 * init : 2023.03.09
 * updated by writer :
 * update :
 * description : 상품 순위 목록 검색 component
 */
const ItemRankSearchNavForm = () => {

  /// 변수 모음
  // 외부의 변수 불러오기
  const {handleSearchClick} = useContext(ItemRankContext);

  /// 상태 모음

  /// 메서드 모음

  /// view 모음

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {/* 상품 순위 search */}
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="원하는 순위를 입력하세요"
              className="me-2"
              aria-label="Search"
              name="name"
            />
            <Button type="button" onClick={handleSearchClick}>Search</Button>
          </Form>  
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default ItemRankSearchNavForm;