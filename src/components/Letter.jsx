import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { letterData } from '../data/letter';
import styles from './Letter.module.css';

/**
 * Lá thư chúc mừng 20/10 chuẩn theo hình ảnh mẫu:
 * - Biểu tượng bông hoa nhỏ trên đầu
 * - Tiêu đề lớn: "Mong những điều đẹp đẽ luôn nở bên bạn."
 * - Nội dung dịu dàng, lãng mạn
 * - Nút "Ngắm vườn hoa" ở dưới
 */
export const Letter = ({ onClose }) => {
  return (
    <motion.div
      className={styles.letterOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className={styles.cardContainer}
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 260 }}
      >
        <div className={styles.cardInner}>
          {/* Biểu tượng đóa hoa hồng nhỏ trên đầu lá thư như trong ảnh */}
          <div className={styles.topIcon}>
            <svg width="34" height="42" viewBox="0 0 34 42" fill="none">
              {/* Bông hoa hồng e ấp */}
              <path
                d="M17 4 C23 4 28 8 28 14 C28 20 22 25 17 26 C12 25 6 20 6 14 C6 8 11 4 17 4 Z"
                fill="#f472b6"
                stroke="#e11d48"
                strokeWidth="1.2"
              />
              <path
                d="M17 8 C20 8 23 11 23 15 C23 18 19 21 17 22 C15 21 11 18 11 15 C11 11 14 8 17 8 Z"
                fill="#fbcfe8"
                stroke="#e11d48"
                strokeWidth="0.8"
              />
              {/* Thân cây */}
              <path
                d="M17 26 L17 40"
                stroke="#15803d"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Chiếc lá */}
              <path
                d="M17 32 C22 30 26 26 26 23 C21 24 18 28 17 32 Z"
                fill="#22c55e"
                stroke="#15803d"
                strokeWidth="0.8"
              />
            </svg>
          </div>

          {/* Lời chào: Gửi bạn thương mến, */}
          <p className={styles.greeting}>{letterData.greeting}</p>

          {/* Tiêu đề chính lớn */}
          <h1 className={styles.heading}>
            {letterData.heading.split('\n').map((line, idx) => (
              <span key={idx} className={styles.headingLine}>
                {line}
              </span>
            ))}
          </h1>

          {/* Các đoạn văn trong thư */}
          <div className={styles.bodyContent}>
            {letterData.paragraphs.map((para, idx) => (
              <p key={idx} className={styles.paragraph}>
                {para}
              </p>
            ))}

            {/* Lời kết */}
            <p className={styles.closing}>{letterData.closing}</p>
          </div>

          {/* Nút "Ngắm vườn hoa" */}
          <div className={styles.buttonWrapper}>
            <button
              className={styles.viewGardenBtn}
              onClick={onClose}
              aria-label="Nhấn để ngắm vườn hoa kỷ niệm"
            >
              {letterData.actionButton || "Ngắm vườn hoa"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
