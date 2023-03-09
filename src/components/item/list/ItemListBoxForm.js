import React from 'react'
import CardWithHeaderForm from '../../common/CardWithHeaderForm';
import { ItemListContext } from '../ItemListForm';

/**
 * Item list box component
 * writer : 이호진
 * init : 2023.03.09
 * updated by writer :
 * update :
 * description : 상품 목록의 상품들을 나열한 component
 */
const ItemListBoxForm = () => {

  /// 변수 모음
  // 외부의 변수 불러오기
  const {cardDatas, likesList, memberInfo} = useContext(ItemListContext);
  const cardsOnARow = 3;// 한 줄에 게시글(카드) 개수
  /// 상태 모음

  /// 메서드 모음

  /// view 모음
  const view = null;// view 변수
  // cardDatas에 데이터가 있으면 실행된다
  if(cardDatas) {
    for(let i = 0; i < cardsOnARow; i++) {
      view += (

        <CardWithHeaderForm 
          key={rankcardData[i].num} 
          data={rankcardData[i]} 
          likesList={likesList} 
          memberInfo={memberInfo} 
        /> 
      );
    }
  }

  return (
    <CardGroup>
        {view}
    </CardGroup>
  );
}

export default ItemListBoxForm;