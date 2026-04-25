/* @identity เจ้าป่า */
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 text-center">
      <div className="mb-6 rounded-full bg-primary/10 p-6 text-primary">
        <FileQuestion size={64} />
      </div>
      <h1 className="mb-2 text-4xl font-black">404</h1>
      <h2 className="mb-4 text-2xl font-bold">ไม่พบหน้าที่คุณต้องการ</h2>
      <p className="text-muted-foreground mb-10 max-w-md">
        ขออภัยครับ หน้าที่คุณกำลังค้นหาอาจจะถูกย้าย หรือไม่มีอยู่จริงในระบบ
        กรุณาตรวจสอบ URL อีกครั้ง หรือกลับไปยังหน้าหลัก
      </p>
      <Link href="/">
        <Button variant="primary" size="lg">
          กลับสู่หน้าหลัก
        </Button>
      </Link>
    </div>
  );
}
