import React, { useContext} from 'react'
import { Table } from 'react-bootstrap';
import "../../../css/form.css";
import { OrderListForSellerContext } from '../OrderListForSellerForm';
import OrderForSellerForm from './OrderForSellerForm';

/**
 * Order list box for seller component
 * writer : 이호진
 * init : 2023.03.12
 * updated by writer :
 * update :
 * description : 주문받은 상품 목록 box for seller component
 */
const OrderListBoxForSellerForm = () => {
  
  /// 변수 모음
  // 외부의 변수 불러오기
  const {listDatas, data: searchCond, totalPages} = useContext(OrderListForSellerContext);

  /// 상태 모음

  /// 메서드 모음

  /// view 모음
  let view = null;// 태그를 담아준다.
  // tbody에 들어갈 데이터 생성
  // 데이터가 있으면 생성한다
  if(listDatas) {
    // 데이터 만들기
    view = listDatas.map((data, i) => {
      return (
        <OrderForSellerForm key={i} data={data} numPosition={i} totalPages={totalPages} searchCond={searchCond} />
      );
    });
  // 없으면 데이터가 존재하지 않는다고 알려주기
  } else {
    view = (
      <tr>
        <th colSpan={11}>
          주문서가 없습니다.
        </th>
      </tr>
    );
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>판매순서</th>
          <th>주문수량</th>
          <th>주문총가격</th>
          <th>회원아이디</th>
          <th>회원이름</th>
          <th>휴대전화</th>
          <th>집전화</th>
          <th>배송지</th>
          <th>주문상태</th>
          <th>배달상태</th>
          <th></th>{/* 배달 버튼  */}
        </tr>
      </thead>
      <tbody>
        {view}
      </tbody>
    </Table>
  )
}

export default OrderListBoxForSellerForm;