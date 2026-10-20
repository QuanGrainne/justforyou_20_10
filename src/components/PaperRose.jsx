import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import styles from './PaperRose.module.css';

/**
 * Bảng màu pastel cho hoa hồng giấy 3D (chuẩn theo ảnh tham khảo)
 * Mỗi tone màu gồm 6 lớp chuyển sắc từ sáng ngoài vào đậm trong + viền trắng
 */
export const ROSE_PALETTES = {
  rose: {
    layers: ['#fca5ba', '#f9809f', '#f45381', '#df3068', '#c71954', '#a80d41'],
    edge: 'rgba(255, 255, 255, 0.85)',
    centerPistil: '#fff0f3',
    shadowColor: 'rgba(168, 13, 65, 0.35)',
  },
  hotpink: {
    layers: ['#fca5ba', '#f9809f', '#f45381', '#df3068', '#c71954', '#a80d41'],
    edge: 'rgba(255, 255, 255, 0.85)',
    centerPistil: '#fff0f3',
    shadowColor: 'rgba(168, 13, 65, 0.35)',
  },
  pink: {
    layers: ['#fdd3e1', '#fbaec8', '#f783aa', '#ef5588', '#de346f', '#be1c56'],
    edge: 'rgba(255, 255, 255, 0.85)',
    centerPistil: '#fff5f8',
    shadowColor: 'rgba(190, 28, 86, 0.32)',
  },
  peach: {
    layers: ['#fde2d0', '#fcc5a7', '#fba378', '#f87c47', '#eb5c23', '#cb420f'],
    edge: 'rgba(255, 255, 255, 0.85)',
    centerPistil: '#fff7f2',
    shadowColor: 'rgba(203, 66, 15, 0.32)',
  },
  orange: {
    layers: ['#fed8bf', '#febc91', '#fc9c61', '#f77732', '#e55a14', '#c24305'],
    edge: 'rgba(255, 255, 255, 0.85)',
    centerPistil: '#fff8f2',
    shadowColor: 'rgba(194, 67, 5, 0.32)',
  },
  mintgreen: {
    layers: ['#d7f6e4', '#b5eed0', '#8be2b4', '#60d396', '#3bc079', '#22a25e'],
    edge: 'rgba(255, 255, 255, 0.85)',
    centerPistil: '#f2fcf6',
    shadowColor: 'rgba(34, 162, 94, 0.32)',
  },
  green: {
    layers: ['#def5dd', '#bfeebd', '#9ae298', '#73d470', '#51bf4e', '#369f33'],
    edge: 'rgba(255, 255, 255, 0.85)',
    centerPistil: '#f4fbf4',
    shadowColor: 'rgba(54, 159, 51, 0.32)',
  },
  blue: {
    layers: ['#d7f0fd', '#b0e1fb', '#81cef7', '#50b7f0', '#299ee5', '#1081c7'],
    edge: 'rgba(255, 255, 255, 0.85)',
    centerPistil: '#f0f9ff',
    shadowColor: 'rgba(16, 129, 199, 0.32)',
  },
  skyblue: {
    layers: ['#daf4fb', '#b4ebf8', '#86ddf1', '#57c9e5', '#33b1cf', '#1992ad'],
    edge: 'rgba(255, 255, 255, 0.85)',
    centerPistil: '#f2fbfd',
    shadowColor: 'rgba(25, 146, 173, 0.32)',
  },
  salmon: {
    layers: ['#fed4c8', '#fcada2', '#f98276', '#f3594b', '#e03a2c', '#bd2418'],
    edge: 'rgba(255, 255, 255, 0.85)',
    centerPistil: '#fff4f2',
    shadowColor: 'rgba(189, 36, 24, 0.32)',
  },
  white: {
    layers: ['#ffffff', '#fdf0f0', '#f9dede', '#f3c4c4', '#ea9f9f', '#d87777'],
    edge: 'rgba(255, 255, 255, 0.95)',
    centerPistil: '#ffffff',
    shadowColor: 'rgba(180, 100, 100, 0.28)',
  },
  lavender: {
    layers: ['#f3e5f8', '#e4c9f1', '#d1a7e7', '#bb81d9', '#a25bc7', '#873bb0'],
    edge: 'rgba(255, 255, 255, 0.85)',
    centerPistil: '#fbf6fc',
    shadowColor: 'rgba(135, 59, 176, 0.32)',
  },
  coral: {
    layers: ['#fdd6cb', '#fbb29e', '#fa8a6d', '#f5623f', '#e3421d', '#be2c0b'],
    edge: 'rgba(255, 255, 255, 0.85)',
    centerPistil: '#fff5f2',
    shadowColor: 'rgba(190, 44, 11, 0.32)',
  },
};

