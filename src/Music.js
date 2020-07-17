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
      this.setState({ showSlider: true, duration: e.target.duration });
    }, false);

    if (this.backgroundPlayer.volume) {
      this.backgroundPlayer.volume = this.state.backgroundMusicVolume;
    }
  }

  componentWillUnmount() {
    this.player.removeEventListener("timeupdate", () => {});
    this.player.removeEventListener("canplaythrough", () => {});
  }

  handlePlayOnClick = () => {
    this.player.play();
    this.backgroundPlayer.play();
    this.setState({ player: 'playing' })
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
    const percentage = parseInt(e.target.value)/100;
    const newCurrentTime = percentage * duration;

    this.setState({ currentTime: percentage * duration },
      () => {
        this.player.currentTime = newCurrentTime;
        this.backgroundPlayer.currentTime = newCurrentTime;
      }
    );
  }

  handleVolumeOnChange = (e) => {
    const newVolume = parseInt(e.target.value)/100;
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
        <audio ref={ref => this.player = ref} src={src}>
        </audio>
        

        <audio
          ref={ref => this.backgroundPlayer = ref}
          src="https://cdn.noises.online/NoisesOnline/Audio/ab.ogg"
        >
        </audio>
        
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
              onChange={this.handleVolumeOnChange}
              value={backgroundMusicVolume * 100}
            />
          </Fragment>
        )}
      </>
    )
  }
}

export default Music;
