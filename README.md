# 展脉通

展脉通是一个面向中国外贸与出海企业的全球展会客户开发平台。项目基于 Next.js、TypeScript 和 Tailwind CSS 构建，包含首页、展会列表、展会详情、联系页，以及一套可持续维护的数据更新流水线。

## 功能概览

- 中文官网与 SEO 友好的 App Router 页面结构
- 展会数据三层流水线：原始导入、规范清洗、站点最终 JSON
- 支持未来从 CSV、JSON 或人工整理文件接入数据
- Formspree 可配置表单接入
- 每日 GitHub Actions 定时更新并自动提交 JSON
- Vercel 友好的静态站点部署方式
- `robots.txt`、`sitemap.xml`、404 页面、favicon 占位、生产元数据

## 技术栈

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

## 本地开发

```bash
npm install
npm run data:update
npm run dev
```

默认访问地址：

```bash
http://localhost:3000
```

## 常用命令

```bash
npm run dev
npm run build
npm run start
npm run typecheck
npm run data:import
npm run data:normalize
npm run data:build
npm run data:update
```

## 环境变量

请先复制 `.env.example` 为 `.env.local`，再按实际生产信息填写。

```bash
cp .env.example .env.local
```

当前支持的环境变量：

- `NEXT_PUBLIC_SITE_URL`
  站点正式域名，示例：`https://www.your-domain.com`
- `NEXT_PUBLIC_FORMSPREE_ENDPOINT`
  Formspree 表单 endpoint，示例：`https://formspree.io/f/your-form-id`

说明：

- 本地未设置 `NEXT_PUBLIC_SITE_URL` 时，默认使用 `http://localhost:3000`
- 在 Vercel 上如果未显式设置 `NEXT_PUBLIC_SITE_URL`，代码会回退到 Vercel 提供的域名环境变量
- 未设置 `NEXT_PUBLIC_FORMSPREE_ENDPOINT` 时，表单会显示为“待启用”状态，避免提交到错误地址

## 数据目录分层

```text
data/
  raw/
    source-manifest.json
    exhibitions.sample.json
    exhibitions.raw.json
  clean/
    exhibitions.json
  site/
    exhibitions.json
```

各层职责：

- `data/raw/`：导入层。保存外部原始输入、手工整理文件和导入结果
- `data/clean/`：清洗层。统一字段、日期、布尔值、数组格式，保证 schema 合法
- `data/site/`：站点层。Next.js 页面只读取这里的最终 JSON

## 数据流水线

### 1. 导入层

执行：

```bash
npm run data:import
```

脚本：

- `scripts/import-exhibitions.ts`

作用：

- 读取 `data/raw/source-manifest.json`
- 按数据源类型导入记录
- 输出 `data/raw/exhibitions.raw.json`

当前默认数据源是 mock 样本文件：

- `data/raw/exhibitions.sample.json`

### 2. 清洗层

执行：

```bash
npm run data:normalize
```

脚本：

- `scripts/normalize-exhibitions.ts`

作用：

- 读取 `data/raw/exhibitions.raw.json`
- 标准化 `slug`、日期、布尔值、数组字段
- 校验必填字段、日期格式、结束时间顺序、slug 唯一性
- 输出 `data/clean/exhibitions.json`

### 3. 站点构建层

执行：

```bash
npm run data:build
```

脚本：

- `scripts/build-data.ts`

作用：

- 读取 `data/clean/exhibitions.json`
- 生成站点最终消费文件 `data/site/exhibitions.json`
- 输出总条数、精选条数和已排序展会列表

### 一键更新

```bash
npm run data:update
```

该命令会顺序执行：

1. `npm run data:import`
2. `npm run data:normalize`
3. `npm run data:build`

## 数据源配置

数据源配置文件位于：

- `data/raw/source-manifest.json`

示例：

```json
{
  "sources": [
    {
      "id": "sample-json",
      "type": "json",
      "path": "data/raw/exhibitions.sample.json",
      "enabled": true
    }
  ]
}
```

支持的 `type`：

- `json`
- `csv`
- `manual`

说明：

- `json`：适合 API 导出文件或人工整理后的结构化 JSON
- `csv`：适合供应商导出或运营同事维护的表格导出文件
- `manual`：适合人工维护文件，本质按 JSON 读取，便于后续区分来源

如果未来接入真实数据，只需要：

1. 将新文件放入 `data/raw/`
2. 在 `source-manifest.json` 中增加或替换 source
3. 运行 `npm run data:update`

## 展会字段

