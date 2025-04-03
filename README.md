# Custom Audio Player

![NPM Version](https://img.shields.io/npm/v/react-pro-audio-player)
![License](https://img.shields.io/github/license/pranavsinggh/CustomAudioPlayer-npm-package)
![Downloads](https://img.shields.io/npm/dt/react-pro-audio-player)

A modern, **fully customizable** React **Audio Player** with support for **playlists, progress tracking, volume control, loop, playback speed adjustments**, and more.

## 🎮 Demo

![Demo GIF](https://i.ibb.co/W8xWHtG/Screenshot-93-1.png)

---

## 📜 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Hybrid Component](#hybrid-component)
  - [Uncontrolled Component](#uncontrolled-component)
- [Props](#props)
- [Styling & Customization](#styling--customization)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## 🚀 Features

✅ Fully customizable UI with Tailwind CSS support  
✅ Supports **playlist playback**  
✅ **Hybrid & Uncontrolled** component usage  
✅ **Loop, volume, and playback speed controls**  
✅ Supports **click-to-play** song selection  
✅ Smooth **progress tracking and seek**  
✅ Lightweight and optimized for performance

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

## 📖 Usage

### 1️⃣ Hybrid Component

A **hybrid component** gives you **full control** over the player's state, such as `isPlaying` and `currentSongIndex`, allowing external management of playback.

```jsx
import React, { useState } from "react";
import CustomAudioPlayer from "react-pro-audio-player";

const songsList = [
  { id: 1, url: "./assets/song1.mp3", title: "Song One", thumbnail:"Song Image" , singer:"Song Singer"},
  { id: 2, url: "./assets/song2.mp3", title: "Song Two", thumbnail:"Song Image" , singer:"Song Singer" },
  { id: 3, url: "./assets/song3.mp3", title: "Song Three", thumbnail:"Song Image" , singer:"Song Singer" },
];

const App = () => {
  const [songs, setSongs] = useState(songsList);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);

  return (
    <>
      <div>
        {songs.map((song, index) => (
          <div key={song.id} onClick={() => setCurrentSongIndex(index)}>
            {song.title}
          </div>
        ))}
      </div>
      {currentSongIndex !== null && (
        <CustomAudioPlayer
          songs={songs}
          isPlaying={isPlaying}
          currentSongIndex={currentSongIndex}
          onPlayPauseChange={setIsPlaying}
          onSongChange={setCurrentSongIndex}
          songUrlKey="url"
          songNameKey="title"
          songThumbnailKey="thumbnail" 
          songSingerKey="singer"
        />
      )}
    </>
  );
};

export default App;
```

### 2️⃣ Uncontrolled Component

If you want **default behavior** with minimal setup, use the **uncontrolled component**. This does not require managing state externally.

```jsx
import CustomAudioPlayer from "react-pro-audio-player";

const songsList = [
  { id: 1, url: "./assets/song1.mp3", title: "Song One" , thumbnail:"Song Image" , singer:"Song Singer" },
  { id: 2, url: "./assets/song2.mp3", title: "Song Two" , thumbnail:"Song Image" , singer:"Song Singer"},
  { id: 3, url: "./assets/song3.mp3", title: "Song Three" , thumbnail:"Song Image" , singer:"Song Singer" },
];

const App = () => {
  return (
    <CustomAudioPlayer songs={songsList} songUrlKey="url" songNameKey="title" songThumbnailKey="thumbnail" songSingerKey="singer" />
  );
};

export default App;
```

---

## 🎛️ Props

| Prop                     | Type       | Required | Description                                                   |
| ------------------------ | ---------- | -------- | ------------------------------------------------------------- |
| `songs`                  | `Array`    | ✅ Yes   | List of songs with `{ id, url, title }` objects.              |
| `songUrlKey`             | `string`   | ✅ Yes   | The key name in the song object that stores the song URL      |
| `songNameKey`            | `string`   | ❌ No    | The key name in the song object that stores the song name     |
| `songThumbnailKey`       | `string`   | ❌ No    | The key name in the song object that stores the song image    |
| `songSingerKey`          | `string`   | ❌ No    | The key name in the song object that stores the song singers  |
| `isPlaying`              | `boolean`  | ❌ No    | Controls playback state (Hybrid mode only).                   |
| `currentSongIndex`       | `number`   | ❌ No    | Index of the currently playing song (Hybrid mode only).       |
| `onPlayPauseChange`      | `function` | ❌ No    | Callback function to toggle play/pause (Hybrid mode only).    |
| `onSongChange`           | `function` | ❌ No    | Callback function when song changes (Hybrid mode only).       |

📝 **Note:**

- Props `isPlaying`, `currentSongIndex`, `onPlayPauseChange`, and `onSongChange` should be used **together** in **Hybrid mode**.

---

## 🎨 Styling & Customization

You can customize the player with **CSS classes**. The default styles use Tailwind-like classes:

| Class Name             | Description                                |
| ---------------------- | ------------------------------------------ |
| `.custom-audio-player` | Main player container                      |
| `.audio-player`        | Inner audio player container               |
| `.progress-bar`        | Custom progress bar styling                |
| `.controls-wrapper`    | Wrapper for playback controls              |
| `.playback-btn`        | Button for play, pause, next, and previous |
| `.volume-slider`       | Volume control styling                     |
| `.playback-speed`      | Dropdown for speed selection               |

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

But need to import the `CustomAudioPlayer.css` file:

```jsx
import "react-pro-audio-player/src/CustomAudioPlayer.css";
```

Before the global css file

```jsx
import "react-pro-audio-player/src/CustomAudioPlayer.css";
import "./index.css";
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

## 📌 Changelog

### v3.0.0 - (Latest Release)

- 🎨 **Revamped UI with Tailwind CSS support**
- 🎵 **Added songs details to be displayed**

### v2.0.0 - 

- 🎵 **Added Hybrid & Uncontrolled component support**
- 🎚 **Improved progress tracking and seek function**
- 🔄 **Loop & playback speed controls** added
- 🎨 **Revamped UI with Tailwind CSS support**
- 🛠 **Optimized state management for better performance**

### v1.0.0

- **Initial release with core audio playback features.**
- **Play/Pause, Forward/Backward, Volume Control, Loop, and Playback Speed.**
- **Responsive UI.**

---

## 📝 License

This package is open-source and available under the **MIT License**. Feel free to use and modify it as needed!

---

🚀 **Enjoy building with Custom Audio Player!** 🎧
