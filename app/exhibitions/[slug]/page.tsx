import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import {
  formatDateRange,
  getExhibitionBySlug,
  getExhibitions
} from "@/lib/exhibitions";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getExhibitions().map((item) => ({
    slug: item.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exhibition = getExhibitionBySlug(slug);

  if (!exhibition) {
    return {
      title: "展会未找到"
    };
  }

  return {
    title: `${exhibition.name} 展会分析`,
    description: `${exhibition.name}，${exhibition.city}${exhibition.country}，适合${exhibition.industry}方向企业研究海外买家与渠道机会。`,
    alternates: {
      canonical: `/exhibitions/${exhibition.slug}`
    },
    openGraph: {
      title: `${exhibition.name} | ${siteConfig.name}`,
      description: exhibition.summary,
      url: `${siteConfig.url}/exhibitions/${exhibition.slug}`,
      type: "article"
    }
  };
}

export default async function ExhibitionDetailPage({ params }: Props) {
  const { slug } = await params;
  const exhibition = getExhibitionBySlug(slug);

  if (!exhibition) {
    notFound();
  }

  return (
    <div className="container-shell pb-20 pt-12 sm:pt-16">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="space-y-6">
          <Link
            href="/exhibitions"
            className="inline-flex text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            返回展会列表
          </Link>
          <div className="card-surface p-7 sm:p-8">
            <div className="flex flex-wrap gap-3">
              <span className="eyebrow">{exhibition.industry}</span>
              {exhibition.featured ? (
                <span className="rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold text-accent-700">
                  精选项目
                </span>
              ) : null}
            </div>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
              {exhibition.name}
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-600">
              {exhibition.summary}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-mist p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  举办时间
                </p>
                <p className="mt-2 text-lg font-semibold text-ink">
                  {formatDateRange(exhibition.start_date, exhibition.end_date)}
                </p>
              </div>
              <div className="rounded-3xl bg-mist p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  城市与国家
                </p>
                <p className="mt-2 text-lg font-semibold text-ink">
                  {exhibition.city}，{exhibition.country}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="card-surface p-6">
              <h2 className="text-xl font-semibold text-ink">目标买家方向</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                {exhibition.target_buyers.map((buyer) => (
                  <li key={buyer}>• {buyer}</li>
                ))}
              </ul>
            </div>
            <div className="card-surface p-6">
              <h2 className="text-xl font-semibold text-ink">样例名单字段</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                {exhibition.sample_fields.map((field) => (
                  <li key={field}>• {field}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card-surface p-6">
            <h2 className="text-xl font-semibold text-ink">适合怎样的团队研究</h2>
            <p className="mt-4 text-sm leading-8 text-slate-600">
              如果你的团队正在围绕 {exhibition.industry} 拓展海外客户，这类展会通常适合用于判断本地买家结构、进口渠道类型、重点参展品牌与合作伙伴分布。建议在参展前结合目标国家、产品定位和预算，先做买家角色与会前开发动作规划。
            </p>
          </div>

          <div className="card-surface p-6">
            <h2 className="text-xl font-semibold text-ink">数据说明</h2>
            <p className="mt-4 text-sm leading-8 text-slate-600">
              {exhibition.source_note}
              页面展示内容用于说明展会研究与客户开发服务的结构化方式，不构成任何未经授权的数据公开承诺。实际合作交付会以合规、定向和项目确认后的范围为准。
            </p>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="card-surface p-6">
            <h2 className="text-2xl font-semibold text-ink">申请样例名单方向</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              提交你的行业、目标国家和采购角色后，可进一步沟通适合的样例字段与开发策略。
            </p>
            <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
              <p>建议说明：</p>
              <p>你的产品线、希望拓展的区域、是否计划参展、当前最关心的买家类型。</p>
            </div>
          </div>
          <ContactForm
            compact
            defaultSubject={`咨询 ${exhibition.name} 相关客户开发机会`}
          />
        </aside>
      </div>
    </div>
  );
}
