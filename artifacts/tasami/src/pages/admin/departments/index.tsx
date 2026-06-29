import { AdminLayout } from "@/components/layout/AdminLayout";
import { useListDepartments, useCreateDepartment } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AdminDepartments() {
  const { data: departments, isLoading, refetch } = useListDepartments();
  const createDepartment = useCreateDepartment();
  const { toast } = useToast();
  
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createDepartment.mutate(
      { data: formData },
      {
        onSuccess: () => {
          toast({ title: "تم بنجاح", description: "تم إنشاء القسم الجديد." });
          setIsOpen(false);
          setFormData({ name: "", description: "" });
          refetch();
        }
      }
    );
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">إدارة الأقسام</h1>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2 rtl:ml-2" /> إضافة قسم
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة قسم جديد</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">اسم القسم</Label>
                <Input 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">الوصف</Label>
                <Textarea 
                  id="desc" 
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">إلغاء</Button>
                </DialogClose>
                <Button type="submit" disabled={createDepartment.isPending}>
                  {createDepartment.isPending ? "جاري الحفظ..." : "حفظ"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-40 w-full rounded-xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments?.map((dept) => (
            <Card key={dept.id} className="border-border hover:border-primary/30 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-primary">{dept.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[40px]">
                  {dept.description || "لا يوجد وصف"}
                </p>
                <div className="flex justify-between items-center text-sm border-t pt-3 mt-auto">
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-1 rtl:ml-1" />
                    <span>{dept.memberCount || 0} عضو</span>
                  </div>
                  {dept.headName && (
                    <div className="text-primary truncate max-w-[120px]" title={dept.headName}>
                      {dept.headName}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
