import { AdminLayout } from "@/components/layout/AdminLayout";
import { useListTasks } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function AdminTasks() {
  const { data: tasks, isLoading } = useListTasks();

  const getPriorityBadge = (priority: string | null | undefined) => {
    switch (priority) {
      case 'high': return <Badge variant="destructive">عالية</Badge>;
      case 'medium': return <Badge variant="default" className="bg-orange-500">متوسطة</Badge>;
      case 'low': return <Badge variant="secondary">منخفضة</Badge>;
      default: return <Badge variant="outline">عادية</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">المهام</h1>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2 rtl:ml-2" /> إضافة مهمة
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-4">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : tasks?.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              لا توجد مهام مسجلة
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المهمة</TableHead>
                    <TableHead>المسند إليه</TableHead>
                    <TableHead>تاريخ التسليم</TableHead>
                    <TableHead>الأولوية</TableHead>
                    <TableHead>نسبة الإنجاز</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="text-left"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks?.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium max-w-[200px] truncate">{task.title}</TableCell>
                      <TableCell>{task.assigneeName || "غير مسندة"}</TableCell>
                      <TableCell>
                        {task.dueDate ? format(new Date(task.dueDate), 'dd MMM yyyy', { locale: ar }) : "-"}
                      </TableCell>
                      <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-secondary/20 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: `${task.progress || 0}%` }}></div>
                          </div>
                          <span className="text-xs">{task.progress || 0}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{task.status}</Badge>
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
