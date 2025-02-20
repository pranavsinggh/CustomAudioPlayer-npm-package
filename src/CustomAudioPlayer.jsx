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
import { MdCancel } from "react-icons/md";

const CustomAudioPlayer = ({
  // Songs
  initialSongs = [],
  songs: controlledSongs, // optional external songs array
  onSongsChange, // callback when songs array changes

  // Playback state
  isPlaying: controlledIsPlaying,
  onPlayPauseChange, // callback when play/pause changes

  // Song index state
  currentSongIndex: controlledSongIndex,
  onSongChange, // callback when the song index changes
}) => {
  // Use controlled values if provided; otherwise, use internal state.
  const [internalSongs, setInternalSongs] = useState(initialSongs);
  const songs = controlledSongs !== undefined ? controlledSongs : internalSongs;

  const [internalIsPlaying, setInternalIsPlaying] = useState(false);
  const isPlaying =
    controlledIsPlaying !== undefined ? controlledIsPlaying : internalIsPlaying;

  const [internalSongIndex, setInternalSongIndex] = useState(0);
  const currentSongIndex =
    controlledSongIndex !== undefined ? controlledSongIndex : internalSongIndex;

  // Other internal states.
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const audioRef = useRef(new Audio());

  // Update audio source when current song or songs list changes.
  useEffect(() => {
    if (songs.length === 0) return;
    const audio = audioRef.current;
    audio.src = songs[currentSongIndex]?.src;
    audio.load();

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setMetadata = () => setDuration(audio.duration);
    const handleSongEnd = () => handleForward();

    audio.addEventListener("loadedmetadata", setMetadata);
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", handleSongEnd);

    if (isPlaying) {
      audio.play().catch(() => console.error("Playback failed."));
    }

    return () => {
      audio.removeEventListener("loadedmetadata", setMetadata);
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", handleSongEnd);
    };
  }, [songs, currentSongIndex]);

  // Effect to handle play/pause changes.
  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.play().catch(() => console.error("Playback failed."));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Volume, mute, loop, and playback rate effects.
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

  // If the user interacts with the volume slider while muted, unmute automatically.
  const handleVolumeChange = e => {
    const newVolume = parseFloat(e.target.value);
    if (isMuted) {
      setIsMuted(false);
    }
    setVolume(newVolume);
  };

  // Helper to update song index both internally and externally.
  const updateSongIndex = newIndex => {
    if (controlledSongIndex === undefined) {
      setInternalSongIndex(newIndex);
    }
    onSongChange && onSongChange(newIndex);
  };

  // Helper to update isPlaying state.
  const updateIsPlaying = newState => {
    if (controlledIsPlaying === undefined) {
      setInternalIsPlaying(newState);
    }
    onPlayPauseChange && onPlayPauseChange(newState);
  };

  const handleForward = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    updateSongIndex(nextIndex);
    updateIsPlaying(true);
  };

  const handleBackward = () => {
    const prevIndex =
      currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    updateSongIndex(prevIndex);
    updateIsPlaying(true);
  };

  const toggleMute = () => setIsMuted(prev => !prev);
  const toggleLoop = () => setIsLooping(prev => !prev);
  const togglePlayPause = () => updateIsPlaying(!isPlaying);

  // Updated handleCancel: removes current song, resets audioRef and related states.
  const handleCancel = () => {
    // Reset the audio reference.
    audioRef.current.pause();
    setCurrentTime(0);
    audioRef.current.currentTime = 0;
    updateIsPlaying(false);

    if (controlledSongIndex !== undefined) {
      onSongChange && onSongChange(null);
    }
  };

  if (songs.length === 0) return <p>No songs available.</p>;

  // Calculate progress percentage for the seek bar.
  const progressPercent =
    duration && currentTime ? (currentTime / duration) * 100 : 0;
  const progressBarStyle = {
    background: `linear-gradient(to right, blue ${progressPercent}%, #d1d5db ${progressPercent}%)`,
  };

  // Calculate volume percentage for the volume slider.
  const volumePercent = volume * 100;
  const volumeSliderStyle = {
    background: `linear-gradient(to right, blue ${volumePercent}%, #d1d5db ${volumePercent}%)`,
  };

  return (
    <section className="custom-audio-player">
      <div className="player-header">
        <div className="song-details">
          <span className="song-title">{songs[currentSongIndex]?.name}</span>
        </div>
        <button
          onClick={handleCancel}
          aria-label="Cancel playback"
          className="btn cancel-btn"
        >
          <MdCancel />
        </button>
      </div>
      <div className="audio-player">
        <div className="progress-wrapper">
          <span className="time">
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
            aria-label="Seek slider"
            style={progressBarStyle}
          />
          <span className="time">
            {Math.floor(duration / 60)}:
            {String(Math.floor(duration % 60)).padStart(2, "0")}
          </span>
        </div>
        <div className="controls-wrapper">
          <div className="center-controls">
            <button
              onClick={handleBackward}
              aria-label="Previous track"
              className="btn playback-btn"
            >
              <FaBackward />
            </button>
            <button
              onClick={togglePlayPause}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="btn playback-btn"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button
              onClick={handleForward}
              aria-label="Next track"
              className="btn playback-btn"
            >
              <FaForward />
            </button>
          </div>
          <div className="right-controls">
            <button
              onClick={toggleLoop}
              aria-label="Toggle loop"
              className="btn loop-btn"
            >
              {isLooping ? <ImLoop2 /> : <FaRedo />}
            </button>
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="btn mute-btn"
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <input
              type="range"
              className="volume-slider"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              aria-label="Volume slider"
              style={volumeSliderStyle}
            />
            <select
              className="playback-speed"
              value={playbackRate}
              onChange={e => setPlaybackRate(parseFloat(e.target.value))}
              aria-label="Playback speed"
            >
              <option value="0.5">0.5x</option>
              <option value="1">1x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomAudioPlayer;
