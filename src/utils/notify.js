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

    await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
      method: 'POST',
      body: fullMessage,
      headers: {
        Title: title,
        Priority: 'high',
        Tags: tags.join(','),
      },
    });
  } catch (err) {
    // Không bao giờ làm ảnh hưởng trải nghiệm trang web nếu lỗi mạng
    console.debug('ntfy notification error:', err);
  }
};
