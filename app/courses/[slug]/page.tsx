'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Clock, Users, BookOpen, Globe, Star, ChevronDown, ChevronRight, Play, Lock, CheckCircle, Award, BarChart2 } from 'lucide-react';
import { courseService } from '@/services/course.service';
import { useAuthStore } from '@/store/authStore';
import RatingStars from '@/components/ui/RatingStars';

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { isAuthenticated } = useAuthStore();
  const [openSections, setOpenSections] = useState<string[]>(['s1']);

  const { data: course, isLoading } = useQuery({
    queryKey: ['course', slug],
    queryFn: () => courseService.getBySlug(slug),
  });

  const toggleSection = (id: string) =>
    setOpenSections(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="spinner" />
    </div>
  );

  if (!course) return (
    <div style={{ textAlign: 'center', padding: '120px 20px' }}>
      <div style={{ fontSize: 64 }}>😕</div>
      <h2 style={{ marginTop: 16 }}>Không tìm thấy khóa học</h2>
      <Link href="/courses" className="btn btn--primary" style={{ marginTop: 24, display: 'inline-flex' }}>
        Quay lại danh sách
      </Link>
    </div>
  );

  const discount = Math.round((1 - course.price / course.originalPrice) * 100);
  const totalLessons = course.curriculum.reduce((acc, s) => acc + s.lessons.length, 0);

  return (
    <div className="course-detail">
      {/* Hero */}
      <div className="course-detail__hero">
        <div className="course-detail__hero-inner">
          <div>
            {/* Breadcrumb */}
            <div className="course-detail__breadcrumb">
              <Link href="/">Trang chủ</Link>
              <ChevronRight size={14} />
              <Link href="/courses">Khóa học</Link>
              <ChevronRight size={14} />
              <span style={{ color: 'rgba(255,255,255,0.9)' }}>{course.category}</span>
            </div>

            <h1 className="course-detail__title">{course.title}</h1>
            <p className="course-detail__desc">{course.description}</p>

            <div className="course-detail__meta">
              <RatingStars rating={course.rating} reviewCount={course.reviewCount} />
              <span className="course-detail__meta-item" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <Users size={14} /> {course.studentCount.toLocaleString('vi-VN')} học viên
              </span>
              <span className="course-detail__meta-item">
                <Globe size={14} /> {course.language}
              </span>
              <span className="course-detail__meta-item">
                <Clock size={14} /> Cập nhật {course.lastUpdated}
              </span>
            </div>

            {/* Instructor mini */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 20 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={course.instructor.avatar} alt={course.instructor.name}
                style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)' }} />
              <div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Giảng viên</div>
                <div style={{ fontWeight: 600, color: '#fff' }}>{course.instructor.name}</div>
              </div>
            </div>
          </div>

          {/* Sidebar — desktop shows here too (sticky) */}
          <div className="course-detail__sidebar" style={{ /* tablet: shown above */ }}>
            <div className="course-detail__enroll-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={course.thumbnail} alt={course.title} className="course-detail__enroll-card-preview" />
              <div className="course-detail__enroll-card-body">
                <div className="course-detail__enroll-card-price">
                  <span className="price-current">{course.price.toLocaleString('vi-VN')}₫</span>
                  <span className="price-original">{course.originalPrice.toLocaleString('vi-VN')}₫</span>
                  <span className="price-badge">-{discount}%</span>
                </div>
                {isAuthenticated ? (
                  <Link href={`/learn/${course.id}`} className="btn btn--primary btn--lg course-detail__enroll-card-cta">
                    <Play size={18} /> Bắt đầu học ngay
                  </Link>
                ) : (
                  <Link href="/auth/register" className="btn btn--primary btn--lg course-detail__enroll-card-cta">
                    Đăng ký học ngay
                  </Link>
                )}
                <div style={{ textAlign: 'center', fontSize: 12, color: '#9CA3AF', marginTop: 8 }}>
                  Đảm bảo hoàn tiền trong 30 ngày
                </div>
                <div className="course-detail__enroll-card-includes">
                  <div className="course-detail__enroll-card-includes-title">Khóa học bao gồm:</div>
                  {[
                    { icon: <Clock size={15} />, text: `${course.duration} video HD` },
                    { icon: <BookOpen size={15} />, text: `${totalLessons} bài học` },
                    { icon: <Globe size={15} />, text: 'Truy cập trọn đời' },
                    { icon: <Award size={15} />, text: 'Chứng chỉ hoàn thành' },
                    { icon: <BarChart2 size={15} />, text: `Cấp độ: ${course.level === 'beginner' ? 'Cơ bản' : course.level === 'intermediate' ? 'Trung cấp' : 'Nâng cao'}` },
                  ].map(item => (
                    <div key={item.text} className="course-detail__enroll-card-includes-item">
                      <span className="course-detail__enroll-card-includes-item-icon">{item.icon}</span>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="course-detail__body">
        <div className="course-detail__content">
          {/* Outcomes */}
          <div className="course-detail__outcomes">
            <h3>🎯 Bạn sẽ học được gì?</h3>
            <ul>
              {course.outcomes.map((o, i) => <li key={i}>{o}</li>)}
            </ul>
          </div>

          {/* Requirements */}
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📋 Yêu cầu đầu vào</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {course.requirements.map((r, i) => (
                <li key={i} style={{ display: 'flex', gap: 8, fontSize: 14, color: '#4B5563' }}>
                  <span style={{ color: '#6B7280' }}>•</span> {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Curriculum */}
          <div className="course-detail__curriculum">
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>📚 Nội dung khóa học</h3>
            <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 20 }}>
              {course.curriculum.length} chương • {totalLessons} bài học • {course.duration} tổng thời lượng
            </p>
            {course.curriculum.map(section => (
              <div key={section.id} className="course-detail__curriculum-section">
                <div className="course-detail__curriculum-section-header" onClick={() => toggleSection(section.id)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <ChevronDown size={16} style={{ transform: openSections.includes(section.id) ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                    {section.title}
                  </div>
                  <span className="course-detail__curriculum-section-meta">
                    {section.lessons.length} bài
                  </span>
                </div>
                {openSections.includes(section.id) && (
                  <div className="course-detail__curriculum-section-lessons">
                    {section.lessons.map(lesson => (
                      <div key={lesson.id} className="course-detail__curriculum-lesson">
                        <div className="course-detail__curriculum-lesson-left">
                          <span className="course-detail__curriculum-lesson-icon">
                            {lesson.type === 'quiz' ? '📝' : <Play size={13} />}
                          </span>
                          <span style={{ fontSize: 13 }}>{lesson.title}</span>
                          {lesson.isPreview && (
                            <span className="course-detail__curriculum-lesson-preview">Xem thử</span>
                          )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {!lesson.isPreview && <Lock size={12} style={{ color: '#9CA3AF' }} />}
                          <span className="course-detail__curriculum-lesson-duration">{lesson.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Reviews */}
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>⭐ Đánh giá của học viên</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32, background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 16, padding: 24, marginBottom: 24 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 64, fontWeight: 800, color: '#F59E0B', lineHeight: 1 }}>{course.rating}</div>
                <RatingStars rating={course.rating} />
                <div style={{ fontSize: 12, color: '#92400E', marginTop: 4 }}>Đánh giá khóa học</div>
              </div>
              <div style={{ flex: 1 }}>
                {[5,4,3,2,1].map(star => (
                  <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={{ flex: 1, height: 8, background: '#E5E7EB', borderRadius: 999, overflow: 'hidden' }}>
                      <div style={{ width: star === 5 ? '75%' : star === 4 ? '18%' : star === 3 ? '5%' : '2%', height: '100%', background: '#F59E0B', borderRadius: 999 }} />
                    </div>
                    <span style={{ fontSize: 12, color: '#6B7280', whiteSpace: 'nowrap' }}>{star} ★</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {course.reviews.map(review => (
                <div key={review.id} style={{ display: 'flex', gap: 12 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={review.avatar} alt={review.user} style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{review.user}</span>
                      <RatingStars rating={review.rating} size={12} />
                      <span style={{ fontSize: 11, color: '#9CA3AF' }}>{review.date}</span>
                    </div>
                    <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.6 }}>{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar placeholder (already shown in hero on desktop) */}
        <div style={{ display: 'none' }} />
      </div>
    </div>
  );
}
