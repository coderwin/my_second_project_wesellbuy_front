import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ReplyFormListContext } from './ReplyBoxForm';

/**
 * each reply component
 * writer : 이호진
 * init : 2023.03.07
 * updated by writer :
 * update :
 * description : 댓글 하나하나의 context 폼 component
 */
const ReplyForm = ({OnDeleteRepliesChange, reply}) => {

  /// 변수 모음
  // defaultData
    // reply에 boardNum이 없다
  const defaultData = {
    num: "", // 댓글 번호
    content: "", // 내용
    memberId: "", // 작성자 아이디
    createDate: "", // 작성 날짜
  }
  // 외부 변수, 상태, 메서드 불러오기
  const {updateReply, deleteReply} = useContext(ReplyFormListContext);
  // URI에서 boradNum 불러오기
  const {num: boardNum} = useParams();// 게시글 번호

  /// 상태 모음
  const [data, setData] = useState(defaultData);// reply data
  const [mode, setMode] = useState("read");// read, update mode
  const [memberInfo, setMemberInfo] = useState(null);// 로그인 회원정보

  /// 메서드 모음
  // 처음 시작 -> 데이터 뿌려주기
  useEffect(() => {
    // data에 ReplyDetailForm 대입
    console.log(`reply : ${reply}`);
    setData({
      ...data,
      ...reply
    });
    // sessionStorage에 회원정보 있으면 memberInfo에 memberData 대입하기
    const memberData = getMemberInfo();
    if(memberData !== null || memberData !== undefined) {
      setMemberInfo(memberData);
    }
  }, []);
  // sessionStorage에 있는 회원정보 불러오기
  function getMemberInfo() {
    const key = "LOGIN_MEMBER";
    return JSON.parse(sessionStorage.getItem(key));
  }
  // content 데이터 변경하기
  function handleDataChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }
  // mode=read에서 수정 클릭
  function handleUpdateClick() {
    // mode를 변경하기
    setMode("update");
  }
  // mode=read에서 삭제 클릭
  async function handleDeleteClick() {
    // 삭제할지 물어보기
    const answer = window.confirm("정말로 삭제하시겠습니까?");
    if(answer) {
      try {
        // 서버로 삭제요청 보내기
        const response = await deleteReply(boardNum, data.num);
        // 요청 성공
        console.log("삭제 성공");
        alert(response.data.data);
        // replyForms 데이터 filter 해주기
        OnDeleteRepliesChange(data.num);
      } catch(err) {
        // 요청 실패
        alert(err.response.data.errMsg);
      }
    }
  }
  
  // 수정완료 클릭 시, 서버로 수정 데이터 보내기
  async function handleUpdateFinishClick() {
    try {
      console.log(JSON.stringify(data));
      console.log(JSON.stringify(reply));
      // 서버로 수정 데이터 보내기
      const response = await updateReply(boardNum, data.num, data.content);
      // 요청 성공
      console.log("요청 성공");
      alert(response.data.data);
      // read 모드로 변경하기
      setMode("read");
    } catch(err) {
      // 요청 실패
      console.log("요청 실패");
      alert(err.response.data.errMsg);
      // read 모드로 변경하기
      setMode("read");
    }
  }
  // mode=update에서 취소 클릭
  function handleCancelClick() {
    // mode를 read로 변경
    setMode("read");
    // comment는 원래 데이터로 바꾸기
    setData({
      ...data,
      ...reply
    });
  }

  /// view 모음
  // read 모드
  const readView = (
    <>
      {/* 작성날짜 */}
      <ListGroup.Item as={Col}>
        {data.createDate}
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          {/* 작성자 아이디 */}
          <Col sm="2">
            {data.memberId}
          </Col>
          {/* 내용 */}
          <Col sm="10">
            {data.content}
          </Col>
        </Row>
      </ListGroup.Item>
      {/* 버튼 box */}
      {
        (memberInfo && memberInfo.id === data.memberId) && (<ListGroup.Item as={Col} sm="12">
          <Button onClick={handleUpdateClick}>수정</Button>
          <Button onClick={handleDeleteClick}>삭제</Button>
        </ListGroup.Item>)
      }
    </>
  );
  // update 모드
  const updateView = (
    <>
      {/* 작성날짜 */}
      <ListGroup.Item>
        {data.createDate}
      </ListGroup.Item>
      
      <ListGroup.Item>
        <Row>
          {/* 작성자 아이디 */}
          <Col sm="2">
            {data.memberId}
          </Col>
          {/* 내용 */}
          <Col sm="10">
            <Form.Control
              as="textarea"
              name="content"
              rows={10}
              value={data.content}
              placeholder="댓글을 입력하세요"
              onChange={handleDataChange}
            />
          </Col>
        </Row>
      </ListGroup.Item>
      {/* 버튼 box */}
      <ListGroup.Item>
        <Button onClick={handleUpdateFinishClick}>수정완료</Button>
        <Button onClick={handleCancelClick}>취소</Button>
      </ListGroup.Item>
    </>
  );
  // view 모양 정하기
  let view = ""; // 뷰의 모양을 정한다.
  // mode에 따른 view 정하기
  if(mode === "read") {
    view = readView;
  } else if(mode === "update") {
    view = updateView;
  }

  return (
    <>
      <ListGroup>
        {view}
      </ListGroup>
    </>
  )
}

export default ReplyForm