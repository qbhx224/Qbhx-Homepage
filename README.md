# Qbhx's HomePage

千杯寒雪の个人主页

## Features

- Hero 个人信息展示（头像、社交链接）
- 一言（Hitokoto）随机语句，支持刷新和复制
- 时光进度条（今日 / 本周 / 本月 / 今年）
- 实时时钟 + 天气（和风天气 API）
- 技能展示、GitHub 项目作品、博客文章
- 深色 / 浅色主题切换
- 加载动画（Ken Burns 背景 + 进度条）
- 玻璃拟态（Glassmorphism）卡片效果
- 隐藏配置面板（快速点击 logo 5 次打开，可修改天气城市和背景图片）
- 响应式布局，适配移动端

## Tech Stack

- Vue 3 (Composition API `<script setup>`)
- Vite
- CSS Custom Properties (theming)

## APIs

| 服务 | API | 说明 |
|------|-----|------|
| Hitokoto | `https://v1.hitokoto.cn/` | 免费，无需 key |
| Weather | `https://wttr.in/{city}?format=j1` | 免费，无需 key |

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## License

MIT
