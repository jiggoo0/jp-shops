import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  Calendar,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { redirect } from "next/navigation";

interface PartnerDocumentsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function PartnerDocumentsPage({
  searchParams,
}: PartnerDocumentsPageProps) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1"));
  const pageSize = 12;
  const from = (currentPage - 1) * pageSize;
  const to = from + pageSize - 1;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const {
    data: documents,
    error,
    count,
  } = await supabase
    .from("documents")
    .select("id, status, owner_name, document_type, issued_date, expiry_date", {
      count: "exact",
    })
    .eq("partner_id", user.id)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching documents:", error);
  }

  const totalPages = count ? Math.ceil(count / pageSize) : 0;
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/partner/dashboard"
          className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-gray-900 mb-2">
              My Documents
            </h1>
            <p className="text-gray-600 font-medium text-sm italic">
              รายการเอกสาร Vifily ที่คุณสร้างขึ้นในระบบ ({count || 0} รายการ)
            </p>
          </div>
          <Link href="/partner/generator">
            <button className="mt-6 md:mt-0 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-green-600 transition-all shadow-xl shadow-gray-200">
              สร้างเอกสารเพิ่ม
            </button>
          </Link>
        </div>

        {!documents || documents.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center border border-gray-100 shadow-sm">
            <FileText className="w-16 h-16 text-gray-100 mx-auto mb-6" />
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
              ยังไม่มีเอกสารในระบบ
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group"
                >
                  <div className="p-10">
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900 group-hover:bg-green-600 group-hover:text-white transition-all">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest bg-green-50 text-green-600 px-3 py-1.5 rounded-full">
                        {doc.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">
                      {doc.owner_name}
                    </h3>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-8">
                      {doc.document_type}
                    </p>

                    <div className="space-y-4 mb-10">
                      <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-500">
                        <Calendar className="w-3.5 h-3.5 mr-2" />
                        Issued: {new Date(doc.issued_date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-500">
                        <Calendar className="w-3.5 h-3.5 mr-2" />
                        Expiry: {new Date(doc.expiry_date).toLocaleDateString()}
                      </div>
                    </div>

                    <Link
                      href={`/verify/doc/${doc.id}`}
                      className="flex items-center justify-between w-full py-4 px-6 bg-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-900 hover:bg-gray-900 hover:text-white transition-all"
                    >
                      <span>View Verification</span>
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-3">
                {hasPrevPage && (
                  <Link
                    href={`/partner/documents?page=${currentPage - 1}`}
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-white text-gray-500 border border-gray-100 hover:border-gray-900 hover:text-gray-900 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Link>
                )}

                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Link
                      key={pageNum}
                      href={`/partner/documents?page=${pageNum}`}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs transition-all ${currentPage === pageNum ? "bg-gray-900 text-white shadow-lg" : "bg-white text-gray-500 border border-gray-100 hover:border-gray-900 hover:text-gray-900"}`}
                    >
                      {pageNum}
                    </Link>
                  );
                })}

                {totalPages > 5 && currentPage <= totalPages && (
                  <span className="text-gray-300 font-black">...</span>
                )}

                {hasNextPage && (
                  <Link
                    href={`/partner/documents?page=${currentPage + 1}`}
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-white text-gray-500 border border-gray-100 hover:border-gray-900 hover:text-gray-900 transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
