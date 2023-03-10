import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ImagesBox from '../../common/image/ImagesBox';
import { CustomerServiceDetailContext } from '../CustomerServiceDetailForm';

/**
 * CustomerService detail 내용 component
 * writer : 이호진
 * init : 2023.03.10
 * updated by writer :
 * update :
 * description : 고객지원글 상세보기 내용 box component
 */
const CustomerServiceDetailBoxForm = () => {

  /// 변수 모음
  const {data} = useContext(CustomerServiceDetailContext);// 외부의 변수, 상태, 메서드 불러오기

  /// 상태 모음

  /// 메서드 모음

  /// view 모음

  return (
    <>
      <ListGroup as="ul">
        {/* 신고된 회원 아이디 */}
        <ListGroupItem >
          <Row>
            <Col md="2">신고된 회원 아이디</Col>
            <Col md="2">{data.reportedId}</Col>
          </Row>
        </ListGroupItem>
        {/* 작성자 */}
        <ListGroupItem >
          <Row>
            <Col md="2">작성자</Col>
            <Col md="2">{data.memberId}</Col>
          </Row>
        </ListGroupItem>
        {/* 작성 날짜 */}
        <ListGroupItem>
          <Row>
            <Col md="2">작성날짜</Col>
            <Col md="2">{data.createDate}</Col>
          </Row>
        </ListGroupItem>
        {/* 신고 이유 */}
        <ListGroupItem>
          {data.content}
        </ListGroupItem>
      </ListGroup>
    </>
  )
}

export default CustomerServiceDetailBoxForm;