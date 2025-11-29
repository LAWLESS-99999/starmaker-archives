# Starmaker Archives - 造星物语详细攻略档案

这是一个React + TypeScript + Vite构建的静态网站，提供《造星物语》游戏的详细攻略档案。

## GitHub Pages 部署说明

### 1. 启用 GitHub Pages

1. 在GitHub仓库中，进入 **Settings** 页面
2. 在左侧菜单中找到 **Pages**
3. 在 **Source** 部分选择 **GitHub Actions**
4. 保存设置

### 2. 设置自定义域名（可选）

1. **在域名注册商处配置DNS记录**（必须先完成此步骤）：
   
   **方法一：使用CNAME记录（推荐）**
   ```
   Type: CNAME
   Name: www
   Value: LAWLESS-99999.github.io
   ```
   
   **方法二：使用A记录（用于根域名）**
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153  
   Value: 185.199.110.153
   Value: 185.199.111.153
   ```

   **重要提示**：
   - 如果使用根域名（starmaker-archives.com），必须配置A记录
   - 如果使用www子域名（www.starmaker-archives.com），配置CNAME记录
   - DNS更改可能需要几分钟到几小时才能生效

2. **在GitHub Pages设置中启用自定义域名**：
   - 等待DNS记录生效后
   - 在 **Pages** 设置页面的 **Custom domain** 部分输入 `starmaker-archives.com`
   - 点击 **Save**
   - 勾选 **Enforce HTTPS**（推荐）

3. **验证DNS配置**：
   - 使用在线DNS检查工具验证记录是否正确
   - 确保没有其他冲突的DNS记录

### 3. 自动部署

项目已经配置了GitHub Actions工作流，当推送到 `master` 分支时会自动构建并部署到GitHub Pages。

### 4. 访问网站

部署完成后，你的网站将可以通过以下URL访问：
```
https://[你的GitHub用户名].github.io/starmaker-archives/
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 项目结构

```
starmaker-archives/
├── components/          # React组件
├── images/             # 图片资源
├── dist/               # 构建输出目录
├── .github/workflows/  # GitHub Actions工作流
├── index.html          # 主HTML文件
├── index.tsx           # React入口文件
├── App.tsx             # 主应用组件
├── vite.config.ts      # Vite配置
└── package.json        # 项目配置
```

## 功能特性

- 📚 人物档案库 - 主要角色、配角、隐藏人物攻略
- 🎮 游戏百科 - 系统玩法、节日活动、常见问题
- 🔧 黑客工具箱 - 萨曼莎电脑密码、游戏答案一键查询
- 📋 更新日志 - 工具版本更新内容及游戏版本变动
- 💝 特别感谢 - 支持者名单

## 技术栈

- **前端框架**: React 19 + TypeScript
- **构建工具**: Vite 6
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **部署**: GitHub Pages + GitHub Actions

## 问题排查

如果GitHub Pages部署后仍然无法显示，请检查：

1. **GitHub Actions状态**: 确保工作流运行成功
2. **仓库设置**: 确认GitHub Pages已启用并选择GitHub Actions作为源
3. **URL路径**: 确保访问的URL包含仓库名称：`https://[用户名].github.io/starmaker-archives/`
4. **控制台错误**: 在浏览器开发者工具中检查是否有JavaScript错误

## 许可证

MIT License
