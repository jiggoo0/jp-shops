/* @identity เจ้าป่า */
import Link from "next/link";
import { TEMPLATES } from "@/constants";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema } from "@/lib/schema";

export default function TemplatesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "หน้าแรก", url: siteConfig.url },
    { name: "ระบบเว็บไซต์จำลอง", url: `${siteConfig.url}/templates` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="bg-slate-50 py-24 dark:bg-zinc-900/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            ระบบเว็บไซต์จำลอง (Templates)
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            เลือกชมตัวอย่างระบบที่เราพัฒนาเพื่อรองรับความต้องการด้านเอกสารและการสร้างภาพลักษณ์ระดับสากล
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {TEMPLATES.map((tpl) => (
              <div
                key={tpl.slug}
                className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="mb-6 rounded-2xl bg-slate-50 p-5 transition-colors group-hover:bg-primary/5 dark:bg-zinc-900">
                  <tpl.icon className="h-12 w-12 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                  {tpl.name}
                </h3>
                <p className="mb-8 flex-grow text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {tpl.description}
                </p>
                <Link
                  href={`/template/${tpl.slug}`}
                  className="w-full rounded-xl bg-primary py-3.5 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/40"
                >
                  เข้าชมระบบ
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
