import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './header.css'

function Create_Logo(){
    return <>
        <div className = "logo">Stanford Lion Dancing</div>
    </>
}

function Create_Tab(name, link){

    const change_tab = () => {
        window.location.href = link;
    };

    return <>
        <div className="tab" onClick={change_tab}>{name}</div>
    </>
}

function Create_Tabs(){
    let tabs = [];

    tabs.push(Create_Tab("Home", "/index.html"));
    tabs.push(Create_Tab("Winter Quarter Performance", "/performance.html"));


    let map = tabs.map((elm, index) => {
        return <div
        key={index}
        >{elm}</div>
    });

    return <>{map}</>;
}

function Header(){
    
    
    return <>
    <div 
    className="header">
        <Create_Logo/>
        <div className="tabs">
            <Create_Tabs/>
        </div>
    </div>
    </>
}

export default Header;