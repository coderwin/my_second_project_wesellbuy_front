import React, { useContext } from 'react'
import { Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import ImagesBox from '../../common/image/ImagesBox';
import { ItemDetailContext } from '../ItemDetailForm';

/**
 * Item detail 내용 component
 * writer : 이호진
 * init : 2023.03.07
 * updated by writer :
 * update :
 * description : 상품 상세보기 내용 box component
 */
const ItemDetailBoxForm = () => {

  /// 변수 모음
  const {data} = useContext(ItemDetailContext);
  /// 상태 모음
  /// 
  return (
    <>
      <ListGroup as="ul">
        {/* 상품명 */}
        <ListGroupItem>{data.name}</ListGroupItem>
        {/* 이미지 모음 */}
        <ImagesBox srcArr={srcArr}/>
        {/* 판매자 아이디 */}
        <ListGroupItem>
          <Col ms="2">판매자</Col>
          <Col ms="2">{data.memberId}</Col>
        </ListGroupItem>
        {/* 좋아요수 */}
        <ListGroupItem>
          {/* 클릭하면 증가 */}
          <Col ms="2">좋아요</Col>
          <Col ms="2">{data.likes}</Col>
        </ListGroupItem>
        {/* 조회수 */}
        <ListGroupItem>
          <Col ms="2">조회수</Col>
          <Col ms="2">{data.hits}</Col>
        </ListGroupItem>
        {/* 가격 */}
        <ListGroupItem>
          <Col ms="2">가격</Col>
          <Col ms="2">{data.price} <span>원</span></Col>
        </ListGroupItem>
        {/* 저자 - type:B에서만 */}
        {data.type === "B" && 
          <ListGroupItem>
            <Col ms="2">저자</Col>
            <Col ms="2">{data.author}</Col>
          </ListGroupItem>
        }
        {/* 출판사 - type:B에서만 */}
        {data.type === "B" && 
          <ListGroupItem>
            <Col ms="2">출판사</Col>
            <Col ms="2">{data.publisher}</Col>
          </ListGroupItem>
        }
        {/* 제조회사 - type:HA에서만 */}
        {data.type === "HA" && 
          <ListGroupItem>
            <Col ms="2">제조회사</Col>
            <Col ms="2">{data.company}</Col>
          </ListGroupItem>
        }
        {/* 설명 */}
        <ListGroupItem>
          {data.content}
        </ListGroupItem>
      </ListGroup>
    </>
  )
}

export default ItemDetailBoxForm