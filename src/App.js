import React from 'react';
import './App.css';
// import InputRange from './InputRange';

// import Music from './Music';
// import MusicWithHooks from './MusicWithHooks';

class App extends React.Component {
  componentDidMount() {
    const video = document.getElementById('audio');
  
    video.preload = 'metadata';

    video.onloadedmetadata = function() {
      window.URL.revokeObjectURL(video.src);
      var duration = video.duration;

      console.log('duration in on load metadata: ', duration)
      // debugger
      // myVideos[myVideos.length - 1].duration = duration;
      // updateInfos();
    }

    console.log('duration: ', video.duration);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <Music 
            src="https://music-cdn.icons8.com/preview_low/950/fa97a7c8-0077-48e1-81a9-33039cd4038a.mp3"
          />
          <div style={{ width: '30%' }}>
            <InputRange initialValue={25} />
          </div> */}
  
          <button
            onClick={() => {
              const video = document.getElementById('audio');
  
              video.volume = 0.2;
              video.play();
            }}
          >
            play
          </button>
  
        </header>
      </div>
    );
  }
}

export default App;
