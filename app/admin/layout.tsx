import Link from 'next/link';
import { Users } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="admin-sidebar__nav">
          <Link href="/admin/teachers" className="admin-sidebar__link admin-sidebar__link--active">
            <Users size={18} /> Quản lý Giáo viên
          </Link>
          {/* More admin menu items can be added here */}
        </nav>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
