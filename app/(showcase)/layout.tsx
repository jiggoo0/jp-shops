/* @identity เจ้าป่า */
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Floating Exit Preview Button */}
      <div className="fixed bottom-6 right-6 z-[9999] opacity-20 transition-opacity hover:opacity-100">
        <Link href="/templates">
          <Button variant="secondary" className="gap-2 shadow-2xl">
            <ArrowLeft size={18} /> ออกจากการดูตัวอย่าง
          </Button>
        </Link>
      </div>

      <main>{children}</main>
    </div>
  );
}