清洗后与站点消费的数据字段如下：

- `slug`
- `name`
- `start_date`
- `end_date`
- `city`
- `country`
- `industry`
- `summary`
- `target_buyers`
- `sample_fields`
- `source_note`
- `featured`

## GitHub Actions 自动更新

工作流文件：

- `.github/workflows/update-exhibitions.yml`

触发方式：

- 每天执行一次，当前 cron 为 `0 1 * * *`
- 支持手动触发 `workflow_dispatch`

工作流步骤：

1. 拉取仓库代码
2. 安装 Node.js 22
3. 执行 `npm ci`
4. 执行 `npm run data:update`
5. 检查 `data/raw/exhibitions.raw.json`、`data/clean/exhibitions.json`、`data/site/exhibitions.json` 是否变化
6. 若存在变化，自动提交并推送

## Vercel 触发机制

如果仓库已经通过 GitHub 集成接入 Vercel，这个工作流在推送更新 JSON 后会自动触发新的部署。也就是说：

- GitHub Actions 负责刷新数据并提交代码
- GitHub push 事件触发 Vercel redeploy
- Vercel 构建时读取最新的 `data/site/exhibitions.json`

因此不需要额外写 Vercel webhook 逻辑。

## 部署到 Vercel

1. 将仓库导入 Vercel
2. Framework Preset 选择 Next.js
3. 保持默认 Build Command：`next build`
4. 在 Vercel Project Settings -> Environment Variables 中添加：
   `NEXT_PUBLIC_SITE_URL`
   `NEXT_PUBLIC_FORMSPREE_ENDPOINT`
5. 触发一次部署，确认构建通过
6. 保持 GitHub 集成开启，这样数据工作流的自动提交会直接触发重新部署

推荐生产值：

- `NEXT_PUBLIC_SITE_URL=https://你的正式域名`
- `NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/你的表单ID`

## SEO 与生产文件

项目已包含：

- `app/robots.ts`：生成 `/robots.txt`
- `app/sitemap.ts`：生成 `/sitemap.xml`
- `app/not-found.tsx`：404 页面
- `app/icon.svg`：favicon 占位图标
- `app/layout.tsx`：统一 metadata、canonical、robots、icons 设置

## Formspree 配置

当前表单通过环境变量 `NEXT_PUBLIC_FORMSPREE_ENDPOINT` 配置，不需要再去代码里硬编码 endpoint。

## 生产检查清单

- 已设置 `NEXT_PUBLIC_SITE_URL`
- 已设置 `NEXT_PUBLIC_FORMSPREE_ENDPOINT`
- 已确认 `npm run data:update` 可生成最新 JSON
- 已确认 `npm run build` 通过
- 已检查导航、列表页、详情页、联系页、404 页都能正常打开
- 已确认 GitHub Actions 有权限推送更新提交
- 已确认 Vercel 已连接当前 GitHub 仓库
- 已确认 favicon、robots、sitemap 能在生产域名下访问
- 已审阅站内联系方式、公司介绍和合规说明，避免出现测试或演示措辞

## 上线前必须替换的内容

以下内容在正式上线前必须由你替换或确认：

1. `NEXT_PUBLIC_SITE_URL`
   替换成你的正式域名，否则 canonical、Open Graph、robots、sitemap 可能指向错误地址。
2. `NEXT_PUBLIC_FORMSPREE_ENDPOINT`
   替换成你的真实 Formspree endpoint，否则联系表单不会启用。
3. 联系表单后的业务说明和隐私说明
   当前页面有基础说明，但如果你真实收集姓名、邮箱、公司信息，建议补充正式隐私与数据使用说明。
4. 样本展会数据
   当前保留的是可演示的样本数据，上线前建议替换为你自己的真实研究库或已审核内容。
5. 站点品牌细节
   如你有正式 logo、企业介绍、客服邮箱或微信承接方式，建议补齐到页头、页脚或联系页。

## 目录说明

- `app/`：页面路由、站点元数据、SEO 文件
- `components/`：复用 UI 组件
- `lib/`：站点配置、展会数据读取与类型定义
- `data/`：原始数据、清洗数据、站点最终 JSON
- `scripts/`：导入、清洗、构建脚本
- `.github/workflows/`：自动数据更新工作流

## 说明

仓库中的展会信息和字段为演示结构，用于说明中国 B2B 企业如何组织展会研究与线索开发页面。接入真实业务数据前，请补充来源合规、隐私说明和内部审核流程，不要抓取或复制第三方网站的受限文本内容。
