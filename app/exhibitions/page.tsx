import { ExhibitionsExplorer } from "@/components/exhibitions-explorer";
import { SectionHeading } from "@/components/section-heading";
import { getExhibitions } from "@/lib/exhibitions";

export const metadata = {
  title: "全球展会库",
  description:
    "浏览展脉通整理的全球展会样例库，按行业、国家和是否精选筛选适合中国外贸团队研究的项目。",
  alternates: {
    canonical: "/exhibitions"
  }
};

export default function ExhibitionsPage() {
  const exhibitions = getExhibitions();

  return (
    <div className="container-shell pb-20 pt-12 sm:pt-16">
      <SectionHeading
        eyebrow="展会库"
        title="围绕获客价值筛选全球展会"
        description="按行业、国家和精选状态查看展会方向，帮助销售、市场与海外业务团队更快锁定优先跟进项目。"
      />
      <div className="mt-10">
        <ExhibitionsExplorer exhibitions={exhibitions} />
      </div>
    </div>
  );
}
