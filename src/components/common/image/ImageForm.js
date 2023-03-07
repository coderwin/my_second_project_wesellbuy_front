import React from 'react'
import { Carousel } from 'react-bootstrap'

/**
 * ImageForm component
 * writer : 이호진
 * init : 2023.03.07
 * updated by writer :
 * update :
 * description : ImagesBox component 내의 각각의 이미지를 설정한다 component
 *               > image태그의 src값이다.
 */
const ImageForm = ({srcValue}) => {
  return (
    <Carousel.Item>
        <img
        className="d-block w-100"
        src={srcValue}
        alt="First slide"
        />
        {/* 이미지 위에 글을 입력가능*/}
        <Carousel.Caption>
        </Carousel.Caption>
    </Carousel.Item>
  )
}

export default ImageForm