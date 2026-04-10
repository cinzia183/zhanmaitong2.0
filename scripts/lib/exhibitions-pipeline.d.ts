type ExhibitionRecord = {
  slug: string;
  name: string;
  start_date: string;
  end_date: string;
  city: string;
  country: string;
  industry: string;
  summary: string;
  target_buyers: string[];
  sample_fields: string[];
  source_note: string;
  featured: boolean;
};

type RawImportPayload = {
  imported_at: string;
  source_count: number;
  record_count: number;
  sources: Array<Record<string, unknown>>;
  records: Array<Record<string, unknown>>;
};

type CleanPayload = {
  normalized_at: string;
  total: number;
  exhibitions: ExhibitionRecord[];
};

type SitePayload = {
  generated_at: string;
  total: number;
  featured_total: number;
  exhibitions: ExhibitionRecord[];
};

declare const pipeline: {
  cleanOutputFile: string;
  importSources: () => Promise<RawImportPayload>;
  normalizeDataset: (rawPayload: RawImportPayload) => CleanPayload;
  buildSiteDataset: (cleanPayload: CleanPayload) => SitePayload;
  rawOutputFile: string;
  siteOutputFile: string;
  writeJson: (filePath: string, payload: unknown) => Promise<void>;
  readJson: <T = unknown>(filePath: string) => Promise<T>;
  validateDataset: (dataset: ExhibitionRecord[]) => void;
};

export default pipeline;
