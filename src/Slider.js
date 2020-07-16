import React from 'react';

class Slider extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handlePause, handlePlay, updateCurrentTime, value } = this.props;

    return (
      <div className="slidecontainer">
        <input
          type="range" min="1" max="100" value={value} className="slider" id="myRange"
          onChange={updateCurrentTime}
          onMouseDown={handlePause}
          onMouseUp={handlePlay}
        />
      </div>
    );
  }
}

export default Slider;