/**
 * Tính toán đường cong Bezier cho 1 cánh hoa hồng giấy uốn lượn tự nhiên
 */
function createPetalPath(cx, cy, rIn, rOut, a0, a1, isOutermost = false) {
  const span = a1 - a0;

  // 1. Điểm bắt đầu ở mép trong
  const in1X = cx + rIn * Math.cos(a0);
  const in1Y = cy + rIn * Math.sin(a0);

  // 2. Điểm mép ngoài bên trái
  const aOutLeft = a0 + 0.12 * span;
  const rOutLeft = rOut * 0.93;
  const out1X = cx + rOutLeft * Math.cos(aOutLeft);
  const out1Y = cy + rOutLeft * Math.sin(aOutLeft);

  // Điểm điều khiển cạnh trái uốn cong mềm mại
  const cp1X = cx + (rIn + (rOut - rIn) * 0.45) * Math.cos(a0 - 0.05 * span);
  const cp1Y = cy + (rIn + (rOut - rIn) * 0.45) * Math.sin(a0 - 0.05 * span);
  const cp2X = cx + rOutLeft * 0.92 * Math.cos(a0);
  const cp2Y = cy + rOutLeft * 0.92 * Math.sin(a0);

  // 3. Đỉnh cánh hoa (apex) uốn lượn hình cánh hoa hồng thật
  const aApex = a0 + 0.52 * span;
  const rApex = rOut * (isOutermost ? 1.05 : 1.03);
  const apexX = cx + rApex * Math.cos(aApex);
  const apexY = cy + rApex * Math.sin(aApex);

  // Điểm điều khiển đỉnh cánh
  const cpApex1X = cx + rApex * 1.02 * Math.cos(a0 + 0.32 * span);
  const cpApex1Y = cy + rApex * 1.02 * Math.sin(a0 + 0.32 * span);
  const cpApex2X = cx + rApex * 1.02 * Math.cos(a0 + 0.45 * span);
  const cpApex2Y = cy + rApex * 1.02 * Math.sin(a0 + 0.45 * span);

  // 4. Mép ngoài bên phải
  const aOutRight = a1 - 0.08 * span;
  const rOutRight = rOut * 0.93;
  const out2X = cx + rOutRight * Math.cos(aOutRight);
  const out2Y = cy + rOutRight * Math.sin(aOutRight);

  const cpApex3X = cx + rApex * 1.01 * Math.cos(a0 + 0.60 * span);
  const cpApex3Y = cy + rApex * 1.01 * Math.sin(a0 + 0.60 * span);
  const cpApex4X = cx + rOutRight * 1.02 * Math.cos(a0 + 0.82 * span);
  const cpApex4Y = cy + rOutRight * 1.02 * Math.sin(a0 + 0.82 * span);

  // 5. Điểm kết thúc ở mép trong
  const in2X = cx + rIn * Math.cos(a1);
  const in2Y = cy + rIn * Math.sin(a1);

  // Điểm điều khiển cạnh phải
  const cp3X = cx + rOutRight * 0.92 * Math.cos(a1 + 0.02 * span);
  const cp3Y = cy + rOutRight * 0.92 * Math.sin(a1 + 0.02 * span);
  const cp4X = cx + (rIn + (rOut - rIn) * 0.45) * Math.cos(a1 + 0.04 * span);
  const cp4Y = cy + (rIn + (rOut - rIn) * 0.45) * Math.sin(a1 + 0.04 * span);

  return (
    `M ${in1X.toFixed(1)} ${in1Y.toFixed(1)} ` +
    `C ${cp1X.toFixed(1)} ${cp1Y.toFixed(1)}, ${cp2X.toFixed(1)} ${cp2Y.toFixed(1)}, ${out1X.toFixed(1)} ${out1Y.toFixed(1)} ` +
    `C ${cpApex1X.toFixed(1)} ${cpApex1Y.toFixed(1)}, ${cpApex2X.toFixed(1)} ${cpApex2Y.toFixed(1)}, ${apexX.toFixed(1)} ${apexY.toFixed(1)} ` +
    `C ${cpApex3X.toFixed(1)} ${cpApex3Y.toFixed(1)}, ${cpApex4X.toFixed(1)} ${cpApex4Y.toFixed(1)}, ${out2X.toFixed(1)} ${out2Y.toFixed(1)} ` +
    `C ${cp3X.toFixed(1)} ${cp3Y.toFixed(1)}, ${cp4X.toFixed(1)} ${cp4Y.toFixed(1)}, ${in2X.toFixed(1)} ${in2Y.toFixed(1)} ` +
    `A ${rIn.toFixed(1)} ${rIn.toFixed(1)} 0 0 0 ${in1X.toFixed(1)} ${in1Y.toFixed(1)} Z`
  );
}

