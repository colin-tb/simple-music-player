import React, { useState, useRef, useEffect, useCallback } from 'react';
import './style.css';

const InputRange = ({initialValue = 50}) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const sliderThumbRef = useRef(null);
  const sliderFillRef = useRef(null);

  const setThumb = useCallback(() => {
    const size = getComputedStyle(sliderThumbRef.current).getPropertyValue("width");
    const newXPosition = `calc(${inputValue}% - ${parseInt(size)/2}px)`;
    sliderThumbRef.current.style.left = newXPosition;  
  }, [inputValue])
  
  const setSliderFill = useCallback(() => {
    const gradient = `linear-gradient(to right, blue ${inputValue}%, rgba(255,255,255,0) ${inputValue}%)`;
    sliderFillRef.current.style.background = gradient;
  }, [inputValue]);

  useEffect(() => {
    setThumb();
    setSliderFill();
  }, [inputValue, setThumb, setSliderFill])

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
