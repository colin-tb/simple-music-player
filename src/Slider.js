import React from 'react';

class Slider extends React.Component {
  render() {
    const {
      onMouseDown = () => null,
      onMouseUp = () => null,
      onChange,
      value
    } = this.props;

    return (
      <div className="slidecontainer">
        {/* <input
          type="range" min="1" max="100" value={value} className="slider" id="myRange"
          onChange={onChange}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        /> */}

        <div className='slidecontainer--bar'>
          
        </div>
      </div>
    );
  }
}

export default Slider;
