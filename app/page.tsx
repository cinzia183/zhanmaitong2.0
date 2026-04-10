import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { ExhibitionCard } from "@/components/exhibition-card";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { getFeaturedExhibitions, getIndustryBuckets } from "@/lib/exhibitions";

export const metadata = {
  title: "全球展会客户开发平台",
  description:
    "展脉通为中国外贸企业、工厂和海外业务团队提供全球展会洞察、客户字段参考和高意向线索开发入口。",
  alternates: {
    canonical: "/"
  }
};

const valuePoints = [
  {
    title: "看展会，不只看热度",
    description:
      "围绕行业、区域和采购角色筛选值得投入的海外展会，帮助团队把差旅预算用在更高确定性的市场上。"
  },
  {
    title: "先看客户画像，再决定参展",
    description:
      "每个展会页都提供样例名单字段与目标买家方向，帮助销售和市场团队更快判断是否值得跟进。"
  },
  {
    title: "名单申请与顾问咨询并行",
    description:
      "既可以申请样例名单方向，也可以直接预约顾问沟通，适合初次进入海外市场或准备扩大渠道的团队。"
  }
];

const faqItems = [
  {
    question: "展脉通适合哪些企业？",
    answer:
      "适合外贸工厂、跨境品牌、国际业务部、区域渠道团队，以及需要通过展会触达海外买家的 B2B 企业。"
  },
  {
    question: "网站上的名单是公开下载的吗？",
    answer:
      "不是。当前页面展示的是研究框架与字段结构参考，实际合作会根据行业、区域和合规要求进行定向交付。"
  },
  {
    question: "如果我还没确定要参加哪个展会怎么办？",
    answer:
      "可以先提交咨询需求，我们会根据你的产品、目标国家和渠道类型，建议优先研究的展会与客户方向。"
  },
  {
    question: "后续能接入企业自己的 CRM 吗？",
    answer:
      "可以。当前版本以静态数据为主，后续可以扩展到 Supabase、CRM 或自建销售系统。"
  }
];

export default function HomePage() {
  const featured = getFeaturedExhibitions();
  const industries = getIndustryBuckets();

  return (
    <div className="pb-20">
      <HeroSection />

      <section className="container-shell mt-8">
        <div className="grid gap-5 md:grid-cols-3">
          {valuePoints.map((item) => (
            <div key={item.title} className="card-surface p-6">
              <h2 className="text-xl font-semibold text-ink">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell mt-24">
        <SectionHeading
          eyebrow="精选展会"
          title="适合中国出海团队优先研究的热门项目"
          description="以下精选展会覆盖工业制造、美妆个护、家具家居、电子消费和食品配料等常见外贸赛道。"
          action={
            <Link
              href="/exhibitions"
              className="rounded-full border border-brand-200 px-5 py-3 text-sm font-semibold text-brand-700 hover:border-brand-400 hover:text-brand-900"
            >
              查看全部展会
            </Link>
          }
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featured.map((exhibition) => (
            <ExhibitionCard key={exhibition.slug} exhibition={exhibition} />
          ))}
        </div>
      </section>

      <section className="container-shell mt-24">
        <SectionHeading
          eyebrow="行业方向"
          title="围绕真实出口场景组织展会研究"
          description="不是简单按展会名称堆列表，而是按照中国企业更关心的出海品类与采购场景组织信息。"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {industries.map((industry) => (
            <div key={industry.label} className="card-surface p-6">
              <p className="text-sm font-semibold text-brand-700">
                {industry.label}
              </p>
              <p className="mt-3 text-4xl font-semibold text-ink">
                {industry.count}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                适合围绕 {industry.label} 的产品出口、渠道拓展与重点客户拜访计划开展前期研究。
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell mt-24">
        <div className="grid gap-8 rounded-[36px] bg-ink px-6 py-10 text-white sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="eyebrow border-white/15 bg-white/10 text-white">
              数据说明
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              用业务安全的方式说明数据来源与服务边界
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              本站展示的展会信息、目标买家方向与样例字段用于帮助企业建立海外展会开发思路。页面不承诺任何未经授权的原始主办方数据下载，正式合作会基于公开信息研究、人工整理、客户需求确认与合规流程进行交付。
            </p>
          </div>
          <div className="card-surface bg-white/10 p-6 text-sm leading-7 text-slate-100">
            <p className="font-semibold text-white">适合的使用方式</p>
            <ul className="mt-4 space-y-3">
              <li>参展前评估哪些展会更值得投入预算</li>
              <li>围绕目标国家与采购角色规划会前开发动作</li>
              <li>为销售团队准备样例字段、客户画像与沟通口径</li>
              <li>与顾问沟通更适合自己的名单定向需求</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container-shell mt-24">
        <SectionHeading
          eyebrow="常见问题"
          title="外贸团队最常问的几个问题"
          description="如果你的需求更偏行业深耕、区域拓展或会前名单准备，可以直接从联系页提交细化需求。"
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {faqItems.map((item) => (
            <div key={item.question} className="card-surface p-6">
              <h3 className="text-lg font-semibold text-ink">{item.question}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell mt-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <SectionHeading
              eyebrow="立即咨询"
              title="申请样例名单方向或预约顾问沟通"
              description="适用于正在评估展会、准备参展、会前开发客户，或想建立一套可持续海外获客流程的团队。"
            />
            <div className="mt-8 space-y-4 text-sm leading-7 text-slate-600">
              <p>提交后可用于：</p>
              <p>样例字段参考、目标买家角色确认、重点国家建议、展会优先级排序。</p>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
