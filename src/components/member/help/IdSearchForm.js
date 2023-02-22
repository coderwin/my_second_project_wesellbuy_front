import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap'
import EmailForm from './EmailForm'
import SelfphoneForm from './SelfphoneForm'

const IdSearchForm = () => {

    // 박스 만들기
    // searchBox, emailBox 만들기
    const [selfphoneBox, setSelfphoneBox] = useState(null);
    const [emailBox, setEmailBox] = useState(null);

    // 휴대전화찾기 클릭
    function handleSelfphoneBtnClick() {
        // display none으로 고치기
        setSelfphoneBox(<SelfphoneForm />)
        setEmailBox(null);
    }
    // 이메일찾기 클릭
    function handleEmailBtnClick() {
        // display none으로 고치기
        setEmailBox(<EmailForm />);
        setSelfphoneBox(null);
    }

    // 처음은 휴대전화 찾기가 보인다
    useEffect(() => {
        setSelfphoneBox(<SelfphoneForm />);
    }, []);

    return (
        <>
            <Nav variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link onClick={handleSelfphoneBtnClick}>휴대전화로찾기</Nav.Link>
                    {selfphoneBox}
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={handleEmailBtnClick}>이메일로찾기</Nav.Link>
                    {emailBox}
                </Nav.Item>
            </Nav>
        </>
        
    )
}

export default IdSearchForm