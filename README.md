# Slice Game

A modern slicing game built with React and TypeScript, powered by Vite.

[中文说明](#中文说明)

## 🎮 Game Introduction

Slice Game is an engaging slicing game where players need to make precise cuts to score points. The game features smooth animations, an intuitive user interface, and supports multiple languages.

## 🚀 Tech Stack

- **Frontend Framework**: React 18
- **Development Language**: TypeScript
- **Build Tool**: Vite
- **Styling Solution**: TailwindCSS
- **State Management**: React Hooks
- **Internationalization**: i18next
- **UI Components**: Headless UI
- **Icon Library**: Lucide React
- **Backend Service**: Supabase

## 📋 System Requirements

- Node.js >= 18.0.0
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository
```bash
git clone [repository-url]
cd slicegame-project
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Configure environment variables
Copy `.env.example` to `.env` and fill in the necessary environment variables.

4. Start development server
```bash
npm run dev
# or
yarn dev
```

## 🎯 Game Controls

- **Left Mouse Button**: Perform slicing
- **Spacebar**: Pause/Resume game
- **ESC**: Return to main menu

## 📁 Project Structure

```
src/
├── components/     # React components
├── hooks/         # Custom React Hooks
├── i18n/          # Internationalization config
├── lib/           # Utility libraries and configs
├── types/         # TypeScript type definitions
├── utils/         # General utility functions
├── App.tsx        # Main application component
└── main.tsx       # Application entry point
```

## 🔧 Development Commands

All available commands are as follows:

### Daily Development Commands

- `npm start` or `npm run dev`: Start development server (supports hot reload)
- `npm run preview`: Preview production build result

### Build Related Commands

- `npm run build:clean`: Full build (clean all dependencies and rebuild)
- `npm run build:fast`: Quick build (retain existing dependencies)
- `npm run clean`: Clean all build files and dependencies

### Code Quality Commands

- `npm run lint`: Run code linting
- `npm run lint:fix`: Automatically fix code style issues
- `npm run typecheck`: Run type checking

### Build Process Description

The build script (`build.sh`) will automatically perform the following steps:

1. Check Node.js version (requires v18.0.0 or higher)
2. Clean old build files
3. Install/update dependencies
4. Run type checking
5. Run code linting
6. Build project
7. Verify build output

Using the `build:clean` command will additionally clean `node_modules` and `package-lock.json`.

### 🚀 Quick Start

Development environment:
```bash
npm start
```

Production build:
```bash
# Full build (recommended for first build)
npm run build:clean

# Quick build (for daily development use)
npm run build:fast
```

## 🌐 Internationalization

The game supports multiple languages including English, Simplified Chinese, Traditional Chinese, Spanish, German, and French. Language can be switched via the interface icon.

## 📦 Build & Deploy

1. Build for production
```bash
npm run build
```

2. Preview the build
```bash
npm run preview
```

## 🤝 Contributing

Issues and Pull Requests are welcome to help improve the game. Before submitting code, please ensure:

1. Code follows project coding standards
2. All tests pass
3. Commit messages are clear and descriptive

## 📄 License

MIT License


---

# 中文说明

一个基于React和TypeScript开发的现代化切片游戏，使用Vite作为构建工具。

## 🎮 游戏简介

Slice Game是一款简单但有趣的切片游戏，玩家需要通过精确的切割来获得高分。游戏具有流畅的动画效果和直观的用户界面，支持多语言（中文/英文）。

## 🚀 技术栈

- **前端框架**: React 18
- **开发语言**: TypeScript
- **构建工具**: Vite
- **样式解决方案**: TailwindCSS
- **状态管理**: React Hooks
- **国际化**: i18next
- **UI组件**: Headless UI
- **图标库**: Lucide React
- **后端服务**: Supabase

## 📋 系统要求

- Node.js >= 18.0.0
- npm 或 yarn 包管理器

## 🛠️ 安装说明

1. 克隆项目
```bash
git clone [项目地址]
cd slicegame-project
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 配置环境变量
复制 `.env.example` 文件为 `.env`，并填写必要的环境变量。

4. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

## 🎯 游戏控制

- **鼠标左键**: 进行切割
- **空格键**: 暂停/继续游戏
- **ESC键**: 返回主菜单

## 📁 项目结构

```
src/
├── components/     # React组件
├── hooks/         # 自定义React Hooks
├── i18n/          # 国际化配置
├── lib/           # 工具库和配置
├── types/         # TypeScript类型定义
├── utils/         # 通用工具函数
├── App.tsx        # 主应用组件
└── main.tsx       # 应用入口
```

## 🔧 开发命令

所有可用的命令如下：

### 日常开发命令

- `npm start` 或 `npm run dev`: 启动开发服务器（支持热重载）
- `npm run preview`: 预览生产构建结果

### 构建相关命令

- `npm run build:clean`: 完整构建（清理所有依赖并重新构建）
- `npm run build:fast`: 快速构建（保留现有依赖）
- `npm run clean`: 清理所有构建文件和依赖

### 代码质量命令

- `npm run lint`: 运行代码检查
- `npm run lint:fix`: 自动修复代码风格问题
- `npm run typecheck`: 运行类型检查

### 构建流程说明

构建脚本 (`build.sh`) 会自动执行以下步骤：

1. 检查 Node.js 版本（需要 v18.0.0 或更高）
2. 清理旧的构建文件
3. 安装/更新依赖
4. 运行类型检查
5. 运行代码检查
6. 构建项目
7. 验证构建输出

使用 `build:clean` 命令时会额外清理 `node_modules` 和 `package-lock.json`。

### 🚀 快速开始

开发环境：
```bash
npm start
```

生产构建：
```bash
# 完整构建（推荐首次构建时使用）
npm run build:clean

# 快速构建（日常开发使用）
npm run build:fast
```

## 🌐 国际化支持

游戏支持简体中文、繁体中文、英文、西班牙语、德语、法语多种语言，可以通过界面图标进行切换。

## 📦 构建部署

1. 构建生产版本
```bash
npm run build
```

2. 预览构建结果
```bash
npm run preview
```

## 🤝 贡献指南

欢迎提交Issue和Pull Request来帮助改进游戏。在提交代码前，请确保：

1. 代码符合项目的代码规范
2. 所有测试通过
3. 提交信息清晰明了

## 📄 许可证

MIT License