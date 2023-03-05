import React from 'react';
import {Route, Routes} from 'react-router-dom';
import HeaderNav from '../components/header/HeaderNav';
import HeaderTop from '../components/header/HeaderTop';

function Header() {

    return (
        <>
            <HeaderTop />
            <HeaderNav />
        </>
    );
}

export default Header;