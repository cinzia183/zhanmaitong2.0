import Link from "next/link";

const stats = [
  { value: "全球展会", label: "围绕行业与区域建立研究视角" },
  { value: "样例名单", label: "帮助团队先看字段，再谈投入" },
  { value: "顾问支持", label: "适合外贸、工厂与出海业务团队" }
];

export function HeroSection() {
  return (
    <section className="container-shell pt-10 sm:pt-16">
      <div className="relative overflow-hidden rounded-[40px] border border-white/70 bg-hero-grid px-6 py-10 shadow-panel sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.55),transparent_60%)] lg:block" />
        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <span className="eyebrow">全球展会客户开发平台</span>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              帮中国外贸团队更高效地找到值得投入的海外展会与潜在客户方向
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
              展脉通面向出口工厂、跨境品牌和海外业务团队，提供全球展会研究、目标买家方向判断、样例名单字段参考与顾问咨询入口，让会前开发更接近成交目标。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/exhibitions"
                className="rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-brand-700"
              >
                浏览展会库
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-brand-200 bg-white/70 px-6 py-3.5 text-sm font-semibold text-brand-700 hover:border-brand-400 hover:text-brand-900"
              >
                申请样例名单
              </Link>
            </div>
          </div>

          <div className="card-surface grid gap-4 p-5 sm:grid-cols-3 lg:grid-cols-1">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="rounded-[24px] border border-slate-100 bg-white p-5"
              >
                <p className="text-2xl font-semibold text-ink">{stat.value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
