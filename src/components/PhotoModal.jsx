import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import styles from './PhotoModal.module.css';

/**
 * Modal xem ảnh kỷ niệm phóng to thuần túy:
 * Không kèm nội dung text hay tiêu đề nào theo yêu cầu người dùng
 */
export const PhotoModal = ({ flower, onClose }) => {
  // Đóng modal khi bấm phím Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!flower || !flower.image) return null;

  return (
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      {/* Nút đóng nổi bật */}
      <button
        className={styles.closeBtn}
        onClick={onClose}
        aria-label="Đóng xem ảnh"
      >
        <X size={24} />
      </button>

      {/* Khung ảnh trung tâm */}
      <motion.div
        className={styles.imageBox}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={flower.image}
          alt={flower.alt || 'Ảnh kỷ niệm'}
          className={styles.fullImg}
          decoding="async"
        />
      </motion.div>
    </motion.div>
  );
};
