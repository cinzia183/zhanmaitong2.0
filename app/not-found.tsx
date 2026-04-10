import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="eyebrow">404</span>
      <h1 className="mt-6 text-4xl font-semibold text-ink">页面不存在</h1>
      <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
        你访问的页面可能已被移动，或者这个展会条目还没有创建。可以先回到首页或展会列表继续浏览。
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          返回首页
        </Link>
        <Link
          href="/exhibitions"
          className="rounded-full border border-brand-200 px-5 py-3 text-sm font-semibold text-brand-700 hover:border-brand-400 hover:text-brand-900"
        >
          浏览展会
        </Link>
      </div>
    </div>
  );
}
