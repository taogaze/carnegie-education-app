#!/bin/bash

# GitHub Pages 部署脚本
# 使用方法: ./deploy-github.sh

echo "🚀 开始部署到 GitHub Pages..."

# 检查是否有 dist 目录
if [ ! -d "dist" ]; then
    echo "❌ 未找到 dist 目录，请先运行 npm run build"
    exit 1
fi

# 创建临时分支用于部署
git checkout -b gh-pages 2>/dev/null || git checkout gh-pages

# 清空当前分支内容（保留 .git）
find . -maxdepth 1 ! -name '.git' ! -name '.' -exec rm -rf {} \;

# 复制 dist 目录内容到根目录
cp -r dist/* .
cp dist/.* . 2>/dev/null || true

# 创建 .nojekyll 文件（GitHub Pages 需要）
touch .nojekyll

# 提交更改
git add .
git commit -m "Deploy to GitHub Pages - $(date)"

echo "✅ 部署完成！"
echo "📝 请手动推送到 GitHub: git push origin gh-pages"
echo "🌐 然后在 GitHub 仓库设置中启用 Pages 功能"