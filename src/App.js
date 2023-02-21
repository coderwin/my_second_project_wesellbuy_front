import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// import item
import Home from './components/item/Home';
import ItemDetail from './components/item/ItemDetail';
import ItemUpdate from './components/item/ItemUpdate';
import ItemRank from './components/item/ItemRank';

// import member
import Login from './components/member/Login';
import Join from './components/member/Join';
import MemberDetail from './components/member/MemberDetail';
import IdSearch from './components/member/help/IdSearch'
import PwdSearch from './components/member/help/PwdSearch'

// import customerservice
import CustomerServiceList from './components/customerservice/CustomerServiceList';

// import recommendation
import RecommendationList from './components/recommendation/RecommendationList';
import RecommendationDetail from './components/recommendation/RecommendationDetail';
import RecommendationUpdate from './components/recommendation/RecommendationUpdate';

// import error page
import NotFound from './components/error/NotFound';
import IdSearchAnswer from './components/member/help/IdSearchAnswer';
import PwdSearchAnswer from './components/member/help/PwdSearchAnswer';
import MemberUpdate from './components/member/MemberUpdte';
import Order from './components/order/Order';
import CustomerServiceDetail from './components/customerservice/CustomerServiceDetail';


function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* item list */}
        <Route path="/" element={<Home />} />
        <Route path="/item/:num" element={<ItemDetail />}></Route>
        <Route path="/item/:num/update" element={<ItemUpdate />}></Route>
        <Route path="/item/rank" element={<ItemRank />}></Route>
        {/* login */}
        <Route path="/login" element={<Login />} />
        {/* help */}
        <Route path="/help/search/id" element={<IdSearch />} />
        <Route path="/help/search/id/answer" element={<IdSearchAnswer />} />
        <Route path="/help/search/pwd" element={<PwdSearch />} />
        <Route path="/help/search/pwd/answer" element={<PwdSearchAnswer />} />
        {/* Join */}
        <Route path="/join" element={<Join />} />
        {/* member detail info */}
        <Route path="/mydetail" element={<MemberDetail />} />
        <Route path="/mydetail/update" element={<MemberUpdate />} />
        {/* customerservice list */}
        <Route path="/cs" element={<CustomerServiceList />} />
        <Route path="/cs/:num" element={<CustomerServiceDetail />}></Route>
        {/* recommendation list */}
        <Route path="/recommendation/list" element={<RecommendationList />}  />
        <Route path="/recommendation/:num" element={<RecommendationDetail />} />
        <Route path="/recommendation/:num/update" element={<RecommendationUpdate />}  /> 

        {/* order list */}
        <Route path="/order" element={<Order />} />

        {/* 404 page */}
        <Route path="/*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
