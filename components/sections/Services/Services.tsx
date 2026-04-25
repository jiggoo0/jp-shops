/* @identity เจ้าป่า */
import { SERVICES } from "@/constants";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import Link from "next/link";

const Services = () => {
  return (
    <section id="services" className="bg-slate-50 py-24 dark:bg-zinc-900/30">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            บริการระดับมืออาชีพ
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            เรามุ่งเน้นการแก้ปัญหาและสร้างโอกาสให้คุณผ่านการจัดการเอกสารที่มีประสิทธิภาพ
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <Link
              href={`/services/${service.id}`}
              key={service.id}
              className="group block"
            >
              <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl">
                <CardContent className="pt-8">
                  <div className="mb-6 inline-block rounded-xl bg-primary/5 p-4 transition-colors group-hover:bg-primary/10">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold transition-colors group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
                <CardFooter className="flex items-center justify-between text-sm font-medium">
                  <span className="text-primary">{service.price}</span>
                  <span className="text-muted-foreground italic">
                    {service.duration}
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
