import { PublicLayout } from "@/components/layout/PublicLayout";
import { useListDepartments } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, LayoutGrid } from "lucide-react";

export default function Departments() {
  const { data: departments, isLoading } = useListDepartments();

  return (
    <PublicLayout>
      <div className="container py-12 px-4 md:px-8 mx-auto">
        <div className="flex items-center gap-3 mb-8 border-b pb-4">
          <LayoutGrid className="h-8 w-8 text-secondary" />
          <h1 className="text-3xl font-bold text-primary">الأقسام</h1>
        </div>
        <p className="text-muted-foreground mb-8">تعرف على الهيكل التنظيمي لمبادرة تسامي والأقسام الفاعلة فيها.</p>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-20" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments?.map((dept) => (
              <Card key={dept.id} className="hover:shadow-md transition-shadow border-primary/10">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{dept.name}</CardTitle>
                  <CardDescription className="text-base mt-2 line-clamp-3">
                    {dept.description || "لا يوجد وصف متاح لهذا القسم حالياً."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-2 rtl:ml-2 text-secondary" />
                    <span>{dept.memberCount || 0} عضو مسجل</span>
                  </div>
                  {dept.headName && (
                    <div className="mt-3 text-sm border-t pt-3">
                      <span className="text-muted-foreground">رئيس القسم:</span> <span className="font-medium text-foreground">{dept.headName}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
