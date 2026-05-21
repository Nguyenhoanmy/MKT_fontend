import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hồ sơ cá nhân | MKT',
  description: 'Quản lý hồ sơ, theo dõi khóa học và thành tựu của bạn trên MKT',
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
