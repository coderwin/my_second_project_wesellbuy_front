import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Button, Col, Form, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ItemDetailContext } from '../ItemDetailForm';

/**
 * Item detail 주문 component
 * writer : 이호진
 * init : 2023.03.07
 * updated by writer :
 * update :
 * description : 상품 상세보기 주문 box component
 */
// totalPrice를 구한다.
function getTotalPrice(orderData) {
  console.log("총 가격 구하는 중...");
  // 총 가격 구하기
  const totalPrice = orderData.quantity * orderData.price;
  return totalPrice;
}

const ItemOrderBoxForm = () => {

  /// 변수 모음
  // 외부 데이터 불러오기
  const {data} = useContext(ItemDetailContext);
 
  // defaultOrderData
  const defaultOrderData = {
    id: "",// 주문번호
    name: "",// 상품명
    quantity: 1,// 주문수량
    price: 0,// 상품 1개 가격
    itemNum: ""// 상품번호
  }
  // navigation
  const navigation = useNavigate();

  /// 상태 모음
  const [orderData, setOrderData] = useState(defaultOrderData);// 주문상품 데이터
  // const [totalPrice, setTotalPrice] = useState(0); // 총 주문가격
  // const [shopingBasket, setShopingBasket] = useState(() => callShopingBasket());// 장바구니 상태
  
  /// 메서드 모음
  // 페이지 처음 시작
  useEffect(() => {
    // 필요한 데이터 orderData에 대입
    setOrderData({
      ...orderData,
      name: data.name,
      price: data.price,
      itemNum: data.num
    });
  }, []);

  // input 태그 데이터 바뀔 때 orderData 속성값 바꾸기
  function handleOrderDataChange(e) {
    console.log(`${e.target.name}: ${e.target.value}`);
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value
    });
  }

  // LocalStorage에 shopingBasket 불러오기
  function callShopingBasket() {
    // LocalStorage에 shopingBasket 있는지 확인하기
    let strShopingBasket = localStorage.getItem("shopingBasket");
    // shopingBasket 없으면 localStorage에 생성하기
    if(!strShopingBasket) {
      const newShopingBasketArr = [];
      // string으로 만들어준다.
      const jsonNewShopingBasketArr = JSON.stringify(newShopingBasketArr);
      // strShopingBasket에 대입
      strShopingBasket = jsonNewShopingBasketArr;
    }
    // JSON parse 해준다.
    const shopingBasket = JSON.parse(strShopingBasket);

    console.log("create shopingBasket : " + shopingBasket.length);

    return shopingBasket;
  }

  // 주문정보를 LocalStorage에 담기
  function saveLocalStorage() {
    // JSON parse 해준다.
    const shopingBasket = callShopingBasket();
    // data에 id(주문번호) 입력  
    const newOrderData = {...orderData, id: shopingBasket.length};
    // 배열에 orderData 넣기 - 최신순
    shopingBasket.unshift(newOrderData);
    // JSON string으로 변환하기
    const jsonShopingBasket = JSON.stringify(shopingBasket);
    // LocalStorage에 저장하기
    localStorage.setItem("shopingBasket", jsonShopingBasket);
  }

  // localStorage에 주문정보 저장하기
  function handleInputShopingBasketSubmit(e) {
    // onSubmig 이벤트 멈추기
    e.preventDefault();
    // 주문정보를 LocalStorage에 담기
    saveLocalStorage();
    // 장바구니 담기 완료 alert
    alert("장바구니 담기 완료");
  }

  // 주문 클릭했을 때
  function handleOrderClick() {
    // 주문정보를 LocalStorage에 담기
    saveLocalStorage();
    // 주문하기로 이동하기
    navigation("/order");
  }

  // 총 주문가격 계산하기
  const totalPrice = useMemo(() => getTotalPrice(orderData), [orderData]);

  return (
    <>
      <ListGroup as="ul">
        <Form onSubmit={handleInputShopingBasketSubmit}>
          {/* 상품이름 */}
          <ListGroupItem>
            <Form.Group
            as={Row}
            className="mb-3"
            >
              <Form.Label column sm="4">
                상품명
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  name="name"
                  value={orderData.name}
                  readOnly
                />
              </Col>
            </Form.Group>
          </ListGroupItem>
          {/* 주문수량 */}
          <ListGroupItem>
            <Form.Group
            as={Row}
            className="mb-3"
            >
              <Form.Label column sm="4">
                주문수량
              </Form.Label>
              <Col sm="4">
                <Form.Control
                  type="number"
                  name="quantity"
                  value={orderData.quantity}
                  min="1"
                  placeholder='1'
                  onChange={handleOrderDataChange}
                />      
              </Col>
              <Col sm="1">
                <span>개</span>
              </Col>
            </Form.Group>
          </ListGroupItem>
          {/* 총 주문가격 */}
          <ListGroupItem>
            <Form.Group
              as={Row}
              className="mb-3"
            >
              <Form.Label column sm="5">
                총 주문가격
              </Form.Label>
              <Col sm="4">
                {totalPrice}<span>원</span>
              </Col>
            </Form.Group>
          </ListGroupItem>
          {/* button box */}
          <ListGroupItem>
            <Row>
              <Form.Group>
                <Button type="submit">장바구니담기</Button>
                <Button type="button" onClick={handleOrderClick}>주문</Button>
              </Form.Group>
            </Row>
          </ListGroupItem>
        </Form>
      </ListGroup>
    </>
  )
}

export default ItemOrderBoxForm