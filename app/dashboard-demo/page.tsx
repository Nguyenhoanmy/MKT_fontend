'use client';

import TeacherDashboard from '@/components/TeacherDashboard';

export default function DashboardDemo() {
  const mockTeacher = {
    id: '1',
    name: 'Nguyễn Văn A',
    email: 'teacher@example.com',
    role: 'instructor' as const,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher1',
    enrolledCourses: [],
  };

  return <TeacherDashboard teacher={mockTeacher} />;
}
