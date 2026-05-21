import type { Metadata } from 'next';
import TeacherManagementAdmin from '@/components/TeacherManagementAdmin';

export const metadata: Metadata = {
  title: 'Quản lý Giáo viên | MKT',
};

export default function TeacherManagementPage() {
  return <TeacherManagementAdmin />;
}