/**
 * Một lớp cánh hoa hồng gồm N cánh xếp chồng lượn sóng
 */
function PetalLayer({ cx, cy, rIn, rOut, count, rotDeg, color, edgeColor, isOutermost = false }) {
  const paths = useMemo(() => {
    const list = [];
    const step = (2 * Math.PI) / count;
    const overlap = 1.25; // Cánh chồng lên nhau 25% như hoa giấy thật
    const rotRad = (rotDeg * Math.PI) / 180;

    for (let i = 0; i < count; i++) {
      const a0 = i * step + rotRad;
      const a1 = a0 + step * overlap;
      const pathData = createPetalPath(cx, cy, rIn, rOut, a0, a1, isOutermost);
      list.push(
        <path
          key={i}
          d={pathData}
          fill={color}
          stroke={edgeColor}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      );
    }
    return list;
  }, [cx, cy, rIn, rOut, count, rotDeg, color, edgeColor, isOutermost]);

  return <g>{paths}</g>;
}

/**
 * Tâm xoắn ốc hoa hồng giấy thủ công (dành cho hoa trang trí)
 */
function RoseCenterSpiral({ cx, cy, radius, color, edgeColor }) {
  const petals = useMemo(() => {
    const items = [];
    const step = (2 * Math.PI) / 3;
    for (let i = 0; i < 3; i++) {
      const a0 = i * step;
      const a1 = a0 + step * 1.35;
      items.push(
        <path
          key={`core-${i}`}
          d={createPetalPath(cx, cy, radius * 0.25, radius, a0, a1, false)}
          fill={color}
          stroke={edgeColor}
          strokeWidth="1"
        />
      );
    }
    return items;
  }, [cx, cy, radius, color, edgeColor]);

  return (
    <g>
      {petals}
      <circle cx={cx} cy={cy} r={radius * 0.3} fill={color} stroke={edgeColor} strokeWidth="1" />
      <circle cx={cx} cy={cy} r={radius * 0.12} fill="#ffffff" opacity="0.6" />
    </g>
  );
}

/**
 * Component Bông hoa hồng giấy 3D
 * - 100% cánh hoa tạo bằng đường cong Bezier tự nhiên, không phải vòng tròn đồng tâm
 * - Hiệu ứng giấy 3D với viền cạnh sắc nét và bóng đổ
 * - 10 bông có ảnh cá nhân hiển thị TRỰC TIẾP tại tâm hoa (không cần click, không popup)
 */
