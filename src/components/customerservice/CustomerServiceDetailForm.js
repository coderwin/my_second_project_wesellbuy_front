import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Loding from '../Loding';
import CustomerServiceDetailBoxForm from './detail/CustomerServiceDetailBoxForm';
import ReplyCustomerServiceBoxForm from './reply/ReplyCustomerServiceBoxForm';
import '../../css/form.css';

/**
 * CustomerService detail component
 * writer : 이호진
 * init : 2023.03.10
 * updated by writer :
 * update :
 * description : 고객지원글 상세보기 component
 */
export const CustomerServiceDetailContext = createContext(null);// CustomerServiceDetailForm Context

const CustomerServiceDetailForm = () => {
  /// 변수 모음
  const defaultData = {
    num: "", // 게시글 번호
    reportedId: "", // 신고된 회원 아이디
    content: "", // 신고 내용
    memberId: "", // 회원 아이디
    createDate: "", // 작성 날짜
    replyList: "" // 댓글 모음
  }
  // URI의 파라미터 얻어오기
    // num을 itemNum으로 교체
  const {num: boardNum} = useParams();

  /// 상태 모음
  const [loding, setLoding] = useState(false);// 요청 상태
  const [error, setError] = useState(null);// 에러 상태
  const [data, setData] = useState(defaultData);// 데이터 상태
  const [memberInfo, setMemberInfo] = useState(null);// 로그인 사용자 정보 상태

  
  /// 메서드 모음
  // 고객지원글 상세정보 데이터에 담기
  async function inputData() {
    setLoding(true);
    try {
      // 고객지원글 detail 불러오기
      const response = await getCustomerServiceDetailInfo();
      // 요청 성공
      console.log("요청 성공");
      setLoding(false);
      // data 데이터 담기
      setData({
        ...data,
        ...response.data.data
      });
    } catch(err) {
      // 요청 실패
      console.log("요청 실패");
      setLoding(false);
      console.log(err);
      // errMsg 보여주기
      alert(err.response.data.errMsg);
    }
  }
  // sessionStorage에서 사용자 정보 불러오기
  function getMemberInfo() {
    // sessionStorage에 key="LOGIN_MEMBER" 있는지 확인
    const key = "LOGIN_MEMBER";
    const memberData = JSON.parse(sessionStorage.getItem(key));
    // 데이터가 있으면
    if(memberData) {
      // memberInfo에 memberData 대입
      setMemberInfo(memberData);
    }
  }

  // 고객지원글 상세보기 데이터 불러오기
  async function getCustomerServiceDetailInfo() {
    // loding true로 바꾸기
    setLoding(true);
    // 서버에 item detail 요청하기
    // 누구든 볼수 없음 - 인증 필요
    // CORS 정책을 따라야 할 듯
    return await axios.get(
      `http://localhost:8080/customerservices/${boardNum}`,
      {
        withCredentials: true
      }
    );
  }

  // 페이지 처음 시작
  useEffect(() => {
    // 고객지원글 상세보기 데이터 불러오기
    inputData();
    // sessionStorage에서 사용자 정보 불러오기
    getMemberInfo();
  }, []);

  // loding true -> 작업 준비중 view
  if(loding) return (<Loding />);

  return (
    <CustomerServiceDetailContext.Provider value={{data, setLoding}}>
      <Container className="body_text_center">
        <Row className="d-flex justify-content-center">
          {/* CustomerService detail box */}
          <Col className="CustomerServiceDetailBox" sm="8">
            {/* CustomerService detail */}
            <Row>
              <CustomerServiceDetailBoxForm />
            </Row>
            {/* reply(댓글) box */}
            <Row>
              <ReplyCustomerServiceBoxForm replyFormList={data.replyList} />
            </Row>
          </Col>
        </Row>
      </Container>
    </CustomerServiceDetailContext.Provider>
  )
}

export default CustomerServiceDetailForm;