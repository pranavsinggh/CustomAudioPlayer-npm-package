import React, { useEffect, useRef, useState } from "react";
import {
  FaBackward,
  FaForward,
  FaPause,
  FaPlay,
  FaVolumeUp,
  FaVolumeMute,
  FaRedo,
} from "react-icons/fa";
import { ImLoop2 } from "react-icons/im";

const CustomAudioPlayer = ({
  audioSrc,
  isPlaying,
  onPlayPause,
  handlePlay,
  length,
  index,
  songs,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = audioSrc;
    audio.load();

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setMetadata = () => setDuration(audio.duration);
    const handleSongEnd = () => handleForward();

    audio.addEventListener("loadedmetadata", setMetadata);
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", handleSongEnd);

    if (isPlaying) audio.play();

    return () => {
      audio.removeEventListener("loadedmetadata", setMetadata);
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", handleSongEnd);
    };
  }, [audioSrc]);

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.play().catch(() => console.error("Playback failed."));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  useEffect(() => {
    audioRef.current.loop = isLooping;
  }, [isLooping]);

  useEffect(() => {
    audioRef.current.playbackRate = playbackRate;
  }, [playbackRate]);

  const handleSeekChange = e => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleForward = () => {
    handlePlay((index + 1) % length, songs);
  };

  const handleBackward = () => {
    handlePlay(index === 0 ? length - 1 : index - 1, songs);
  };

  const toggleMute = () => setIsMuted(prev => !prev);
  const toggleLoop = () => setIsLooping(prev => !prev);

  return (
    <section className="custom-audio-player" >
      {/* Progress Bar */}
      <header className="progress-container">
        <span>
          {Math.floor(currentTime / 60)}:
          {String(Math.floor(currentTime % 60)).padStart(2, "0")}
        </span>
        <input
          type="range"
          className="progress-bar"
          min="0"
          max={duration || 1}
          value={currentTime}
          onChange={handleSeekChange}
        />
        <span>
          {Math.floor(duration / 60)}:
          {String(Math.floor(duration % 60)).padStart(2, "0")}
        </span>
      </header>

      {/* Playback Controls */}
      <main className="controls-container">
        <div className="controls">
          <div className="playback-controls">
            <button onClick={handleBackward}>
              <FaBackward />
            </button>
            <button onClick={onPlayPause}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={handleForward}>
              <FaForward />
            </button>
          </div>

          {/* Volume and Playback Speed */}
          <div className="volume-speed-controls">
            <button onClick={toggleLoop}>
              {isLooping ? <ImLoop2 /> : <FaRedo />}
            </button>
            <button onClick={toggleMute}>
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <input
              type="range"
              className="volume-slider"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
            />

            {/* Playback Speed */}
            <select
              className="playback-speed"
              value={playbackRate}
              onChange={e => setPlaybackRate(parseFloat(e.target.value))}
            >
              <option value="0.5">0.5x</option>
              <option value="1">1x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>
          </div>
        </div>
      </main>
    </section>
  );
};

export default CustomAudioPlayer;
