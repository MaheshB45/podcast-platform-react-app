/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import "./AudioPlayer.css"
import  { useState, useRef, useEffect } from 'react';
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaVolumeUp,
  FaVolumeMute,
} from 'react-icons/fa';


const AudioPlayer = ({ src ,image,name}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress ,setProgress] = useState(0);
  

//  useEffect to update audio time and duration
  useEffect(() => {

    const audioElement = audioRef.current;
    setIsPlaying(true);
    togglePlayPause();


    const updateTime = () => {
      setCurrentTime(audioElement.currentTime);
    };

    const updateDuration = () => {
      setDuration(audioElement.duration);
    };

    audioElement.addEventListener('timeupdate', updateTime);
    audioElement.addEventListener('loadedmetadata', updateDuration);

   
    return () => {
      audioElement.removeEventListener('timeupdate', updateTime);
      audioElement.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [src]);
  
//   useEffect to calculate progress
  useEffect(()=>{
    setProgress(((currentTime/duration)*100));
  },[currentTime]);

//   Function to play pause
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

//   Function to handle skipping button
  const handleSkip = (amount) => {
    audioRef.current.currentTime += amount;
  };

//   Function to handle slider
  const handleSliderChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

//   Function to toggle mute/unmute
  const toggleMute = () => {
    const newIsMuted = !isMuted;
    setIsMuted(newIsMuted);
    audioRef.current.muted = newIsMuted;
  };

//   Function to handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };
 
// Function to formate time
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  
  return (
    <div className='AudioPlayer'>
      <audio ref={audioRef} src={src} />
      <div className="Player-content">
        <img src={image}/>
        <p>{name}</p>
      </div>
      <div className="Player-control-buttons">
        <button onClick={() => handleSkip(-5)}>
          <FaStepBackward className="logo" />
        </button>
        <button onClick={togglePlayPause}>
          {isPlaying ? <FaPause className="logo" /> : <FaPlay className="logo" />}
        </button>
        <button onClick={() => handleSkip(5)}>
          <FaStepForward className="logo"/>
        </button>
     
      </div>
      <div className="Player-duration">
        <span className="time-span">{formatTime(currentTime)}</span>
        <input
          className="Audio-duration"
          style={{background:`linear-gradient(to right, white ${progress}%, grey ${progress}%)`}}
          type="range"
          value={currentTime}
          max={duration}
          onChange={handleSliderChange}
        />
        <span className="time-span">{formatTime(duration)}</span>
      </div>
      <div className="Volume-control">
      <button onClick={toggleMute}>
          {isMuted ? <FaVolumeMute className="logo" /> : <FaVolumeUp className="logo"/>}
        </button>
        <input
          className="Volume-slider"
          type="range"
          value={volume}
         
          min={0}
          max={1}
          step={0.1}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};


export default AudioPlayer;