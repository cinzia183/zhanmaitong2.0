import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";

export const metadata = {
  title: "联系顾问",
  description:
    "联系展脉通，提交样例名单申请、展会研究需求或海外客户开发咨询。",
  alternates: {
    canonical: "/contact"
  }
};

const contactItems = [
  {
    title: "适合提交的需求",
    lines: [
      "准备参加海外展会，想先判断投入优先级",
      "需要某个行业或国家的目标买家方向",
      "希望获取样例名单字段结构与咨询方案"
    ]
  },
  {
    title: "建议补充的信息",
    lines: [
      "主营产品与出口经验",
      "目标市场与期望买家角色",
      "内部团队是销售驱动、市场驱动还是联合推进"
    ]
  }
];

export default function ContactPage() {
  return (
    <div className="container-shell pb-20 pt-12 sm:pt-16">
      <SectionHeading
        eyebrow="联系展脉通"
        title="让海外展会研究更接近成交结果"
        description="不论你要找的是样例名单方向、行业顾问判断，还是展会优先级建议，都可以从这里提交需求。"
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="space-y-6">
          {contactItems.map((item) => (
            <div key={item.title} className="card-surface p-6">
              <h2 className="text-xl font-semibold text-ink">{item.title}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                {item.lines.map((line) => (
                  <li key={line}>• {line}</li>
                ))}
              </ul>
            </div>
          ))}
          <div className="rounded-[32px] border border-brand-200 bg-brand-50 p-6 text-sm leading-7 text-brand-900">
            表单支持通过 Formspree 接入业务收件流程。上线前请配置正式 endpoint，并根据实际业务补充隐私与数据使用说明。
          </div>
        </section>
        <ContactForm />
      </div>
    </div>
  );
}
