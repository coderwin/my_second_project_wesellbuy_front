import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const HeaderNav = () => {

  // 이동하기 만들기
  const navigation = useNavigate();
  // 홈으로
  const handleHomeClick = () => {
    navigation("/");
  }
  // 추천합니다
  const handleRecommendationClick = () => {
    navigation("/recommendation/list");
  }
  // 고객지원
  const handleCustomerServiceClick = () => {
    navigation("/cs");
  }
  // 상품등록
  const handleItemSaveClick = () => {
    navigation("/item/new");
  }


  return (
    <Navbar bg="light" expand="lg">
      <Container>
      <Navbar.Brand onClick={handleHomeClick} >React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="상품" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleItemSaveClick}>
                상품등록
              </NavDropdown.Item> 
            </NavDropdown>
            <Nav.Link onClick={handleRecommendationClick}>추천합니다</Nav.Link>
            <Nav.Link onClick={handleCustomerServiceClick}>고객지원</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default HeaderNav