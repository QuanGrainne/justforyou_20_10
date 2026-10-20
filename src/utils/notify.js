/**
 * HỆ THỐNG THÔNG BÁO VỀ ĐIỆN THOẠI QUA NTFY.SH
 * Hoàn toàn miễn phí, không cần tài khoản, hoạt động trên cả iOS & Android
 */

// Tên topic nhận thông báo trên app ntfy của bạn
export const NTFY_TOPIC = 'thaovy_2010_quangrainne';

/**
 * Gửi thông báo đẩy về app ntfy trên điện thoại
 * @param {string} title - Tiêu đề thông báo
 * @param {string} message - Nội dung thông báo
 * @param {string[]} tags - Danh sách emoji / icon nhãn
 */
export const sendNotification = async (title, message, tags = ['rose']) => {
  try {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const device = isMobile ? 'Điện thoại' : 'Máy tính (Laptop/PC)';
    const time = new Date().toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const fullMessage = `${message}\n📱 Thiết bị: ${device}\n⏰ Thời gian: ${time}`;

    // Sử dụng JSON payload thay vì HTTP Headers để hỗ trợ 100% tiếng Việt có dấu và Emoji
    await fetch('https://ntfy.sh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: NTFY_TOPIC,
        title: title,
        message: fullMessage,
        priority: 4, // High priority để iPhone rung/đổ chuông và hiện pop-up tức thì
        tags: tags,
      }),
    });
  } catch (err) {
    console.debug('ntfy notification error:', err);
  }
};
