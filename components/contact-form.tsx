"use client";

import { siteConfig } from "@/lib/site";
import type { FormEvent } from "react";

type ContactFormProps = {
  compact?: boolean;
  defaultSubject?: string;
};

export function ContactForm({
  compact = false,
  defaultSubject = "咨询展会客户开发方案"
}: ContactFormProps) {
  const formAction = siteConfig.formspreeEndpoint || undefined;
  const isConfigured = Boolean(formAction);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!isConfigured) {
      event.preventDefault();
    }
  }

  return (
    <form
      action={formAction}
      method="POST"
      onSubmit={handleSubmit}
      className="card-surface space-y-5 p-6 sm:p-8"
    >
      <div>
        <p className="text-2xl font-semibold text-ink">
          {compact ? "提交需求" : "提交你的业务需求"}
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          你可以通过这张表单提交展会研究需求、目标买家方向咨询或项目沟通请求。
        </p>
      </div>

      {!isConfigured ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
          当前站点尚未启用在线表单提交。上线前请配置
          `NEXT_PUBLIC_FORMSPREE_ENDPOINT`。
        </div>
      ) : null}

      <input type="hidden" name="_subject" value={defaultSubject} />

      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <label className="block">
          <span className="text-sm font-medium text-ink">姓名</span>
          <input
            required
            name="name"
            type="text"
            className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-ink outline-none transition focus:border-brand-400"
            placeholder="请输入联系人姓名"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">公司名称</span>
          <input
            required
            name="company"
            type="text"
            className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-ink outline-none transition focus:border-brand-400"
            placeholder="请输入公司名称"
          />
        </label>
      </div>

      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <label className="block">
          <span className="text-sm font-medium text-ink">邮箱</span>
          <input
            required
            name="email"
            type="email"
            className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-ink outline-none transition focus:border-brand-400"
            placeholder="you@company.com"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">主营行业</span>
          <input
            name="industry"
            type="text"
            className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-ink outline-none transition focus:border-brand-400"
            placeholder="例如：工业零部件 / 美妆个护"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-ink">需求类型</span>
        <select
          name="request_type"
          className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-ink outline-none transition focus:border-brand-400"
          defaultValue="样例名单申请"
        >
          <option>样例名单申请</option>
          <option>展会研究咨询</option>
          <option>目标买家方向咨询</option>
          <option>定制合作沟通</option>
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium text-ink">详细需求</span>
        <textarea
          required
          name="message"
          rows={compact ? 5 : 6}
          className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-ink outline-none transition focus:border-brand-400"
          placeholder="请说明你的产品、目标国家、计划参加的展会，以及希望接触的客户类型。"
        />
      </label>

      <button
        type="submit"
        disabled={!isConfigured}
        className={`w-full rounded-full px-6 py-3.5 text-sm font-semibold text-white ${
          isConfigured
            ? "bg-brand-600 hover:bg-brand-700"
            : "cursor-not-allowed bg-slate-400"
        }`}
      >
        {isConfigured ? "提交咨询" : "表单待启用"}
      </button>
    </form>
  );
}
