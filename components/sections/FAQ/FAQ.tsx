/* @identity เจ้าป่า */
import { getFAQ } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/Card";

const FAQSection = async () => {
  const faqData = await getFAQ();

  return (
    <section id="faq" className="bg-slate-50 py-24 dark:bg-zinc-900/30">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center text-3xl font-bold">
          คำถามที่พบบ่อย (FAQ)
        </h2>
        <div className="mx-auto max-w-3xl space-y-4">
          {faqData.map((item, i) => (
            <Card
              key={i}
              className="border-none shadow-sm transition-shadow hover:shadow-md"
            >
              <CardContent className="p-6">
                <h3 className="mb-3 flex gap-2 text-lg font-bold">
                  <span className="text-primary">Q:</span> {item.q}
                </h3>
                <p className="flex gap-2 text-muted-foreground">
                  <span className="font-bold text-secondary">A:</span> {item.a}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
