import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Loding from '../Loding';
import OrderDetailBoxForm from './detail/OrderDetailBoxForm';

/**
 * Order detail component
 * writer : 이호진
 * init : 2023.03.12
 * updated by writer :
 * update :
 * description : 주문 상세보기 component
 */
export const OrderDetailContext = createContext(null);// OrderDetailForm Context

const OrderDetailForm = () => {
  /// 변수 모음
  const defaultData = {
    num: "", // 게시글 번호
    orderStatus: "", // 주문 상태
    id: "", // 주문한 회원 id
    memberPhone: "", // 주문한 회원 연락처
    address: "", // 주문한 회원 주소
    deliveryStatus: "", // 배달 상태
    orderItemDetailList: "", // 주문상품 정보 모음
    totalPrice: "" // 전체 주문 가격
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
  // 페이지 처음 시작
  useEffect(() => {
    // 주문 상세보기 데이터 불러오기
    inputData();
    // sessionStorage에서 사용자 정보 불러오기
    getMemberInfo();
  }, []);

  // 주문 상세정보 데이터에 담기
  async function inputData() {
    try {
      // 주문 detail 불러오기
      const response = await getOrderDetailInfo();
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
    console.log(`memberData : ${memberData}`);
    // 데이터가 있으면
    if(memberData) {
      // memberInfo에 memberData 대입
      setMemberInfo(memberData);
    }
  }

  // 주문 상세보기 데이터 불러오기
  async function getOrderDetailInfo() {
    // loding true로 바꾸기
    setLoding(true);
    // 서버에 item detail 요청하기
    // 누구든 볼수 없음 - 인증 필요
    // CORS 정책을 따라야 할 듯
    return await axios.get(
      `http://localhost:8080/orders/${boardNum}`,
      {
        withCredentials: true
      }
    );
  }

  // loding true -> 작업 준비중 view
  if(loding) return (<Loding />);

  return (
    <OrderDetailContext.Provider value={{data}}>
      <Container>
        <Row>
          {/* Order detail box */}
          <Col className="OrderDetailBox" sm="8">
            {/* order detail box */}
            <Row>
              <OrderDetailBoxForm />
            </Row>
          </Col>
        </Row>
      </Container>
    </OrderDetailContext.Provider>
  )
}

export default OrderDetailForm;