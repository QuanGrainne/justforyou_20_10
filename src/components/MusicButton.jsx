import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import styles from './MusicButton.module.css';

export const MusicButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioAvailable, setAudioAvailable] = useState(true);
  const audioRef = useRef(null);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        }
      }
    } catch (err) {
      console.log('Chưa thể phát nhạc (chưa thêm file MP3 hoặc chính sách trình duyệt):', err);
      // Website vẫn hoạt động bình thường
      setIsPlaying(false);
    }
  };

  const handleAudioError = () => {
    console.log('File music/background.mp3 chưa được thêm hoặc không đọc được.');
    setAudioAvailable(false);
    setIsPlaying(false);
  };

  return (
    <div className={styles.musicContainer}>
      <audio
        ref={audioRef}
        src="./music/background.mp3"
        loop
        preload="auto"
        onError={handleAudioError}
      />
      <button
        className={`${styles.musicBtn} ${isPlaying ? styles.playing : ''}`}
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
        title={isPlaying ? 'Tắt nhạc nền 🎵' : 'Bật nhạc nền lãng mạn 🎶'}
      >
        <span className={styles.iconWrapper}>
          {isPlaying ? (
            <Volume2 size={20} className={styles.musicIcon} />
          ) : (
            <VolumeX size={20} className={styles.mutedIcon} />
          )}
        </span>

        {/* Sóng âm thanh sinh động khi đang phát */}
        {isPlaying && (
          <div className={styles.audioBars}>
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </div>
        )}

        <span className={styles.btnLabel}>
          {isPlaying ? 'Đang phát' : 'Nhạc nền'}
        </span>
      </button>
    </div>
  );
};
