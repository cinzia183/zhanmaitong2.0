"use client";

type FiltersProps = {
  industries: string[];
  countries: string[];
  selectedIndustry: string;
  selectedCountry: string;
  featuredOnly: boolean;
  onIndustryChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onFeaturedChange: (value: boolean) => void;
};

export function Filters({
  industries,
  countries,
  selectedIndustry,
  selectedCountry,
  featuredOnly,
  onIndustryChange,
  onCountryChange,
  onFeaturedChange
}: FiltersProps) {
  return (
    <div className="card-surface grid gap-4 p-5 md:grid-cols-[1fr_1fr_auto]">
      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          行业
        </span>
        <select
          className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-ink outline-none transition focus:border-brand-400"
          value={selectedIndustry}
          onChange={(event) => onIndustryChange(event.target.value)}
        >
          <option value="">全部行业</option>
          {industries.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          国家
        </span>
        <select
          className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-ink outline-none transition focus:border-brand-400"
          value={selectedCountry}
          onChange={(event) => onCountryChange(event.target.value)}
        >
          <option value="">全部国家</option>
          {countries.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 md:self-end">
        <input
          type="checkbox"
          checked={featuredOnly}
          onChange={(event) => onFeaturedChange(event.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
        />
        <span className="text-sm font-medium text-ink">只看精选</span>
      </label>
    </div>
  );
}
