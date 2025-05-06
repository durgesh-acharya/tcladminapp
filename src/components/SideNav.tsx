'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";


const navItems = [
  { name: "Locations", href: "/locations" },
  { name: "Durations", href: "/durations" },
  { name: "Stay Category", href: "/staycategories" },
  // { name: "Routes", href: "/destinationroutes" },
  { name: "Location wise Durations", href: "/locationdurations" },
  { name: "Package", href: "/packages" },
  { name: "Activity", href: "/locations" },
  { name: "Blogs", href: "/blogs" },
  { name: "Inquiry", href: "/locations" },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-6 hidden md:block">
      <h2 className="text-xl font-bold mb-6">Travelers Clan</h2>
      <nav className="space-y-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`block px-4 py-2 rounded hover:bg-gray-700 ${
              pathname === item.href ? "bg-gray-700" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
