#!/bin/bash

# GitHub Pages 部署脚本
# 使用方法: ./deploy-github.sh

echo "🚀 开始部署到 GitHub Pages..."

set -e

# 确保在主分支执行构建
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "ℹ️ 当前分支为 $CURRENT_BRANCH，切换回 main 分支进行构建"
  git checkout main
fi

# 构建并准备 SPA 回退 404.html
if [ ! -d "dist" ]; then
  npm run build
fi
cp -f dist/index.html dist/404.html

# 使用临时目录缓存构建产物，避免清空工作区后无法复制
TMP_DIR=$(mktemp -d)
cp -r dist/* "$TMP_DIR/"
echo "📦 已缓存构建产物到 $TMP_DIR"

# 如有未提交改动，暂存以避免切换分支报错
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "🧳 检测到未提交改动，正在使用 git stash 暂存..."
  git stash push -u -m "deploy-temp-stash" >/dev/null 2>&1 || true
  STASHED=1
else
  STASHED=0
fi

# 创建临时分支用于部署
git checkout -b gh-pages 2>/dev/null || git checkout gh-pages

# 清空当前分支内容（保留 .git）
find . -maxdepth 1 ! -name '.git' ! -name '.' -exec rm -rf {} \;

# 复制缓存的构建产物到根目录
cp -r "$TMP_DIR"/* .

# 创建 .nojekyll 文件（GitHub Pages 需要）
touch .nojekyll

# 提交更改
git add .
git commit -m "Deploy to GitHub Pages - $(date)" || echo "ℹ️ 无文件变化，跳过提交"

# 返回 main 并恢复暂存的改动（如果有）
git checkout main
if [ "$STASHED" = "1" ]; then
  echo "🔄 恢复之前暂存的改动"
  git stash pop >/dev/null 2>&1 || true
fi

echo "✅ 部署完成！"
echo "📝 推送到 GitHub: git push origin gh-pages"
echo "🌐 然后在 GitHub 仓库设置中启用/确认 Pages 功能"