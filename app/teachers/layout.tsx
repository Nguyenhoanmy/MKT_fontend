import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đội ngũ Giáo viên | MKT',
  description: 'Tìm hiểu về các giáo viên chuyên gia của MKT từ Google, Meta, Shopee và các công ty hàng đầu khác',
};

export default function TeachersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
