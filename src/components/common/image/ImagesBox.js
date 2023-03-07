import React from 'react'
import { Carousel } from 'react-bootstrap'
import ImageForm from './ImageForm';

/**
 * Images component
 * writer : 이호진
 * init : 2023.03.07
 * updated by writer :
 * update :
 * description : 이미지를 여러장 보여주는 component
 *               > 속성
 *                 > srcArr : img 태그의 src 속성의 값들을 갖는 배열 prop
 */
const ImagesBox = ({srcArr}) => {

  /// 변수 모음
  let imageForms = ""; // 모든 imageForm 
  // ImageForm들을 생성
  if(srcArr) {
    imageForms = srcArr.map((src) => {
      return (<ImageForm srcValue={src} />);
    });
  }
  
  // ImageForm 루프 돌기
  return (
    <Carousel>
      {/* 클라이언트 저장 이미지가 나온다 */}
      {imageForms}
      
      {/* 아래는 예시 */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=First slide&bg=373940"
          alt="First slide"
        />
        {/* 이미지 위에 글을 입력가능*/}
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Second slide&bg=282c34"
          alt="Second slide"
        />

        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=20232a"
          alt="Third slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default ImagesBox