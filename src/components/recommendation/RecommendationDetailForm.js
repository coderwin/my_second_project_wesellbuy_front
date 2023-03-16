import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Loding from '../Loding';
import RecommendationDetailBoxForm from './detail/RecommendationDetailBoxForm';
import ReplyRecommendationBoxForm from './reply/ReplyRecommendationBoxForm'

/**
 * Recommendation detail component
 * writer : 이호진
 * init : 2023.03.10
 * updated by writer :
 * update :
 * description : 추천합니다글 상세보기 component
 */
export const RecommendationDetailContext = createContext(null);// RecommendationDetailForm Context

const RecommendationDetailForm = () => {
  /// 변수 모음
  const defaultData = {
    num: "", // 게시글 번호
    itemName: "", // 추천받은 상품 이름
    sellerId: "", // 추천받은 판매자 아이디
    content: "", // 추천 이유
    hits: "", // 조회수
    memberId: "", // 작정사 id
    createDate: "", // 작성 날짜
    recommendationPictureFormList: "", // 게시글 이미지 모음
    replyFormList: "" // 게시글 댓글 모음
  }
  // URI의 파라미터 얻어오기
    // num을 itemNum으로 교체
  const {num: boardNum} = useParams();

  /// 상태 모음
  const [loding, setLoding] = useState(false);// 요청 상태
  const [error, setError] = useState(null);// 에러 상태
  const [data, setData] = useState(defaultData);// 데이터 상태
  const [srcArr, setSrcArr] = useState(null);// 이미지 src 배열 
  const [memberInfo, setMemberInfo] = useState(null);// 로그인 사용자 정보 상태

  /// 메서드 모음

  // 추천합니다글 상세정보 데이터에 담기
    // 이미지 srcArr도 담기 - inputSrcArr
  async function inputData() {
    try {
      // 추천합니다글 detail 불러오기
      const response = await getRecommendationDetailInfo();
      // 요청 성공
      console.log("요청 성공");
      setLoding(false);
      // data 데이터 담기
      setData({
        ...data,
        ...response.data.data
      });
      // 이미지 srcArr 만들기 -> 사용 -> 더 생각해보기
      setSrcArr(createSrcArr(response.data.data.recommendationPictureFormList));
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
    return `http://localhost:8080/recommendations/images/${storedFileName}`;
  }
  // 추천합니다글 상세보기 데이터 불러오기
  async function getRecommendationDetailInfo() {
    // loding true로 바꾸기
    setLoding(true);
    // 서버에 item detail 요청하기
    // 그래도 CORS 정책을 따라야 할 듯
    return await axios.get(
      `http://localhost:8080/recommendations/${boardNum}`
    );
  }

  /// 처음 시작
  useEffect(() => {
    // 추천합니다글 상세보기 데이터 불러오기
    inputData();
  }, []);
  useEffect(() => {
    // sessionStorage에서 사용자 정보 불러오기
    getMemberInfo();
  }, []);

  // loding true -> 작업 준비중 view
  if(loding) return (<Loding />);

  return (
    <RecommendationDetailContext.Provider value={{data, setLoding, srcArr, memberInfo}}>
      <Container>
        <Row>
          {/* Recommendation detail box */}
          <Col className="RecommendationDetailBox" sm="8">
            {/* Recommendation detail */}
            <Row>
              <RecommendationDetailBoxForm />
            </Row>
            {/* reply(댓글) box */}
            <Row>
              <ReplyRecommendationBoxForm replyFormList={data.replyFormList} />
            </Row>
          </Col>
        </Row>
      </Container>
    </RecommendationDetailContext.Provider>
  )
}

export default RecommendationDetailForm;