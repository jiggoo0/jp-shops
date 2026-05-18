/* @identity เจ้าป่า */
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gqndoxevdznbcogqfmvu.supabase.co",
      },
      {
        protocol: "https",
        hostname: "www.transparenttextures.com",
      },
      {
        protocol: "https",
        hostname: "qr-official.line.me",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.unlink-th.com",
      },
      {
        protocol: "https",
        hostname: "registry.un-link-th.com",
      },
      {
        protocol: "https",
        hostname: "api.qrserver.com",
      },
    ],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
