export type Exhibition = {
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

export type ExhibitionsSiteData = {
  generated_at: string;
  total: number;
  featured_total: number;
  exhibitions: Exhibition[];
};
