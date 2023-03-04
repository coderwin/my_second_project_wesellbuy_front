import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Nav } from 'react-bootstrap'
import { json, useNavigate } from 'react-router-dom';

const HeaderTop = ({sessionForm, OnChangeData}) => {

    const navigation = useNavigate();
    // /login으로 가기
    const handleLoginClick = () => {
        navigation("/login");
    }
    // /join으로 가기
    const handleJoinClick = () => {
        navigation("/join");
    }
    // /mydetail로 가기
    const handleMydetailClick = () => {
        navigation("/mydetail");
    }
    // 장바구니 가기
    const handleOrderClick = () => {
        navigation("/order");
    }
    // 로그아웃 하기
        // - 아직 못 함
    const handleLogoutClick = () => {
        // session 아이디 제거하기 - 서버 연결 전 임시로
        sessionStorage.clear();
        // 홈으로
        navigation("/");
        // sessionForm 값 초기화하기
        OnChangeData(null);
    }

    // 상태 모음

    // sessionFrom에 따라 로그인 part가 render 된다 -> 사용 안 함(App.js에서 처리 후부터)
    // useEffect(() => {
    //     // session에서 로그인한 사용자 데이터 불러오기
    //     const sessionId = "LOGIN_MEMBER";
    //     // 회원정보 가져오기
    //     const memberInfo = JSON.parse(sessionStorage.getItem(sessionId));
    //     // sessionForm에 넣어주기
    //     setSessionForm(memberInfo);    
    // }, []);

    // 테그 담는 box
    let resultBox = null;
    // 로그인 상태에 따라 테그 바꾸기
    // 비로그인
    if(!sessionForm) {
        resultBox = (
            <Nav className="justify-content-end" activeKey="/home">
                <Nav.Item>
                    <Nav.Link onClick={handleLoginClick}>로그인</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={handleJoinClick}>회원가입</Nav.Link>
                </Nav.Item>
            </Nav>
        );  
    // 로그인
    } else {
        resultBox = (
            <Nav className="justify-content-end" activeKey="/home">
                <Nav.Item>
                    <div>{sessionForm.id}님 반갑습니다</div>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={handleMydetailClick}>내정보</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={handleOrderClick}>장바구니</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={handleLogoutClick}>로그아웃</Nav.Link>
                </Nav.Item>
            </Nav>
        );
    }

    // Q. 계속 렌더링되는 게 맞나?
    // Q. 렌더링 되는 것이 아니라 여기로 오는 건가?
    console.log("로그인 상태")
    
    return (
        <>
            {resultBox}
        </>  
    );
}

export default HeaderTop