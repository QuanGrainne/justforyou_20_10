// Script to generate valid minimal JPEG placeholder files for photo1.jpg - photo8.jpg
import fs from 'fs';
import path from 'path';

// Minimal 1x1 valid JPEG baseline structure or small colorful JPEG buffer
// Here is a valid 1x1 pink/pastel JPEG base64:
// Data URL: data:image/jpeg;base64,...
const pinkJpegBase64 = 
  "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=";

const targetDir = path.resolve('public/images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

for (let i = 1; i <= 8; i++) {
  const filePath = path.join(targetDir, `photo${i}.jpg`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, Buffer.from(pinkJpegBase64, 'base64'));
    console.log(`Created placeholder ${filePath}`);
  }
}
