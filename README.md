This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 项目结构
```text
orbit-flow/
├── app/                      # 【核心】应用路由与页面
│   ├── api/                  # 🟢 纯后端：API 接口 (只在服务器运行)
│   │   ├── cron/             # 定时任务接口
│   │   │   └── fetch-satellites/
│   │   │       └── route.ts  # <-- 这里写后端逻辑 (拉取数据)
│   │   └── satellites/       # 给前端调用的数据接口 (可选)
│   │       └── route.ts
│   ├── dashboard/            # 🔵 前端页面：仪表盘
│   │   └── page.tsx          # <-- 这里写前端 UI (React 组件)
│   ├── layout.tsx            # 全局布局 (导航栏等)
│   └── page.tsx              # 首页
├── components/               # 🔵 纯前端：可复用的 UI 组件
│   ├── SatelliteTable.tsx    # 卫星列表表格
│   ├── Header.tsx            # 头部导航
│   └── ui/                   # 基础按钮、输入框等
├── lib/                      # 🟠 通用逻辑 & 后端工具 (主要在服务器运行)
│   ├── db.ts                 # 数据库连接实例
│   ├── satellite-service.ts  # <-- 核心后端业务逻辑 (解析 TLE, 存库)
│   └── utils.ts              # 工具函数
├── prisma/                   # 🟢 数据库定义
│   └── schema.prisma         # 数据模型定义
├── types/                    # 🔵/🟠 类型定义 (前后端共享)
│   └── index.ts              # TypeScript 接口定义
└── .env                      # 🔒 环境变量 (数据库密码, API Key)
```