export const PaperRose = ({
  flower,
  size = 110,
  swayDelay = 0,
  swayDuration = 5,
  isFeatured = false,
  hasStem = true,
  stemHeight = 650,
  onClick,
}) => {
  const palette = ROSE_PALETTES[flower?.colorType] || ROSE_PALETTES.pink;
  const { layers, edge, shadowColor } = palette;

  const r = size / 2;
  const filterId = `rose-shadow-${flower?.id || 'x'}`;

  // Kích thước ảnh kỷ niệm ở giữa hoa:
  // - Hoa trung tâm lớn: ảnh ~42% size (~80px)
  // - Hoa có ảnh khác: ảnh ~46% size (~52-60px)
  // Đủ lớn để nhìn rõ khuôn mặt, đồng thời cánh hoa vẫn ôm trọn vòng ngoài
  const photoSize = Math.round(size * (isFeatured ? 0.42 : 0.46));

  const handleClick = () => {
    if (flower?.hasPhoto && onClick) {
      onClick(flower);
    }
  };

  return (
    <motion.div
      className={`${styles.roseWrap} ${isFeatured ? styles.featured : ''} ${flower?.hasPhoto ? styles.hasPhotoFlower : ''}`}
      style={{ width: size }}
      animate={{
        rotate: isFeatured ? [-1.2, 1.2, -1.2] : [-1.8, 1.8, -1.8],
        y: isFeatured ? [-1, 2, -1] : [-1.5, 2, -1.5],
      }}
      transition={{
        duration: swayDuration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: swayDelay,
      }}
      whileHover={{ scale: flower?.hasPhoto ? 1.08 : 1.03, zIndex: 50 }}
      whileTap={{ scale: flower?.hasPhoto ? 0.95 : 1 }}
      onClick={handleClick}
      role={flower?.hasPhoto ? 'button' : undefined}
      tabIndex={flower?.hasPhoto ? 0 : -1}
      aria-label={flower?.alt || 'Bông hoa hồng giấy 3D'}
    >
      {/* ── KHỐI HOA HỒNG GIẤY SVG ── */}
      <div className={styles.bloomWrap} style={{ width: size, height: size }}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          className={styles.roseSvg}
          style={{ overflow: 'visible' }}
        >
          {/* Hiệu ứng bóng đổ chỉ bật cho hoa có ảnh hoặc hoa trung tâm để tiết kiệm RAM trên điện thoại */}
          {(flower?.hasPhoto || isFeatured) && (
            <defs>
              <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor={shadowColor} />
              </filter>
            </defs>
          )}

          {/* Vòng ngoài cùng: 7 cánh lớn uốn lượn tự nhiên */}
          <g filter={(flower?.hasPhoto || isFeatured) ? `url(#${filterId})` : undefined}>
            <PetalLayer
              cx={r}
              cy={r}
              rIn={r * 0.72}
              rOut={r * 0.98}
              count={7}
              rotDeg={0}
              color={layers[0]}
              edgeColor={edge}
              isOutermost={true}
            />
          </g>

          {/* Vòng thứ 2: 6 cánh uốn lượn xen kẽ */}
          <g filter={(flower?.hasPhoto || isFeatured) ? `url(#${filterId})` : undefined}>
            <PetalLayer
              cx={r}
              cy={r}
              rIn={r * 0.58}
              rOut={r * 0.83}
              count={6}
              rotDeg={25}
              color={layers[1]}
              edgeColor={edge}
            />
          </g>

          {/* Vòng thứ 3: 6 cánh thu nhỏ dần */}
          <g filter={(flower?.hasPhoto || isFeatured) ? `url(#${filterId})` : undefined}>
            <PetalLayer
              cx={r}
              cy={r}
              rIn={r * 0.44}
              rOut={r * 0.68}
              count={6}
              rotDeg={12}
              color={layers[2]}
              edgeColor={edge}
            />
          </g>

          {/* Vòng thứ 4: 5 cánh ôm lấy phần tâm */}
          <g filter={(flower?.hasPhoto || isFeatured) ? `url(#${filterId})` : undefined}>
            <PetalLayer
              cx={r}
              cy={r}
              rIn={r * 0.32}
              rOut={r * 0.53}
              count={5}
              rotDeg={32}
              color={layers[3]}
              edgeColor={edge}
            />
          </g>

          {/* NẾU KHÔNG CÓ ẢNH: vẽ tiếp các lớp cánh cuộn sâu và xoắn ốc ở tâm hoa */}
          {!flower?.hasPhoto && (
            <>
              <g>
                <PetalLayer
                  cx={r}
                  cy={r}
                  rIn={r * 0.20}
                  rOut={r * 0.38}
                  count={5}
                  rotDeg={18}
                  color={layers[4]}
                  edgeColor={edge}
                />
              </g>
              <RoseCenterSpiral
                cx={r}
                cy={r}
                radius={r * 0.24}
                color={layers[5]}
                edgeColor={edge}
              />
            </>
          )}

          {/* NẾU CÓ ẢNH: vẽ đế hoa lót viền trắng ngọc cho bức ảnh */}
          {flower?.hasPhoto && (
            <circle
              cx={r}
              cy={r}
              r={photoSize / 2 + 2}
              fill="#ffffff"
              stroke={edge}
              strokeWidth="2"
            />
          )}
        </svg>

        {/* ── ẢNH CÁ NHÂN HIỂN THỊ TRỰC TIẾP TRÊN BÔNG HOA ── */}
        {flower?.hasPhoto && flower?.image && (
          <div
            className={styles.photoContainer}
            style={{ width: photoSize, height: photoSize }}
          >
            <img
              src={flower.image}
              alt={flower.alt || 'Ảnh kỷ niệm'}
              className={styles.photoImage}
            />
          </div>
        )}
      </div>

      {/* ── THÂN CÂY VÀ LÁ HOA HỒNG DÀI XUỐNG DƯỚI ── */}
      {hasStem && (
        <RoseStem height={stemHeight} isFeatured={isFeatured} />
      )}
    </motion.div>
  );
};

