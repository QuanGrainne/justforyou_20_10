import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Image as ImageIcon } from 'lucide-react';
import styles from './Flower.module.css';

/**
 * Component Flower có thể tái sử dụng cho từng bông hoa
 * @param {Object} props
 * @param {Object} props.flower - Dữ liệu bông hoa
 * @param {Function} props.onClick - Hàm xử lý khi nhấn
 * @param {number} props.index - Thứ tự bông hoa để tạo độ trễ đung đưa tự nhiên
 * @param {boolean} props.isLarge - Dành cho bông hoa mở đầu
 */
export const Flower = ({ flower, onClick, index = 0, isLarge = false }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // 8 cánh hoa với góc quay tương ứng
  const petals = [0, 45, 90, 135, 180, 225, 270, 315];

  // Màu sắc cánh hoa từ dữ liệu hoặc mặc định
  const petalColor = flower.petalColor || '#f472b6';
  const petalSecondary = flower.petalSecondary || '#fbcfe8';

  // Độ trễ ngẫu nhiên cho chuyển động đung đưa trong gió
  const swayDelay = (index * 0.4) % 2.5;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick && onClick(flower);
    }
  };

  return (
    <motion.div
      className={`${styles.flowerWrapper} ${isLarge ? styles.largeFlower : ''}`}
      animate={{
        rotate: [-1.8, 1.8, -1.8],
        y: [-2, 2, -2]
      }}
      transition={{
        duration: 4.5 + (index % 3) * 0.7,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: swayDelay
      }}
      whileHover={{ scale: 1.08, rotate: 3 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => onClick && onClick(flower)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={flower.alt || `Bông hoa ${flower.id}`}
    >
      {/* Thân và lá cây */}
      <div className={styles.stemContainer}>
        <svg
          className={styles.stemSvg}
          viewBox="0 0 40 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Thân cây uốn lượn nhẹ */}
          <path
            d="M20 0 Q22 45 18 100"
            stroke="url(#stemGrad)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Chiếc lá bên phải */}
          <path
            d="M19 45 C32 40 38 30 38 25 C30 28 20 38 19 45 Z"
            fill="url(#leafGrad)"
          />
          {/* Chiếc lá bên trái */}
          <path
            d="M19 65 C8 60 2 52 2 46 C10 49 18 58 19 65 Z"
            fill="url(#leafGrad)"
          />
          <defs>
            <linearGradient id="stemGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
            <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Đầu hoa với 8 cánh hoa */}
      <div className={styles.blossom}>
        {petals.map((angle, i) => (
          <div
            key={i}
            className={styles.petal}
            style={{
              transform: `rotate(${angle}deg)`,
              background: `radial-gradient(ellipse at 50% 20%, ${petalSecondary} 0%, ${petalColor} 85%)`
            }}
          >
            {/* Vân cánh hoa tạo hiệu ứng tự nhiên */}
            <span className={styles.petalVein} />
          </div>
        ))}

        {/* Lớp cánh hoa phụ ở giữa tạo độ bồng bềnh */}
        <div className={styles.innerBlossomLayer}>
          {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
            <div
              key={`inner-${i}`}
              className={styles.innerPetal}
              style={{
                transform: `rotate(${angle}deg)`,
                background: `radial-gradient(circle, #fff0f5 20%, ${petalColor} 90%)`
              }}
            />
          ))}
        </div>

        {/* Nhụy hoa (chứa ảnh cá nhân hoặc trang trí) */}
        <div
          className={`${styles.pistil} ${
            flower.hasPhoto ? styles.photoPistil : styles.decorativePistil
          }`}
        >
          {flower.hasPhoto ? (
            <div className={styles.photoContainer}>
              {/* Kiểm tra nếu ảnh tải được */}
              {!imageError && flower.image ? (
                <img
                  src={flower.image}
                  alt={flower.alt || 'Ảnh kỷ niệm'}
                  className={`${styles.photoImg} ${imageLoaded ? styles.loaded : ''}`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              ) : null}

              {/* Placeholder hiển thị khi ảnh chưa có hoặc bị lỗi */}
              {(imageError || !flower.image || !imageLoaded) && (
                <div
                  className={`${styles.photoPlaceholder} ${
                    imageLoaded && !imageError ? styles.placeholderHidden : ''
                  }`}
                >
                  <Heart className={styles.placeholderHeart} size={20} fill="#f43f5e" color="#f43f5e" />
                  <span className={styles.placeholderText}>
                    {flower.id ? `Ảnh ${flower.id}` : 'Yêu thương'}
                  </span>
                </div>
              )}

              {/* Viền sáng bao quanh ảnh */}
              <div className={styles.photoGlowRing} />
            </div>
          ) : (
            /* Nhụy hoa trang trí lấp lánh */
            <div className={styles.decorativeCenter}>
              <div className={styles.pollenPistil}>
                <Sparkles className={styles.decorSparkle} size={22} color="#b45309" />
                <div className={styles.pollenDots}>
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Huy hiệu nhỏ hiển thị số hoặc icon khi hover trên desktop */}
      {flower.hasPhoto && (
        <div className={styles.flowerBadge}>
          <ImageIcon size={12} />
          <span>{flower.id}</span>
        </div>
      )}
    </motion.div>
  );
};
