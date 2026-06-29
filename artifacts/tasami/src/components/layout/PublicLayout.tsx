import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import logoUrl from "@assets/image_1782739252068.png";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

export function PublicLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, user, logout } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 max-w-screen-2xl items-center px-4 md:px-8 mx-auto">
          <Link href="/" className="mr-8 flex items-center space-x-2 space-x-reverse">
            <img src={logoUrl} alt="تسامي" className="h-12 object-contain" />
          </Link>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-6 space-x-reverse text-sm font-medium">
              <Link href="/" className="transition-colors hover:text-primary text-foreground">الرئيسية</Link>
              <Link href="/about" className="transition-colors hover:text-primary text-foreground">من نحن</Link>
              <Link href="/initiative" className="transition-colors hover:text-primary text-foreground">المبادرة</Link>
              <Link href="/departments" className="transition-colors hover:text-primary text-foreground">الأقسام</Link>
              <Link href="/events" className="transition-colors hover:text-primary text-foreground">الفعاليات</Link>
              <Link href="/news" className="transition-colors hover:text-primary text-foreground">الأخبار</Link>
              <Link href="/contact" className="transition-colors hover:text-primary text-foreground">تواصل معنا</Link>
            </nav>
            <div className="flex items-center space-x-4 space-x-reverse mr-auto">
              {!isAuthenticated ? (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/login">تسجيل الدخول</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/join">انضم إلينا</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => {
                    const isAdmin = ["super_admin", "president", "vice_president", "secretary", "dept_head"].includes(user?.role || "");
                    setLocation(isAdmin ? "/admin" : "/portal");
                  }}>
                    لوحة التحكم
                  </Button>
                  <Button variant="outline" onClick={logout}>تسجيل خروج</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t bg-muted/40 py-12">
        <div className="container px-4 md:px-8 mx-auto max-w-screen-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <img src={logoUrl} alt="تسامي" className="h-16 object-contain" />
              <p className="text-sm text-muted-foreground max-w-xs">
                مبادرة تسامي التطوعية تهدف إلى تمكين الشباب وتعزيز العمل التطوعي المنظم والفعال.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">روابط سريعة</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-muted-foreground hover:text-primary">من نحن</Link></li>
                <li><Link href="/board" className="text-muted-foreground hover:text-primary">مجلس الإدارة</Link></li>
                <li><Link href="/gallery" className="text-muted-foreground hover:text-primary">معرض الصور</Link></li>
                <li><Link href="/partners" className="text-muted-foreground hover:text-primary">شركاء النجاح</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">تواصل معنا</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>البريد: info@tasami.org</li>
                <li>الهاتف: +966 50 000 0000</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>جميع الحقوق محفوظة لمبادرة تسامي © {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
