import React, { useContext } from 'react'
import { CardGroup } from 'react-bootstrap';
import CardWithHeaderForm from '../../common/card/CardWithHeaderForm';
import { ItemListContext } from '../ItemListForm';
/**
 * Item list rank component
 * writer : 이호진
 * init : 2023.03.09
 * updated by writer :
 * update :
 * description : 상품 순위 component
 *                > 현재 상품 순위를 보여준다
 *                  > 현재는 위에서 3개
 */
const ItemRankBox = () => {

  /// 변수 모음
  // 외부의 변수 불러오기
  const {rankCardDatas, likesList, memberInfo} = useContext(ItemListContext);
  const cardsOnARow = 3;// 한 줄에 게시글(카드) 개수
  /// 상태 모음

  /// 메서드 모음

  /// view 모음
  let view = null;// view 변수
  /// rankCardDatas가 있을 때만 실행한다
  if(rankCardDatas) {
    // rankCard 뿌려주기 cardsOnARow 만큼만
    for(let i = 0; i < cardsOnARow; i++) {
      view += (
        <CardWithHeaderForm 
          key={rankCardDatas[i].num} 
          data={rankCardDatas[i]} 
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

export default ItemRankBox;