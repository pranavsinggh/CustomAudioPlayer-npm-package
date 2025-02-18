# CustomAudioPlayer

![NPM Version](https://img.shields.io/npm/v/react-pro-audio-player)
![License](https://img.shields.io/github/license/pranavsinggh/CustomAudioPlayer-npm-package)
![Downloads](https://img.shields.io/npm/dt/react-pro-audio-player)

A customizable audio player component for React that allows for seamless audio playback with features like play/pause, volume control, loop, playback speed adjustment, and progress bar.

## 🎮 Demo

![Demo GIF](https://github.com/user-attachments/assets/8e54d99c-71d2-4f0c-b2c2-37e750a4377e)

---

## 📚 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Styling](#styling)
- [Customization](#customization)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## 🚀 Features

👉 **Play/Pause Controls** - Toggle between play and pause using icons.  
👉 **Forward/Backward Controls** - Skip to the next or previous track in the playlist.  
👉 **Volume Control** - Adjust volume or mute the audio with a slider and mute toggle.  
👉 **Looping** - Toggle loop mode to replay the current track automatically.  
👉 **Playback Speed** - Adjust playback speed from `0.5x` to `2x`.  
👉 **Progress Bar** - Visualize and control the audio progress with a seekable range bar.  
👉 **Responsive UI** - Works well across different devices with clean, minimal styling.  

---

## 📦 Installation

You can install this package via npm or yarn:

```sh
npm install react-pro-audio-player
```

or

```sh
yarn add react-pro-audio-player
```

---

## 🔧 Usage

To use the `CustomAudioPlayer` in your project, import it and pass the necessary props:

```jsx
import React, { useState } from 'react';
import CustomAudioPlayer from 'react-pro-audio-player';

const songs = [
  { id: 1, src: 'song1.mp3' },
  { id: 2, src: 'song2.mp3' },
  { id: 3, src: 'song3.mp3' },
];

const App = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePlay = (index, allSongs) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  return (
    <div>
      <CustomAudioPlayer
        audioSrc={songs[currentSongIndex].src}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        handlePlay={handlePlay}
        length={songs.length}
        index={currentSongIndex}
        songs={songs}
      />
    </div>
  );
};

export default App;
```

---

## ⚙️ Props

| Prop Name    | Type     | Required | Description |
|-------------|---------|----------|-------------|
| `audioSrc`  | string  | ✅        | The source URL of the current audio track. |
| `isPlaying` | boolean | ✅        | Indicates whether the audio is playing or paused. |
| `onPlayPause` | function | ✅        | Callback function to handle play/pause toggle. |
| `handlePlay` | function | ✅        | Function to handle playing a specific song, required for forward/backward navigation. |
| `length`    | number  | ✅        | Total number of songs in the playlist. |
| `index`     | number  | ✅        | Index of the current song in the playlist. |
| `songs`     | array   | ✅        | Array of song objects containing `id` and `src`. |

---

## 🎭 Styling

You can customize the styles by overriding the default CSS classes in your own CSS files or by using a CSS-in-JS solution. The following classes are available:

```css
.custom-audio-player {}
.progress-container {}
.progress-bar {}
.controls-container {}
.playback-controls {}
.volume-speed-controls {}
.volume-slider {}
.playback-speed {}
```

To use the default styles, import the `CustomAudioPlayer.css` file:

```jsx
import 'react-pro-audio-player/dist/CustomAudioPlayer.css';
```

---

## 🎭 Customization

You can enhance the audio player by adding more styles or modifying props. Example of custom styling:

```css
.custom-audio-player {
  background-color: #333;
  color: #fff;
  padding: 10px;
  border-radius: 8px;
}
```

---

## 🤝 Contributing

We welcome contributions! Here’s how you can help:
1. Fork the repository.
2. Create a new branch (`feature-xyz`).
3. Make your changes.
4. Submit a pull request.

GitHub Repository: [CustomAudioPlayer](https://github.com/pranavsinggh/CustomAudioPlayer-npm-package)

---

## 📝 Changelog

### v1.0.0
- Initial release with core audio playback features.
- Play/Pause, Forward/Backward, Volume Control, Loop, and Playback Speed.
- Responsive UI.

---

## 📝 License

This package is open-source and available under the **MIT License**. Feel free to use and modify it as needed!

