"use client";

import { useMemo, useState } from "react";
import type { Exhibition } from "@/lib/types";
import { ExhibitionCard } from "@/components/exhibition-card";
import { Filters } from "@/components/filters";

export function ExhibitionsExplorer({
  exhibitions
}: {
  exhibitions: Exhibition[];
}) {
  const [industry, setIndustry] = useState("");
  const [country, setCountry] = useState("");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const industries = useMemo(
    () => Array.from(new Set(exhibitions.map((item) => item.industry))),
    [exhibitions]
  );

  const countries = useMemo(
    () => Array.from(new Set(exhibitions.map((item) => item.country))),
    [exhibitions]
  );

  const filtered = useMemo(() => {
    return exhibitions.filter((item) => {
      if (industry && item.industry !== industry) {
        return false;
      }
      if (country && item.country !== country) {
        return false;
      }
      if (featuredOnly && !item.featured) {
        return false;
      }
      return true;
    });
  }, [country, exhibitions, featuredOnly, industry]);

  return (
    <div className="space-y-8">
      <Filters
        industries={industries}
        countries={countries}
        selectedIndustry={industry}
        selectedCountry={country}
        featuredOnly={featuredOnly}
        onIndustryChange={setIndustry}
        onCountryChange={setCountry}
        onFeaturedChange={setFeaturedOnly}
      />
      <div className="flex items-center justify-between text-sm text-slate-600">
        <p>共找到 {filtered.length} 个展会方向</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <ExhibitionCard key={item.slug} exhibition={item} />
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="card-surface p-8 text-center text-sm leading-7 text-slate-600">
          当前筛选条件下暂无结果。可以取消行业或国家限制后重新查看。
        </div>
      ) : null}
    </div>
  );
}
