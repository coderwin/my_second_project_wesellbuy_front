import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ItemDetailBoxForm from './detail/ItemDetailBoxForm';
import ItemOrderBoxForm from './detail/ItemOrderBoxForm';
import ReplyBoxForm from '../common/reply/ReplyBoxForm';

/**
 * Item detail component
 * writer : 이호진
 * init : 2023.03.07
 * updated by writer :
 * update :
 * description : 상품 상세보기 component
 */
export const ItemDetailContext = createContext(null);// ItemDetailForm Context

const ItemDetailForm = () => {
  
  /// 변수 모음
  const defaultData = {
    num: "", // 상품번호
    name: "", // 상품명
    stock: "", // 제고 수량
    price: "", // 가격
    content: "", // 설명
    type: "", // 상풍종류 설정
    hits: "", // 조회수
    memberId: "", // 상품 등록(판매자) 아이디
    likes: "", // 좋아요수
    pictureForms: "", // 이미지 모음
    replyFormList: "", // 댓글 모음
    author: "", // 저자 // Book에 필요
    publisher: "", // 출판사 // Book에 필요
    company: "",// 제조회사 이름 // Furniture, HomeAppliances에 필요
  }
  // navigation
  const navigation = useNavigate();
  // URI의 파라미터 얻어오기
    // num을 itemNum으로 교체
  const {num: itemNum} = useParams();

  /// 상태 모음
  const [loding, setLoding] = useState(false);// 요청 상태
  const [error, setError] = useState(null);// 에러 상태
  const [data, setData] = useState(defaultData);// 데이터 상태
  const [srcArr, setSrcArr] = useState(null);// 이미지 src 배열 
  const [memberInfo, setMemberInfo] = useState(null);// 로그인 사용자 정보 상태

  /// 메서드 모음

  // 상품 상세정보 데이터에 담기
    // 이미지 srcArr도 담기 - inputSrcArr
  async function inputData() {
    setLoding(true);
    try {
      // 상품 detail 불러오기
      const response = await getItemDetailInfo();
      // 요청 성공
      console.log("요청 성공");
      setLoding(false);
      // data 데이터 담기
      setData({
        ...data,
        ...response.data.data
      });
      // 이미지 srcArr 만들기 -> 사용 -> 더 생각해보기
      setSrcArr(createSrcArr(response.data.data.pictureForms));
      console.log(JSON.stringify(srcArr));// 여기까지는 바로 실행된다.
    } catch(err) {
      // 요청 실패
      setLoding(false);
      console.log("요청 실패");
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
    // 데이터가 없으면
    if(memberData === null || memberData === undefined) {
    
    // 데이터가 있으면
    } else {
      // memberInfo에 memberData 대입
      setMemberInfo(memberData);
    }
  }

  // 이미지 srcArr 만들기
  function createSrcArr(pictureForms) {
    // srcArr 배열 생성
    let srcArr = "";
    // pictres를 순회하면서 srcArr에 담는다.
    if(pictureForms) {
      srcArr = pictureForms.map((pictureForm) => {
        return createSrc(pictureForm.storedFileName);
      });
    }
    return srcArr;
  }
  // 이미지 src 만들기
  function createSrc(storedFileName) {
    return `http://localhost:8080/items/images/${storedFileName}`;
  }
  // 상품 상세보기 데이터 불러오기
  async function getItemDetailInfo() {
    // loding true로 바꾸기
    setLoding(true);
    // 서버에 item detail 요청하기
    // 누구든 볼수 있음 - 인증 불필요
    return await axios.get(
      `http://localhost:8080/items/${itemNum}`
    );
  }

  // 페이지 처음 시작
  useEffect(() => {
    // 상품 상세보기 데이터 불러오기
    inputData();
  }, []);
  useEffect(() => {
    // sessionStorage에서 사용자 정보 불러오기
    getMemberInfo();
  }, []);

  // loding true -> 작업 준비중 view
  if(loding) return (<div>준비중...</div>);

  return (
    <ItemDetailContext.Provider value={{data, setLoding, srcArr, memberInfo}}>
      <Container>
        <Row>
          {/* item detail box */}
          <Col className="itemDetailBox" sm="8">
            {/* item detail */}
            <Row>
              <ItemDetailBoxForm />
            </Row>
            {/* reply(댓글) box */}
            <Row>
              <ReplyBoxForm replyFormList={data.replyFormList} />
            </Row>
          </Col>
          {/* item Order box */}
          <Col className="itemOrderBox" sm="4">
            <ItemOrderBoxForm />
          </Col>
        </Row>
      </Container>
    </ItemDetailContext.Provider>
  )
}

export default ItemDetailForm;