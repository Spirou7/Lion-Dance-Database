import React, { useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './section.css'

function BuildAccordionItem({title, content}){

  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className="accordion-item">
          <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
            <div>{title}</div>
            <div>{isActive ? "-" : "+"}</div>
          </div>
          <div className="all_steps">
          {isActive && content}
          </div>
      </div>
    </>
  );
}

function BuildStep(name, directions, image_url){
  let image_style = "background-url: url(" + image_url + ")";
  return (
    <>
      <div className="step">
        <div className="step_name"> {name}</div>
        <div className="step_directions"> {directions} </div>
        <div className="step_image" style={{image_style}}></div>
      </div>
    </>
  )
}

function BuildAllSteps(array_of_steps){
  let all_steps = []
  for(let i =0; i < array_of_steps.length; i++){

    let step = array_of_steps[i];

    let step_html = BuildStep(step.name, step.directions, step.image_url);

    all_steps.push(step_html);
  }

  return all_steps.map((item, index) => (
    <div key={index}>{item}</div>
  ));
}

function BuildAllSections(json_file, sectionsArray, setSectionsArray){
  const [isLoading, setIsLoading] = useState(true);

  fetch(json_file)
  .then((response) => {
    
    console.log(response);
    return response.json()})
  .then((performance => {
    console.log(performance)
    // THIS IS WHERE THE FUN BEGINS
    const performance_name = performance.name;
    const sections = performance.sections;

    // Holds an array of all sections
    let sections_array = [];

    // For every section...
    // Update the sections array
    for(let i = 0; i < sections.length; i++){

      const section_name = sections[i].name;
      // Get all of the steps
      const all_steps = sections[i].steps;
      
      // Create the HTML of the steps
      const all_steps_html = BuildAllSteps(all_steps);

      const section_html = <>
        <BuildAccordionItem
          title={section_name}
          content={all_steps_html}
        />
      </>

      sections_array.push(section_html);
    }


    
    sections_array = sections_array.map((item, index) => (
      <div key={index}>{item}</div>
    ));

    setSectionsArray(sections_array);
    setIsLoading(false);

  }));
}

function App() {
  const [count, setCount] = useState(0);
  const [sectionsArray, setSectionsArray] = useState([]); // State to store sections data


  const performance_file = "/performance.json";
  BuildAllSections(performance_file, sectionsArray, setSectionsArray);

  return (
    <>
      <div id="title">Stanford Lion Dancing</div>
      <div className="accordion">
        {sectionsArray}
      </div>
    </>
  )
}

export default App
