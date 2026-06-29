import { PublicLayout } from "@/components/layout/PublicLayout";

export default function Initiative() {
  return (
    <PublicLayout>
      <div className="container py-12 px-4 md:px-8 mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8 border-b pb-4">التعريف بالمبادرة</h1>
        <div className="space-y-8 text-muted-foreground leading-relaxed text-lg max-w-4xl">
          <p>
            تأسست مبادرة "تسامي" التطوعية لتكون منارة للعمل التطوعي المؤسسي المنظم. نؤمن بأن الشباب هم المحرك الأساسي لنهضة المجتمعات، ومن هنا جاءت فكرة تسامي لتوفير بيئة تحتضن طاقاتهم وتوجهها نحو مبادرات مجتمعية ذات أثر مستدام.
          </p>
          <p>
            بدأت المبادرة بجهود مجموعة من الشباب الشغوفين بالعمل التطوعي، وسرعان ما تطورت لتصبح مظلة رسمية تضم مئات المتطوعين في مختلف المجالات، بدءاً من تنظيم الفعاليات والمؤتمرات، وصولاً إلى المبادرات التقنية والاجتماعية والثقافية.
          </p>
          <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">أهدافنا الاستراتيجية</h2>
          <ul className="list-disc list-inside space-y-2 pr-6">
            <li>بناء قدرات الشباب وتطوير مهاراتهم الشخصية والمهنية.</li>
            <li>تنظيم العمل التطوعي وتحويله من جهود فردية إلى عمل مؤسسي مستدام.</li>
            <li>نشر ثقافة التطوع وتعزيز قيم التكافل الاجتماعي.</li>
            <li>توفير فرص تطوعية نوعية تتناسب مع تخصصات واهتمامات المتطوعين.</li>
          </ul>
        </div>
      </div>
    </PublicLayout>
  );
}
