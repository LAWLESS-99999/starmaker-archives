# DNS 配置指南 - StarmakerArchives.com

## 问题诊断

当前 `StarmakerArchives.com` 域名无法解析，说明DNS记录尚未配置。

## 解决方案

### 方案一：先使用GitHub Pages默认域名（推荐）

1. **暂时禁用自定义域名**：
   - 在GitHub仓库设置中，删除自定义域名设置
   - 使用默认URL：`https://LAWLESS-99999.github.io/starmaker-archives/`

2. **验证网站是否正常工作**：
   - 访问上述URL确认网站显示正常

### 方案二：正确配置DNS记录

#### 步骤1：在域名注册商处配置DNS

**常见域名注册商DNS配置位置**：
- GoDaddy: DNS Management
- Namecheap: Advanced DNS
- Cloudflare: DNS Records
- 阿里云: 域名解析

#### 步骤2：添加DNS记录

**方法A：使用A记录（推荐用于根域名）**
```
类型: A
主机: @
值: 185.199.108.153
TTL: 自动或3600
```

```
类型: A  
主机: @
值: 185.199.109.153
TTL: 自动或3600
```

```
类型: A
主机: @
值: 185.199.110.153
TTL: 自动或3600
```

```
类型: A
主机: @
值: 185.199.111.153
TTL: 自动或3600
```

**方法B：使用CNAME记录（用于www子域名）**
```
类型: CNAME
主机: www
值: LAWLESS-99999.github.io
TTL: 自动或3600
```

#### 步骤3：等待DNS生效
- DNS更改通常需要5分钟到48小时生效
- 使用在线工具检查：https://dnschecker.org

#### 步骤4：在GitHub启用自定义域名
- 等待DNS生效后
- 在GitHub Pages设置中输入 `StarmakerArchives.com`
- 保存并启用HTTPS

## 验证步骤

1. 使用DNS检查工具验证记录是否正确
2. 使用 `nslookup StarmakerArchives.com` 检查解析
3. 在GitHub Pages设置中测试域名

## 常见问题

**Q: 域名中的横杠有问题吗？**
A: 没有，`StarmakerArchives.com` 是完全合法的域名格式。

**Q: DNS更改需要多长时间？**
A: 通常5分钟到48小时，取决于DNS提供商和TTL设置。

**Q: 如何知道DNS是否生效？**
A: 使用在线DNS检查工具或在命令行使用 `nslookup` 命令。
