本目录用于存放展会数据导入、清洗和站点构建脚本。

当前流水线：

- `import-exhibitions.ts`：读取 `data/raw/source-manifest.json` 中声明的数据源，并生成 `data/raw/exhibitions.raw.json`
- `normalize-exhibitions.ts`：统一字段、日期、布尔值和数组格式，输出 `data/clean/exhibitions.json`
- `build-data.ts`：生成站点最终消费的 `data/site/exhibitions.json`
- `lib/exhibitions-pipeline.cjs`：共享导入、校验和构建逻辑

支持的数据源类型：

- `json`
- `csv`
- `manual`
