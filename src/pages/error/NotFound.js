import React from 'react';
import {Route, Routes} from 'react-router-dom';
import NotFoundForm from '../../components/error/NotFoundForm';

/**
 * NotFound page
 * writer : 이호진
 * init : 2023.02.21
 * updated by writer : 이호진
 * update : 2023.03.13
 * description : NotFound page
 * 
 * update : input component
 */
function NotFound() {

    return (
      <>
        <NotFoundForm />
      </>
    );
}

export default NotFound;