'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Search, BookOpen, Menu, X, Bell, ChevronDown, LogOut, User, LayoutDashboard, GraduationCap } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { courseService } from '@/services/course.service';
import type { Course } from '@/data/courses';

const NAV_LINKS = [
  { label: 'Khóa học', href: '/courses' },
  { label: 'Danh mục', href: '/courses#categories' },
  { label: 'Giới thiệu', href: '/about' },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  const [scrolled, setScrolled]           = useState(false);
  const [menuOpen, setMenuOpen]           = useState(false);
  const [userDropdown, setUserDropdown]   = useState(false);
  const [searchQuery, setSearchQuery]     = useState('');
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [searchOpen, setSearchOpen]       = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef   = useRef<HTMLDivElement>(null);

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setUserDropdown(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Live search
  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return; }
    const timer = setTimeout(async () => {
      const results = await courseService.search(searchQuery);
      setSearchResults(results.slice(0, 5));
      setSearchOpen(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleLogout = () => {
    logout();
    setUserDropdown(false);
    router.push('/');
  };

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="header__inner">
        {/* Logo */}
        <Link href="/" className="header__logo">
          <div className="header__logo-icon">E</div>
          <span className="header__logo-text">Edu<span>Verse</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="header__nav">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`header__nav-link${pathname === link.href ? ' header__nav-link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="header__search" ref={searchRef}>
          <Search className="header__search-icon" size={16} />
          <input
            className="header__search-input"
            placeholder="Tìm khóa học, giảng viên..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => searchResults.length > 0 && setSearchOpen(true)}
          />
          {searchOpen && searchResults.length > 0 && (
            <div className="header__search-dropdown">
              {searchResults.map(course => (
                <div
                  key={course.id}
                  className="header__search-item"
                  onClick={() => {
                    router.push(`/courses/${course.slug}`);
                    setSearchQuery('');
                    setSearchOpen(false);
                  }}
                >
                  <BookOpen size={14} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{course.title}</div>
                    <div style={{ fontSize: 11, color: '#6B7280' }}>{course.instructor.name}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="header__actions">
          {isAuthenticated && user ? (
            <>
              <button className="btn btn--ghost btn--icon" title="Thông báo" aria-label="Thông báo">
                <Bell size={18} />
              </button>
              <div ref={dropdownRef} className="header__user-menu">
                <button
                  className="header__user-menu-trigger"
                  onClick={() => setUserDropdown(v => !v)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={user.avatar} alt={user.name} className="header__user-menu-avatar" />
                  <span className="header__user-menu-name">{user.name.split(' ').slice(-1)[0]}</span>
                  <ChevronDown size={14} style={{ color: '#6B7280', transition: 'transform 0.2s', transform: userDropdown ? 'rotate(180deg)' : 'none' }} />
                </button>

                {userDropdown && (
                  <div className="header__user-menu-dropdown">
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #E5E7EB' }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{user.name}</div>
                      <div style={{ fontSize: 12, color: '#6B7280' }}>{user.email}</div>
                    </div>
                    <Link href="/profile" className="header__user-menu-item" onClick={() => setUserDropdown(false)}>
                      <User size={15} /> Hồ sơ cá nhân
                    </Link>
                    <Link href="/my-courses" className="header__user-menu-item" onClick={() => setUserDropdown(false)}>
                      <GraduationCap size={15} /> Khóa học của tôi
                    </Link>
                    {user.role === 'instructor' && (
                      <Link href="/dashboard" className="header__user-menu-item" onClick={() => setUserDropdown(false)}>
                        <LayoutDashboard size={15} /> Dashboard
                      </Link>
                    )}
                    <div className="header__user-menu-divider" />
                    <button className="header__user-menu-item header__user-menu-item--danger" onClick={handleLogout}>
                      <LogOut size={15} /> Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="btn btn--ghost btn--sm">Đăng nhập</Link>
              <Link href="/auth/register" className="btn btn--primary btn--sm">Đăng ký miễn phí</Link>
            </>
          )}

          {/* Hamburger */}
          <button
            className={`header__hamburger${menuOpen ? ' header__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            <span className="header__hamburger-line" />
            <span className="header__hamburger-line" />
            <span className="header__hamburger-line" />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="header__mobile-nav">
          <div className="header__mobile-nav-search">
            <input placeholder="Tìm khóa học..." />
          </div>
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="header__mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {isAuthenticated ? (
              <button className="btn btn--outline" onClick={handleLogout}>Đăng xuất</button>
            ) : (
              <>
                <Link href="/auth/login" className="btn btn--outline" onClick={() => setMenuOpen(false)}>Đăng nhập</Link>
                <Link href="/auth/register" className="btn btn--primary" onClick={() => setMenuOpen(false)}>Đăng ký miễn phí</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
