'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import TeacherDashboard from '@/components/TeacherDashboard';

export default function TeacherDashboardPage() {
  const { user, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

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
        </div>
      </div>
    );
  }

  return <TeacherDashboard teacher={user} />;
}
