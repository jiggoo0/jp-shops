/* @identity เจ้าป่า */
import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { SERVICES, TEMPLATES, BLOG_POSTS } from "@/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Main Pages
  const mainPages = [
    "",
    "/about",
    "/contact",
    "/blog",
    "/templates",
    "/privacy",
    "/terms",
    "/services",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Services Pages
  const servicesPages = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Template Pages
  const templatePages = TEMPLATES.map((tpl) => ({
    url: `${baseUrl}/template/${tpl.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Blog Pages
  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...mainPages, ...servicesPages, ...templatePages, ...blogPages];
}
