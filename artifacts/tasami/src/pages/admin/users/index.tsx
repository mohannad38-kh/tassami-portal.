import { AdminLayout } from "@/components/layout/AdminLayout";
import { useListUsers } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function AdminUsers() {
  const { data: users, isLoading } = useListUsers();

  const getRoleLabel = (role: string) => {
    switch(role) {
      case 'super_admin': return 'مدير النظام';
      case 'president': return 'رئيس المبادرة';
      case 'vice_president': return 'نائب الرئيس';
      case 'secretary': return 'الأمين العام';
      case 'dept_head': return 'رئيس قسم';
      case 'member': return 'عضو';
      default: return 'زائر';
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">إدارة المستخدمين</h1>
          <p className="text-muted-foreground text-sm mt-1">إدارة حسابات مستخدمي النظام والصلاحيات</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2 rtl:ml-2" /> إضافة مستخدم
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-4">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : users?.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              لا يوجد مستخدمين مسجلين
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الاسم</TableHead>
                    <TableHead>البريد الإلكتروني</TableHead>
                    <TableHead>الصلاحية</TableHead>
                    <TableHead>تاريخ التسجيل</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="text-left"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users?.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell dir="ltr" className="text-right">{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{getRoleLabel(user.role)}</Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(user.createdAt), 'dd MMM yyyy', { locale: ar })}
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.isActive ? 'default' : 'destructive'}>
                          {user.isActive ? 'نشط' : 'غير نشط'}
                        </Badge>
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
