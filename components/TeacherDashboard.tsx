'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TEACHERS } from '@/data/teachers';
import { COURSES } from '@/data/courses';
import { AuthUser } from '@/services/auth.service';

interface DashboardStats {
  totalCourses: number;
  totalStudents: number;
  averageRating: number;
  revenue: number;
}

interface EnrollmentData {
  month: string;
  enrollments: number;
}

interface TeacherCourse {
  id: string;
  title: string;
  students: number;
  rating: number;
  progress: number;
}

interface DashboardProps {
  teacher?: AuthUser;
}

export default function TeacherDashboard({ teacher }: DashboardProps) {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalCourses: 0,
    totalStudents: 0,
    averageRating: 0,
    revenue: 0,
  });
  const [courses, setCourses] = useState<TeacherCourse[]>([]);
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentData[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  // Initialize dashboard data
  useEffect(() => {
    // Get current teacher data
    const teacherData = TEACHERS[0]; // Default to first teacher

    // Filter courses taught by this teacher
    const teacherCourses = COURSES.filter((course) => teacherData.courses.includes(course.id)).map((course) => ({
      id: course.id,
      title: course.title,
      students: course.studentCount,
      rating: course.rating,
      progress: Math.floor(Math.random() * 100) + 30, // 30-100%
    }));

    setCourses(teacherCourses);

    // Calculate stats
    const totalStudents = teacherCourses.reduce((sum, course) => sum + course.students, 0);
    const avgRating =
      teacherCourses.length > 0
        ? (teacherCourses.reduce((sum, course) => sum + course.rating, 0) / teacherCourses.length).toFixed(1)
        : 0;
    const revenue = totalStudents * 50; // $50 per student

    setStats({
      totalCourses: teacherCourses.length,
      totalStudents,
      averageRating: parseFloat(avgRating as any),
      revenue,
    });

    // Generate mock enrollment data (last 6 months)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const enrollmentData: EnrollmentData[] = months.map((month, index) => ({
      month,
      enrollments: Math.floor(Math.random() * 200) + 50,
    }));
    setEnrollmentData(enrollmentData);

    if (teacherCourses.length > 0) {
      setSelectedCourse(teacherCourses[0].id);
    }
  }, []);

  return (
    <div className="teacher-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-header__content">
          <h1 className="dashboard-header__title">👋 Dashboard Giáo Viên</h1>
          <p className="dashboard-header__subtitle">Xin chào, {teacher?.name}! Đây là tổng quan hoạt động của bạn.</p>
        </div>
        <button className="dashboard-header__btn" onClick={() => router.push('/courses/create')}>
          + Tạo Khóa Học Mới
        </button>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card stat-card--courses">
          <div className="stat-card__icon">📚</div>
          <div className="stat-card__content">
            <h3 className="stat-card__title">Khóa Học</h3>
            <p className="stat-card__value">{stats.totalCourses}</p>
            <span className="stat-card__subtitle">Tổng khóa học</span>
          </div>
        </div>

        <div className="stat-card stat-card--students">
          <div className="stat-card__icon">👥</div>
          <div className="stat-card__content">
            <h3 className="stat-card__title">Học Sinh</h3>
            <p className="stat-card__value">{stats.totalStudents}</p>
            <span className="stat-card__subtitle">Tổng học sinh</span>
          </div>
        </div>

        <div className="stat-card stat-card--rating">
          <div className="stat-card__icon">⭐</div>
          <div className="stat-card__content">
            <h3 className="stat-card__title">Xếp Hạng</h3>
            <p className="stat-card__value">{stats.averageRating.toFixed(1)}</p>
            <span className="stat-card__subtitle">Điểm trung bình</span>
          </div>
        </div>

        <div className="stat-card stat-card--revenue">
          <div className="stat-card__icon">💰</div>
          <div className="stat-card__content">
            <h3 className="stat-card__title">Doanh Thu</h3>
            <p className="stat-card__value">${stats.revenue}</p>
            <span className="stat-card__subtitle">Tổng doanh thu</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Left Column - Courses */}
        <div className="dashboard-content__main">
          <div className="courses-section">
            <div className="section-header">
              <h2 className="section-header__title">📖 Khóa Học Của Tôi</h2>
              <span className="section-header__count">{courses.length} khóa</span>
            </div>

            <div className="courses-list">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <div
                    key={course.id}
                    className={`course-item ${selectedCourse === course.id ? 'course-item--active' : ''}`}
                    onClick={() => setSelectedCourse(course.id)}
                  >
                    <div className="course-item__header">
                      <h3 className="course-item__title">{course.title}</h3>
                      <span className="course-item__rating">⭐ {course.rating}</span>
                    </div>
                    <div className="course-item__stats">
                      <span className="course-item__stat">
                        <span className="stat-label">👥 Học sinh:</span> {course.students}
                      </span>
                      <span className="course-item__stat">
                        <span className="stat-label">📈 Tiến độ:</span> {course.progress}%
                      </span>
                    </div>
                    <div className="course-item__progress">
                      <div className="progress-bar">
                        <div className="progress-bar__fill" style={{ width: `${course.progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>📚 Bạn chưa có khóa học nào. Hãy tạo khóa học đầu tiên của bạn!</p>
                </div>
              )}
            </div>
          </div>

          {/* Chart Section */}
          <div className="chart-section">
            <div className="section-header">
              <h2 className="section-header__title">📊 Đăng Ký 6 Tháng Gần Đây</h2>
            </div>

            <div className="chart-container">
              <div className="bar-chart">
                {enrollmentData.map((data, index) => (
                  <div key={index} className="chart-bar">
                    <div className="bar-wrapper">
                      <div
                        className="bar"
                        style={{
                          height: `${(data.enrollments / 250) * 100}%`,
                        }}
                      >
                        <span className="bar-value">{data.enrollments}</span>
                      </div>
                    </div>
                    <span className="bar-label">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Quick Actions & Recent Activity */}
        <div className="dashboard-content__sidebar">
          {/* Quick Actions */}
          <div className="quick-actions">
            <h3 className="quick-actions__title">⚡ Hành Động Nhanh</h3>
            <div className="actions-list">
              <button className="action-btn action-btn--primary">
                <span className="action-btn__icon">📝</span>
                <span className="action-btn__text">Tạo Bài Học</span>
              </button>
              <button className="action-btn action-btn--secondary">
                <span className="action-btn__icon">💬</span>
                <span className="action-btn__text">Tin Nhắn</span>
              </button>
              <button className="action-btn action-btn--secondary">
                <span className="action-btn__icon">📊</span>
                <span className="action-btn__text">Báo Cáo</span>
              </button>
              <button className="action-btn action-btn--secondary">
                <span className="action-btn__icon">⚙️</span>
                <span className="action-btn__text">Cài Đặt</span>
              </button>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="recent-reviews">
            <h3 className="recent-reviews__title">⭐ Bình Luận Gần Đây</h3>
            <div className="reviews-list">
              <div className="review-item">
                <div className="review-item__header">
                  <strong className="review-item__name">Nguyễn Hà My</strong>
                  <span className="review-item__rating">⭐ 5.0</span>
                </div>
                <p className="review-item__comment">Khóa học rất tuyệt vời, giáo viên giảng dạy rất chuyên nghiệp!</p>
                <span className="review-item__date">2 giờ trước</span>
              </div>
              <div className="review-item">
                <div className="review-item__header">
                  <strong className="review-item__name">Trần Đức Nam</strong>
                  <span className="review-item__rating">⭐ 4.5</span>
                </div>
                <p className="review-item__comment">Nội dung rất hay, chỉ cần thêm thêm bài tập thực hành.</p>
                <span className="review-item__date">1 ngày trước</span>
              </div>
              <div className="review-item">
                <div className="review-item__header">
                  <strong className="review-item__name">Phạm Thị Lan</strong>
                  <span className="review-item__rating">⭐ 5.0</span>
                </div>
                <p className="review-item__comment">Giáo viên rất thân thiện và hỗ trợ tốt. Cảm ơn!</p>
                <span className="review-item__date">3 ngày trước</span>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="info-box">
            <h3 className="info-box__title">ℹ️ Mẹo</h3>
            <p className="info-box__text">Hãy thường xuyên cập nhật nội dung khóa học để tăng sự hài lòng của học sinh và cải thiện xếp hạng.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
