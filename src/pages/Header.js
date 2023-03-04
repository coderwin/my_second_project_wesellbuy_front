import React from 'react';
import {Route, Routes} from 'react-router-dom';
import HeaderNav from '../components/header/HeaderNav';
import HeaderTop from '../components/header/HeaderTop';

function Header({sessionForm, OnChangeData}) {

    return (
        <>
            <HeaderTop sessionForm={sessionForm} OnChangeData={OnChangeData} />
            <HeaderNav />
        </>
    );
}

export default Header;