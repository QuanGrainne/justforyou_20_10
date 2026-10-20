import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperRose } from './components/PaperRose';
import { FlowerGarden } from './components/FlowerGarden';
import { MusicButton } from './components/MusicButton';
import { sendNotification } from './utils/notify';
import { Sparkles } from 'lucide-react';
import styles from './App.module.css';

export default function App() {
  const [hasBloomed, setHasBloomed] = useState(false);

  const initialRose = { id: 0, hasPhoto: false, colorType: 'hotpink', alt: 'Đóa hồng kỳ diệu' };

  // Gửi thông báo ngay khi người ấy vừa truy cập trang web
  useEffect(() => {
    sendNotification(
      '🌸 Có người vừa mở web 20/10!',
      'Người ấy vừa mở đường link trang web quà tặng của bạn!',
      ['tada', 'sparkles', 'rose']
    );
  }, []);

  const handleBloom = () => {
    if (hasBloomed) return;
    
    // Kích hoạt phát nhạc ngay lập tức khi chạm bông hoa
    window.dispatchEvent(new Event('start-music'));

    // Gửi thông báo đến điện thoại
    sendNotification(
      '🌹 Đóa hoa đã nở!',
      'Người ấy vừa chạm vào bông hoa để bung nở khu vườn hoa hồng!',
      ['rose', 'heart', 'blossom']
    );

    setHasBloomed(true);
  };

  return (
    <main className={styles.appContainer}>
      <MusicButton />

      {!hasBloomed ? (
        /* ───── MÀN HÌNH ĐẦU TIÊN ───── */
        <div key="intro" className={styles.intro}>
          <div className={styles.introGlow} />

          <motion.div
            className={styles.introRose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBloom}
          >
            <PaperRose
              flower={initialRose}
              size={160}
              hasStem={true}
              stemHeight={130}
              isFeatured={true}
              onClick={handleBloom}
            />
          </motion.div>

          <motion.div
            className={styles.introText}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className={styles.introHeading}>
              🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸
            </h1>
            <div
              className={styles.tapHint}
              onClick={handleBloom}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') handleBloom(); }}
              aria-label="Chạm để mở vườn hoa"
            >
              <Sparkles size={15} color="#f59e0b" />
              <span>Chạm vào bông hoa nhé!</span>
              <Sparkles size={15} color="#f59e0b" />
            </div>
          </motion.div>
        </div>
      ) : (
        /* ───── VƯỜN HOA TOÀN MÀN HÌNH ───── */
        <motion.div
          key="garden"
          style={{ position: 'fixed', inset: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
        >
          <FlowerGarden onReplayBloom={() => setHasBloomed(false)} />
        </motion.div>
      )}
    </main>
  );
}
