/* @identity เจ้าป่า */
import React from "react";
import dynamic from "next/dynamic";

/**
 * Registry Pattern: จัดการการลงทะเบียนและเข้าถึง Template ทั้งหมดในจุดเดียว
 * ใช้ dynamic imports เพื่อลดขนาด Bundle ตั้งต้น (Initial Bundle Size)
 */
export const TEMPLATE_REGISTRY: Record<
  string,
  React.ComponentType<{ view?: string[] }>
> = {
  kbt: dynamic(() => import("@/components/template/kbt")),
  boogim: dynamic(() => import("@/components/template/boogim")),
  "eu-airline": dynamic(() => import("@/components/template/lufthunsa")),
  "kr-hotel": dynamic(() => import("@/components/template/lotti-seoul")),
};

export class TemplateManager {
  static getTemplate(slug: string) {
    const template = TEMPLATE_REGISTRY[slug];
    if (!template) return null;
    return template;
  }

  static getAllSlugs() {
    return Object.keys(TEMPLATE_REGISTRY);
  }
}
