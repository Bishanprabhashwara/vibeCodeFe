"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '@/components/ui/icons';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Icons.dashboard },
  { name: 'Courses', href: '/courses', icon: Icons.courses },
  { name: 'Users', href: '/users', icon: Icons.users },
  { name: 'Settings', href: '/settings', icon: Icons.settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="text-xl font-bold text-primary">LLM Pro</h1>
      </div>
      
      <nav className="sidebar-content">
        <div className="sidebar-nav">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </div>
        
        <div className="mt-auto pt-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title text-sm">Quick Stats</div>
            </div>
            <div className="card-content">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Courses</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Users</span>
                  <span className="font-medium">1,247</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
