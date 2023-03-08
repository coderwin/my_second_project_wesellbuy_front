import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
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
  const {data, setData, memberInfo} = useContext(ItemDetailContext);// 외부의 변수, 상태, 메서드 불러오기
  const {num: boardNum} = useParams();// 상품번호 불러오기
  /// 상태 모음
  const {likesState, setLikesState} = useState(false);// 좋아요 선택 상태
  /// 처음 시작
  useEffect(() => {
    //좋아요 하트 표시 하기
    expressItemLikes();
  }, []);
  /// view 모음
  // 좋아요 표시 하기
  function expressItemLikes() {
    // sessionStorage에서 itemLikesList 불러오기
    const itemLikesList = getItemLikesList();
    // itemLikesList가 있으면 실행한다.
    if(itemLikesList) {
      // likes 태그 불러오기
      const likes = document.querySelector(".likes");
      // 순회하여 해당 상품의 번호가 있으면 생깔있는 하트표시하고
      for(let i = 0; i < itemLikesList.length; i++) {
        // 상품번호와 회원의 좋아요리스트에 같은 번호 있으면 
        // 색깔 하트를 뿌려준다.
        if(boardNum === itemLikesList[i]) {
          // 색깔 하트를 출력하기
          likes.innerHtml = "💓";
          // likesState = true로 바꾼다
          setLikesState(true);
          return;
        }
      }
      // 상품번호와 회원의 좋아요리스트에 같은 번호 없으면
      // 색깔없는 하트를 뿌려준다.
      likes.innerHTML = ":hearts:♥️";
      // likesState = false로 바꾼다
      setLikesState(false);
    }
  }
  // sessionStorage에서 itemLikesList 불러오기
  function getItemLikesList() {
    const key = "itemLikesList";
    return JSON.parse(sessionStorage.getItem(key));
  }
  // 좋아요 하트를 클릭했을 때 삭제하기
  async function deleteLikes(boardNum) {
    // 서버에 좋아요 삭제 요청하기
    return await axios.delete(
      `http://localhost:8080/items/${boardNum}/likes`,
      {
        withCredentials: true
      }
    );
  }
  // 좋아요 하트를 클릭했을 때 등록하기
  async function saveLikes(boardNum) {
    // 서버에 좋아요 삭제 요청하기
    return await axios.post(
      `http://localhost:8080/items/${boardNum}/likes`,
      {
        withCredentials: true
      }
    );
  }

  // 좋아요 하트를 클릭했을 때
  async function handleLikesClick() {
    // memberInfo 있는지 확인 == 로그인 사용자인지 확인
    if(memberInfo) {
      // likesState === true
      if(likesState === true) {
        // 서버에 좋아요 delete를 요청한다.
        try {
          const response = await deleteLikes(boardNum);
          // 요청 성공
          console.log("요청 성공");
          console.log(response.data.data);
          // likesState = false로 바꾸기
          setLikesState(false);
          // 좋아요수 1 증가시키기
          setData({
            ...data,
            likes: data.likes + 1
          });
        } catch(err) {
          // 요청 실패
          console.log("요청 실패");
          console.log(err);
        }
      // likesState === false
      } else {
        // 서버에 좋아요 delete를 요청한다.
        try {
          const response = await saveLikes(boardNum);
          // 요청 성공
          console.log("요청 성공");
          console.log(response.data.data);
          // likesState = true로 바꾸기
          setLikesState(true);
          // 좋아요수 1 감소시키기
          setData({
            ...data,
            likes: data.likes - 1
          });
        } catch(err) {
          // 요청 실패
          console.log("요청 실패");
          console.log(err);
        }
      }
    } else {
      // 로그인 후 사용하라고 말하기
      alert("로그인 후 이용해주세요");
    }
  }

  return (
    <>
      <ListGroup as="ul">
        {/* 상품명 */}
        <ListGroupItem>{data.name}</ListGroupItem>
        {/* 이미지 모음 */}
        {
          data.pictureForms.length !== 0 && (<ListGroupItem>
            <ImagesBox/>
          </ListGroupItem>)
        }
        {/* 판매자 아이디 */}
        <ListGroupItem >
          <Row>
            <Col md="2">판매자</Col>
            <Col md="2">{data.memberId}</Col>
          </Row>
        </ListGroupItem>
        {/* 좋아요수 */}
        <ListGroupItem>
          <Row>
            {/* 클릭하면 증가 */}
            <Col md="2">
              <span>좋아요</span>
              <span className="likes" onClick={handleLikesClick}></span>
            </Col>
            <Col md="2">{data.likes}</Col>
          </Row>
        </ListGroupItem>
        {/* 조회수 */}
        <ListGroupItem>
          <Row>
            <Col md="2">조회수</Col>
            <Col md="2">{data.hits}</Col>
          </Row>
        </ListGroupItem>
        {/* 가격 */}
        <ListGroupItem>
          <Row>
            <Col md="2">가격</Col>
            <Col md="2">{data.price} <span>원</span></Col>
          </Row>
        </ListGroupItem>
        {/* 저자 - type:B에서만 */}
        {data.type === "B" && 
          <ListGroupItem>
            <Row>
              <Col md="2">저자</Col>
              <Col md="2">{data.author}</Col>
            </Row>
          </ListGroupItem>
        }
        {/* 출판사 - type:B에서만 */}
        {data.type === "B" && 
          <ListGroupItem>
            <Row>
              <Col md="2">출판사</Col>
              <Col md="2">{data.publisher}</Col>
            </Row>
          </ListGroupItem>
        }
        {/* 제조회사 - type:HA에서만 */}
        {data.type === "HA" && 
          <ListGroupItem>
            <Row>
              <Col md="2">제조회사</Col>
              <Col md="2">{data.company}</Col>
            </Row>
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