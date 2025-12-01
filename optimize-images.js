import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// 图片优化配置
const OPTIMIZATION_CONFIG = {
  quality: 80, // 质量百分比
  compressionLevel: 9, // 压缩级别 (0-9)
  effort: 7, // 优化努力程度 (1-10)
};

async function optimizeImage(inputPath) {
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;
    
    // 创建临时文件
    const tempPath = inputPath + '.tmp';
    
    await sharp(inputPath)
      .png({
        quality: OPTIMIZATION_CONFIG.quality,
        compressionLevel: OPTIMIZATION_CONFIG.compressionLevel,
        effort: OPTIMIZATION_CONFIG.effort,
      })
      .toFile(tempPath);
    
    const optimizedStats = fs.statSync(tempPath);
    const optimizedSize = optimizedStats.size;
    
    // 如果优化后的文件更小，则替换原文件
    if (optimizedSize < originalSize) {
      fs.unlinkSync(inputPath);
      fs.renameSync(tempPath, inputPath);
    } else {
      // 如果优化后文件更大，则删除临时文件，保留原文件
      fs.unlinkSync(tempPath);
    }
    
    const finalSize = optimizedSize < originalSize ? optimizedSize : originalSize;
    const reduction = ((originalSize - finalSize) / originalSize * 100).toFixed(2);
    
    console.log(`优化完成: ${path.basename(inputPath)}`);
    console.log(`  原始大小: ${(originalSize / 1024).toFixed(2)} KB`);
    console.log(`  优化大小: ${(finalSize / 1024).toFixed(2)} KB`);
    console.log(`  减少: ${reduction}%`);
    
    return { originalSize, optimizedSize: finalSize, reduction };
  } catch (error) {
    console.error(`优化失败: ${inputPath}`, error.message);
    return null;
  }
}

async function optimizeAllImages() {
  const imagesDir = './images';
  const files = fs.readdirSync(imagesDir);
  const pngFiles = files.filter(file => file.toLowerCase().endsWith('.png'));
  
  console.log(`找到 ${pngFiles.length} 个PNG文件需要优化...\n`);
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let processedCount = 0;
  
  // 创建备份目录
  const backupDir = './images_backup';
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }
  
  // 先备份所有原始图片
  console.log('正在备份原始图片...');
  for (const file of pngFiles) {
    const sourcePath = path.join(imagesDir, file);
    const backupPath = path.join(backupDir, file);
    fs.copyFileSync(sourcePath, backupPath);
  }
  console.log('备份完成！\n');
  
  // 优化图片
  for (const file of pngFiles) {
    const inputPath = path.join(imagesDir, file);
    const result = await optimizeImage(inputPath);
    
    if (result) {
      totalOriginalSize += result.originalSize;
      totalOptimizedSize += result.optimizedSize;
      processedCount++;
    }
    
    console.log(''); // 空行分隔
  }
  
  // 输出总结
  console.log('='.repeat(50));
  console.log('优化总结:');
  console.log(`处理文件数: ${processedCount}/${pngFiles.length}`);
  console.log(`总原始大小: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`总优化大小: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`总体积减少: ${((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(2)}%`);
  console.log(`平均减少: ${((totalOriginalSize - totalOptimizedSize) / processedCount / 1024).toFixed(2)} KB/文件`);
  console.log('='.repeat(50));
}

// 执行优化
optimizeAllImages().catch(console.error);
