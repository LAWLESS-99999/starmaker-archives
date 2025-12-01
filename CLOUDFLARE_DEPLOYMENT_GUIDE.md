# Cloudflare Pages 部署指南

## 已完成步骤
- ✅ 安装了 Wrangler CLI: `npm install -g wrangler`
- ✅ 登录了 Cloudflare: `wrangler login`
- ✅ 创建了 wrangler.toml 配置文件
- ✅ 修复了 index.html 中的重复脚本标签

## 下一步部署步骤

### 1. 构建项目
首先确保项目能正常构建：
```bash
npm run build
```

### 2. 部署到 Cloudflare Pages
使用以下命令部署：
```bash
wrangler pages deploy dist
```

### 3. 配置自定义域名（可选）
部署完成后，你可以在 Cloudflare Pages 仪表板中配置自定义域名。

## 重要说明

### 项目特点
- 这是一个 React + TypeScript + Vite 项目
- 使用 Tailwind CSS 进行样式设计
- 包含大量图片资源在 `images/` 目录中
- 构建输出目录为 `dist/`

### 部署注意事项
1. **构建路径**: 已配置正确的构建路径，确保静态资源能正确加载
2. **SPA 路由**: Cloudflare Pages 支持单页应用路由，无需额外配置
3. **CDN 加速**: Cloudflare 的全球 CDN 会自动加速你的网站

### 故障排除
如果部署后网站仍无法显示：
1. 检查构建日志是否有错误
2. 确保所有依赖项正确安装
3. 验证 `dist` 目录中的文件结构是否正确

## 部署成功后的访问
部署完成后，你会获得一个类似 `https://starmaker-archives.pages.dev` 的 URL，可以通过此链接访问你的网站。
