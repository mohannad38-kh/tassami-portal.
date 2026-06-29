import { AdminLayout } from "@/components/layout/AdminLayout";
import { useListMeetings } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function AdminMeetings() {
  const { data: meetings, isLoading } = useListMeetings();

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">الاجتماعات</h1>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2 rtl:ml-2" /> إضافة اجتماع
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-4">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : meetings?.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              لا توجد اجتماعات مسجلة
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>عنوان الاجتماع</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>المكان</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="text-left"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {meetings?.map((meeting) => (
                    <TableRow key={meeting.id}>
                      <TableCell className="font-medium max-w-[200px] truncate">{meeting.title}</TableCell>
                      <TableCell>
                        {format(new Date(meeting.meetingDate), 'dd MMM yyyy', { locale: ar })}
                      </TableCell>
                      <TableCell>{meeting.location || "-"}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{meeting.status}</Badge>
                      </TableCell>
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
