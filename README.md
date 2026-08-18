# Panduan Benteng Marlborough

这是一个使用 **Astro + Tailwind CSS + TypeScript** 制作的印尼语单页景点科普网站。它面向计划访问明古鲁 Benteng Marlborough 的读者，整合历史背景、到访准备、交通、周边类型信息、地图、FAQ、隐私与 Cookie 偏好。

## 技术与部署

项目采用固定版本的 pnpm、Node.js 和依赖，并以 Cloudflare **Workers Static Assets** 方式部署。无数据库、登录、CMS 或后端业务逻辑。

| 项目 | 配置 |
| --- | --- |
| Node.js | `22.12.0`（见 `.node-version`） |
| 包管理器 | `pnpm@10.11.1`（见 `packageManager`） |
| 框架 | Astro `7.2.2` |
| 样式 | Tailwind CSS `4.3.3` |
| 部署配置 | `wrangler.jsonc`，静态目录为 `dist/client` |

安装、检查与构建：

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm check
corepack pnpm build
```

构建后可在拥有 Cloudflare 权限的环境中运行：

```bash
corepack pnpm deploy
```

## 域名配置

站点 URL 仅由 `astro.config.ts` 中的 `SITE_URL` 环境变量派生；项目没有任何占位域名。当未设置 `SITE_URL` 时，构建仍正常，canonical 与绝对 Open Graph URL 会被省略，`@astrojs/sitemap` 也不会启用。

域名确定后，只需在构建环境中设置一次：

```bash
SITE_URL=https://nama-domain-anda.id corepack pnpm build
```

## 内容与素材说明

历史和地点核心描述参照明古鲁市旅游信息门户（SIPARTA）的公开条目；更多来源与措辞边界记录在 `research-notes.md`。堡垒实景图来自 Wikimedia Commons 检索来源，网页中保留照片来源入口。使用者在正式上线前应自行复核图片许可和当日运营信息。

Google Analytics `G-HXM22WWPKP` 仅在访客明确同意分析型 Cookie 后加载；默认不会加载分析脚本。

## 交付前验证

已按干净依赖环境验证：删除 `node_modules` 后以项目锁定版本安装依赖，`pnpm check` 与 `pnpm build` 均通过。构建产物同时检查了 `example.com`、`localhost`、`chrome-extension://`、非印尼地图区域参数、自动 sitemap 降级和虚构 `lastmod`。
