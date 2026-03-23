import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/blog",
    "/login",
    "/register",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Blog posts from MDX
  const blogDir = path.join(process.cwd(), "content/blog");
  let blogRoutes: MetadataRoute.Sitemap = [];

  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir);
    blogRoutes = files.map((file) => {
      const slug = file.replace(".mdx", "");
      return {
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      };
    });
  }

  return [...staticRoutes, ...blogRoutes];
}
