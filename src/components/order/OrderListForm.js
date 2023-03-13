import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import PageButtonForm from '../common/pagebutton/PageButtonForm';
import OrderSearchNavForm from './list/OrderSearchNavForm';
import OrderListBoxForm from './list/OrderListBoxForm';
import { CustomContext } from '../../App';

/**
 * Order list component
 * writer : 이호진
 * init : 2023.03.11
 * updated by writer :
 * update :
 * description : 주문 목록 component
 */
export const OrderListContext = createContext(null); //OrderList Context

const OrderListForm = () => {
  
  /// 변수 모음
  // 검색 데이터 default 변수
  const defaultData = {
    orderStatus: "", // 주문 상태
    deliveryStatus: "", // 배달 상태
    createData: "",// 추천합니다글 생성 날짜(shape : 0000-00-00) 
    size: 10,// 페이지 size
    page: 0// 페이지 번호
  }
  

  /// 상태 모음
  const [loding, setLoding] = useState(false);// 요청처리 상태
  const [data, setData] = useState(defaultData);// 검색 데이터 상태
  const [listDatas, setListDatas] = useState(null);// 데이터 상태(목록을 위한)
  const [totalPages, setTotalPages] = useState(0);// 상품 list의 전체페이지

  /// 메서드 모음
  // 처음 시작
  useEffect(() => {
    // 주문 목록에 담기
    inputListDatas();
  }, [data]);
  // datas에 주문 목록에 담기
  async function inputListDatas() {
    // loding = true
    setLoding(true);
    try {
      // 서버에서 주문 목록 불러오기
      const {data} = await getOrderList();
      // loding false
      setLoding(false);
      // 요청 성공
      console.log("요청 성공");
      console.log(data);
      // Listdatas에 담기
      setListDatas(data.data.content);
      setTotalPages(data.data.totalPages);
    } catch(err) {
      // loding false
      setLoding(false);
      // 요청 실패
      console.log("요청 실패");
      console.log(err);
    }
  }
  // 서버에서 나의 주문 불러오기
  async function getOrderList() {
    return await axios.get(
      "http://localhost:8080/orders",
      {
        params: data
      }
    );
  }
  // 검색 데이터 바뀌면 data 변경한다
  function handleDataChange(e) {
    console.log(`${e.target.name} : ${e.target.value}`);
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }
  // page 데이터 바뀌면 data 변경한다
  function handlePageInDataChange(e) {
    console.log(`${e.target.name} : ${e.target.id}`);
    setData((data) => {
      return {
      ...data,
      [e.target.name]: e.target.id
      }
    });
  }
  
  // 찾기(Search) 버튼 클릭 했을 때
    // listDatas에 담아주기
  async function handleSearchClick() {
    // 주문목록을 listDatas에 담기
    await inputListDatas();
  }

  /// view 모음

  // 요청 처리 view
  if(loding) return(<div>준비중...</div>);

  return (
    <OrderListContext.Provider value={{data, handleDataChange, handleSearchClick, listDatas, totalPages}}>
      <Container>
        {/* 주문 찾기 Nav */}
        <Row>
          <Col md="12">
            {/* 위쪽 Nav - 검색 */}
            <OrderSearchNavForm />
          </Col>
        </Row>
        {/* 주문 목록 box */}
        <Row id="top">
          <Col md="10">
            {/* body - 주문 목록  */}
            <OrderListBoxForm />
          </Col>
        </Row>
        {/* footer - 페이지 버튼 */}
        <Row>
          <Col>
            <PageButtonForm data={data} handleDataChange={handlePageInDataChange} totalPages={totalPages} />
          </Col>
        </Row>
        {/* 맨위로 이동하기 */}
        <Row className="footerFixed mousePointer">
          <Col>
            <a href="#top">맨위로</a>
          </Col>
        </Row>
      </Container>
    </OrderListContext.Provider> 
  )
}

export default OrderListForm;