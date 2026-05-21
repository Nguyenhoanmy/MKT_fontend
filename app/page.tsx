'use client';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Play, Users, BookOpen, Award, TrendingUp, ChevronRight } from 'lucide-react';
import { courseService } from '@/services/course.service';
import CourseCard from '@/components/ui/CourseCard';
import SkeletonCard from '@/components/ui/SkeletonCard';
import RatingStars from '@/components/ui/RatingStars';
import { TESTIMONIALS } from '@/data/testimonials';

export default function HomePage() {
  const { data: featured, isLoading: loadingFeatured } = useQuery({
    queryKey: ['courses', 'featured'],
    queryFn: () => courseService.getFeatured(),
  });
  const { data: categories, isLoading: loadingCats } = useQuery({
    queryKey: ['categories'],
    queryFn: () => courseService.getCategories(),
  });

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__content">
            <div className="hero__badge">🚀 Nền tảng #1 Việt Nam</div>
            <h1 className="hero__title">
              Học kỹ năng mới,<br />
              <span>Chinh phục tương lai</span>
            </h1>
            <p className="hero__desc">
              Hơn 1.000 khóa học chuyên nghiệp từ các chuyên gia tại Google, Meta, Shopee.
              Học theo tốc độ của bạn, mọi lúc mọi nơi.
            </p>
            <div className="hero__actions">
              <Link href="/courses" className="btn btn--primary btn--lg">
                Khám phá khóa học <ArrowRight size={18} />
              </Link>
              <Link href="/courses/react-nextjs-tu-zero-den-hero" className="btn btn--outline btn--lg"
                style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.08)' }}>
                <Play size={18} /> Xem demo
              </Link>
            </div>
            <div className="hero__stats">
              {[
                { number: '50K+', label: 'Học viên' },
                { number: '1,000+', label: 'Khóa học' },
                { number: '200+', label: 'Giảng viên' },
                { number: '4.9★', label: 'Đánh giá TB' },
              ].map(s => (
                <div key={s.label} className="hero__stat">
                  <div className="hero__stat-number">{s.number}</div>
                  <div className="hero__stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Card */}
          <div className="hero__visual" style={{ position: 'relative' }}>
            <div className="hero__visual-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80"
                alt="Learning"
                className="hero__visual-img"
              />
            </div>
            <div className="hero__visual-badge hero__visual-badge--bottom-left">
              <Award size={16} color="#10B981" />
              <span>Chứng chỉ quốc tế</span>
            </div>
            <div className="hero__visual-badge hero__visual-badge--top-right">
              <TrendingUp size={16} color="#06B6D4" />
              <span>+80% lương sau khoá học</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED COURSES ── */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="section__header">
            <div className="section__title-group">
              <p style={{ color: '#4F46E5', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                🔥 Được yêu thích nhất
              </p>
              <h2 className="section-title">Khóa học nổi bật</h2>
              <p className="section-subtitle">Được hàng nghìn học viên đánh giá cao và tin tưởng lựa chọn</p>
            </div>
            <Link href="/courses" className="btn btn--outline btn--sm">
              Xem tất cả <ChevronRight size={16} />
            </Link>
          </div>

          <div className="featured-courses__grid">
            {loadingFeatured
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : featured?.map(course => <CourseCard key={course.id} course={course} />)
            }
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="section categories">
        <div className="container">
          <div className="section__header">
            <div>
              <h2 className="section-title">Khám phá theo danh mục</h2>
              <p className="section-subtitle">Tìm đúng lĩnh vực bạn muốn phát triển</p>
            </div>
            <Link href="/courses" className="btn btn--outline btn--sm">
              Tất cả danh mục <ChevronRight size={16} />
            </Link>
          </div>

          <div className="categories__grid">
            {loadingCats
              ? Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} style={{ height: 120, borderRadius: 16, background: '#e5e7eb', animation: 'skeleton-shimmer 1.5s infinite', backgroundSize: '200% 100%', backgroundImage: 'linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%)' }} />
                ))
              : categories?.map(cat => (
                  <Link key={cat.id} href={`/courses?cat=${cat.id}`} style={{ textDecoration: 'none' }}>
                    <div className="categories__item">
                      <div className="categories__item-icon" style={{ color: cat.color }}>{cat.icon}</div>
                      <div className="categories__item-name">{cat.name}</div>
                      <div className="categories__item-count">{cat.courseCount} khóa học</div>
                    </div>
                  </Link>
                ))
            }
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="section" style={{ background: 'linear-gradient(135deg,#EEF2FF 0%,#F0FDFF 100%)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: '#4F46E5', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
            Tại sao chọn MKT?
          </p>
          <h2 className="section-title" style={{ marginBottom: 8 }}>Cam kết chất lượng hàng đầu</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 56px' }}>
            Chúng tôi đồng hành cùng bạn trên hành trình phát triển sự nghiệp
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 }}>
            {[
              { icon: '🎯', title: 'Thực chiến 100%', desc: 'Mỗi bài học gắn liền với dự án thực tế, không lý thuyết suông. Bạn build được sản phẩm ngay sau khóa học.' },
              { icon: '👨‍🏫', title: 'Chuyên gia đầu ngành', desc: 'Giảng viên là engineers tại Google, Meta, Shopee — những người đang làm việc thực tế hàng ngày.' },
              { icon: '🏆', title: 'Chứng chỉ được công nhận', desc: 'Chứng chỉ được hàng trăm doanh nghiệp công nhận, tăng cơ hội việc làm đáng kể.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#fff', borderRadius: 20, padding: 32, border: '1px solid #E5E7EB', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: '#6B7280' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section testimonials">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ color: '#4F46E5', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
              💬 Học viên nói gì?
            </p>
            <h2 className="section-title">Câu chuyện thành công</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Hàng nghìn học viên đã thay đổi sự nghiệp nhờ MKT
            </p>
          </div>
          <div className="testimonials__grid">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="testimonials__card">
                <div className="testimonials__rating">
                  {Array.from({ length: t.rating }).map((_, i) => <span key={i} style={{ color: '#F59E0B', fontSize: 16 }}>★</span>)}
                </div>
                <p className="testimonials__quote">"{t.quote}"</p>
                <div className="testimonials__author">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.avatar} alt={t.name} className="testimonials__avatar" />
                  <div>
                    <div className="testimonials__name">{t.name}</div>
                    <div className="testimonials__role">{t.role} tại {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ background: 'linear-gradient(135deg,#4F46E5 0%,#7C3AED 100%)', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 16 }}>
            Sẵn sàng bắt đầu hành trình học tập?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 18, marginBottom: 40 }}>
            Tham gia cùng 50,000+ học viên đang học trên MKT. Hoàn toàn miễn phí để bắt đầu.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth/register" className="btn btn--lg"
              style={{ background: '#fff', color: '#4F46E5', fontWeight: 700 }}>
              Đăng ký miễn phí <ArrowRight size={18} />
            </Link>
            <Link href="/courses" className="btn btn--lg"
              style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '2px solid rgba(255,255,255,0.4)' }}>
              <BookOpen size={18} /> Xem khóa học
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
