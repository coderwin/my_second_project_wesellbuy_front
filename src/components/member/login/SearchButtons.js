import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const SearchButtons = () => {

    const navigation = useNavigate();

    // 아이디 찾기
    const handleSearchIdClick = () => {
        navigation("/help/search/id");
    }
    // 비밀번호 찾기
    const handleSearchPwdClick = () => {
        navigation("/help/search/pwd");
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Button onClick={handleSearchIdClick} variant="outline-primary">아이디찾기</Button>
                </Col>
                <Col >
                    <Button onClick={handleSearchPwdClick}variant="outline-primary">비밀번호찾기</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default SearchButtons