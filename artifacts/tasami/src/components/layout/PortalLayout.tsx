import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import logoUrl from "@assets/image_1782739252068.png";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  User, 
  Award, 
  Clock, 
  LogOut,
  Menu
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function PortalLayout({ children }: { children: ReactNode }) {
  const { user, logout, isAuthenticated } = useAuth();
  const [location, setLocation] = useLocation();

  if (!isAuthenticated) {
    setLocation("/login");
    return null;
  }

  const navItems = [
    { href: "/portal", label: "لوحة التحكم", icon: LayoutDashboard },
    { href: "/portal/profile", label: "ملفي الشخصي", icon: User },
    { href: "/portal/certificates", label: "شهاداتي", icon: Award },
    { href: "/portal/volunteer-hours", label: "ساعات التطوع", icon: Clock },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
      <div className="p-6 border-b border-sidebar-border/50 flex justify-center">
        <Link href="/">
          <img src={logoUrl} alt="تسامي" className="h-12 object-contain brightness-0 invert" />
        </Link>
      </div>
      <div className="p-4 border-b border-sidebar-border/50">
        <p className="font-medium truncate">{user?.name}</p>
        <p className="text-sm text-sidebar-foreground/70 truncate">{user?.departmentName || "عضو"}</p>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-md transition-colors cursor-pointer ${
                isActive 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                  : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80 hover:text-sidebar-foreground"
              }`}>
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-sidebar-border/50">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground"
          onClick={() => {
            logout();
            setLocation("/login");
          }}
        >
          <LogOut className="h-5 w-5 ml-2 rtl:ml-2 rtl:mr-0" />
          تسجيل خروج
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col md:flex-row font-sans" dir="rtl">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 right-0 z-50">
        <SidebarContent />
      </aside>

      {/* Mobile Header & Content */}
      <div className="flex-1 md:mr-64 flex flex-col min-h-screen">
        <header className="h-16 bg-background border-b flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
          <div className="flex items-center md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0 w-64 border-l-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <span className="font-bold text-primary mr-2">بوابة العضو</span>
          </div>
          
          <div className="hidden md:flex items-center font-medium text-lg">
            {navItems.find(item => item.href === location)?.label || "بوابة العضو"}
          </div>

          <div className="flex items-center">
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link href="/">العودة للموقع</Link>
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
