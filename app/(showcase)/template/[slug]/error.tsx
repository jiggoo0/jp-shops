/* @identity เจ้าป่า */
"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function TemplateError({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 text-center">
      <div className="mb-6 rounded-full bg-red-50 p-6 text-red-600">
        <AlertTriangle size={64} />
      </div>
      <h1 className="mb-4 text-3xl font-black">
        ขออภัย เกิดข้อผิดพลาดบางอย่าง
      </h1>
      <p className="text-muted-foreground mb-10 max-w-md leading-relaxed">
        ระบบไม่สามารถโหลดหน้าเว็บไซต์ที่คุณต้องการได้ในขณะนี้
        กรุณาลองใหม่อีกครั้ง หรือกลับสู่หน้าหลัก
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="primary">
          ลองใหม่อีกครั้ง
        </Button>
        <Link href="/">
          <Button variant="outline">กลับสู่หน้าหลัก</Button>
        </Link>
      </div>
    </div>
  );
}
