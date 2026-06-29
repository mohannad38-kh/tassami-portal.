import { PortalLayout } from "@/components/layout/PortalLayout";
import { useListCertificates } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Award, Download, Eye } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Link } from "wouter";

export default function PortalCertificates() {
  const { data: certificates, isLoading } = useListCertificates();

  return (
    <PortalLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">شهاداتي</h1>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      ) : certificates?.length === 0 ? (
        <div className="text-center py-20 bg-muted/30 rounded-2xl border border-dashed">
          <Award className="mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-xl font-medium text-foreground">لا توجد شهادات بعد</h3>
          <p className="text-muted-foreground mt-2">ستظهر شهادات مشاركتك في الفعاليات والورش هنا.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates?.map((cert) => (
            <Card key={cert.id} className="overflow-hidden border-primary/10 hover:shadow-md transition-all group">
              <div className="h-3 bg-gradient-to-r from-primary to-secondary"></div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary mb-2">
                    <Award className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {cert.type === 'event' ? 'مشاركة فعالية' : 'حضور ورشة'}
                  </Badge>
                </div>
                <CardTitle className="text-lg line-clamp-2">
                  {cert.eventTitle || cert.workshopTitle}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  تاريخ الإصدار: {format(new Date(cert.issuedAt), 'dd MMMM yyyy', { locale: ar })}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href={`/certificate/verify/${cert.verifyCode}`}>
                      <Eye className="h-4 w-4 ml-2" />
                      عرض
                    </Link>
                  </Button>
                  <Button className="flex-1">
                    <Download className="h-4 w-4 ml-2" />
                    تحميل
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </PortalLayout>
  );
}

// Temporary inline Badge since it might not be imported if I forgot
import { Badge } from "@/components/ui/badge";
