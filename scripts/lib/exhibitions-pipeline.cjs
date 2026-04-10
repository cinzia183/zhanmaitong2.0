const { mkdir, readFile, writeFile } = require("node:fs/promises");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..", "..");
const dataDir = path.join(projectRoot, "data");
const rawDir = path.join(dataDir, "raw");
const cleanDir = path.join(dataDir, "clean");
const siteDir = path.join(dataDir, "site");
const manifestFile = path.join(rawDir, "source-manifest.json");
const defaultSampleSource = path.join(rawDir, "exhibitions.sample.json");
const rawOutputFile = path.join(rawDir, "exhibitions.raw.json");
const cleanOutputFile = path.join(cleanDir, "exhibitions.json");
const siteOutputFile = path.join(siteDir, "exhibitions.json");
const requiredFields = [
  "slug",
  "name",
  "start_date",
  "end_date",
  "city",
  "country",
  "industry",
  "summary",
  "target_buyers",
  "sample_fields",
  "source_note",
  "featured"
];

function formatDate(value) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }

  const match = trimmed.match(/^(\d{4})[/.](\d{1,2})[/.](\d{1,2})$/);
  if (match) {
    const [, year, month, day] = match;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.valueOf())) {
    return null;
  }

  return parsed.toISOString().slice(0, 10);
}

function isValidDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toText(value, fallback = "") {
  if (value == null) {
    return fallback;
  }

  return String(value).trim();
}

function toBoolean(value) {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return value > 0;
  }

  const normalized = String(value ?? "")
    .trim()
    .toLowerCase();

  return ["true", "1", "yes", "y", "featured", "精选", "是"].includes(normalized);
}

function toArray(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(/[|,，、;/]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseCSVLine(line) {
  const cells = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      cells.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  cells.push(current.trim());
  return cells;
}

function parseCSV(content) {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return [];
  }

  const headers = parseCSVLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseCSVLine(line);
    return headers.reduce((record, header, index) => {
      record[header] = values[index] ?? "";
      return record;
    }, {});
  });
}

async function readJson(filePath) {
  const content = await readFile(filePath, "utf8");
  return JSON.parse(content);
}

function getFallbackManifest() {
  return {
    sources: [
      {
        id: "sample-json",
        type: "json",
        path: "data/raw/exhibitions.sample.json",
        enabled: true
      }
    ]
  };
}

async function loadSourceManifest() {
  try {
    return await readJson(manifestFile);
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return getFallbackManifest();
    }

    throw error;
  }
}

async function loadSourceRecords(source) {
  const filePath = path.isAbsolute(source.path)
    ? source.path
    : path.join(projectRoot, source.path);
  const sourceType = String(source.type ?? "").toLowerCase();

  if (sourceType === "json" || sourceType === "manual") {
    const parsed = await readJson(filePath);
    return Array.isArray(parsed) ? parsed : parsed.records ?? parsed.exhibitions ?? [];
  }

  if (sourceType === "csv") {
    const content = await readFile(filePath, "utf8");
    return parseCSV(content);
  }

  throw new Error(`不支持的数据源类型：${source.type}`);
}

async function importSources() {
  const manifest = await loadSourceManifest();
  const sources = Array.isArray(manifest.sources) ? manifest.sources : [];
  const enabledSources = sources.filter((source) => source.enabled !== false);

  if (enabledSources.length === 0) {
    enabledSources.push({
      id: "sample-json",
      type: "json",
      path: path.relative(projectRoot, defaultSampleSource),
      enabled: true
    });
  }

  const records = [];

  for (const source of enabledSources) {
    const items = await loadSourceRecords(source);
    items.forEach((item, index) => {
      records.push({
        source_id: source.id ?? `source-${index + 1}`,
        source_type: source.type,
        source_path: source.path,
        imported_row: index + 1,
        ...item
      });
    });
  }

  return {
    imported_at: new Date().toISOString(),
    source_count: enabledSources.length,
    record_count: records.length,
    sources: enabledSources,
    records
  };
}

function normalizeRecord(item) {
  const slug = toText(item.slug) || slugify(item.name || `${item.country}-${item.city}`);
  const startDate = formatDate(item.start_date || item.startDate);
  const endDate = formatDate(item.end_date || item.endDate || item.start_date || item.startDate);
  const targetBuyers = toArray(item.target_buyers || item.targetBuyers);
  const sampleFields = toArray(item.sample_fields || item.sampleFields);

  return {
    slug,
    name: toText(item.name),
    start_date: startDate,
    end_date: endDate,
    city: toText(item.city),
    country: toText(item.country),
    industry: toText(item.industry),
    summary: toText(item.summary),
    target_buyers: targetBuyers,
    sample_fields: sampleFields,
    source_note:
      toText(item.source_note) ||
      `示例导入数据，来源于 ${toText(item.source_id || item.source_path, "人工整理")}。`,
    featured: toBoolean(item.featured)
  };
}

function validateDataset(dataset) {
  if (!Array.isArray(dataset)) {
    throw new Error("展会数据必须是数组。");
  }

  const slugs = new Set();

  dataset.forEach((item, index) => {
    requiredFields.forEach((field) => {
      if (!(field in item)) {
        throw new Error(`第 ${index + 1} 条记录缺少字段：${field}`);
      }
    });

    if (!item.slug) {
      throw new Error(`第 ${index + 1} 条记录缺少 slug。`);
    }

    if (slugs.has(item.slug)) {
      throw new Error(`存在重复 slug：${item.slug}`);
    }
    slugs.add(item.slug);

    if (!isValidDate(item.start_date) || !isValidDate(item.end_date)) {
      throw new Error(`记录 ${item.slug} 的日期格式不正确，应为 YYYY-MM-DD。`);
    }

    if (item.end_date < item.start_date) {
      throw new Error(`记录 ${item.slug} 的结束日期早于开始日期。`);
    }

    if (!Array.isArray(item.target_buyers) || item.target_buyers.length === 0) {
      throw new Error(`记录 ${item.slug} 的 target_buyers 必须为非空数组。`);
    }

    if (!Array.isArray(item.sample_fields) || item.sample_fields.length === 0) {
      throw new Error(`记录 ${item.slug} 的 sample_fields 必须为非空数组。`);
    }
  });
}

function normalizeDataset(rawPayload) {
  const records = Array.isArray(rawPayload.records) ? rawPayload.records : [];
  const normalized = records
    .map(normalizeRecord)
    .sort((left, right) => left.start_date.localeCompare(right.start_date));

  validateDataset(normalized);

  return {
    normalized_at: new Date().toISOString(),
    total: normalized.length,
    exhibitions: normalized
  };
}

function buildSiteDataset(cleanPayload) {
  const exhibitions = Array.isArray(cleanPayload.exhibitions)
    ? [...cleanPayload.exhibitions].sort((left, right) =>
        left.start_date.localeCompare(right.start_date)
      )
    : [];

  validateDataset(exhibitions);

  return {
    generated_at: new Date().toISOString(),
    total: exhibitions.length,
    featured_total: exhibitions.filter((item) => item.featured).length,
    exhibitions
  };
}

async function ensureDir(filePath) {
  await mkdir(path.dirname(filePath), { recursive: true });
}

async function writeJson(filePath, payload) {
  await ensureDir(filePath);
  await writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

module.exports = {
  cleanOutputFile,
  importSources,
  normalizeDataset,
  buildSiteDataset,
  rawOutputFile,
  siteOutputFile,
  writeJson,
  readJson,
  validateDataset
};
