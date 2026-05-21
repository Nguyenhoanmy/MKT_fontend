import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Khóa Học Của Tôi | MKT',
  description: 'Danh sách khóa học mà bạn đang học hoặc đã hoàn thành trên MKT',
};

export default function MyCoursesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
