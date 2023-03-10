import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/**
 * Card Form component
 * writer : 이호진
 * init : 2023.03.09
 * updated by writer :
 * update :
 * description : Card component
 *               > 속성(props)
 *                - data: card에 입력하고 싶은 데이터 prop
 *                - likeList: 좋아요 표시를 위한 게시글번호 모음 prop
 *                - memberInfo: 회원정보 prop
 * 
 */
const CardWithHeaderForm = ({data, likesList, memberInfo})=> {

  /// 변수 모음
  const {num: boardNum, name, price, memberId, pictureForm, rank} = data;
  const navigation = useNavigate();// navigation

  /// 상태 모음
  const [likesState, setLikesState] = useState(false);// 좋아요 상태
  // const [content, setContent] = useState("");// 내용 상태
  const [src, setSrc] = useState("");// 이미지 src

  /// 메서드 모음
  /// 처음 시작
  useEffect(() => {
    //좋아요 하트 표시 하기
    expressItemLikes();
    // // 상품 설명은 30 글자로만
    // inputContent();
    if(pictureForm) {
      // 이미지 src 담기
      setSrc(createSrc(pictureForm.storedFileName));
    }
  }, []);
  // // 상품 설명은 30 글자로만
  // function inputContent() {
  //   // 상품의 설명은 30 글자만 한다.
  //   const newContent = data.content.slice(0, 30);
  //   // content에 담기
  //   setContent(newContent);
  // }
  // 좋아요 표시 하기
  function expressItemLikes() {
    // likesList가 있으면 실행한다.
    if(likesList) {
      // 순회하여 해당 상품의 번호가 있으면 생깔있는 하트표시하고
      for(let i = 0; i < likesList.length; i++) {
        // 상품번호와 회원의 좋아요리스트에 같은 번호 있으면 
        // 색깔 하트를 뿌려준다.
        if(boardNum === likesList[i]) {
          // likesState = true로 바꾼다
          setLikesState(true);
          return;
        }
      }
      // 상품번호와 회원의 좋아요리스트에 같은 번호 없으면
      // likesState = false로 바꾼다
      setLikesState(false);
    }
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
        } catch(err) {
          // 요청 실패
          console.log("요청 실패");
          console.log(err);
        }
      // likesState === false
      } else {
        // 서버에 좋아요 save를 요청한다.
        try {
          const response = await saveLikes(boardNum);
          // 요청 성공
          console.log("요청 성공");
          // likesState = true로 바꾸기
          setLikesState(true);
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
    // 서버에 좋아요 등록 요청하기
    return await axios.post(
      `http://localhost:8080/items/${boardNum}/likes`,
      {},
      {
        withCredentials: true
      }
    );
  }
  // 이미지 src 만들기
  function createSrc(storedFileName) {
    if(storedFileName) {
      return `http://localhost:8080/items/images/${storedFileName}`;
    }
  }
  // 상세보기 클릭했을 때
  // 상품 상세보기로 간다
  function handleDetailClick(e) {
    console.log(e.target.id);
    const boardNum = e.target.id;
    navigation(`/item/${boardNum}`);
    return;
  }


  /// view 모음
  
  return (
    <Card>
      <Card.Header>
        {rank}<span>위</span>
      </Card.Header>
      <Card.Img variant="top" src={src} />
      <Card.Body>
        <Card.Title>
          {name}
        </Card.Title>
        <Card.Text>
          {price}<span>원</span>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <span className="likes" onClick={handleLikesClick}>
          {likesState ? "💓" : "♥️"}
        </span>
        <Button type="button" id={boardNum} variant="primary" onClick={handleDetailClick}>상세보기</Button>
      </Card.Footer>
    </Card>
  )
}

export default CardWithHeaderForm;