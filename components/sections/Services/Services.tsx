/* @identity เจ้าป่า */
import { getServices } from "@/lib/data";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import Link from "next/link";
import Image from "next/image";
import { IconRenderer } from "@/components/ui/IconRenderer";

const Services = async () => {
  const services = await getServices();

  return (
    <section id="services" className="bg-slate-50 py-24 dark:bg-zinc-900/30">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            บริการระดับมืออาชีพ
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            เรามุ่งเน้นการแก้ปัญหาและสร้างโอกาสให้คุณผ่านการจัดการเอกสารที่มีประสิทธิภาพ
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              href={`/services/${service.id}`}
              key={service.id}
              className="group block"
            >
              <Card className="h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl">
                {service.image && (
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                )}
                <CardContent className="pt-8">
                  <div className="mb-6 inline-block rounded-xl bg-primary/5 p-4 transition-colors group-hover:bg-primary/10">
                    <IconRenderer
                      name={service.icon}
                      className="h-8 w-8 text-primary"
                    />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-primary dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {service.description}
                  </p>
                </CardContent>
                <CardFooter className="flex items-center justify-between text-sm font-medium">
                  <span className="text-primary">{service.price}</span>
                  <span className="italic text-slate-500 dark:text-slate-400">
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
