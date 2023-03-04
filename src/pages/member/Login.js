import React from 'react';
import {Route, Routes} from 'react-router-dom';
import LoginForm from '../../components/member/login/LoginForm';
import SearchButtons from '../../components/member/login/SearchButtons';

function Login({OnInput}) {

    return (
        <>
            <LoginForm OnInput={OnInput} />
            <SearchButtons />
        </>
        
    );
}

export default Login;