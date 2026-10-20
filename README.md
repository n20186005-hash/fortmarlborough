# Panduan Benteng Marlborough

这是一个使用 **Astro + Tailwind CSS + TypeScript** 制作的印尼语与英语景点指南。它面向计划访问明古鲁 Benteng Marlborough 的读者，整合历史背景、到访准备、交通、周边类型信息、地图、FAQ、隐私与 Cookie 偏好。

## 技术与部署

项目采用固定版本的 pnpm、Node.js 和依赖，并以 Cloudflare **Workers Static Assets** 方式部署。无数据库、登录、CMS 或后端业务逻辑。

| 项目 | 配置 |
| --- | --- |
| Node.js | `22.12.0`（见 `.node-version`） |
| 包管理器 | `pnpm@10.11.1`（见 `packageManager`） |
| 框架 | Astro `7.2.2` |
| 样式 | Tailwind CSS `4.3.3` |
| 部署配置 | `wrangler.jsonc`，静态目录为 `dist` |

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

`astro.config.ts` 的 `site` 默认为生产域名 `https://fortmarlborough.com`，因此 canonical、绝对 Open Graph URL、hreflang 与 `sitemap-index.xml` 在每次构建中都会产出。预览/临时环境可用 `SITE_URL` 覆盖一次：

```bash
SITE_URL=https://preview.example.com corepack pnpm build
```

## 搜索引擎与部署要点

* **统一网址**：canonical 指向 `https://fortmarlborough.com/…`，每页输出 `hreflang`（`id` / `en` / `x-default` 指向印尼语版本）。
* **HTTPS 与 www**：`src/worker.js` 在 ASSETS 之前执行，以301转向HTTPS主域，保留路径和查询参数。`public/_redirects` 只保留相对路径别名。
* **HSTS 与安全头**：由 `public/_headers` 下发（含 `Strict-Transport-Security`），`/_astro/*` 使用不可变缓存。
* **爬虫入口**：`public/robots.txt` 声明 `Sitemap: https://fortmarlborough.com/sitemap-index.xml`。
* **404**：`src/pages/404.astro` 预渲染为 `404.html`，`wrangler.jsonc` 使用 `not_found_handling: "404-page"`，避免 SPA 回退造成的软 404。

## 内容与素材说明

历史和地点核心描述参照明古鲁市旅游信息门户（SIPARTA）的公开条目；更多来源与措辞边界记录在 `research-notes.md`。堡垒实景图来自 Wikimedia Commons 检索来源，网页中保留照片来源入口。使用者在正式上线前应自行复核图片许可和当日运营信息。

Google Analytics `G-HXM22WWPKP` 仅在访客明确同意分析型 Cookie 后加载；默认不会加载分析脚本。

## 交付前验证

已按干净依赖环境验证：删除 `node_modules` 后以项目锁定版本安装依赖，`pnpm check` 与 `pnpm build` 均通过。构建产物同时检查了 `example.com`、`localhost`、`chrome-extension://`、非印尼地图区域参数、自动 sitemap 降级和虚构 `lastmod`。
