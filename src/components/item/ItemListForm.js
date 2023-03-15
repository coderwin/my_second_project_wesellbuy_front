import React, { createContext, useContext, useEffect, useState } from 'react'
import { Button, Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import ItemRankBox from './list/ItemRankBox';
import ItemSearchNavForm from './list/ItemSearchNavForm';
import ItemTypeNavForm from './list/ItemTypeNavForm';
import ItemListBoxForm from './list/ItemListBoxForm';
import PageButtonForm from '../common/pagebutton/PageButtonForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../css/form.css';
import { CustomContext } from '../../App';

/**
 * Item list component
 * writer : 이호진
 * init : 2023.03.09
 * updated by writer : 이호진
 * update : 2023.03.13
 * description : 상품 목록 component
 * 
 * update : useCreate 추가 : data바뀔 때, 서버로 데이터 요청하기
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
  const [totalPages, setTotalPages] = useState(0);// 상품 list의 전체페이지
  
  /// 메서드 모음

  // 찾기(Search) 버튼 클릭 했을 때
  // cardDatas 담아주기
  async function handleSearchClick() {
    // 상품목록 cardDatas에 담기
    await inputCardDatas();
  }
  // 서버에서 상품 랭크(순위) 불러오기
  async function getItemRankList() {
    return await axios.get(
      "http://localhost:8080/items/rank/v1"
    );
  }
  // rankCardDatas에 상품목록 담기
  async function inputRankCardDatas() {
    // 요청 시작
    setLoding(true);
    try {
      // 서버에서 상품 목록 불러오기
      const {data} = await getItemRankList();
      setLoding(false);
      // 요청 성공
      console.log("요청 성공");
      // cardDatas에 담기
      setRankCardDatas(data.data);
    } catch(err) {
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
  // cardDatas에 상품목록 담기
  async function inputCardDatas() {
    // 요청 시작
    setLoding(true);
    try {
      // 서버에서 상품 목록 불러오기
      const {data} = await getItemList()
      // 요청 성공
      setLoding(false);
      console.log("요청 성공");
      // cardDatas에 담기
      setCardDatas(data.data.content);
      setTotalPages(data.data.totalPages);
    } catch(err) {
      // 요청 실패
      setLoding(false);
      console.log("요청 실패");
      console.log(err);
    }
  } 
  // 찾기에 사용
  // cardDatas에 상품목록 담기
  async function inputCardDatasForSearch() {
    try {
      // 서버에서 상품 목록 불러오기
      const {data} = await getItemList()
      // 요청 성공
      setLoding(false);
      console.log("요청 성공");
      // cardDatas에 담기
      setCardDatas(data.data.content);
      setTotalPages(data.data.totalPages);
    } catch(err) {
      // 요청 실패
      setLoding(false);
      console.log("요청 실패");
      console.log(err);
    }
  } 
  // session에 있는 회원정보 불러오기
  function getMemberInfo() {
    // sessionStorage에서 sessionStorage불러오기
    const key = "LOGIN_MEMBER";
    return JSON.parse(sessionStorage.getItem(key));
  }
  // sessionStorage에 있는 회원정보 불러오기
  function inputMemberInfo() {
    // sessionStorage에서 sessionStorage불러오기
    const newMemberInfo = getMemberInfo();
    // memberInfo에 담기
    setMemberInfo(newMemberInfo);
  }
  // 서버에서 회원의 좋아요 목록 불러오기
  async function getLikesList() {
    return await axios.get(
      "http://localhost:8080/items/likes",
      {
        withCredentials: true
      }
    );
  }
  // sessionStorage에 likesList 담기
  function inputLikesListInSessioStorage(likesList) {
    // string으로 만들기
    const strLikesList = JSON.stringify(likesList);
    // sessionStorage에 저장하기
    const key = "itemLikesList";
    sessionStorage.setItem(key, strLikesList);
  }
  // 회원의 좋아요 목록 LikesList에 담기
  async function inputLikesList() {
    // 요청 시작
    setLoding(true);
    try {
      // 서버에 요청하기
      const response = await getLikesList();
      // 요청 성공
      setLoding(false);
      console.log("요청 성공");
      // likesList에 담기
      setLikesList(response.data.data);
      // sessionStorage에 담기
      inputLikesListInSessioStorage(response.data.data);
      console.log(response);
    } catch(err) {
      // 요청 실패
      setLoding(false);
      console.log("요청 실패");
      console.log(err);
    }
  }
  
  // 검색 데이터 바뀌면 data 변경한다
  function handleDataChange(e) {
    console.log(`${e.target.name} : ${e.target.value}`);
    setData((data) => {
      return {
      ...data,
      [e.target.name]: e.target.value
      }
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
  // typeNav 클릭했을 때 data의 dtype 속성 바꾸기
  function handleTypeNavClick(e) {
    // 데이터 초기화 후
    // type의 value는 선택된 아이디로 한다
    setData((data) => {
      return {
      ...data,
      dtype: e.target.id,
      page: 0
      }
    });
  }
  // 전체순위보기 클릭했을 때
  function handleShowRankClick() {
    // 전체순위 page로 이동한다
    navigation("/item/rank");
  }

  /// 처음 시작
  // sessionStorage에 있는 회원정보 불러오기
  useEffect(() => { 
    inputMemberInfo();
  }, []);
  // 상품 좋아요 likesList에 담기
  useEffect(() => {
    if(memberInfo) {
      inputLikesList();
    }
  }, [memberInfo]);
  // 서버에서 상품 랭크 불러오기
  useEffect(() => {
    inputRankCardDatas();
  },[]);
  // 상품목록 cardDatas에 담기
  useEffect(() => { 
    inputCardDatas();
  }, []);
  // 찾기에 사용
  useEffect(() => {
    inputCardDatasForSearch();
  }, [data]);
  
  /// view 모음

  if(loding) return (<div>준비중...</div>); 

  return (
    <>
      <ItemListContext.Provider value={{data, handleDataChange, handlePageInDataChange, handleTypeNavClick, memberInfo, handleSearchClick, cardDatas, rankCardDatas, likesList}} >
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
              <PageButtonForm data={data} handleDataChange={handlePageInDataChange} totalPages={totalPages} />
            </Col>
          </Row>
        </Container>
      </ItemListContext.Provider>
    </>
  )
}

export default ItemListForm;