#!/bin/bash

# 部署到用户主页根域（https://taogaze.github.io/）的脚本
# 依赖：已创建并可写仓库 taogaze/taogaze.github.io（public），SSH 已配置
# 使用：./deploy-github-root.sh

set -e

echo "🚀 开始部署到用户主页根域 https://taogaze.github.io/"

# 在 main 分支进行构建
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "ℹ️ 当前分支为 $CURRENT_BRANCH，切换回 main 分支进行构建"
  git checkout main
fi

# 为根域构建并准备 SPA 回退（404.html）
echo "🏗️ 构建生产包 (VITE_BASE=/)"
VITE_BASE=/ npm run build
cp -f dist/index.html dist/404.html

# 缓存构建产物
TMP_DIR=$(mktemp -d)
cp -r dist/* "$TMP_DIR/"
touch "$TMP_DIR/.nojekyll"
echo "📦 已缓存构建产物到 $TMP_DIR"

# 初始化临时仓库并推送到 taogaze.github.io
cd "$TMP_DIR"
git init -b main
git add .
git commit -m "Deploy user site to root domain - $(date)" || echo "ℹ️ 无文件变化，跳过提交"

REMOTE=git@github.com:taogaze/taogaze.github.io.git
echo "🔗 检查远程仓库可达性：$REMOTE"
if git ls-remote "$REMOTE" &>/dev/null; then
  echo "✅ 远程仓库可达"
else
  echo "❌ 未找到或无法访问 $REMOTE\n请先在 GitHub 上创建仓库 taogaze/taogaze.github.io，并确保 SSH 有权限。"
  exit 1
fi

git remote add origin "$REMOTE"
echo "📤 推送到 main 分支（覆盖旧内容）"
git push -f origin main

echo "✅ 根域部署完成：https://taogaze.github.io/"
echo "⏱️ GitHub Pages 生效通常需要 1-2 分钟，请稍后刷新页面。"