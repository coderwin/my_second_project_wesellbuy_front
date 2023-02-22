import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap';
import githubImage from '../../images/footer/github.png';
import notionImage from '../../images/footer/notion.png';

const FooterBottom = () => {
  return (
    <Container fluid="md">
        <Row>
            <Col>eamil: gommind@naver.com</Col>
            <Col>
                <Image
                    src={githubImage}
                    alt="github_address"
                />
            </Col>
            <Col>
                <Image
                    src={notionImage}
                    alt="notion_address"
                />
            </Col>     
        </Row>       
    </Container>
  )
}

export default FooterBottom