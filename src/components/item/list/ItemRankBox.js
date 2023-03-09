/**
 * Item list rank component
 * writer : 이호진
 * init : 2023.03.09
 * updated by writer :
 * update :
 * description : 상품 순위 component
 *                > 현재 상품 순위를 보여준다
 */
import React from 'react'

const ItemRankBox = () => {

  /// 변수 모음
  // 외부의 변수 불러오기
  const {rankCardDatas, likesList, memberInfo} = useContext(ItemListContext);
  /// 상태 모음

  /// 메서드 모음

  /// view 모음
  const view = null;// view 변수
  
  if(rankCardDatas) {
    for() {
      
    }
    view = cardDatas.map((cardData, i) => {
      return (
        <CardForm  
          data={cardData} 
          likesList={likesList} 
          memberInfo={memberInfo} 
        /> 
        );
    });
  }

  return (
    <CardGroup>
        {view}
    </CardGroup>
  );
}

export default ItemRankBox