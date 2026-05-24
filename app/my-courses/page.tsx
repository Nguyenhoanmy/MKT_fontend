'use client';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { courseService } from '@/services/course.service';
import { Course } from '@/data/courses';
import Link from 'next/link';
import { Search, Filter, BookOpen, TrendingUp, Clock, ArrowRight } from 'lucide-react';

export default function MyCoursesPage() {
  const { user } = useAuthStore();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'progress' | 'title' | 'date'>('progress');
  const [filterStatus, setFilterStatus] = useState<'all' | 'in-progress' | 'completed'>('all');

  useEffect(() => {
    if (!user?.enrolledCourses || user.enrolledCourses.length === 0) {
      setIsLoading(false);
      return;
    }

    const loadCourses = async () => {
      try {
        setIsLoading(true);
        const allCourses = await courseService.getAll();
        const enrolled = allCourses.filter(c => user.enrolledCourses?.includes(c.id));
        setCourses(enrolled);
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, [user?.enrolledCourses]);

  useEffect(() => {
    let filtered = courses.filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase());

      const progress = c.progress || 0;
      const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'completed' && progress === 100) ||
        (filterStatus === 'in-progress' && progress > 0 && progress < 100);

      return matchesSearch && matchesStatus;
    });

    // Sort
    if (sortBy === 'progress') {
      filtered.sort((a, b) => (b.progress || 0) - (a.progress || 0));
    } else if (sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredCourses(filtered);
  }, [courses, searchQuery, sortBy, filterStatus]);

  if (!user) {
    return (
      <div className="my-courses my-courses--empty">
        <div className="container">
          <p>Bạn cần đăng nhập để xem khóa học</p>
        </div>
      </div>
    );
  }

  const completedCount = courses.filter(c => (c.progress || 0) === 100).length;
  const inProgressCount = courses.filter(c => {
    const p = c.progress || 0;
    return p > 0 && p < 100;
  }).length;

  return (
    <div className="my-courses">
      <div className="container">
        {/* Hero */}
        <div className="my-courses__hero">
          <div>
            <h1 className="my-courses__title">Khóa Học Của Tôi</h1>
            <p className="my-courses__subtitle">
              Bạn đang học {courses.length} khóa học ({completedCount} hoàn thành, {inProgressCount} đang học)
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="my-courses__stats">
          <div className="stat-box">
            <BookOpen size={24} />
            <div>
              <p className="stat-box__label">Tổng khóa học</p>
              <p className="stat-box__value">{courses.length}</p>
            </div>
          </div>

          <div className="stat-box">
            <TrendingUp size={24} />
            <div>
              <p className="stat-box__label">Đang học</p>
              <p className="stat-box__value">{inProgressCount}</p>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-box__icon">✅</div>
            <div>
              <p className="stat-box__label">Hoàn thành</p>
              <p className="stat-box__value">{completedCount}</p>
            </div>
          </div>

          <div className="stat-box">
            <Clock size={24} />
            <div>
              <p className="stat-box__label">Thời gian học</p>
              <p className="stat-box__value">
                {courses.reduce((acc, c) => {
                  const time = c.duration?.split('h')[0] || '0';
                  return acc + parseInt(time);
                }, 0)}h
              </p>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="my-courses__controls">
          <div className="my-courses__search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Tìm khóa học..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="my-courses__filters">
            <div className="my-courses__filter-group">
              <Filter size={18} />
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value as any)}
              >
                <option value="all">Tất cả</option>
                <option value="in-progress">Đang học</option>
                <option value="completed">Hoàn thành</option>
              </select>
            </div>

            <div className="my-courses__filter-group">
              <label>Sắp xếp:</label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
              >
                <option value="progress">Theo tiến độ</option>
                <option value="title">Theo tên (A-Z)</option>
                <option value="date">Gần đây nhất</option>
              </select>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        {isLoading ? (
          <div className="my-courses__loading">Đang tải khóa học...</div>
        ) : filteredCourses.length > 0 ? (
          <div className="my-courses__grid">
            {filteredCourses.map(course => {
              const progress = course.progress || 0;
              const isCompleted = progress === 100;

              return (
                <div key={course.id} className="my-course-card">
                  <div className="my-course-card__thumbnail">
                    {course.thumbnail && (
                      <img src={course.thumbnail} alt={course.title} />
                    )}
                    {isCompleted && (
                      <div className="my-course-card__badge">✓ Hoàn thành</div>
                    )}
                  </div>

                  <div className="my-course-card__content">
                    <h3 className="my-course-card__title">{course.title}</h3>

                    <p className="my-course-card__instructor">
                      Giáo viên: {course.instructor.name}
                    </p>

                    <p className="my-course-card__category">
                      {course.category}
                    </p>

                    {/* Progress Bar */}
                    <div className="my-course-card__progress">
                      <div className="my-course-card__progress-bar">
                        <div
                          className="my-course-card__progress-fill"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span className="my-course-card__progress-text">{progress}%</span>
                    </div>

                    {/* Stats */}
                    <div className="my-course-card__stats">
                      <span>📚 {course.lessonCount} bài học</span>
                      <span>•</span>
                      <span>⏱️ {course.duration}</span>
                    </div>

                    {/* Rating */}
                    <div className="my-course-card__rating">
                      <span className="my-course-card__stars">
                        {'⭐'.repeat(Math.floor(course.rating))}
                      </span>
                      <span className="my-course-card__rating-text">
                        {course.rating.toFixed(1)} ({course.reviewCount} đánh giá)
                      </span>
                    </div>

                    {/* Action Button */}
                    <Link
                      href={`/learn/${course.id}`}
                      className="my-course-card__btn"
                    >
                      {isCompleted ? (
                        <>Xem lại khóa học <ArrowRight size={16} /></>
                      ) : (
                        <>Tiếp tục học <ArrowRight size={16} /></>
                      )}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="my-courses__empty">
            <BookOpen size={64} />
            <h3>Chưa có khóa học nào</h3>
            <p>
              {searchQuery || filterStatus !== 'all'
                ? 'Không tìm thấy khóa học phù hợp'
                : 'Bạn chưa đăng ký khóa học nào. Hãy khám phá các khóa học tuyệt vời!'}
            </p>
            <Link href="/courses" className="btn btn--primary">
              Xem các khóa học
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
