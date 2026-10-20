import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import styles from './MusicButton.module.css';

export const MusicButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Tự động phát nhạc ngay khi vào trang web
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 1. Cố gắng phát ngay lập tức khi tải trang
    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        // Trình duyệt chặn autoplay khi chưa có tương tác -> chờ cái chạm đầu tiên
        setIsPlaying(false);

        const handleFirstInteraction = async () => {
          try {
            if (audio.paused) {
              await audio.play();
              setIsPlaying(true);
            }
          } catch (e) {
            // Không làm gián đoạn
          }
          ['click', 'touchstart', 'scroll', 'keydown'].forEach((evt) =>
            window.removeEventListener(evt, handleFirstInteraction)
          );
        };

        ['click', 'touchstart', 'scroll', 'keydown'].forEach((evt) =>
          window.addEventListener(evt, handleFirstInteraction, { once: true, passive: true })
        );
      }
    };

    playAudio();

    // Lắng nghe sự kiện phát nhạc từ các nút khác trong ứng dụng
    const handleStartMusicEvent = () => {
      if (audio && audio.paused) {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };
    window.addEventListener('start-music', handleStartMusicEvent);

    return () => {
      window.removeEventListener('start-music', handleStartMusicEvent);
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.log('Không thể phát nhạc:', err);
      setIsPlaying(false);
    }
  };

  return (
    <div className={styles.musicContainer}>
      <audio
        ref={audioRef}
        src="/music/background.mp3"
        loop
        preload="auto"
        onError={() => setIsPlaying(false)}
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
