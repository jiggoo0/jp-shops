/* @identity เจ้าป่า */
"use client";

import { Button } from "@/components/ui/Button";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 text-center">
      <div className="mb-6 rounded-full bg-red-100 p-6 text-red-600">
        <AlertCircle size={64} />
      </div>
      <h1 className="mb-2 text-3xl font-black text-slate-900">
        เกิดข้อผิดพลาดรุนแรง
      </h1>
      <p className="text-muted-foreground mb-10 max-w-md">
        ขออภัยครับ ระบบพบปัญหาทางเทคนิคที่ไม่คาดคิด ทีมงาน "เจ้าป่า"
        กำลังเร่งตรวจสอบ กรุณาลองรีเฟรชหน้าเว็บอีกครั้ง
      </p>
      <Button
        onClick={() => reset()}
        variant="primary"
        size="lg"
        className="gap-2"
      >
        <RefreshCcw size={20} /> รีเฟรชระบบ
      </Button>
    </div>
  );
}
