import { useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock successful submission since there's no specific API for general contact
    setTimeout(() => {
      toast({
        title: "تم إرسال رسالتك بنجاح",
        description: "شكراً لتواصلك معنا، سنقوم بالرد عليك في أقرب وقت ممكن.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <PublicLayout>
      <div className="container py-12 px-4 md:px-8 mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8 border-b pb-4">تواصل معنا</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <Card className="bg-primary text-primary-foreground border-none">
              <CardContent className="p-6 space-y-6">
                <h3 className="text-xl font-bold mb-4 border-b border-primary-foreground/20 pb-2">معلومات التواصل</h3>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 rtl:ml-3 shrink-0 text-secondary" />
                  <div>
                    <p className="font-medium">العنوان</p>
                    <p className="text-sm opacity-90">الرياض، المملكة العربية السعودية</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 rtl:ml-3 shrink-0 text-secondary" />
                  <div>
                    <p className="font-medium">رقم الهاتف</p>
                    <p className="text-sm opacity-90" dir="ltr">+966 50 000 0000</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 rtl:ml-3 shrink-0 text-secondary" />
                  <div>
                    <p className="font-medium">البريد الإلكتروني</p>
                    <p className="text-sm opacity-90" dir="ltr">info@tasami.org</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 rtl:ml-3 shrink-0 text-secondary" />
                  <div>
                    <p className="font-medium">ساعات العمل</p>
                    <p className="text-sm opacity-90">الأحد - الخميس: 9 ص - 5 م</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-primary">أرسل رسالة</CardTitle>
                <CardDescription>
                  يسعدنا استقبال استفساراتكم واقتراحاتكم من خلال النموذج التالي
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم</Label>
                      <Input 
                        id="name" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        required 
                        dir="ltr"
                        className="text-left"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">الموضوع</Label>
                    <Input 
                      id="subject" 
                      required 
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">الرسالة</Label>
                    <Textarea 
                      id="message" 
                      rows={5} 
                        required 
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? "جاري الإرسال..." : "إرسال الرسالة"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
