import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './section.css'

function BuildAccordionItem({ title, content }) {
  const [isActive, setIsActive] = useState(false);
  const contentRef = useRef(null); // Create a ref for the element
  const childRef = useRef(null);
  const [height, setHeight] = useState(0); // Store calculated height

  const toggleExpand = () => {
    setIsActive(!isActive); // Toggle active state
  };

  useEffect(() => {
    const contentEl = contentRef.current;

    const handleResize = () => {
      if (childRef.current && isActive) {
        setHeight(childRef.current.scrollHeight + 30);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
        handleResize();
    });

    // Start observing the child element
    if (childRef.current) {
      resizeObserver.observe(childRef.current);
    }

    return () => {
      if (childRef.current) {
        resizeObserver.unobserve(childRef.current);
      }
    };

  }, [childRef, isActive]); // Re-run the effect when `isActive` or `content` changes
  
  useEffect(() => {
      const contentEl = contentRef.current;
      if(contentEl){
        setHeight(isActive ? contentEl.scrollHeight + 30 : 0);

        if(isActive){
          console.log("something was already active");
        }
      }
  }, [isActive, content]);

  const style = {
    overflow: 'hidden',
    height: `${height}px`, // Dynamic height based on state
    transition: 'height 300ms ease',
  };

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={toggleExpand}>
        <div>{title}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>

      <div ref={contentRef} style={style}>
        <div ref={childRef}>
        {content}
        </div>
      </div>
    </div>
  );
}

function BuildStep(name, directions, image_url){
  let image_style = "background-url: url(" + image_url + ")";

  const video = <iframe className="step_video" src={image_url} width="400vw" height="400vw" allow="autoplay"></iframe>;

  return (
    <>
      <div className="step">
        <div className="step_name"> {name}</div>
        <div className="step_directions"> {directions} </div>
        <div className = "video_drop_down">
          <BuildAccordionItem
          title="Video Demonstration"
          content={video}
          />
        </div>
        <hr className = "step_separator"></hr>
      </div>
    </>
  )
}

function BuildAllSteps(array_of_steps){
  let all_steps = []
  for(let i =0; i < array_of_steps.length; i++){

    let step = array_of_steps[i];

    let step_html = BuildStep("" + (i + 1)+ ") " + step.name, step.directions, step.image_url);

    all_steps.push(step_html);
  }

  return all_steps.map((item, index) => (
    <div key={index}>{item}</div>
  ));
}

function BuildAllSections(sections) {
  let sectionsArray = [];

  // Build the sections array
  for (let i = 0; i < sections.length; i++) {
    const section_name = sections[i].name;
    const all_steps = sections[i].steps;

    // Create the HTML of the steps
    const all_steps_html = BuildAllSteps(all_steps);

    // Create section HTML
    const section_html = (
      <div className = "section_accordion">
      <BuildAccordionItem
        key={i} // Add a key for each item
        title={section_name}
        content={all_steps_html}/>
      </div>
    );

    sectionsArray.push(section_html);
  }

  return sectionsArray;
}

function App() {
  const [sectionsArray, setSectionsArray] = useState([]); // State to store sections data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performance_file = '/performance.json';

    // Fetch performance data
    fetch(performance_file)
      .then((response) => response.json())
      .then((performance) => {
        const sections = performance.sections;
        const sectionsHTML = BuildAllSections(sections);
        setSectionsArray(sectionsHTML);
        setLoading(false); // Data loaded
      })
      .catch((error) => {
        console.error('Error fetching performance data:', error);
        setLoading(false); // Stop loading on error
      });
  }, []);

  return (
    <>
      <div className="performance_name">Winter Quarter 2025</div>
      <div className="accordion">
        {loading ? <p>Loading...</p> : sectionsArray}
      </div>
    </>
  );
}

export default App;