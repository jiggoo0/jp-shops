/* @identity เจ้าป่า */
import { BLOG_POSTS, TEMPLATES, SERVICES, FAQ_DATA } from "@/constants";
import { BlogPost, Template, Service, FAQ } from "@/types";
import { cacheLife, cacheTag } from "next/cache";

/**
 * ฟังก์ชันดึงข้อมูลคำถามพบบ่อย พร้อมระบบ Cache ของ Next.js 16
 */
export async function getFAQ(): Promise<FAQ[]> {
  "use cache";
  cacheLife("max");
  cacheTag("faq");

  try {
    return FAQ_DATA;
  } catch (error) {
    console.error("Error fetching FAQ:", error);
    return [];
  }
}

/**
 * ฟังก์ชันดึงข้อมูลบทความทั้งหมด พร้อมระบบ Cache ของ Next.js 16
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("blog-posts");

  try {
    return BLOG_POSTS;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

/**
 * ฟังก์ชันดึงข้อมูลบทความรายชิ้นตาม Slug
 */
export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(`blog-post-${slug}`);

  try {
    return BLOG_POSTS.find((post) => post.slug === slug) || null;
  } catch (error) {
    console.error(`Error fetching blog post by slug (${slug}):`, error);
    return null;
  }
}

/**
 * ฟังก์ชันดึงข้อมูลเทมเพลตทั้งหมด
 */
export async function getTemplates(): Promise<Template[]> {
  "use cache";
  cacheLife("max");
  cacheTag("templates");

  try {
    return TEMPLATES;
  } catch (error) {
    console.error("Error fetching templates:", error);
    return [];
  }
}

/**
 * ฟังก์ชันดึงข้อมูลเทมเพลตตาม Slug
 */
export async function getTemplateBySlug(
  slug: string
): Promise<Template | null> {
  "use cache";
  cacheLife("max");
  cacheTag(`template-${slug}`);

  try {
    return TEMPLATES.find((t) => t.slug === slug) || null;
  } catch (error) {
    console.error(`Error fetching template by slug (${slug}):`, error);
    return null;
  }
}

/**
 * ฟังก์ชันดึงข้อมูลบริการทั้งหมด
 */
export async function getServices(): Promise<Service[]> {
  "use cache";
  cacheLife("max");
  cacheTag("services");

  try {
    return SERVICES;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

/**
 * ฟังก์ชันดึงข้อมูลบริการตาม ID
 */
export async function getServiceById(id: string): Promise<Service | null> {
  "use cache";
  cacheLife("max");
  cacheTag(`service-${id}`);

  try {
    return SERVICES.find((s) => s.id === id) || null;
  } catch (error) {
    console.error(`Error fetching service by ID (${id}):`, error);
    return null;
  }
}
