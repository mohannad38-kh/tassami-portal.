import { Link } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <PublicLayout>
      <section className="relative py-24 md:py-32 overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary to-primary/80"></div>
        <div className="container relative z-10 px-4 md:px-8 mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            مبادرة <span className="text-secondary">تسامي</span> التطوعية
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto opacity-90 leading-relaxed">
            نسمو بالعمل التطوعي لنصنع أثراً مستداماً ومجتمعاً متكافلاً.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="font-bold text-lg" asChild>
              <Link href="/join">انضم كمطوع</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10 text-lg" asChild>
              <Link href="/about">اكتشف المزيد</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-background rounded-2xl shadow-sm border border-border/50">
              <div className="text-4xl font-bold text-primary mb-2">١,٢٠٠+</div>
              <div className="text-muted-foreground font-medium">متطوع مسجل</div>
            </div>
            <div className="p-6 bg-background rounded-2xl shadow-sm border border-border/50">
              <div className="text-4xl font-bold text-secondary mb-2">٤٥+</div>
              <div className="text-muted-foreground font-medium">فعالية منجزة</div>
            </div>
            <div className="p-6 bg-background rounded-2xl shadow-sm border border-border/50">
              <div className="text-4xl font-bold text-primary mb-2">١٥,٠٠٠+</div>
              <div className="text-muted-foreground font-medium">ساعة تطوعية</div>
            </div>
            <div className="p-6 bg-background rounded-2xl shadow-sm border border-border/50">
              <div className="text-4xl font-bold text-secondary mb-2">٩</div>
              <div className="text-muted-foreground font-medium">أقسام متخصصة</div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
