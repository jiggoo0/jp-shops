/* @identity เจ้าป่า */
import Link from "next/link";
import { Facebook, MessageCircle, Mail, Phone, Twitter } from "lucide-react";
import { siteConfig } from "@/config/site";
import Copyright from "./Copyright";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-slate-50 py-16 dark:bg-zinc-900/50">
      <div className="container mx-auto min-h-[300px] px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">JP-VISUAL&DOCS</h3>
            <p className="text-muted-foreground text-sm">
              {siteConfig.description}
            </p>
            <div className="flex gap-4">
              <Link
                href={siteConfig.links.facebook}
                target="_blank"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href={siteConfig.links.line}
                target="_blank"
                className="text-muted-foreground hover:text-primary"
              >
                <MessageCircle size={20} />
              </Link>
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">บริการของเรา</h4>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link href="/#services" className="hover:text-primary">
                  เตรียมเอกสารสินเชื่อ
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-primary">
                  เตรียมเอกสารวีซ่า
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-primary">
                  จัดทำเอกสารทุกประเภท
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-primary">
                  ออกตั๋วและใบจอง
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-primary">
                  สร้างภาพลักษณ์บุคคล
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">ลิงก์ที่สำคัญ</h4>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary">
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-primary">
                  เว็บไซต์จำลอง
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary">
                  บทความและสาระ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary">
                  นโยบายความเป็นส่วนตัว
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary">
                  เงื่อนไขการใช้บริการ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">ติดต่อเรา</h4>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li className="font-medium text-slate-900">
                <Link href="/contact" className="hover:text-primary">
                  หน้าติดต่อเรา
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} /> {siteConfig.links.phone}
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> {siteConfig.links.email}
              </li>
              <li className="mt-4 border-t border-slate-200 pt-4">
                <span className="font-medium italic text-primary">
                  &quot;{siteConfig.author.name}&quot;
                </span>
                <p className="text-muted-foreground text-[10px]">
                  {siteConfig.author.role}
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-muted-foreground mt-12 border-t pt-8 text-center text-xs">
          <Copyright authorName={siteConfig.author.name} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
