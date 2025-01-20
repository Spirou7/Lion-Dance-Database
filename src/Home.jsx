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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id="title">Stanford Lion Dancing</div>
      <ul id="performance_list">
        <BuildPerformanceListElement 
        name="Winter Quarter 2025" 
        performance_url= "" 
        performance_link = "/performance.html"/>
      </ul>
    </>
  )
}

export default App
