// app/components/ClientLayout.tsx
'use client';

import { usePathname } from "next/navigation";
import SideNav from "@/components/SideNav";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const excludedRoutes = ["/login", "/register"];
  const isExcluded = excludedRoutes.includes(pathname);

  return isExcluded ? (
    <>{children}</>
  ) : (
    <div className="flex">
      <SideNav />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
