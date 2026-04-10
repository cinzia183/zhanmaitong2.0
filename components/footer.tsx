import Link from "next/link";
import { navItems, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200/80 bg-white/70">
      <div className="container-shell grid gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="text-xl font-semibold text-ink">{siteConfig.name}</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
            面向中国外贸与出海企业的全球展会客户开发平台，帮助团队更高效地研究展会、识别目标买家并发起咨询。
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            站点导航
          </p>
          <div className="mt-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-sm text-slate-600 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            业务说明
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            页面中的展会信息与字段结构用于帮助团队建立前期研究框架，正式交付范围会按行业、区域与项目目标进一步确认。
          </p>
        </div>
      </div>
    </footer>
  );
}
