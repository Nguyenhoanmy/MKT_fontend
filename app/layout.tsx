import type { Metadata } from 'next';
import '@/styles/main.scss';
import Providers from '@/components/Providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: { default: 'MKT — Nền tảng học trực tuyến hàng đầu Việt Nam', template: '%s | MKT' },
  description: 'Học lập trình, thiết kế, data science và hơn 1000 khóa học chuyên nghiệp từ các chuyên gia hàng đầu. Bắt đầu miễn phí ngay hôm nay.',
  keywords: ['khóa học online', 'học lập trình', 'e-learning', 'react', 'nextjs', 'data science'],
  authors: [{ name: 'MKT' }],
  creator: 'MKT',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://mkt.vn',
    siteName: 'MKT',
    title: 'MKT — Nền tảng học trực tuyến hàng đầu Việt Nam',
    description: 'Học lập trình, thiết kế, data science và hơn 1000 khóa học từ các chuyên gia.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
