# AGENTS.md

## Project
Build a Chinese B2B website inspired by the business model of global exhibition lead platforms, but do not copy text, branding, or layout from any existing site.

## Brand
Chinese brand name: 展脉通
Positioning: 面向中国外贸与出海企业的全球展会客户开发平台

## Goals
1. Build a production-ready Chinese website
2. Use simplified Chinese throughout
3. Include homepage, exhibitions list page, exhibition detail page, contact page
4. Include a real lead form integration placeholder using Formspree
5. Store exhibition data in structured JSON
6. Add scripts for data import/update
7. Add GitHub Actions workflow for scheduled updates
8. Make deployment ready for Vercel

## Constraints
- Do not copy source website text verbatim
- Do not reproduce source branding
- Rewrite all content for Chinese B2B buyers
- Keep SEO-friendly structure
- Mobile responsive
- Clean and professional UI
- Code should be maintainable and documented

## Pages
- /
- /exhibitions
- /exhibitions/[slug]
- /contact

## Tech
- Next.js
- Tailwind CSS
- TypeScript
- Static data first, upgradeable to Supabase later

## Data fields
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

## Deployment
- Vercel
- GitHub Actions for scheduled data refresh
