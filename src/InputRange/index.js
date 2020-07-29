import React, { useState, useRef, useEffect } from 'react';
import './style.css';

const InputRange = ({initialValue = 50}) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const sliderThumbRef = useRef(null);
  const sliderFillRef = useRef(null);

  

  useEffect(() => {
    const setThumb = () => {
      let size = getComputedStyle(sliderThumbRef.current).getPropertyValue("width");
      let newx = `calc(${inputValue}% - ${parseInt(size)/2}px)`;
      sliderThumbRef.current.style.left = newx;  
    }
    
    const setSliderFill = () => {
      // we create a linear gradient with a color stop based on the slider value
      let gradient = `linear-gradient(to right, blue ${inputValue}%, rgba(255,255,255,0) ${inputValue}%)`;
      sliderFillRef.current.style.background = gradient;
    }

    setThumb();
    setSliderFill();
  }, [inputValue])
  
  
  

  return (
    <div className="rangewrapper horizontal">
      <div ref={sliderFillRef}  className="sliderfill" >
        <input
          className="customrange"
          type="range"
          min={0}
          max={100}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </div>
      <div ref={sliderThumbRef} className="sliderthumb"></div>
    </div>
  )
  
}

export default InputRange;
