import Link from 'next/link';
import { Users, Clock } from 'lucide-react';
import type { Course } from '@/data/courses';
import RatingStars from './RatingStars';

interface CourseCardProps {
  course: Course;
  featured?: boolean;
}

const LEVEL_MAP = { beginner: 'Cơ bản', intermediate: 'Trung cấp', advanced: 'Nâng cao' };
const BADGE_MAP = { bestseller: '🏆 Bán chạy', hot: '🔥 Hot', new: '✨ Mới' };

export default function CourseCard({ course, featured }: CourseCardProps) {
  const discount = Math.round((1 - course.price / course.originalPrice) * 100);

  return (
    <Link href={`/courses/${course.slug}`} style={{ textDecoration: 'none' }}>
      <article className={`course-card${featured ? ' course-card--featured' : ''}`}>
        <div className="course-card__image-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={course.thumbnail} alt={course.title} className="course-card__image" loading="lazy" />
          <div className="course-card__play-icon">▶</div>
        </div>

        <div className="course-card__body">
          {/* Category */}
          <div className="course-card__category">{course.categoryIcon} {course.category}</div>

          {/* Title */}
          <h3 className="course-card__title">{course.title}</h3>

          {/* Instructor */}
          <div className="course-card__instructor">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={course.instructor.avatar} alt={course.instructor.name} className="course-card__avatar" />
            {course.instructor.name}
          </div>

          {/* Meta */}
          <div className="course-card__meta">
            <RatingStars rating={course.rating} reviewCount={course.reviewCount} />
            <div className="course-card__students">
              <Users size={12} style={{ display: 'inline', marginRight: 4 }} />
              {course.studentCount.toLocaleString('vi-VN')}
            </div>
          </div>

          {/* Duration */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#9CA3AF', marginBottom: 12 }}>
            <Clock size={12} /> {course.duration} • {course.lessonCount} bài học
          </div>

          {/* Footer */}
          <div className="course-card__footer">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span className="course-card__price">
                {course.price === 0 ? 'Miễn phí' : course.price.toLocaleString('vi-VN') + '₫'}
              </span>
              {course.price > 0 && (
                <span className="course-card__price course-card__price--original">
                  {course.originalPrice.toLocaleString('vi-VN')}₫
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {course.badge && (
                <span className={`badge badge--${course.badge === 'bestseller' ? 'warning' : course.badge === 'hot' ? 'error' : 'primary'}`}
                  style={{ fontSize: 10 }}>
                  {BADGE_MAP[course.badge]}
                </span>
              )}
              <span className={`course-card__level course-card__level--${course.level}`}>
                {LEVEL_MAP[course.level]}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
