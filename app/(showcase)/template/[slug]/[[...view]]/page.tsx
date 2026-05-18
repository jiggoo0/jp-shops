/* @identity เจ้าป่า */
import { notFound } from "next/navigation";
import { TemplateManager } from "@/components/template/core/TemplateManager";
import { TemplateFactory } from "@/components/template/core/TemplateFactory";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema } from "@/lib/schema";
import { getTemplateBySlug, getTemplates } from "@/lib/data";

interface ShowcasePageProps {
  params: Promise<{
    slug: string;
    view?: string[];
  }>;
}

export async function generateStaticParams() {
  const templates = await getTemplates();
  // ดึง Slugs ทั้งหมดจาก Registry
  return templates.map((t) => ({
    slug: t.slug,
    view: [],
  }));
}

export async function generateMetadata({
  params,
}: ShowcasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);

  if (!template) return {};

  return {
    title: `${template.name} - ระบบจำลองอัจฉริยะ`,
    description: template.description,
    openGraph: {
      title: `${template.name} | ${siteConfig.name}`,
      description: template.description,
    },
  };
}

export default async function ShowcaseTemplatePage({
  params,
}: ShowcasePageProps) {
  const { slug, view } = await params;
  const template = await getTemplateBySlug(slug);

  // ตรวจสอบความถูกต้องเบื้องต้น
  if (!TemplateManager.getTemplate(slug) || !template) {
    notFound();
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "หน้าแรก", url: siteConfig.url },
    { name: "ระบบเว็บไซต์จำลอง", url: `${siteConfig.url}/templates` },
    { name: template.name, url: `${siteConfig.url}/template/${slug}` },
  ]);

  // ใช้ Factory ในการสร้างหน้าเทมเพลต
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <TemplateFactory slug={slug} view={view} />
    </>
  );
}
