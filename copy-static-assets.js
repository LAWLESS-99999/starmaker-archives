import fs from 'fs';
import path from 'path';

// 复制data目录
function copyDataDir() {
  const sourceDir = './data';
  const destDir = './dist/data';
  
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  const files = fs.readdirSync(sourceDir);
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, file);
    
    if (fs.statSync(sourcePath).isFile()) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`复制: ${sourcePath} -> ${destPath}`);
    }
  });
}

// 复制所有图片文件
function copyAllImages() {
  const sourceDir = './images';
  const destDir = './dist/images';
  
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  const files = fs.readdirSync(sourceDir);
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, file);
    
    if (fs.statSync(sourcePath).isFile() && file.endsWith('.png')) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`复制: ${sourcePath} -> ${destPath}`);
    }
  });
}

console.log('开始复制静态资源...');
copyDataDir();
copyAllImages();
console.log('静态资源复制完成！');
