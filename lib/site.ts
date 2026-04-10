function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

function getSiteUrl() {
  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (explicitUrl) {
    return trimTrailingSlash(explicitUrl);
  }

  const vercelUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

  if (vercelUrl) {
    const normalized = vercelUrl.startsWith("http")
      ? vercelUrl
      : `https://${vercelUrl}`;

    return trimTrailingSlash(normalized);
  }

  return "http://localhost:3000";
}

export const siteConfig = {
  name: "展脉通",
  shortName: "展脉通",
  applicationName: "展脉通",
  description:
    "面向中国外贸与出海企业的全球展会客户开发平台，帮助团队研究展会、判断目标买家方向并发起咨询。",
  url: getSiteUrl(),
  formspreeEndpoint: process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim() ?? "",
  locale: "zh_CN"
};

export const navItems = [
  { href: "/", label: "首页" },
  { href: "/exhibitions", label: "展会库" },
  { href: "/contact", label: "联系顾问" }
];
