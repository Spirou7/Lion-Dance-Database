import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Home.css'

function BuildPerformanceListElement({ name, performance_url, performance_link }) {
  const handleClick = () => {
    window.location.href = performance_link;
  };

  return (
    <li className="performance_list_element" onClick={handleClick}>
      {name}
    </li>
  );
}

function ContactColumn(){
  return <>
    <div className = "contact_column">
      Email:
      <br/>
      Instagram:

    </div>
  </>
}

function ContentColumn(){
  return <>
    <div className = "content_column">
    <h1>Stanford's Lion Dancing Community Welcomes You!</h1>
    we are blah blah blah.
    <h1>Our routines:</h1>
    <div id="performance_list">
        <BuildPerformanceListElement 
        name="Winter Quarter 2025"
        performance_url= ""
        performance_link = "/performance.html"/>
      </div>
    </div>
  </>
}

function UpcomingEvents(){
  return <>
    <div className = "upcoming_events">
    </div>
  </>
}

function App() {

  return (
    <>
      <div className="title">
        <div className="title_text">Stanford Lion Dancing</div>
      </div>
      <div className = "article_columns">
        <ContactColumn/>
        <ContentColumn/>
        <UpcomingEvents/>
      </div>
    </>
  )
}

export default App
