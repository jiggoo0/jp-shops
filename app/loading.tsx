/* @identity เจ้าป่า */
export default function GlobalLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      <p className="mt-4 animate-pulse font-bold italic text-primary">
        "เจ้าป่า" กำลังเชื่อมต่อ...
      </p>
    </div>
  );
}
