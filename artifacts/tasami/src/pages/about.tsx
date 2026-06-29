import { PublicLayout } from "@/components/layout/PublicLayout";

export default function About() {
  return (
    <PublicLayout>
      <div className="container py-12 px-4 md:px-8 mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8 border-b pb-4">من نحن</h1>
        
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-secondary mb-3">الرؤية</h2>
              <p className="text-muted-foreground leading-relaxed">
                أن نكون النموذج الرائد في العمل التطوعي المؤسسي الذي يساهم في بناء مجتمع حيوي ومتكافل، محققاً تنمية مستدامة وأثراً يبقى.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-secondary mb-3">الرسالة</h2>
              <p className="text-muted-foreground leading-relaxed">
                تمكين الطاقات الشابة وتوجيه شغفهم نحو مبادرات تطوعية مبتكرة، من خلال بيئة محفزة ومنظمة تعزز من قدراتهم وتلبي احتياجات المجتمع.
              </p>
            </div>
          </div>
          
          <div className="bg-muted/30 p-8 rounded-2xl border border-border/50">
            <h2 className="text-2xl font-semibold text-primary mb-4">قيمنا</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center ml-3 shrink-0 mt-0.5">✓</div>
                <div>
                  <h3 className="font-medium">الإخلاص</h3>
                  <p className="text-sm text-muted-foreground">العمل بصدق وتفانٍ لخدمة المجتمع.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center ml-3 shrink-0 mt-0.5">✓</div>
                <div>
                  <h3 className="font-medium">المبادرة</h3>
                  <p className="text-sm text-muted-foreground">السبق إلى تقديم الحلول والبرامج النافعة.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center ml-3 shrink-0 mt-0.5">✓</div>
                <div>
                  <h3 className="font-medium">العمل المؤسسي</h3>
                  <p className="text-sm text-muted-foreground">الالتزام بالمعايير المهنية في التخطيط والتنفيذ.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center ml-3 shrink-0 mt-0.5">✓</div>
                <div>
                  <h3 className="font-medium">الاستدامة</h3>
                  <p className="text-sm text-muted-foreground">بناء مبادرات ذات أثر طويل الأمد.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
