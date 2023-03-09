import { useEffect, useState } from 'react';
import {Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap'

/**
 * Images component
 * writer : 이호진
 * init : 2023.03.09
 * updated by writer :
 * update :
 * description : 이미지를 펼쳐서 보여주는 component
 *               > 속성(props)
 *                 - pictureForms : 이미지들 info 모음 prop
 *                 - createSrc : img 태그의 src 속성의 값을 만들어주는 메서드 prop
 *                 - OnDeleteImageClick: image 삭제 메서드 prop
 */
const ImagesBoxSpread = ({pictureForms, createSrc, OnDeleteImageClick}) => {

  /// 변수 모음
  /// 상태 모음
  const [srcArr, setSrcArr] = useState([]);// 이미지 src들 모아두는 배열 상태
  const [pictureNums, setPictureNums] = useState([]);// 이미지번호 모아두는 배열 상태

  /// 메서드 모음
  // 페이지 처음
  useEffect(() => {
    // srcArr 만들기
    createSrcArr(pictureForms);
    // pictureNums 만들기
    createPictureNums(pictureForms);
  }, []);
  // 이미지 srcArr 만들기
  function createSrcArr(pictureForms) {
    // newSrcArr 생성
    let newSrcArr = "";
    // pictureForms를 순회하면서 src 만들기
    if(pictureForms) {
      newSrcArr = pictureForms.map((pictureForm) => {
        return createSrc(pictureForm.storedFileName);
      });
    }
    // srcArr상태에 담기
    setSrcArr([
      ...srcArr,
      ...newSrcArr
    ]);
  }
  // 이미지 pictureNums 만들기
  function createPictureNums(pictureForms) {
    // newPictureNums 생성
    let newPictureNums = "";
    // pictureForms 순회화면서 pictureNum 만들기
    if(pictureForms) {
      newPictureNums = pictureForms.map((pictureForm) => {
        return pictureForm.num;
      });
    }
    // pictureNums에 담기
    setPictureNums([
      ...pictureNums,
      ...newPictureNums
    ]);
  }

  /// view 만들기
  let imageForms = null; // 모든 imageForm 
  // ImageForm들을 생성
  if(srcArr) {
    imageForms = srcArr.map((src, num) => {
      console.log(src);
      return (<Col key={num}>
        <img
          className="d-block w-100"
          src={src}
          alt={src}
        />
        <span id={pictureNums[num]} onClick={OnDeleteImageClick}>X</span>
    </Col>);
    });
  }
  // image error 해결하기
  // ImageForm 루프 돌기
  return (
    <ListGroup>
      <ListGroupItem>
        <Row>
          {/* 클라이언트 저장 이미지가 나온다 */}
          {imageForms !== null && imageForms}
        </Row>
      </ListGroupItem>
    </ListGroup>
  );
}

export default ImagesBoxSpread;