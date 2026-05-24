'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import TeacherDashboard from '@/components/TeacherDashboard';
import { useSearchParams } from 'next/navigation';

export default function TeacherDashboardPage() {
  const { user, isAuthenticated, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const testMode = searchParams.get('test') === 'true';

  useEffect(() => {
    // Mock teacher user for testing
    if (testMode && !isAuthenticated) {
      setUser({
        id: '1',
        name: 'Nguyễn Văn A',
        email: 'teacher@example.com',
        role: 'instructor',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher1',
        enrolledCourses: [],
      });
    }
    setIsLoading(false);
  }, [testMode, isAuthenticated, setUser]);

  if (isLoading) {
    return (
      <div className="dashboard__skeleton">
        <div className="skeleton skeleton--large"></div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'instructor') {
    return (
      <div className="dashboard__error">
        <div className="error-container">
          <h1>❌ Access Denied</h1>
          <p>Chỉ giáo viên mới có thể truy cập trang này.</p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#999' }}>
            💡 Gợi ý: Thêm <code>?test=true</code> để xem trong chế độ demo
          </p>
        </div>
      </div>
    );
  }

  return <TeacherDashboard teacher={user} />;
}
