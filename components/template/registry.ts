/* @identity เจ้าป่า */
import dynamic from "next/dynamic";
import React from "react";

export const TemplateRegistry: Record<
  string,
  React.ComponentType<{ view?: string[] }>
> = {
  kbt: dynamic(() => import("@/components/template/kbt")),
  boogim: dynamic(() => import("@/components/template/boogim")),
  "eu-airline": dynamic(() => import("@/components/template/lufthunsa")),
  "kr-hotel": dynamic(() => import("@/components/template/lotti-seoul")),
};
