# 美团智能决策助手交互原型

这是根据高保真稿整理出来的前端可交互原型，覆盖三条业务线：

- 外卖
- 到店餐饮
- 酒店

目前已经实现：

- React 组件化页面结构与状态流转
- Tailwind CSS 样式体系
- 本地 MDS 组件层（`src/components/mds`）
- Framer Motion 页面切换、弹窗和底部分享面板动效
- 候选选择、候选池、智能对比、风险分析、AI 总结、确认选择、详情页完整链路

## 本地开发

推荐环境：

- VS Code
- Node.js 16+
- npm
- Git

安装依赖：

```bash
npm install
```

类型检查：

```bash
npm run check
```

构建静态原型：

```bash
npm run build
```

启动本地预览：

```bash
npm run dev
```

默认地址：

- `http://127.0.0.1:4173`

如果端口被占用，预览脚本会自动顺延到下一个可用端口。

## 目录说明

- [src/App.tsx](</C:/Users/Wheel/Documents/美团app/prototype-app/src/App.tsx>)
- [src/data/prototypeData.ts](</C:/Users/Wheel/Documents/美团app/prototype-app/src/data/prototypeData.ts>)
- [src/components/mds](</C:/Users/Wheel/Documents/美团app/prototype-app/src/components/mds>)
- [scripts/build.ps1](</C:/Users/Wheel/Documents/美团app/prototype-app/scripts/build.ps1>)
- [index.html](</C:/Users/Wheel/Documents/美团app/prototype-app/index.html>)

## 说明

这个项目当前采用“编译为浏览器原生模块 + 静态预览”的方式运行，目的是在当前目录权限限制下，依然稳定地保留 React 组件化开发体验，并输出可直接演示的交互原型。
