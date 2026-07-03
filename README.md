# 美团智能决策助手交互原型

这是一个基于高保真原型实现的前端可交互 Demo，覆盖三条业务线：

- 外卖
- 到店餐饮
- 酒店

当前版本已经完成以下核心内容：

- React 组件化页面结构与状态管理
- Tailwind CSS 样式体系
- 本地 MDS 组件层封装
- Framer Motion 页面切换、弹窗和底部面板动效
- 候选选择、候选池、智能对比、风险分析、AI 总结、确认选择、详情页完整链路

## 技术栈

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Node.js
- PowerShell 脚本工具链

## 推荐环境

- Windows 10 / Windows 11
- VS Code
- Node.js 18 及以上
- npm
- Git

说明：

- 项目当前的启动脚本使用 PowerShell，Windows 环境下开箱即用。
- 如果在其他系统运行，需要把现有 `scripts/*.ps1` 替换为对应 shell 脚本。

## 快速开始

安装依赖：

```bash
npm install
```

类型检查：

```bash
npm run check
```

构建静态产物：

```bash
npm run build
```

启动本地预览：

```bash
npm run dev
```

默认预览地址：

- `http://127.0.0.1:4173`

如果端口被占用，预览脚本会自动递增到下一个可用端口。

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm install` | 安装项目依赖 |
| `npm run check` | 执行 TypeScript 类型检查 |
| `npm run build` | 编译 CSS 和 TypeScript，输出到 `dist/` |
| `npm run dev` | 先构建，再启动本地静态预览服务 |
| `npm run preview` | 直接启动本地静态预览服务 |

## 目录概览

```text
prototype-app/
├─ docs/                        项目文档
├─ dist/                        构建输出目录
├─ reference/                   原型参考图与静态素材
├─ scripts/                     构建、校验、预览脚本
├─ src/
│  ├─ components/mds/           复用基础组件
│  ├─ data/prototypeData.ts     页面数据与类型定义
│  ├─ vendor/                   全局依赖包装层
│  ├─ App.tsx                   主页面与交互逻辑
│  ├─ index.css                 全局样式入口
│  └─ main.tsx                  React 挂载入口
├─ index.html                   页面壳与脚本入口
├─ package.json                 项目依赖与命令配置
└─ README.md                    项目总说明
```

## 关键文件

- [src/App.tsx](./src/App.tsx)：核心页面结构、状态流转、交互控制
- [src/data/prototypeData.ts](./src/data/prototypeData.ts)：三条业务线的数据配置、类型、流程常量
- [src/components/mds](./src/components/mds)：按钮、弹窗、搜索框、外壳等复用组件
- [scripts/build.ps1](./scripts/build.ps1)：构建流程入口
- [scripts/dev-server.mjs](./scripts/dev-server.mjs)：本地静态预览服务
- [index.html](./index.html)：页面模板、样式与脚本挂载点

## 构建与运行说明

当前项目采用的是“TypeScript 编译 + Tailwind 生成样式 + 本地静态服务器预览”的运行方式。

实际执行过程如下：

1. `npm run check`：使用 TypeScript 对源码做类型校验
2. `npm run build`：
   - 编译 `src/index.css` 到 `dist/styles.css`
   - 编译 `src/` 下 TypeScript/TSX 到 `dist/`
   - 校验关键文件是否齐全
3. `npm run dev`：
   - 先执行一次构建
   - 再启动本地 HTTP 预览服务

说明：

- 当前项目没有使用标准 `vite build` 作为最终交付链路
- `dist/` 目录是当前演示版本的主要构建输出目录

## 部署摘要

当前版本适合做本地演示、课程作业展示或内网静态部署。

部署时至少要保证以下内容在同一项目根目录下保持相对路径不变：

- `index.html`
- `dist/`
- `reference/`
- `node_modules/react/`
- `node_modules/react-dom/`
- `node_modules/framer-motion/`

原因是：

- `index.html` 会直接引用 `dist/` 中的编译产物
- 页面中的部分视觉内容依赖 `reference/`
- 运行时通过 `node_modules` 中的 UMD 文件挂载 React、ReactDOM 和 Framer Motion

因此，当前版本最稳妥的部署方式是：

1. 在目标机器执行 `npm install`
2. 执行 `npm run build`
3. 使用 `npm run dev` 或任意静态服务器从项目根目录提供访问

## 详细开发文档

完整的项目开发文档见：

- [docs/项目开发文档.md](./docs/项目开发文档.md)

其中包含：

- 环境搭建
- 代码结构
- 页面与交互实现说明
- 构建流程
- 部署说明
- 后续优化建议
