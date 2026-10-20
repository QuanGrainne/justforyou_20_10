# 🌸 VƯỜN HOA KỶ NIỆM 20/10 – DỰ ÁN QUÀ TẶNG Ý NGHĨA

Một website quà tặng nhân ngày Phụ nữ Việt Nam 20/10 với phong cách lãng mạn, nhẹ nhàng, hoa nở bừng sáng cùng lá thư chúc mừng và 8 bức ảnh kỷ niệm ngọt ngào.

---

## ✨ CÁC CHỨC NĂNG ĐÃ TRIỂN KHAI

1. **Màn hình mở đầu lãng mạn:**
   - 1 bông hoa duy nhất ở chính giữa với hiệu ứng đung đưa tự nhiên trong gió và nhụy phát sáng lung linh.
   - Dòng chữ: *"Có một điều đặc biệt dành cho em 🌸"* và nút mời gọi *"Chạm vào bông hoa nhé!"*.
2. **Hiệu ứng bung nở diệu kỳ (Bloom Transition):**
   - Bông hoa phóng to nhẹ kèm hiệu ứng lóe sáng dịu (280ms).
   - 10 bông hoa bung tỏa mềm mại từ tâm ra toàn bộ khu vườn với Framer Motion.
3. **Vườn hoa 10 bông với 8 ảnh kỷ niệm:**
   - **8 bông hoa kỷ niệm:** Mỗi bông chứa 1 ảnh tròn ở nhụy (`photo1.jpg` đến `photo8.jpg`).
   - **2 bông hoa trang trí:** Tỏa sáng lấp lánh với nhụy phấn vàng mật ong.
   - Tự động hiển thị fallback đẹp mắt nếu ảnh chưa được tải lên hoặc lỗi đường dẫn.
4. **Phong thư và Lá thư chúc mừng 20/10:**
   - Bì thư thủ công với con dấu sáp hình trái tim.
   - Nhấn mở thư với chuyển động mượt mà.
   - Hiệu ứng gõ chữ **Typewriter** từng ký tự kèm nút xem ngay nếu không muốn chờ.
   - Cho phép gấp lại phong thư bất kỳ lúc nào.
5. **Xem chi tiết ảnh (PhotoModal):**
   - Nhấn vào từng bông hoa sẽ mở modal phóng to ảnh kiểu khung ảnh kỷ niệm.
   - Hiển thị ngày tháng, tiêu đề và lời nhắn riêng cho từng bức ảnh.
   - Có nút **"Thả tim ❤️"** tương tác với bong bóng tim bay lên.
   - Đóng bằng nút X, click ngoài màn hình hoặc phím `Escape`.
6. **Hiệu ứng nền sống động & Nhạc nền:**
   - Cánh hoa rơi và đốm sáng lung linh bằng HTML5 Canvas 60fps siêu mượt, tự động tối ưu cho mobile.
   - Nút bật/tắt nhạc nền ở góc trên bên phải, hỗ trợ file `public/music/background.mp3`, xử lý an toàn không làm crash website nếu chưa có nhạc.

---

## 🛠 HƯỚNG DẪN CÀI ĐẶT & CHẠY LOCAL

### 1. Cài đặt các thư viện
Mở terminal tại thư mục dự án và chạy:
```bash
npm install
```

### 2. Chạy môi trường phát triển (Dev)
```bash
npm run dev
```
Mở trình duyệt truy cập: `http://localhost:5173/`

### 3. Build kiểm tra sản phẩm hoàn chỉnh
```bash
npm run build
```

---

## 📸 HƯỚNG DẪN THAY ĐỔI ẢNH, LỜI CHÚC & NHẠC

### 1. Thay đổi 8 bức ảnh cá nhân
- Vào thư mục: `public/images/`
- Thêm hoặc ghi đè 8 file ảnh của bạn với tên tương ứng:
  - `photo1.jpg`
  - `photo2.jpg`
  - `photo3.jpg`
  - `photo4.jpg`
  - `photo5.jpg`
  - `photo6.jpg`
  - `photo7.jpg`
  - `photo8.jpg`
*(Nếu ảnh có đuôi `.png`, `.jpeg` hoặc `.webp`, bạn mở file `src/data/flowers.js` để đổi tên file ảnh tương ứng).*

### 2. Thay đổi tiêu đề, ghi chú cho từng bông hoa
- Mở file: `src/data/flowers.js`
- Tùy chỉnh các trường: `title`, `date`, `note` của từng bông hoa từ 1 đến 8.

### 3. Thay đổi nội dung lá thư, tên người nhận và chữ ký
- Mở file: `src/data/letter.js`
- Bạn có thể sửa:
  - `recipient`: Tên người nhận (ví dụ: *"Gửi cô gái đáng yêu của anh ❤️"*)
  - `paragraphs`: Các đoạn văn lời chúc 20/10
  - `closing`: Lời kết (ví dụ: *"Yêu em nhiều!"*)
  - `signature`: Chữ ký của bạn (ví dụ: *"Anh của em ✨"*)

### 4. Thêm bài hát nền lãng mạn
- Vào thư mục: `public/music/`
- Thêm bài hát bạn yêu thích và đặt tên là: `background.mp3`

---

## 🚀 HƯỚNG DẪN ĐƯA LÊN GITHUB & DEPLOY LÊN NETLIFY

### Bước 1: Đưa source code lên GitHub
1. Khởi tạo Git và commit code:
   ```bash
   git init
   git add .
   git commit -m "Khoi tao du an Vuon Hoa 20/10"
   ```
2. Tạo một Repository mới trên GitHub (ví dụ đặt tên là `vuon-hoa-20-10`).
3. Liên kết và đẩy code lên:
   ```bash
   git branch -M main
   git remote add origin https://github.com/TÊN_GITHUB_CỦA_BẠN/vuon-hoa-20-10.git
   git push -u origin main
   ```

### Bước 2: Deploy lên Netlify
1. Đăng nhập vào [Netlify](https://app.netlify.com/).
2. Chọn **"Add new site"** -> **"Import an existing project"**.
3. Chọn **GitHub** và cấp quyền chọn repository `vuon-hoa-20-10`.
4. Netlify sẽ tự động nhận diện file `netlify.toml` đã được tạo sẵn trong dự án:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Nhấn **"Deploy vuon-hoa-20-10"**.
6. Sau khoảng 1-2 phút, Netlify sẽ cung cấp cho bạn một đường link HTTPS trực tuyến miễn phí (bạn có thể đổi subdomain đẹp trong phần *Site Configuration* -> *Change site name*).
7. Gửi link này cho người đặc biệt của bạn! 🌸
