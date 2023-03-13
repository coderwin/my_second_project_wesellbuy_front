import React, { useContext } from 'react'
import { CardGroup } from 'react-bootstrap';
import CardWithHeaderForm from '../../common/card/CardWithHeaderForm';
import { ItemListContext } from '../ItemListForm';
/**
 * Item list rank component
 * writer : 이호진
 * init : 2023.03.09
 * updated by writer : 이호진
 * update : 2023.03.13
 * description : 상품 순위 component
 *                > 현재 상품 순위를 보여준다
 *                  > 현재는 위에서 3개
 * 
 * update : view = null -> view = []
 */
const ItemRankBox = () => {

  /// 변수 모음
  // 외부의 변수 불러오기
  const {rankCardDatas, likesList, memberInfo} = useContext(ItemListContext);
  const cardsOnARow = 3;// 한 줄에 게시글(카드) 개수
  /// 상태 모음
  console.log("ranckCardDatas : " + rankCardDatas);
  console.log(rankCardDatas);

  /// 메서드 모음

  /// view 모음
  let view = [];// view 변수
  /// rankCardDatas가 있을 때만 실행한다
  if(rankCardDatas) {
    // rankCard 뿌려주기 cardsOnARow 만큼만
    for(let i = 0; i < cardsOnARow; i++) {
      view.push(
        <CardWithHeaderForm 
          // key={rankCardDatas[i].num} // 확인하기
          key={i}
          data={rankCardDatas[i]} 
          likesList={likesList} 
          memberInfo={memberInfo} 
        />
      );
    }
  } else {
    view = "상품이 없습니다.";
  }

  return (
    <CardGroup>
        {view}
    </CardGroup>
  );
}

export default ItemRankBox;