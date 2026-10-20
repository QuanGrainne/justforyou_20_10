import React, { useEffect, useRef } from 'react';
import styles from './Petals.module.css';

/**
 * Hiệu ứng cánh hoa rơi và đốm sáng lấp lánh (Canvas 60fps tối ưu, không giật lag)
 */
export const Petals = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Kích thước canvas
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Kiểm tra prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return () => window.removeEventListener('resize', handleResize);
    }

    // Điều chỉnh số lượng cánh hoa theo thiết bị (mobile ít hơn để mượt)
    const isMobile = window.innerWidth < 768;
    const petalCount = isMobile ? 18 : 32;
    const sparkleCount = isMobile ? 15 : 25;

    // Cánh hoa
    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 8, // 8px - 16px
      speedY: Math.random() * 1.2 + 0.8,
      speedX: Math.random() * 0.8 - 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      oscillationSpeed: Math.random() * 0.02 + 0.01,
      oscillationDistance: Math.random() * 30 + 10,
      opacity: Math.random() * 0.4 + 0.4,
      color: Math.random() > 0.4 ? 'rgba(251, 182, 206, ' : 'rgba(254, 205, 211, '
    }));

    // Đốm sáng lung linh
    const sparkles = Array.from({ length: sparkleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      baseAlpha: Math.random() * 0.4 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.03 + 0.01
    }));

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Vẽ đốm sáng
      sparkles.forEach((s) => {
        const alpha = s.baseAlpha + Math.sin(time * s.speed + s.phase) * 0.25;
        if (alpha > 0) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 243, 205, ${Math.max(0, Math.min(1, alpha))})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(253, 224, 71, 0.6)';
          ctx.fill();
        }
      });
      ctx.shadowBlur = 0;

      // Vẽ cánh hoa rơi
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(time * p.oscillationSpeed) * 0.8 + p.speedX;
        p.rotation += p.rotationSpeed;

        // Tái xuất hiện khi rơi khỏi màn hình
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.x < -20) p.x = canvas.width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        // Vẽ hình dáng cánh hoa mềm mại
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, p.size / 2, 0, p.size);
        ctx.bezierCurveTo(-p.size, p.size / 2, -p.size / 2, -p.size / 2, 0, 0);

        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
};
