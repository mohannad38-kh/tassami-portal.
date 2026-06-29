import { Link } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Star, Users, Heart, Target, Lightbulb } from "lucide-react";
import logoUrl from "@assets/image_1782739252068.png";

export default function Home() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden" style={{background: 'linear-gradient(135deg, #f5f0e8 0%, #fff 50%, #f9f5ee 100%)'}}>
        <div className="container px-4 md:px-8 mx-auto">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <img src={logoUrl} alt="تسامي" className="w-64 h-64 md:w-96 md:h-96 object-contain drop-shadow-2xl" />
            </div>
            {/* Text */}
            <div className="flex-1 text-right">
              <h1 className="text-6xl md:text-8xl font-bold mb-4" style={{color: '#8B0000'}}>تسامي</h1>
              <h2 className="text-2xl md:text-3xl font-medium mb-6" style={{color: '#333'}}>نرتقي بالفكر، ونصنع الأثر</h2>
              <p className="text-lg mb-8 leading-relaxed max-w-xl" style={{color: '#555'}}>
                مبادرة شبابية طموحة تهدف إلى تمكين الشباب وتنمية قدراتهم من خلال التعلم والعمل التطوعي والابتكار لصناعة جيل واعٍ قادر على قيادة المستقبل وبناء المجتمع.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Button size="lg" className="font-bold text-lg px-8" style={{background: '#8B0000', color: 'white'}} asChild>
                  <Link href="/join">انضم إلينا</Link>
                </Button>
                <Button size="lg" variant="outline" className="font-bold text-lg px-8" style={{borderColor: '#D4AF37', color: '#8B0000'}} asChild>
                  <Link href="/about">تعرف على المبادرة</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {[
              { icon: Target, label: 'أثر مستدام', desc: 'نهدف إلى أثر حقيقي مستمر' },
              { icon: Heart, label: 'العمل التطوعي', desc: 'نعزز ثقافة العطاء' },
              { icon: Users, label: 'تمكين الشباب', desc: 'نطور مهارات الشباب' },
              { icon: Lightbulb, label: 'الابتكار', desc: 'نشجع التفكير الإبداعي' },
              { icon: Star, label: 'التميز', desc: 'نسعى للتميز دائماً' },
            ].map((val, i) => (
              <div key={i} className="p-5 rounded-2xl border hover:shadow-md transition-shadow" style={{borderColor: 'rgba(139,0,0,0.1)'}}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{background: 'rgba(139,0,0,0.08)'}}>
                  <val.icon className="w-6 h-6" style={{color: '#8B0000'}} />
                </div>
                <div className="font-bold mb-1" style={{color: '#8B0000'}}>{val.label}</div>
                <div className="text-gray-500 text-sm">{val.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12" style={{background: '#8B0000'}}>
        <div className="container px-4 md:px-8 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { number: '+١٢٠٠', label: 'متطوع مسجل' },
              { number: '+٥٠', label: 'فعالية منجزة' },
              { number: '+١٥٠٠٠', label: 'ساعة تطوعية' },
              { number: '+٢٥', label: 'شريك' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-bold mb-2" style={{color: '#D4AF37'}}>{stat.number}</div>
                <div className="opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20" style={{background: '#f9f5f0'}}>
        <div className="container px-4 md:px-8 mx-auto">
          <div className="flex items-center justify-between mb-10">
            <Button variant="outline" style={{borderColor: '#8B0000', color: '#8B0000'}} asChild>
              <Link href="/events">عرض الكل</Link>
            </Button>
            <h2 className="text-3xl font-bold" style={{color: '#8B0000'}}>الفعاليات القادمة</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'ورشة مهارات القيادة', date: '25 مايو', time: '10:00 صباحاً', place: 'قاعة الندوات' },
              { title: 'يوم التطوع البيئي', date: '1 يونيو', time: '8:00 صباحاً', place: 'الحديقة المركزية' },
              { title: 'ملتقى الشباب المبدع', date: '10 يونيو', time: '4:00 مساءً', place: 'مركز الابتكار' },
            ].map((event, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 p-4" style={{background: '#8B0000'}}>
                  <div className="text-3xl font-bold" style={{color: '#D4AF37'}}>{event.date.split(' ')[0]}</div>
                  <div className="text-white">{event.date.split(' ')[1]}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-3" style={{color: '#8B0000'}}>{event.title}</h3>
                  <div className="flex items-center gap-2 text-gray-500 mb-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 mb-4 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{event.place}</span>
                  </div>
                  <Button className="w-full font-bold" style={{background: '#D4AF37', color: '#1a0000'}} asChild>
                    <Link href="/events">عرض التفاصيل</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
