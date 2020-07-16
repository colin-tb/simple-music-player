import React from 'react';
import Slider from './Slider';

function getTime(time) {
  if(!isNaN(time)) {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
  }
}

class Music extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: 'paused',
      currentTime: 0,
      duration: 0,
      showSlider: false
    }
  }

  componentDidMount() {
    this.player.addEventListener("timeupdate", e => {
      this.setState({
        currentTime: e.target.currentTime,
        duration: e.target.duration
      });
      
      if (e.target.currentTime === e.target.duration && e.target.duration !== 0) {
        console.log('ended')

        this.setState({ player: 'stopped' });
      }
    });

    this.player.addEventListener('canplaythrough', (e) => {
      console.log('checking')
      this.setState({ showSlider: true, duration: e.target.duration });
    }, false);
  }

  componentWillUnmount() {
    this.player.removeEventListener("timeupdate", () => {});
    this.player.removeEventListener("canplaythrough", () => {});
  }

  handlePlayOnClick = () => {
    this.player.play();

    console.log('currentTime:', this.state.currentTime)
    this.setState({ player: 'playing' }, () => console.log('after play currentTime:', this.state.currentTime))
  }

  handlePauseOnClick = () => {
    this.player.pause();
    this.setState({ player: 'paused' })
  }

  handleStopOnClick = () => {
    this.player.pause();
    this.player.currentTime = 0;
    this.setState({ player: 'stopped' })
  }

  handleUpdateCurrentTime = (e) => {
    const { duration } = this.state;
    const percentage = Number.parseInt(e.target.value)/100;
    const newCurrentTime = percentage * duration;

    this.setState({ currentTime: percentage * duration },
      () => this.player.currentTime = newCurrentTime
    );
  }

  render() {
    const {
      player,
      currentTime: stateCurrentTime,
      duration: stateDuration,
      showSlider
    } = this.state;

    const currentTime = getTime(stateCurrentTime);
    const duration = getTime(stateDuration);

    const percentage = Math.floor((stateCurrentTime / stateDuration) * 100)

    return (
      <>
        <h1>My Player</h1>
        <audio
          ref={ref => this.player = ref}
          src="https://content.totalbrain.com/media/97accd/play/mp3/128k/default/v.mp3"
        />
        
        {
          player === 'playing'
          ? <button onClick={this.handlePauseOnClick}>Pause</button>
          : <button onClick={this.handlePlayOnClick}>Play</button>
        }

        {
          player !== 'stopped' && <button onClick={this.handleStopOnClick}>Stop</button>
        }

        <div>
          { currentTime } / {duration}
        </div>
        
        {showSlider && (
          <Slider
            handlePause={this.handlePauseOnClick}
            handlePlay={this.handlePlayOnClick}
            updateCurrentTime={this.handleUpdateCurrentTime}
            value={percentage}
          />
        )}
      </>
    )
  }
}

export default Music;