/**
 * Thân cây hoa hồng cành dài với lá hoa hồng xếp so le dọc theo thân xuống mãi bên dưới
 */
export function RoseStem({ height = 650, isFeatured = false }) {
  const leaves = useMemo(() => {
    const list = [];
    const interval = isFeatured ? 72 : 62;
    const count = Math.max(2, Math.floor((height - 30) / interval));

    for (let i = 0; i < count; i++) {
      const y = 35 + i * interval + (i % 2 === 0 ? 0 : 8);
      const isRight = i % 2 === 0;
      list.push({ y, isRight, id: i });
    }
    return list;
  }, [height, isFeatured]);

  const curveOffset = (height % 9) - 4;

  return (
    <div className={styles.stemContainer} style={{ height }}>
      <svg
        width="42"
        height={height}
        viewBox={`0 0 42 ${height}`}
        style={{ overflow: 'visible', display: 'block' }}
      >
        {/* Đường cành hoa hồng vươn dài xuống dưới */}
        <path
          d={`M 21 0 Q ${21 + curveOffset} ${height * 0.45} 21 ${height}`}
          stroke="#27672a"
          strokeWidth={isFeatured ? "3.6" : "2.6"}
          strokeLinecap="round"
          fill="none"
        />

        {/* Các lá hoa hồng mọc so le dọc suốt chiều dài thân cành */}
        {leaves.map((lf) => {
          const scale = isFeatured ? 1.15 : 0.95;
          if (lf.isRight) {
            return (
              <g
                key={`leaf-r-${lf.id}`}
                transform={`translate(21, ${lf.y}) scale(${scale})`}
              >
                <path
                  d="M 0 0 C 13 -6 24 -18 21 -25 C 11 -22 3 -10 0 0 Z"
                  fill="#388e3c"
                  stroke="#1b5e20"
                  strokeWidth="0.8"
                />
                <path
                  d="M 0 0 Q 12 -13 21 -25"
                  stroke="#81c784"
                  strokeWidth="0.8"
                  fill="none"
                />
              </g>
            );
          } else {
            return (
              <g
                key={`leaf-l-${lf.id}`}
                transform={`translate(21, ${lf.y}) scale(${scale})`}
              >
                <path
                  d="M 0 0 C -13 -6 -24 -18 -21 -25 C -11 -22 -3 -10 0 0 Z"
                  fill="#2e7d32"
                  stroke="#1b5e20"
                  strokeWidth="0.8"
                />
                <path
                  d="M 0 0 Q -12 -13 -21 -25"
                  stroke="#66bb6a"
                  strokeWidth="0.8"
                  fill="none"
                />
              </g>
            );
          }
        })}
      </svg>
    </div>
  );
}

/**
 * Nụ hoa hồng e ấp vươn cao
 */
export const RoseBud = ({ colorType = 'pink', height = 110, swayDelay = 0 }) => {
  const palette = ROSE_PALETTES[colorType] || ROSE_PALETTES.pink;
  const { layers } = palette;

  return (
    <motion.div
      className={styles.budWrap}
      style={{ height }}
      animate={{ rotate: [-2.5, 2.5, -2.5] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: swayDelay }}
    >
      <svg width="26" height="40" viewBox="0 0 26 40">
        {/* Đài hoa xanh bao bọc */}
        <path
          d="M 13 4 C 19 9 22 18 19 28 C 16 32 10 32 7 28 C 4 18 7 9 13 4 Z"
          fill={layers[1]}
          stroke={layers[3]}
          strokeWidth="1"
        />
        {/* Cánh đài hoa nhọn xanh */}
        <path
          d="M 6 22 C 9 30 11 34 13 34 C 15 34 17 30 20 22 C 16 27 10 27 6 22 Z"
          fill="#388e3c"
          stroke="#1b5e20"
          strokeWidth="0.8"
        />
        {/* Đường gân cánh nụ */}
        <path
          d="M 13 12 C 16 17 17 23 15 28"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      {/* Cuống nụ xanh */}
      <div className={styles.budStem} />
    </motion.div>
  );
};
