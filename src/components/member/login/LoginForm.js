import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const LoginForm = () => {

  // 기본 데이터 모음
  const defaultData = {
    id: "",
    pwd: "",
    rememberId: false
  }
  const defaultError = {
    errMsg: ""
  }
  // 상태 생성
  const [data, setData] = useState(defaultData); // 로그인 정보
  const [loding, setLoding] = useState(false); // 데이터 처리 중
  const [error, setError] = useState(defaultError); // 에러 정보
  // 필요 도구 모음
  const navigation = useNavigate(); // 페이지 이동

  /// 메서드 모음
  // 클라이언트가 입력한 데이터를 data 상태에 입력하기
  function handleInputDataChange(event) {
    console.log(`value : ${event.target.value}`);
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  }
  // 아이디 기억 클릭 처리
  function handleRememberIdClick(e) {
    console.log(e);
    // rememberId == true로 변경
    setData({
      ...data,
      rememberId: true
    });
  }

  // /login 처음 입장했을 때 실행되는 메서드
  useEffect(() => {
    // cookie에 key가 REMEMBER_ID인 cookie가 있는지 확이하기
    let cookieKey = "REMEMBER_ID";
    const cookieValue = getCookieValue(cookieKey);
    // 있으면 data.id에 아이디 입력
    if(cookieValue) {
      setData({
        ...data,
        id: cookieValue,
        rememberId: true
      });
    } 
  });
  
  // 쿠키 value 불러오기
  function getCookieValue(key) {
    let cookieKey = key + "=";
    let result = "";
    const cookieArr = document.cookie.split(";");
    console.log(document.cookie);
    console.log(cookieArr);

    for(let i = 0; i < cookieArr.length; i++) {
      if(cookieArr[i][0] === " ") {
        cookieArr[i] = cookieArr[i].subString(1);
      }

      if(cookieArr[i].indexOf(cookieKey) === 0) {
        result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
        return result;
      }
    }
    return result;
  }

  // 로그인 시도하기
  async function handleLoginSubmit(e) {
    // onSubmit 막기
    e.preventDefault();
    // loding 상태 true로 변경
    setLoding(true);
    // 로그인 서버로 요청
    try {
      const data = await axios.post(
        "http://localhost:8080/members/login",
        {
          data
        }
      );
      // 요청 성공
      console.log("요청 성공");
      console.log(data);
      // "/"으로 이동
      // navigation("/");

    } catch(error) {
      // 요청 실패
      console.log("요청 실패");
      // loding false로 바꿈
      setLoding(false);
      // error 상태에 데이터 넣기
      setError({
        ...error,
        errMsg: error.response.data.errMsg
      });

    }
  }

  // loding == ture이면 로딩중
  if(loding) return (<div>로딩중...</div>); 

  return (
    <Form onSubmit={handleLoginSubmit}>
        <Form.Group className="mb-3" >
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" name="id" onChange={handleInputDataChange} value={data.id} />
        </Form.Group>

        <Form.Group className="mb-3" >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="pwd" onChange={handleInputDataChange} value={data.pwd} />
        </Form.Group>
        <Form.Group className="mb-3" >
            <Form.Check 
              type="checkbox" 
              label="Check me out" 
              name="rememberId" 
              onClick={handleRememberIdClick}
              checked={data.rememberId}
              />
        </Form.Group>
        <Form.Group className="mb-3 error">
            {error.errMsg}
        </Form.Group>
        <Button variant="primary" type="submit">
        login
        </Button>
    </Form>
  )
}

export default LoginForm;
