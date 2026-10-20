import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperRose, RoseBud } from './PaperRose';
import { Letter } from './Letter';
import { PhotoModal } from './PhotoModal';
import { flowersData } from '../data/flowers';
import styles from './FlowerGarden.module.css';

/**
 * Tính toán chiều dài cành hoa để cành vươn dài xuống mãi bên dưới màn hình
 */
const getStemHeight = (topStr) => {
  const topNum = parseFloat(topStr) || 50;
  return Math.max(400, Math.round((110 - topNum) * 12.5));
};

/**
 * Vườn hoa hồng giấy 3D khổng lồ theo đúng hình ảnh tham khảo:
 * - Bầu trời xanh pastel + mây bồng bềnh dịu nhẹ
 * - Bông hoa hồng lớn nhất vươn cao ở chính giữa màn hình (có cành lá vươn dài)
 * - 25 bông hoa chứa ảnh cá nhân hiển thị TRỰC TIẾP trên hoa
 * - Bấm vào bất kỳ bông hoa nào có ảnh để xem ảnh phóng to thuần túy
 * - Tất cả các bông hoa đều có cành dài vươn xuống mãi bên dưới màn hình
 * - Vườn hoa chi chít với hơn 120 bông hoa nhiều lớp chiều sâu
 * - 2 nút "Đọc lại thiệp" và "Cho hoa nở lại" ở đáy màn hình
 */
