/* @identity เจ้าป่า */
import React from "react";
import { TemplateManager } from "./TemplateManager";

interface TemplateFactoryProps {
  slug: string;
  view?: string[];
}

/**
 * Factory Pattern: แยกตรรกะการสร้าง (Instantiation) ออกจากจุดที่เรียกใช้งาน
 * ทำให้ง่ายต่อการจัดการ Error หรือการทำ Fallback
 */
export const TemplateFactory: React.FC<TemplateFactoryProps> = ({
  slug,
  view,
}) => {
  const ActiveTemplate = React.useMemo(
    () => TemplateManager.getTemplate(slug),
    [slug]
  );

  if (!ActiveTemplate) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 text-center">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-slate-800">
            ไม่พบเทมเพลต
          </h1>
          <p className="text-slate-600">
            รหัสเทมเพลต "{slug}" ไม่ถูกต้องหรือยังไม่เปิดใช้งาน
          </p>
        </div>
      </div>
    );
  }

  return React.createElement(ActiveTemplate, { view });
};
