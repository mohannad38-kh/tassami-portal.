import { PortalLayout } from "@/components/layout/PortalLayout";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useGetVolunteerSummary, useListEvents, useListTasks, getListTasksQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Calendar, CheckSquare, Award } from "lucide-react";

export default function PortalIndex() {
  const { user } = useAuth();

  const { data: summaries, isLoading: isLoadingSummary } = useGetVolunteerSummary();

  const { data: events, isLoading: isLoadingEvents } = useListEvents({ status: "upcoming" });

  const { data: tasks, isLoading: isLoadingTasks } = useListTasks(
    { assignedTo: user?.id, status: "pending" },
    { query: { enabled: !!user?.id, queryKey: getListTasksQueryKey({ assignedTo: user?.id, status: "pending" }) } }
  );

  const totalHours = summaries?.reduce((sum, s) => sum + (s.totalHours || 0), 0) ?? 0;
  const totalEvents = summaries?.reduce((sum, s) => sum + (s.eventCount || 0), 0) ?? 0;

  return (
    <PortalLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary mb-2">أهلاً بك، {user?.name}</h1>
        <p className="text-muted-foreground">تابع إنجازاتك ومهامك التطوعية من هنا.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">إجمالي ساعات التطوع</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            {isLoadingSummary ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-3xl font-bold">{totalHours}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">الفعاليات المشارك بها</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            {isLoadingSummary ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-3xl font-bold">{totalEvents}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">المهام قيد التنفيذ</CardTitle>
            <CheckSquare className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            {isLoadingTasks ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-3xl font-bold">{tasks?.length || 0}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">الشهادات</CardTitle>
            <Award className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-muted-foreground">-</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>الفعاليات القادمة</CardTitle>
            <CardDescription>أبرز الفعاليات المتاحة للتسجيل قريباً</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingEvents ? (
              <div className="space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : events?.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">لا توجد فعاليات قادمة حالياً.</p>
            ) : (
              <div className="space-y-4">
                {events?.slice(0, 3).map((event) => (
                  <div key={event.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">تاريخ: {new Date(event.eventDate).toLocaleDateString('ar-SA')}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>المهام المطلوبة</CardTitle>
            <CardDescription>المهام المسندة إليك لإنجازها</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingTasks ? (
              <div className="space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : tasks?.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">ليس لديك مهام قيد التنفيذ.</p>
            ) : (
              <div className="space-y-4">
                {tasks?.map((task) => (
                  <div key={task.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        تاريخ التسليم: {task.dueDate ? new Date(task.dueDate).toLocaleDateString('ar-SA') : 'غير محدد'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
