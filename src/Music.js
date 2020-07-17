import React, { Fragment } from 'react';
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
      showSlider: false,
      backgroundMusicVolume: 0.5
    }
  }

  componentDidMount() {
    this.player.addEventListener("timeupdate", e => {
      this.setState({
        currentTime: e.target.currentTime,
        duration: e.target.duration
      });
      
      if (e.target.currentTime === e.target.duration && e.target.duration !== 0) {
        this.setState({ player: 'stopped' });
      }
    });

    this.player.addEventListener('canplaythrough', (e) => {
      console.log('checking')
      this.setState({ showSlider: true, duration: e.target.duration });
    }, false);

    this.backgroundPlayer.volume = 0.1;
  }

  componentWillUnmount() {
    this.player.removeEventListener("timeupdate", () => {});
    this.player.removeEventListener("canplaythrough", () => {});
  }

  handlePlayOnClick = () => {
    this.player.play();
    this.backgroundPlayer.play();
    this.setState({ player: 'playing' }, () => console.log('after play currentTime:', this.state.currentTime))
  }

  handlePauseOnClick = () => {
    this.player.pause();
    this.backgroundPlayer.pause();
    this.setState({ player: 'paused' })
  }

  handleStopOnClick = () => {
    this.player.pause();
    this.player.currentTime = 0;
    this.backgroundPlayer.pause();
    this.backgroundPlayer.currentTime = 0;
    this.setState({ player: 'stopped' })
  }

  handleUpdateCurrentTime = (e) => {
    const { duration } = this.state;
    const percentage = Number.parseInt(e.target.value)/100;
    const newCurrentTime = percentage * duration;

    this.setState({ currentTime: percentage * duration },
      () => {
        this.player.currentTime = newCurrentTime;
        this.backgroundPlayer.currentTime = newCurrentTime;

        console.log('times: ', this.player.currentTime, this.backgroundPlayer.currentTime)
      }
    );
  }

  handleVolumneOnChange = (e) => {
    const newVolume = Number.parseInt(e.target.value)/100;
    this.backgroundPlayer.volume = newVolume;
    this.setState({ backgroundMusicVolume: newVolume })
  }

  render() {
    const {
      player,
      backgroundMusicVolume,
      currentTime: stateCurrentTime,
      duration: stateDuration,
      showSlider
    } = this.state;

    const {
      src = 'https://content.totalbrain.com/media/97accd/play/mp3/128k/default/v.mp3'
    } = this.props;

    const currentTime = getTime(stateCurrentTime);
    const duration = getTime(stateDuration);

    const percentage = Math.floor((stateCurrentTime / stateDuration) * 100)

    return (
      <>
        <h1>My Player</h1>
        <audio
          ref={ref => this.player = ref}
          src={src}
        />

        <audio
          ref={ref => this.backgroundPlayer = ref}
          src="https://cdn.noises.online/NoisesOnline/Audio/ab.ogg"
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
            onMouseDown={this.handlePauseOnClick}
            onMouseUp={this.handlePlayOnClick}
            onChange={this.handleUpdateCurrentTime}
            value={percentage}
          />
        )}

        {showSlider && (
          <Fragment>
            <p>Background Sounds</p>
            <Slider
              onChange={this.handleVolumneOnChange}
              value={backgroundMusicVolume * 100}
            />
          </Fragment>
        )}
      </>
    )
  }
}

export default Music;
