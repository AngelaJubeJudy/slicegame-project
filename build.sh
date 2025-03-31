#!/bin/bash

# 设置错误时退出
set -e

echo "🚀 开始构建流程..."

# 检查 Node.js 版本
echo "📊 检查 Node.js 版本..."
required_node_version="18.0.0"
current_node_version=$(node -v | cut -d "v" -f 2)

if [ "$(printf '%s\n' "$required_node_version" "$current_node_version" | sort -V | head -n1)" != "$required_node_version" ]; then
    echo "❌ Node.js 版本过低。需要 v$required_node_version 或更高版本"
    exit 1
fi

# 删除之前的构建文件
echo "🗑️ 清理旧的构建文件..."
rm -rf dist || true
rm -rf .vite || true

# 清理依赖（可选，通过参数控制）
if [ "$1" == "--clean" ]; then
    echo "🧹 清理所有依赖..."
    rm -rf node_modules
    rm -f package-lock.json
fi

# 安装依赖
echo "📦 安装依赖..."
npm install

# 运行类型检查
echo "🔍 运行类型检查..."
npm run typecheck || {
    echo "⚠️ 类型检查失败，但继续构建..."
}

# 运行 lint
echo "🔍 运行代码检查..."
npm run lint || {
    echo "⚠️ 代码检查失败，但继续构建..."
}

# 构建项目
echo "🏗️ 构建项目..."
npm run build

# 验证构建输出
if [ -d "dist" ] && [ -f "dist/index.html" ]; then
    echo "✅ 构建成功完成！"
    echo "📂 构建文件位于: $(pwd)/dist"
    echo "💡 提示: 使用 'npm run preview' 可以预览构建结果"
else
    echo "❌ 构建似乎失败，没有生成预期的文件"
    exit 1
fi 