import Link from "next/link";
import { LayoutDashboard, FileText, Link2, Mail, LogOut } from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/artikel", label: "Artikel", icon: FileText },
  { href: "/admin/affiliate", label: "Affiliate", icon: Link2 },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-ink-50">
      <div className="container grid gap-8 py-8 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-1 lg:sticky lg:top-20 lg:h-fit">
          <p className="px-3 pb-3 text-xs font-bold uppercase tracking-wider text-ink-500">
            Admin Panel
          </p>
          {navItems.map((it) => {
            const Icon = it.icon;
            return (
              <Link
                key={it.href}
                href={it.href}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-white hover:text-ink-900"
              >
                <Icon className="h-4 w-4" />
                {it.label}
              </Link>
            );
          })}
          <Link
            href="/api/admin/logout"
            className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
