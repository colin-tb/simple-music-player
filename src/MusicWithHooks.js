import React, { useState, useEffect, useRef, useCallback } from 'react';
import Slider from './Slider';

function getTime(time) {
  if(!isNaN(time)) {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
  }
}

const MusicWithHooks = () => {
  const [player, setPlayer] = useState('paused');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSlider, setShowSlider] = useState(false);

  const playerRef = useRef();

  useEffect(() => {
    playerRef.current.addEventListener("timeupdate", e => {
      setCurrentTime(e.target.currentTime);
      setDuration(e.target.duration);
      
      if (e.target.currentTime === e.target.duration && e.target.duration !== 0) {
        setPlayer('stopped');
      }
    });

    playerRef.current.addEventListener('canplaythrough', (e) => {
      setShowSlider(true);
      setDuration(e.target.duration)
    }, false);

    return (() => {
      playerRef.current.removeEventListener("timeupdate", () => {});
      playerRef.current.removeEventListener("canplaythrough", () => {});
    })
  },[])

  const handlePlayOnClick = useCallback(() => {
    console.log('playing')

    playerRef.current.play();
    setPlayer('playing');
  })

  const handlePauseOnClick = useCallback(() => {
    playerRef.current.pause();
    setPlayer('paused');
  })

  const handleStopOnClick = useCallback(() => {
    playerRef.current.pause();
    playerRef.current.currentTime = 0;
    setPlayer('stopped');
  })

  const handleUpdateCurrentTime = useCallback((e) => {
    const percentage = Number.parseInt(e.target.value)/100;
    const newCurrentTime = percentage * duration;

    setCurrentTime(newCurrentTime);
    playerRef.current.currentTime = newCurrentTime;
  })

  const parsedCurrentTime = getTime(currentTime);
  const parsedDuration = getTime(duration);

  const percentage = Math.floor((currentTime / duration) * 100)

  return (
    <>
      <h1>My Player</h1>
      <audio
        ref={playerRef}
        src="https://content.totalbrain.com/media/97accd/play/mp3/128k/default/v.mp3"
      />
      
      {
        player === 'playing'
        ? <button onClick={handlePauseOnClick}>Pause</button>
        : <button onClick={handlePlayOnClick}>Play</button>
      }

      {
        player !== 'stopped' && <button onClick={handleStopOnClick}>Stop</button>
      }

      <div>
        { parsedCurrentTime } / {parsedDuration}
      </div>
      
      {showSlider && (
        <Slider
          handlePause={handlePauseOnClick}
          handlePlay={handlePlayOnClick}
          updateCurrentTime={handleUpdateCurrentTime}
          value={percentage}
        />
      )}
    </>
  )
  
}

export default MusicWithHooks;
