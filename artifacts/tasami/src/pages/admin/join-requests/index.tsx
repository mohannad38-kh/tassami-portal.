import { AdminLayout } from "@/components/layout/AdminLayout";
import { useListJoinRequests, useUpdateJoinRequest } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { Check, X } from "lucide-react";

export default function AdminJoinRequests() {
  const { data: requests, isLoading, refetch } = useListJoinRequests({ status: 'pending' });
  const updateRequest = useUpdateJoinRequest();
  const { toast } = useToast();

  const handleUpdateStatus = (id: number, status: string) => {
    updateRequest.mutate(
      { id, data: { status } },
      {
        onSuccess: () => {
          toast({
            title: status === 'approved' ? "تم قبول الطلب" : "تم رفض الطلب",
            description: "تم تحديث حالة طلب الانضمام بنجاح.",
          });
          refetch();
        }
      }
    );
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">طلبات الانضمام</h1>
        <p className="text-muted-foreground text-sm mt-1">مراجعة طلبات الانضمام الجديدة للمبادرة</p>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-4">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : requests?.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              لا توجد طلبات انضمام معلقة حالياً
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>تاريخ الطلب</TableHead>
                    <TableHead>الاسم</TableHead>
                    <TableHead>التواصل</TableHead>
                    <TableHead>الرسالة</TableHead>
                    <TableHead className="text-left">الإجراء</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests?.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="whitespace-nowrap">
                        {format(new Date(req.createdAt), 'dd MMM yyyy', { locale: ar })}
                      </TableCell>
                      <TableCell className="font-medium">{req.name}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div dir="ltr" className="text-right">{req.email}</div>
                          {req.phone && <div dir="ltr" className="text-right text-muted-foreground">{req.phone}</div>}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate" title={req.message || ""}>
                        {req.message || "-"}
                      </TableCell>
                      <TableCell className="text-left">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleUpdateStatus(req.id, 'approved')}
                            disabled={updateRequest.isPending}
                          >
                            <Check className="h-4 w-4 mr-1 rtl:ml-1" /> قبول
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleUpdateStatus(req.id, 'rejected')}
                            disabled={updateRequest.isPending}
                          >
                            <X className="h-4 w-4 mr-1 rtl:ml-1" /> رفض
                          </Button>
                        </div>
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
