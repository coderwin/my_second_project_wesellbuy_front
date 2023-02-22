import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Header from './pages/Header';
import Footer from './pages/Footer';

// import item
import Home from './pages/item/Home';
import ItemDetail from './pages/item/ItemDetail';
import ItemUpdate from './pages/item/ItemUpdate';
import ItemRank from './pages/item/ItemRank';

// import member
import Login from './pages/member/Login';
import Join from './pages/member/Join';
import MemberDetail from './pages/member/MemberDetail';
import IdSearch from './pages/member/help/IdSearch'
import PwdSearch from './pages/member/help/PwdSearch'

// import customerservice
import CustomerServiceList from './pages/customerservice/CustomerServiceList';

// import recommendation
import RecommendationList from './pages/recommendation/RecommendationList';
import RecommendationDetail from './pages/recommendation/RecommendationDetail';
import RecommendationUpdate from './pages/recommendation/RecommendationUpdate';

// import error page
import NotFound from './pages/error/NotFound';
import IdSearchAnswer from './pages/member/help/IdSearchAnswer';
import PwdSearchAnswer from './pages/member/help/PwdSearchAnswer';
import MemberUpdate from './pages/member/MemberUpdte';
import Order from './pages/order/Order';
import CustomerServiceDetail from './pages/customerservice/CustomerServiceDetail';


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
