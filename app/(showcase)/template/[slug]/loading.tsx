/* @identity เจ้าป่า */
export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      <p className="mt-6 animate-pulse text-lg font-bold italic text-primary">
        "เจ้าป่า" กำลังเตรียมข้อมูลให้คุณ...
      </p>
    </div>
  );
}
