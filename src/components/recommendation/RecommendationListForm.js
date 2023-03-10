import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { CustomContext } from '../../App';
import PageButtonForm from '../common/pagebutton/PageButtonForm';
import RecommendationListBoxForm from './list/RecommendationListBoxForm';
import RecommendationSearchNavForm from './list/RecommendationSearchNavForm';

/**
 * Recommendation list component
 * writer : 이호진
 * init : 2023.03.10
 * updated by writer :
 * update :
 * description : 추천합니다글 목록 component
 */
export const RecommendationListContext = createContext(null); // RecommendationList Context

const RecommendationListForm = () => {
  /// 변수 모음
  // 검색 데이터 default 변수
  const defaultData = {
    itemName: "", // 추천받은 상품 이름
    sellerId: "", // 추천받은 판매자 이름
    memberId: "", // 작성자 아이디
    createData: "",// 추천합니다글 생성 날짜(shape : 0000-00-00) 
    size: 5,// 페이지 size
    page: 0// 페이지 번호
  }

  /// 상태 모음
  const [loding, setLoding] = useState(false);// 요청처리 상태
  const [data, setData] = useState(defaultData);// 검색 데이터 상태
  const [cardDatas, setCardDatas] = useState([]);// 데이터 상태(Card를 위한)
  const [totalPages, setTotalPages] = useState(0);// 상품 list의 전체페이지

  /// 메서드 모음
  // 처음 시작
  useEffect(() => {
    // 상품목록 cardDatas에 담기
    inputCardDatas();
  }, [data]);
  // 찾기(Search) 버튼 클릭 했을 때
    // cardDatas 담아주기
  async function handleSearchClick() {
    // 상품목록 cardDatas에 담기
    await inputCardDatas();
  }
  // cardDatas에 추천합니다글목록 담기
  async function inputCardDatas() {
    // lodign true
    setLoding(true);
    try {
      // 서버에서 추천합니다글 목록 불러오기
      const {data} = await getRecommendationList()
      // 요청 성공
      // loding false
      setLoding(false);
      console.log("요청 성공");
      console.log(data);
      // cardDatas에 담기
      setCardDatas(data.data.content);
      setTotalPages(data.data.totalPages);
    } catch(err) {
      // loding false
      setLoding(false);
      // 요청 실패
      console.log("요청 실패");
      console.log(err);
    }
  }
  // 서버에서 추천합니다글 목록 불러오기
    // data는 params
  async function getRecommendationList() {
    return await axios.get(
      "http://localhost:8080/recommendations",
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

  /// view 모음

  if(loding) return (<div>준비중...</div>); 

  return (
    <>
      <RecommendationListContext.Provider value={{data, handleDataChange, handleSearchClick, cardDatas}} >
        <Container>
          <Row>
            <Col md="12">
              {/* 위쪽 Nav - 검색 */}
              <RecommendationSearchNavForm />
            </Col>
          </Row>
          <Row>
            <Col md="10">
              {/* body - 추천합니다 목록  */}
              <RecommendationListBoxForm />
            </Col>
          </Row>
          <Row>
            <Col>
              {/* footer - 페이지 버튼 */}
              <PageButtonForm data={data} handleDataChange={handlePageInDataChange} totalPages={totalPages} />
            </Col>
          </Row>
        </Container>
      </RecommendationListContext.Provider>
    </>
  )
}

export default RecommendationListForm;