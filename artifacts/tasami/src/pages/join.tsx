import { useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useSubmitJoinRequest } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Join() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const submitRequest = useSubmitJoinRequest();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitRequest.mutate(
      { data: formData },
      {
        onSuccess: () => {
          toast({
            title: "تم إرسال طلبك بنجاح",
            description: "سنتواصل معك قريباً، شكراً لاهتمامك بالانضمام لتسامي.",
          });
          setFormData({ name: "", email: "", phone: "", message: "" });
        },
        onError: () => {
          toast({
            title: "حدث خطأ",
            description: "لم نتمكن من إرسال طلبك. يرجى المحاولة لاحقاً.",
            variant: "destructive",
          });
        }
      }
    );
  };

  return (
    <PublicLayout>
      <div className="container py-16 px-4 md:px-8 mx-auto max-w-2xl">
        <Card className="border-primary/10 shadow-lg">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-primary mb-2">نموذج الانضمام</CardTitle>
            <CardDescription className="text-lg">
              انضم إلى نخبة المتطوعين في مبادرة تسامي وكن جزءاً من التغيير الإيجابي.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">الاسم الثلاثي</Label>
                <Input 
                  id="name" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@domain.com"
                    dir="ltr"
                    className="text-left"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الجوال (اختياري)</Label>
                  <Input 
                    id="phone" 
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="05xxxxxxxx"
                    dir="ltr"
                    className="text-left"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">لماذا ترغب بالانضمام إلينا؟ (اختياري)</Label>
                <Textarea 
                  id="message" 
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="حدثنا عن مهاراتك واهتماماتك التطوعية..."
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full text-lg h-12" 
                disabled={submitRequest.isPending}
              >
                {submitRequest.isPending ? "جاري الإرسال..." : "إرسال طلب الانضمام"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PublicLayout>
  );
}
