import { AdminLayout } from "@/components/layout/AdminLayout";
import { useListEvents } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Users, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function AdminEvents() {
  const { data: events, isLoading } = useListEvents();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge variant="default" className="bg-secondary text-secondary-foreground">قادمة</Badge>;
      case "ongoing":
        return <Badge variant="default" className="bg-green-600">مستمرة</Badge>;
      case "completed":
        return <Badge variant="secondary">مكتملة</Badge>;
      case "cancelled":
        return <Badge variant="destructive">ملغاة</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">إدارة الفعاليات</h1>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2 rtl:ml-2" /> إضافة فعالية
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-4">
              {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : events?.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              لا توجد فعاليات مسجلة
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>عنوان الفعالية</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>المسجلين</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="text-left">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events?.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium max-w-[200px] truncate">{event.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <CalendarIcon className="h-3 w-3 mr-1 rtl:ml-1 text-muted-foreground" />
                          {format(new Date(event.eventDate), 'dd MMM yyyy', { locale: ar })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Users className="h-3 w-3 mr-1 rtl:ml-1 text-muted-foreground" />
                          {event.registeredCount || 0} {event.capacity ? `/ ${event.capacity}` : ''}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(event.status)}</TableCell>
                      <TableCell className="text-left">
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
