import React, { useContext} from 'react'
import "../../../css/form.css";
import {OrderListContext} from '../OrderListForm';
import OrderForm from './OrderForm';

/**
 * Order list box component
 * writer : 이호진
 * init : 2023.03.11
 * updated by writer :
 * update :
 * description : 주문 목록 box component
 */
const OrderListBoxForm = () => {
  
  /// 변수 모음
  // 외부의 변수 불러오기
  const {listDatas, data: searchCond} = useContext(OrderListContext);

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
        <OrderForm key={i} data={data} searchCond={searchCond} />
      );
    });
  // 없으면 데이터가 존재하지 않는다고 알려주기
  } else {
    view = (
      <tr>
        <th>
          주문서가 없습니다.
        </th>
      </tr>
    );
  }

  return (
    <>
      {view}
    </>
  )
}

export default OrderListBoxForm;