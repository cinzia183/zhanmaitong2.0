import Link from "next/link";
import type { Exhibition } from "@/lib/types";
import { formatDateRange } from "@/lib/exhibitions";

export function ExhibitionCard({ exhibition }: { exhibition: Exhibition }) {
  return (
    <article className="card-surface flex h-full flex-col p-6">
      <div className="flex flex-wrap gap-3">
        <span className="eyebrow">{exhibition.industry}</span>
        {exhibition.featured ? (
          <span className="rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold text-accent-700">
            精选
          </span>
        ) : null}
      </div>
      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-ink">
        {exhibition.name}
      </h3>
      <p className="mt-3 text-sm text-slate-500">
        {formatDateRange(exhibition.start_date, exhibition.end_date)} ·{" "}
        {exhibition.city}，{exhibition.country}
      </p>
      <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">
        {exhibition.summary}
      </p>
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="text-xs text-slate-500">
          目标买家：{exhibition.target_buyers.slice(0, 2).join(" / ")}
        </div>
        <Link
          href={`/exhibitions/${exhibition.slug}`}
          className="text-sm font-semibold text-brand-700 hover:text-brand-900"
        >
          查看详情
        </Link>
      </div>
    </article>
  );
}
