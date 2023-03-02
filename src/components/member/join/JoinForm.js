import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../../css/form.css';

const JoinForm = () => {

  // 상태 생성
  let defaultData = {
    name: "",
    id: "",
    pwd: "",
    pwdConfrim: "",
    email: "",
    selfPhone: "",
    homePhone: "",
    country: "",
    city: "",
    street: "",
    detail: "",
    zipcode: ""
  }
  // data
  const [data, setData] = useState(defaultData);
  // file
  const [file, setFile] = useState({file: null});
  
  let defaultErrMsgs = {
    name: "",
    id: "",
    pwd: "",
    pwdConfirm: "",
    email: "",
    selfPhone: "",
    homePhone: "",
    country: "",
    city: "",
    street: "",
    detail: "",
    zipcode: "",
    file: ""
  }
  // errMsgs
  const [errMsgs, setErrMsgs] = useState(defaultErrMsgs);


  // 상태값 변화시키기
  function handleInputDataChange(e) {
    console.log("value : " + e.target.value);
    // 상태값 바꾸기
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  // 파일 미리보기
  function showImage(e) {
    // .imageBox 아무것도 없게 만들기
    document.querySelector(".imageBox").innerHTML = "";

    let reader = new FileReader();
    console.log(e.target.files);

    reader.onload = function(event) {
      // img 태그 만들기
      let img = document.createElement("img");
      console.log(event.target.result);
      img.setAttribute("src", event.target.result);
      // .imageBox에 img 태그 담기
      document.querySelector(".imageBox").appendChild(img);
    }
    // reader가 이미지 읽도록 하기
    reader.readAsDataURL(e.target.files[0]);
  }

  // 파일 데이터 상태에 넣기
  // + 파일 미리보기
  function handleInputFileChange(e) {
    console.log(e.target.files);
    // file이 있으면 실행된다
    if(e.target.files) {
      setFile(e.target.files[0]);
      // 파일 미리보기 실행
      showImage(e);
    }
  }

  // navigator 생성
  const navigation = useNavigate();
  
  // 취소 클릭 -> /으로 가기
  function handleCancelClick() {
    navigation("/");
  }

  // 가입하기
  async function handleJoinSubmit(e) {
    // 이벤트 막기
    e.preventDefault();
    // FormData 객체 생성
    const formData = new FormData();
    // 데이터 넣기
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], {type: "application/json"});
    formData.append("data", blob);
    formData.append("file", file);
    // 데이터 서버로 보내기
    await axios({
        method: 'post',
        url: 'http://localhost:8080/members',
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
    })
    .then((response) => {
      console.log("요청 성공");
      console.log(response);
    })
    .catch((err) => {
      console.log("요청 실패");
      console.log(err.response.data);
      console.log(err.response.data.errors);
      // newErrMsgs 객체 생성하기
      let newErrMsgs = {};

      // field 값에 따라서 데이터 넣기
      for(let key in err.response.data.errors) {
        // errMsgs 상태 순회하기
        console.log(err.response.data.errors[key]);
        const newErrMsg = err.response.data.errors[key];
        for(let errMsgKey in errMsgs) {
            // newErrMsgs의 새로운 속성을 추가한다
            if(newErrMsg.field === errMsgKey) {
              newErrMsgs = {
                ...newErrMsgs,
                [newErrMsg.field]: newErrMsg.errMsg
              };
            // 없으면 errmsgKey의 값은 ""이다  
            }
        }
      }
      console.log("newErrMsgs -> " + newErrMsgs);
      // errMsgs value 교체하기
      setErrMsgs({
        ...defaultErrMsgs,
        ...newErrMsgs
      });
    });
  }
  console.log(errMsgs);
  
  // view 만들기
  return (

    <Form onSubmit={handleJoinSubmit}>
      {/* name  */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Name <span className='important'>*</span>
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" name="name" onChange={handleInputDataChange} />
        </Col>
        {/* 에러 메시지 */}
        <Col className="error">
          {errMsgs.name}
        </Col>
      </Form.Group>
      {/* id  */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          ID <span className='important'>*</span>
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" name="id" onChange={handleInputDataChange} />
        </Col>
        {/* 에러 메시지 */}
        <Col className="error">
          {errMsgs.id}
        </Col>
      </Form.Group>
      {/* pwd  */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Password <span className='important'>*</span>
        </Form.Label>
        <Col sm="10">
          <Form.Control type="password" name="pwd" onChange={handleInputDataChange} />
        </Col>
        {/* 에러 메시지 */}
        <Col className="error">
          {errMsgs.pwd}
        </Col>
      </Form.Group>
      {/* pwdConfrim  */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          PasswordConfirm <span className='important'>*</span>
        </Form.Label>
        <Col sm="10">
          <Form.Control type="password" name="pwdConfirm" onChange={handleInputDataChange} />
        </Col>
        {/* 에러 메시지 */}
        <Col className="error">
          {errMsgs.pwdConfirm}
        </Col>
      </Form.Group>
      {/* email  */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Email <span className='important'>*</span>
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" name="email" onChange={handleInputDataChange} />
        </Col>
        {/* 에러 메시지 */}
        <Col className="error">
          {errMsgs.email}
        </Col>
      </Form.Group>
      {/* selfphone  */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Selfphone <span className='important'>*</span>
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" name="selfPhone" onChange={handleInputDataChange} />
        </Col>
        {/* 에러 메시지 */}
        <Col className="error">
          {errMsgs.selfPhone}
        </Col>
      </Form.Group>
      {/* homephone  */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          HomePhone
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" name="homePhone" onChange={handleInputDataChange} />
        </Col>
        {/* 에러 메시지 */}
        <Col className="error">
          {errMsgs.homePhone}
        </Col>
      </Form.Group>
      {/* address  */}
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>
          Address <span className='important'>*</span>
        </Form.Label>
        {/* country */}
        <Form.Select aria-label="Default select example" name="country" onChange={handleInputDataChange}>
          <option value="">국적</option>
          <option value="ko">대한민국</option>
          <option value="us">미국</option>
          <option value="gb">영국</option>
          <option value="cn">중국</option>
          <option value="jp">일본</option>
        </Form.Select>
        {/* 에러 메시지 */}
        <Col className="error">
          {errMsgs.country}
        </Col>
        {/* city */}
        <Form.Control type="text" placeholder="도시명" name="city" onChange={handleInputDataChange} />
        {/* 에러 메시지 */}
        <Col className="error">
          {errMsgs.city}
        </Col>
        {/* street */}
        <Form.Control type="text" placeholder="동/거리명" name="street" onChange={handleInputDataChange} />
        {/* 에러 메시지 */}
        <Col className="error">
          {errMsgs.street}
        </Col>
        {/* detail */}
        <Form.Control type="text" placeholder="상세정보" name="detail" onChange={handleInputDataChange} />
        {/* 에러 메시지 */}
        <Col className="error">
          {errMsgs.detail}
        </Col>
        {/* zipcode */}
        <Form.Control type="text" placeholder="우편번호" name="zipcode" onChange={handleInputDataChange} />
        {/* 에러 메시지 */}
        <Col className="error">
          {errMsgs.zipcode}
        </Col>
      </Form.Group>
      {/* file  */}
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>프로필</Form.Label>
        <Form.Control type="file" name="file" onChange={handleInputFileChange} />
        {/* 에러 메시지 */}
        <Col className="error">
          {errMsgs.file}
        </Col>
        <Col className="imageBox">

        </Col>
      </Form.Group>

      <Button type="submit" variant="light">가입</Button>
      <Button type="button" variant="light" onClick={handleCancelClick}>취소</Button>
    </Form>
  );
}

export default JoinForm