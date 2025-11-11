# 微信小程序 web-view 组件解决方案

## 问题描述

微信小程序的 `web-view` 组件存在以下限制：
1. **不支持 localhost 地址**：无法在开发环境中直接使用本地服务器
2. **域名屏蔽问题**：某些免费域名（如 surge.sh）可能被微信识别为营销内容而屏蔽
3. **HTTPS 要求**：必须使用 HTTPS 协议

## 解决方案

### 1. 使用随机域名策略

通过使用随机生成的域名来避开微信的内容检测：

```bash
# 部署到随机域名
npx surge dist random-name-xxxx.surge.sh
```

### 2. 多域名备用方案

准备多个可用域名，当一个被屏蔽时快速切换：

- 主域名：`blue-ocean-2024.surge.sh`
- 备用域名：可随时生成新的随机域名
- GitHub Pages：作为最终备用方案

### 3. 自动化部署脚本

使用 `deploy-github.sh` 脚本可快速部署到 GitHub Pages：

```bash
./deploy-github.sh
```

## 当前可用地址

✅ **主要地址**: https://blue-ocean-2024.surge.sh
- 状态：可正常访问
- 更新时间：2024年最新
- 备注：使用随机域名避开微信检测

🔄 **历史地址**:
- ~~https://carnegie-training-app.surge.sh~~ (已被微信屏蔽)
- ~~https://carnegie-learning-platform.surge.sh~~ (可能被微信屏蔽)

📋 **备用方案**:
- GitHub Pages部署脚本已准备：`./deploy-github.sh`
- 可快速切换到其他随机域名

## 微信小程序配置

在 `pages/index/index.js` 中配置：

```javascript
Page({
  data: {
    // 使用当前可用的线上地址
    webUrl: 'https://blue-ocean-2024.surge.sh'
  }
})
```

## 开发流程

1. **本地开发**：使用 `npm run dev` 在本地开发
2. **构建项目**：使用 `npm run build` 生成 dist 目录
3. **部署上线**：使用 surge 或 GitHub Pages 部署
4. **更新配置**：修改小程序中的 webUrl
5. **测试验证**：在微信开发者工具中测试

## 域名切换策略

当遇到域名被屏蔽时：

1. **快速切换**：
   ```bash
   npx surge dist new-random-name.surge.sh
   ```

2. **更新小程序配置**：
   ```javascript
   webUrl: 'https://new-random-name.surge.sh'
   ```

3. **GitHub Pages 备用**：
   ```bash
   ./deploy-github.sh
   ```

## 预防措施

1. **域名多样化**：使用不同类型的随机域名
2. **内容优化**：确保网页内容不包含可能被识别为营销的关键词
3. **备用方案**：始终准备多个部署平台
4. **定期检查**：定期验证域名在微信环境中的可访问性

## 技术支持

如遇到新的屏蔽问题，可以：
1. 生成新的随机域名重新部署
2. 使用 GitHub Pages 作为备用方案
3. 考虑使用付费域名服务