export const FlowerGarden = ({ onReplayBloom }) => {
  const [showLetter, setShowLetter] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // ─────────────────────────────────────────────────────────────────────────
  // ĐÚNG 25 BÔNG HOA CÓ ẢNH KỶ NIỆM HIỂN THỊ TRỰC TIẾP (photo1.jpg -> photo25.jpg)
  // Có cành dài xuống mãi bên dưới, phân bố đều và đẹp mắt khắp khu vườn
  // ─────────────────────────────────────────────────────────────────────────
  const photoFlowers = useMemo(() => [
    // ── HÀNG CAO PHÍA XA (top 24% - 30%) ──
    { data: flowersData[0],  size: 118, left: '10%', top: '27%', zIndex: 26 }, // photo 1
    { data: flowersData[1],  size: 120, left: '23%', top: '25%', zIndex: 26 }, // photo 2
    { data: flowersData[7],  size: 120, left: '77%', top: '25%', zIndex: 26 }, // photo 8
    { data: flowersData[8],  size: 118, left: '90%', top: '27%', zIndex: 26 }, // photo 9

    // ── BÔNG HOA TRUNG TÂM LỚN NHẤT (bông số 5) - vươn cao với cành lá to ──
    {
      data: flowersData[4],
      size: 190,
      left: '50%',
      top: '26%',
      isFeatured: true,
      hasStem: true,
      stemHeight: 1050,
      zIndex: 48,
    }, // photo 5

    // ── HÀNG TRUNG CAO (top 36% - 43%) ──
    { data: flowersData[2],  size: 124, left: '5%',  top: '40%', zIndex: 29 }, // photo 3
    { data: flowersData[3],  size: 126, left: '17%', top: '38%', zIndex: 29 }, // photo 4
    { data: flowersData[10], size: 124, left: '32%', top: '37%', zIndex: 30 }, // photo 11
    { data: flowersData[11], size: 124, left: '68%', top: '37%', zIndex: 30 }, // photo 12
    { data: flowersData[5],  size: 126, left: '83%', top: '38%', zIndex: 29 }, // photo 6
    { data: flowersData[6],  size: 124, left: '95%', top: '40%', zIndex: 29 }, // photo 7

    // ── HÀNG TRUNG TÂM (top 48% - 55%) ──
    { data: flowersData[12], size: 126, left: '11%', top: '51%', zIndex: 33 }, // photo 13
    { data: flowersData[13], size: 125, left: '24%', top: '50%', zIndex: 33 }, // photo 14
    { data: flowersData[14], size: 128, left: '37%', top: '49%', zIndex: 34 }, // photo 15
    { data: flowersData[15], size: 128, left: '63%', top: '49%', zIndex: 34 }, // photo 16
    { data: flowersData[16], size: 125, left: '76%', top: '50%', zIndex: 33 }, // photo 17
    { data: flowersData[17], size: 126, left: '89%', top: '51%', zIndex: 33 }, // photo 18

    // ── HÀNG CẬN CẢNH (top 60% - 66%) ──
    { data: flowersData[18], size: 128, left: '6%',  top: '64%', zIndex: 37 }, // photo 19
    { data: flowersData[19], size: 130, left: '19%', top: '63%', zIndex: 38 }, // photo 20
    { data: flowersData[20], size: 132, left: '31%', top: '62%', zIndex: 38 }, // photo 21
    { data: flowersData[21], size: 132, left: '69%', top: '62%', zIndex: 38 }, // photo 22
    { data: flowersData[22], size: 130, left: '81%', top: '63%', zIndex: 38 }, // photo 23
    { data: flowersData[23], size: 128, left: '94%', top: '64%', zIndex: 37 }, // photo 24

    // ── TIỀN CẢNH GẦN TRUNG TÂM DƯỚI (top 71% - 74%) ──
    { data: flowersData[9],  size: 138, left: '42%', top: '72%', zIndex: 42 }, // photo 10
    { data: flowersData[24], size: 138, left: '58%', top: '72%', zIndex: 42 }, // photo 25
  ], []);

  // ─────────────────────────────────────────────────────────────────────────
  // HOA TRANG TRÍ ĐA SẮC: Chi chít, dày đặc hơn 115 bông phủ kín màn hình
  // Mọi bông hoa đều có cành dài vươn xuống mãi bên dưới
  // ─────────────────────────────────────────────────────────────────────────
  const decorFlowers = useMemo(() => {
    const c = [
      'pink', 'rose', 'peach', 'orange', 'mintgreen',
      'green', 'blue', 'skyblue', 'salmon', 'white', 'lavender', 'coral'
    ];

    return [
      // ── LỚP 1: Hàng trên cùng phía xa (đường chân trời uốn lượn hình chữ U) ──
      { left: '2%',  top: '17%', size: 54, color: c[5],  z: 11 },
      { left: '6%',  top: '13%', size: 50, color: c[0],  z: 11 },
      { left: '11%', top: '15%', size: 52, color: c[6],  z: 11 },
      { left: '16%', top: '12%', size: 48, color: c[2],  z: 11 },
      { left: '21%', top: '18%', size: 56, color: c[1],  z: 11 },
      { left: '26%', top: '14%', size: 50, color: c[4],  z: 11 },
      { left: '31%', top: '19%', size: 54, color: c[7],  z: 11 },
      { left: '36%', top: '16%', size: 52, color: c[3],  z: 11 },
      { left: '42%', top: '22%', size: 48, color: c[9],  z: 11 },
      { left: '58%', top: '22%', size: 50, color: c[10], z: 11 },
      { left: '64%', top: '16%', size: 52, color: c[2],  z: 11 },
      { left: '69%', top: '19%', size: 54, color: c[4],  z: 11 },
      { left: '74%', top: '14%', size: 50, color: c[0],  z: 11 },
      { left: '79%', top: '18%', size: 56, color: c[8],  z: 11 },
      { left: '84%', top: '12%', size: 48, color: c[1],  z: 11 },
      { left: '89%', top: '15%', size: 52, color: c[6],  z: 11 },
      { left: '94%', top: '13%', size: 50, color: c[3],  z: 11 },
      { left: '98%', top: '17%', size: 54, color: c[7],  z: 11 },

      // ── LỚP 2: Hàng thứ hai phía xa (top 24% - 35%) ──
      { left: '0%',  top: '29%', size: 66, color: c[1],  z: 14 },
      { left: '5%',  top: '26%', size: 64, color: c[4],  z: 14 },
      { left: '9%',  top: '31%', size: 68, color: c[7],  z: 14 },
      { left: '14%', top: '27%', size: 62, color: c[2],  z: 14 },
      { left: '17%', top: '33%', size: 66, color: c[3],  z: 14 },
      { left: '22%', top: '28%', size: 70, color: c[0],  z: 14 },
      { left: '27%', top: '33%', size: 64, color: c[8],  z: 14 },
      { left: '32%', top: '29%', size: 68, color: c[5],  z: 14 },
      { left: '37%', top: '34%', size: 65, color: c[6],  z: 14 },
      { left: '42%', top: '30%', size: 64, color: c[4],  z: 14 },
      { left: '46%', top: '25%', size: 60, color: c[1],  z: 14 },
      { left: '54%', top: '25%', size: 60, color: c[8],  z: 14 },
      { left: '58%', top: '30%', size: 66, color: c[2],  z: 14 },
      { left: '63%', top: '34%', size: 65, color: c[7],  z: 14 },
      { left: '68%', top: '29%', size: 68, color: c[5],  z: 14 },
      { left: '73%', top: '33%', size: 64, color: c[0],  z: 14 },
      { left: '77%', top: '28%', size: 70, color: c[3],  z: 14 },
      { left: '83%', top: '33%', size: 66, color: c[10], z: 14 },
      { left: '87%', top: '27%', size: 62, color: c[9],  z: 14 },
      { left: '92%', top: '31%', size: 68, color: c[6],  z: 14 },
      { left: '96%', top: '26%', size: 64, color: c[4],  z: 14 },
      { left: '100%',top: '29%', size: 66, color: c[2],  z: 14 },

      // ── LỚP 3: Hàng giữa trung cảnh (top 36% - 50%) ──
      { left: '2%',  top: '42%', size: 78, color: c[4],  z: 18 },
      { left: '6%',  top: '46%', size: 74, color: c[11], z: 18 },
      { left: '12%', top: '43%', size: 82, color: c[0],  z: 18 },
      { left: '16%', top: '48%', size: 76, color: c[3],  z: 18 },
      { left: '21%', top: '44%', size: 80, color: c[6],  z: 18 },
      { left: '25%', top: '49%', size: 74, color: c[8],  z: 18 },
      { left: '30%', top: '43%', size: 82, color: c[1],  z: 18 },
      { left: '34%', top: '48%', size: 78, color: c[7],  z: 18 },
      { left: '42%', top: '44%', size: 76, color: c[2],  z: 18 },
      { left: '46%', top: '49%', size: 72, color: c[5],  z: 18 },
      { left: '54%', top: '49%', size: 72, color: c[9],  z: 18 },
      { left: '58%', top: '44%', size: 76, color: c[8],  z: 18 },
      { left: '65%', top: '48%', size: 78, color: c[0],  z: 18 },
      { left: '69%', top: '43%', size: 82, color: c[4],  z: 18 },
      { left: '75%', top: '49%', size: 74, color: c[3],  z: 18 },
      { left: '79%', top: '44%', size: 80, color: c[2],  z: 18 },
      { left: '84%', top: '48%', size: 76, color: c[7],  z: 18 },
      { left: '88%', top: '43%', size: 82, color: c[1],  z: 18 },
      { left: '94%', top: '47%', size: 75, color: c[6],  z: 18 },
      { left: '98%', top: '43%', size: 78, color: c[5],  z: 18 },

      // ── LỚP 4: Hàng cận cảnh (top 51% - 66%) ──
      { left: '-1%', top: '59%', size: 92, color: c[6],  z: 22 },
      { left: '4%',  top: '55%', size: 86, color: c[2],  z: 22 },
      { left: '7%',  top: '63%', size: 94, color: c[7],  z: 22 },
      { left: '13%', top: '58%', size: 90, color: c[5],  z: 22 },
      { left: '16%', top: '65%', size: 96, color: c[1],  z: 22 },
      { left: '22%', top: '57%', size: 88, color: c[4],  z: 22 },
      { left: '25%', top: '64%', size: 98, color: c[0],  z: 22 },
      { left: '31%', top: '58%', size: 92, color: c[8],  z: 22 },
      { left: '35%', top: '65%', size: 96, color: c[3],  z: 22 },
      { left: '41%', top: '59%', size: 90, color: c[6],  z: 22 },
      { left: '45%', top: '66%', size: 98, color: c[2],  z: 22 },
      { left: '55%', top: '66%', size: 98, color: c[5],  z: 22 },
      { left: '59%', top: '59%', size: 90, color: c[1],  z: 22 },
      { left: '65%', top: '65%', size: 96, color: c[4],  z: 22 },
      { left: '69%', top: '58%', size: 92, color: c[7],  z: 22 },
      { left: '76%', top: '64%', size: 98, color: c[2],  z: 22 },
      { left: '79%', top: '57%', size: 88, color: c[0],  z: 22 },
      { left: '85%', top: '65%', size: 96, color: c[6],  z: 22 },
      { left: '88%', top: '58%', size: 90, color: c[3],  z: 22 },
      { left: '94%', top: '63%', size: 94, color: c[8],  z: 22 },
      { left: '98%', top: '56%', size: 86, color: c[1],  z: 22 },
      { left: '101%',top: '62%', size: 92, color: c[4],  z: 22 },

      // ── LỚP 5: Thảm hoa dày đặc sát đáy màn hình (top 67% - 86%) ──
      { left: '-2%', top: '78%', size: 120, color: c[6],  z: 26 },
      { left: '3%',  top: '73%', size: 112, color: c[0],  z: 26 },
      { left: '7%',  top: '82%', size: 124, color: c[3],  z: 26 },
      { left: '12%', top: '76%', size: 116, color: c[7],  z: 26 },
      { left: '16%', top: '83%', size: 122, color: c[2],  z: 26 },
      { left: '21%', top: '75%', size: 114, color: c[5],  z: 26 },
      { left: '25%', top: '82%', size: 125, color: c[1],  z: 26 },
      { left: '31%', top: '77%', size: 118, color: c[8],  z: 26 },
      { left: '36%', top: '84%', size: 126, color: c[4],  z: 26 },
      { left: '42%', top: '79%', size: 116, color: c[0],  z: 26 },
      { left: '46%', top: '85%', size: 128, color: c[6],  z: 26 },
      { left: '54%', top: '85%', size: 128, color: c[2],  z: 26 },
      { left: '58%', top: '79%', size: 116, color: c[5],  z: 26 },
      { left: '64%', top: '84%', size: 126, color: c[1],  z: 26 },
      { left: '69%', top: '77%', size: 118, color: c[7],  z: 26 },
      { left: '75%', top: '82%', size: 125, color: c[3],  z: 26 },
      { left: '79%', top: '75%', size: 114, color: c[8],  z: 26 },
      { left: '84%', top: '83%', size: 122, color: c[0],  z: 26 },
      { left: '89%', top: '76%', size: 116, color: c[4],  z: 26 },
      { left: '93%', top: '82%', size: 124, color: c[2],  z: 26 },
      { left: '97%', top: '74%', size: 112, color: c[6],  z: 26 },
      { left: '102%',top: '80%', size: 120, color: c[1],  z: 26 },

      // ── CÁC HOA CHEN KẼ LẤP KÍN MỌI KHOẢNG TRỐNG ──
      { left: '1%',  top: '38%', size: 72, color: c[11], z: 16 },
      { left: '10%', top: '38%', size: 75, color: c[9],  z: 16 },
      { left: '29%', top: '38%', size: 74, color: c[10], z: 16 },
      { left: '48%', top: '38%', size: 72, color: c[0],  z: 16 },
      { left: '52%', top: '38%', size: 72, color: c[3],  z: 16 },
      { left: '71%', top: '38%', size: 74, color: c[1],  z: 16 },
      { left: '90%', top: '38%', size: 75, color: c[8],  z: 16 },
      { left: '99%', top: '38%', size: 72, color: c[5],  z: 16 },
      { left: '5%',  top: '51%', size: 84, color: c[2],  z: 20 },
      { left: '15%', top: '52%', size: 82, color: c[4],  z: 20 },
      { left: '33%', top: '53%', size: 85, color: c[7],  z: 20 },
      { left: '44%', top: '53%', size: 80, color: c[1],  z: 20 },
      { left: '56%', top: '53%', size: 80, color: c[6],  z: 20 },
      { left: '67%', top: '53%', size: 85, color: c[0],  z: 20 },
      { left: '85%', top: '52%', size: 82, color: c[3],  z: 20 },
      { left: '95%', top: '51%', size: 84, color: c[5],  z: 20 },
    ];
  }, []);

  // Nụ hoa vươn cao với cành dài vươn xuống đáy
  const buds = [
    { left: '8%',  top: '22%', color: 'pink',      height: 980 },
    { left: '15%', top: '26%', color: 'peach',     height: 920 },
    { left: '24%', top: '21%', color: 'orange',    height: 990 },
    { left: '35%', top: '25%', color: 'rose',      height: 940 },
    { left: '45%', top: '23%', color: 'coral',     height: 960 },
    { left: '55%', top: '23%', color: 'mintgreen', height: 960 },
    { left: '65%', top: '25%', color: 'blue',      height: 940 },
    { left: '76%', top: '21%', color: 'peach',     height: 990 },
    { left: '85%', top: '26%', color: 'hotpink',   height: 920 },
    { left: '92%', top: '22%', color: 'skyblue',   height: 980 },
  ];

  return (
    <div className={styles.viewport}>
      {/* ── BẦU TRỜI PASTEL + MÂY DỊU NHẸ ── */}
      <div className={styles.sky}>
        <div className={styles.cloud1} />
        <div className={styles.cloud2} />
        <div className={styles.cloud3} />
      </div>

      {/* ── NỤ HOA E ẤP VƯƠN CAO VỚI CÀNH DÀI XUỐNG ĐÁY ── */}
      {buds.map((b, i) => (
        <div
          key={`bud-${i}`}
          className={styles.absItem}
          style={{ left: b.left, top: b.top, zIndex: 12 }}
        >
          <RoseBud colorType={b.color} height={b.height} swayDelay={i * 0.4} />
        </div>
      ))}

      {/* ── HOA TRANG TRÍ (CHI CHÍT HƠN 115 BÔNG, CÀNH DÀI XUỐNG MÃI BÊN DƯỚI) ── */}
      {decorFlowers.map((df, i) => (
        <motion.div
          key={`deco-${i}`}
          className={styles.absItem}
          style={{ left: df.left, top: df.top, zIndex: df.z }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.012 * (i % 30), type: 'spring', bounce: 0.25 }}
        >
          <PaperRose
            flower={{ id: `deco-${i}`, colorType: df.color, hasPhoto: false }}
            size={df.size}
            hasStem={true}
            stemHeight={getStemHeight(df.top)}
            swayDelay={(i % 12) * 0.18}
            swayDuration={4.4 + (i % 6) * 0.35}
          />
        </motion.div>
      ))}

      {/* ── 25 BÔNG HOA CÓ ẢNH KỶ NIỆM HIỂN THỊ TRỰC TIẾP (BẤM ĐỂ XEM ẢNH) ── */}
      {photoFlowers.map((pf, idx) => (
        <motion.div
          key={`photo-${pf.data.id}`}
          className={`${styles.absItem} ${pf.isFeatured ? styles.featuredWrap : ''}`}
          style={{ left: pf.left, top: pf.top, zIndex: pf.zIndex }}
          initial={{ scale: 0, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 + idx * 0.05, type: 'spring', bounce: 0.3 }}
        >
          <PaperRose
            flower={pf.data}
            size={pf.size}
            hasStem={true}
            stemHeight={pf.isFeatured ? 1050 : getStemHeight(pf.top)}
            isFeatured={pf.isFeatured || false}
            swayDelay={idx * 0.25}
            swayDuration={4.8 + idx * 0.2}
            onClick={(flower) => setSelectedPhoto(flower)}
          />
        </motion.div>
      ))}

      {/* ── 2 NÚT ĐÁY MÀN HÌNH ── */}
      <div className={styles.controls}>
        <button className={styles.pillBtn} onClick={() => setShowLetter(true)}>
          Đọc lại thiệp
        </button>
        <button className={styles.pillBtn} onClick={onReplayBloom}>
          Cho hoa nở lại
        </button>
      </div>

      {/* ── LÁ THƯ 20/10 ── */}
      <AnimatePresence>
        {showLetter && (
          <Letter onClose={() => setShowLetter(false)} />
        )}
      </AnimatePresence>

      {/* ── MODAL XEM ẢNH KỶ NIỆM PHÓNG TO THUẦN TÚY (KHÔNG KÈM TEXT) ── */}
      <AnimatePresence>
        {selectedPhoto && (
          <PhotoModal
            flower={selectedPhoto}
            onClose={() => setSelectedPhoto(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

