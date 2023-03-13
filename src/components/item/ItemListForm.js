import React, { createContext, useEffect, useState } from 'react'
import { Button, Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import ItemRankBox from './list/ItemRankBox';
import ItemSearchNavForm from './list/ItemSearchNavForm';
import ItemTypeNavForm from './list/ItemTypeNavForm';
import ItemListBoxForm from './list/ItemListBoxForm';
import PageButtonForm from '../common/pagebutton/PageButtonForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../css/form.css';

/**
 * Item list component
 * writer : 이호진
 * init : 2023.03.09
 * updated by writer :
 * update :
 * description : 상품 목록 component
 */
export const ItemListContext = createContext(null); // itemList Context

const ItemListForm = () => {

  /// 변수 모음
  // 검색 데이터 default 변수
  const defaultData = {
    name: "",// 상품명
    memberId: "",// 판매자 아이디
    dtype: "",// 종류
    createData: "",// 상품 생성 날짜(shape : 0000-00-00) 
    size: 5,// 페이지 size
    page: 0// 페이지 번호
  }
  // navigation
  const navigation = useNavigate();

  /// 상태 모음
  const [loding, setLoding] = useState(false);// 요청처리 상태
  const [data, setData] = useState(defaultData);// 검색 데이터 상태
  const [cardDatas, setCardDatas] = useState([]);// 데이터 상태(Card를 위한)
  const [rankCardDatas, setRankCardDatas] = useState(null);// 데이터 상태(Card를 위한)
  const [likesList, setLikesList] = useState([]);// 회원의 상품좋아요 상태
  const [memberInfo, setMemberInfo] = useState(null);// 회원정보 상태
  /// 메서드 모음
  // 처음 시작
  useEffect(() => {
    // 서버에서 상품 랭크 불러오기
    inputRankCardDatas();
    // 상품목록 cardDatas에 담기
    inputCardDatas();
    // sessionStorage에 있는 회원정보 불러오기
    inputMemberInfo();
    // 상품 좋아요 likesList에 담기
    if(memberInfo) {
      inputLikesList();
    }
  }, []);
  // 찾기(Search) 버튼 클릭 했을 때
  // cardDatas 담아주기
  async function handleSearchClick() {
    // 상품목록 cardDatas에 담기
    await inputCardDatas();
  }
  // rankCardDatas에 상품목록 담기
  async function inputRankCardDatas() {
    // lodign true
    setLoding(true);
    try {
      // 서버에서 상품 목록 불러오기
      const {data} = await getItemRankList()()
      // loding false
      setLoding(false);
      // 요청 성공
      console.log("요청 성공");
      console.log(data);
      // cardDatas에 담기
      setRankCardDatas(data);
    } catch(err) {
      // loding false
      setLoding(false);
      // 요청 실패
      console.log("요청 실패");
      console.log(err);
    }
  }
  // 서버에서 상품 랭크(순위) 불러오기
  async function getItemRankList() {
    return await axios.get(
      "http://localhost:8080/items/rank/v1"
    );
  }
  // cardDatas에 상품목록 담기
  async function inputCardDatas() {
    // lodign true
    setLoding(true);
    try {
      // 서버에서 상품 목록 불러오기
      const {data} = await getItemList()
      // loding false
      setLoding(false);
      // 요청 성공
      console.log("요청 성공");
      console.log(data);
      // cardDatas에 담기
      setCardDatas(data);
    } catch(err) {
      // loding false
      setLoding(false);
      // 요청 실패
      console.log("요청 실패");
      console.log(err);
    }
  }
  // 서버에서 상품 목록 불러오기
    // data는 params
  async function getItemList() {
    return await axios.get(
      "http://localhost:8080/items",
      {
        params: data
      }
    );
  }
  // sessionStorage에 있는 회원정보 불러오기
  function inputMemberInfo() {
    // loding true
    setLoding(true);
    // sessionStorage에서 sessionStorage불러오기
    const newMemberInfo = getMemberInfo();
    // memberInfo에 담기
    setMemberInfo(newMemberInfo);
    // loding false
    setLoding(false);
  }
  // session에 있는 회원정보 불러오기
  function getMemberInfo() {
    // sessionStorage에서 sessionStorage불러오기
    const key = "LOGIN_MEMBER";
    return JSON.parse(sessionStorage.getItem(key));
  }
  // 회원의 좋아요 목록 LikesList에 담기
  async function inputLikesList() {
    try {
      // 서버에 요청하기
      const response = await getLikesList();
      // loding === false
      setLoding(false);
      // 요청 성공
      console.log("요청 성공");
      // likesList에 담기
      setLikesList(response.data.data);
    } catch(err) {
      // loding === false
      setLoding(false);
      // 요청 실패
      console.log("요청 실패");
      console.log(err);
    }
  }
  // 서버에서 회원의 좋아요 목록 불러오기
  async function getLikesList() {
    // loding true
    setLoding(true);
    return await axios.get(
      "http://localhost:8080/items/likes",
      {
        withCredentials: true
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
  // typeNav 클릭했을 때 data의 dtype 속성 바꾸기
  function handleTypeNavClick(e) {
    // 데이터 초기화 후
    // type의 value는 선택된 아이디로 한다
    setData({
      ...defaultData,
      dtype: e.target.id
    });
  }
  // 전체순위보기 클릭했을 때
  function handleShowRankClick() {
    // 전체순위 page로 이동한다
    navigation("/item/rank");
  }

  /// view 모음

  if(loding) return (<div>준비중...</div>); 

  return (
    <>
      <ItemListContext.Provider value={{data, handleDataChange, handleTypeNavClick, handleSearchClick, cardDatas, rankCardDatas, likesList}} >
        <Container>
          <ListGroup>
            <ListGroupItem>
              <Row>
                <Col>
                  {/* 상품 순위 1, 2, 3 순위 */}
                  <ItemRankBox />
                </Col>
                <Col>
                  {/* 전체 순위 보기 */}
                  <Button variant="link" onClick={handleShowRankClick}>전체순위보기</Button>
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
          <Row>
            <Col md="12">
              {/* 위쪽 Nav - 검색 */}
              <ItemSearchNavForm />
            </Col>
          </Row>
          <Row>
            <Col md="2">
              {/* 왼쪽 Nav - item dtype */}
              <ItemTypeNavForm />
            </Col>
            <Col md="10">
              {/* body - 상품 목록  */}
              <ItemListBoxForm />
            </Col>
          </Row>
          <Row>
            <Col>
              {/* footer - 페이지 버튼 */}
              <PageButtonForm data={data} handleDataChange={handleDataChange} totalPages={cardDatas.totalPages}  />
            </Col>
          </Row>
        </Container>
      </ItemListContext.Provider>
    </>
  )
}

export default ItemListForm;