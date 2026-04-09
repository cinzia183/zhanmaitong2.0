# 展脉通

展脉通是一个面向中国外贸与出海企业的全球展会客户开发平台。

## 项目目标
建立一个独立中文品牌站，参考全球展会线索平台的业务模式，但不复制任何现有网站的文案、品牌或页面结构。

## 第一阶段目标
- 建立独立中文官网
- 提供展会列表与详情展示
- 提供样例名单申请表单
- 支持后续数据更新与自动部署

## 页面规划
- 首页 /
- 展会列表页 /exhibitions
- 展会详情页 /exhibitions/[slug]
- 联系页 /contact

## 技术栈
- Next.js
- TypeScript
- Tailwind CSS
- JSON 数据源
- Formspree 表单
- GitHub Actions 数据更新
- Vercel 部署

## 数据字段
- slug
- name
- start_date
- end_date
- city
- country
- industry
- summary
- target_buyers
- sample_fields
- source_note
- featured

## 当前状态
这是项目初始化骨架。请用 Codex CLI 在此基础上生成完整站点、数据流程和部署配置。
