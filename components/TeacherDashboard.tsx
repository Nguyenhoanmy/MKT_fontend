'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TEACHERS } from '@/data/teachers';
import { COURSES } from '@/data/courses';
import { AuthUser } from '@/services/auth.service';
import { TrendingUp, Users, Award, DollarSign, BookOpen, MessageSquare, BarChart3, Settings, Edit2, Trash2, Eye, Clock, CheckCircle } from 'lucide-react';

interface DashboardStats {
  totalCourses: number;
  totalStudents: number;
  averageRating: number;
  revenue: number;
  thisMonthRevenue: number;
  completionRate: number;
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
  lastUpdated: string;
  status: 'active' | 'draft' | 'archived';
}

interface Student {
  id: string;
  name: string;
  avatar: string;
  coursesEnrolled: number;
  progress: number;
  joinDate: string;
}

interface EarningsData {
  source: string;
  amount: number;
  percentage: number;
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
    thisMonthRevenue: 0,
    completionRate: 0,
  });
  const [courses, setCourses] = useState<TeacherCourse[]>([]);
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentData[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [topStudents, setTopStudents] = useState<Student[]>([]);
  const [earningsData, setEarningsData] = useState<EarningsData[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'earnings'>('overview');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'draft'>('all');

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
      lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN'),
      status: Math.random() > 0.3 ? 'active' : 'draft' as const,
    }));

    const filteredCourses = teacherCourses.filter(c => 
      filterStatus === 'all' || c.status === filterStatus
    );

    setCourses(filteredCourses);

    // Calculate stats
    const totalStudents = teacherCourses.reduce((sum, course) => sum + course.students, 0);
    const avgRating =
      teacherCourses.length > 0
        ? (teacherCourses.reduce((sum, course) => sum + course.rating, 0) / teacherCourses.length).toFixed(1)
        : 0;
    const totalRevenue = totalStudents * 50; // $50 per student
    const thisMonthRevenue = Math.floor(totalStudents * 50 * 0.3); // 30% of total
    const avgProgress = teacherCourses.length > 0 
      ? Math.round(teacherCourses.reduce((sum, course) => sum + course.progress, 0) / teacherCourses.length)
      : 0;

    setStats({
      totalCourses: teacherCourses.length,
      totalStudents,
      averageRating: parseFloat(avgRating as any),
      revenue: totalRevenue,
      thisMonthRevenue,
      completionRate: avgProgress,
    });

    // Generate mock top students
    const mockStudents: Student[] = [
      {
        id: '1',
        name: 'Nguyễn Hà My',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student1',
        coursesEnrolled: 3,
        progress: 95,
        joinDate: '2024-01-15',
      },
      {
        id: '2',
        name: 'Trần Đức Nam',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student2',
        coursesEnrolled: 2,
        progress: 87,
        joinDate: '2024-02-10',
      },
      {
        id: '3',
        name: 'Phạm Thị Lan',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student3',
        coursesEnrolled: 3,
        progress: 92,
        joinDate: '2024-01-20',
      },
      {
        id: '4',
        name: 'Lê Minh Tuấn',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student4',
        coursesEnrolled: 1,
        progress: 78,
        joinDate: '2024-03-05',
      },
    ];
    setTopStudents(mockStudents);

    // Generate earnings breakdown
    const mockEarnings: EarningsData[] = [
      { source: 'React Fundamentals', amount: 2500, percentage: 40 },
      { source: 'Next.js Advanced', amount: 1875, percentage: 30 },
      { source: 'Node.js Backend', amount: 1250, percentage: 20 },
      { source: 'Khác', amount: 375, percentage: 10 },
    ];
    setEarningsData(mockEarnings);

    // Generate mock enrollment data (last 6 months)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const enrollmentData: EnrollmentData[] = months.map((month, index) => ({
      month,
      enrollments: Math.floor(Math.random() * 200) + 50,
    }));
    setEnrollmentData(enrollmentData);

    if (filteredCourses.length > 0) {
      setSelectedCourse(filteredCourses[0].id);
    }
  }, [filterStatus]);

  return (
    <div className="teacher-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-header__content">
          <h1 className="dashboard-header__title">👋 Dashboard Giáo Viên</h1>
          <p className="dashboard-header__subtitle">Xin chào, {teacher?.name}! Đây là tổng quan hoạt động của bạn.</p>
        </div>
        <div className="dashboard-header__actions">
          <button className="dashboard-header__btn dashboard-header__btn--secondary">
            <MessageSquare size={18} />
            Tin Nhắn
          </button>
          <button className="dashboard-header__btn" onClick={() => router.push('/teacher/courses/create')}>
            + Tạo Khóa Học
          </button>
        </div>
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
            <h3 className="stat-card__title">Doanh Thu (Tháng)</h3>
            <p className="stat-card__value">${stats.thisMonthRevenue}</p>
            <span className="stat-card__subtitle">Tháng này</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="dashboard-tabs">
        <button 
          className={`dashboard-tabs__btn ${activeTab === 'overview' ? 'dashboard-tabs__btn--active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart3 size={18} />
          Tổng Quan
        </button>
        <button 
          className={`dashboard-tabs__btn ${activeTab === 'students' ? 'dashboard-tabs__btn--active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          <Users size={18} />
          Học Sinh
        </button>
        <button 
          className={`dashboard-tabs__btn ${activeTab === 'earnings' ? 'dashboard-tabs__btn--active' : ''}`}
          onClick={() => setActiveTab('earnings')}
        >
          <DollarSign size={18} />
          Doanh Thu
        </button>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <>
            {/* Left Column - Courses */}
            <div className="dashboard-content__main">
              <div className="courses-section">
                <div className="section-header">
                  <h2 className="section-header__title">📖 Khóa Học Của Tôi</h2>
                  <div className="section-header__filters">
                    <button 
                      className={`filter-btn ${filterStatus === 'all' ? 'filter-btn--active' : ''}`}
                      onClick={() => setFilterStatus('all')}
                    >
                      Tất Cả ({courses.length})
                    </button>
                    <button 
                      className={`filter-btn ${filterStatus === 'active' ? 'filter-btn--active' : ''}`}
                      onClick={() => setFilterStatus('active')}
                    >
                      Hoạt Động
                    </button>
                    <button 
                      className={`filter-btn ${filterStatus === 'draft' ? 'filter-btn--active' : ''}`}
                      onClick={() => setFilterStatus('draft')}
                    >
                      Nháp
                    </button>
                  </div>
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
                          <div className="course-item__info">
                            <h3 className="course-item__title">{course.title}</h3>
                            <span className={`course-item__badge course-item__badge--${course.status}`}>
                              {course.status === 'active' ? '🟢 Hoạt động' : '📝 Nháp'}
                            </span>
                          </div>
                          <span className="course-item__rating">⭐ {course.rating}</span>
                        </div>
                        <div className="course-item__stats">
                          <span className="course-item__stat">
                            <span className="stat-label">👥 Học sinh:</span> {course.students}
                          </span>
                          <span className="course-item__stat">
                            <span className="stat-label">📈 Tiến độ:</span> {course.progress}%
                          </span>
                          <span className="course-item__stat">
                            <span className="stat-label">🕐 Cập nhật:</span> {course.lastUpdated}
                          </span>
                        </div>
                        <div className="course-item__progress">
                          <div className="progress-bar">
                            <div className="progress-bar__fill" style={{ width: `${course.progress}%` }}></div>
                          </div>
                        </div>
                        <div className="course-item__actions">
                          <button className="course-action-btn course-action-btn--view" title="Xem">
                            <Eye size={16} />
                          </button>
                          <button className="course-action-btn course-action-btn--edit" title="Sửa">
                            <Edit2 size={16} />
                          </button>
                          <button className="course-action-btn course-action-btn--delete" title="Xóa">
                            <Trash2 size={16} />
                          </button>
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
          </>
        )}

        {activeTab === 'students' && (
          <div className="dashboard-content__full">
            <div className="students-section">
              <div className="section-header">
                <h2 className="section-header__title">👥 Top Học Sinh</h2>
                <span className="section-header__count">{topStudents.length} học sinh</span>
              </div>

              <div className="students-grid">
                {topStudents.map((student, index) => (
                  <div key={student.id} className="student-card">
                    <div className="student-card__header">
                      <img src={student.avatar} alt={student.name} className="student-card__avatar" />
                      <div className="student-card__rank">#{index + 1}</div>
                    </div>
                    <h3 className="student-card__name">{student.name}</h3>
                    <div className="student-card__stats">
                      <div className="student-stat">
                        <span className="student-stat__label">Khóa học</span>
                        <span className="student-stat__value">{student.coursesEnrolled}</span>
                      </div>
                      <div className="student-stat">
                        <span className="student-stat__label">Tiến độ</span>
                        <span className="student-stat__value">{student.progress}%</span>
                      </div>
                    </div>
                    <div className="student-card__progress">
                      <div className="progress-bar progress-bar--small">
                        <div className="progress-bar__fill" style={{ width: `${student.progress}%` }}></div>
                      </div>
                    </div>
                    <p className="student-card__date">Tham gia: {student.joinDate}</p>
                    <button className="student-card__btn">Xem Chi Tiết</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="dashboard-content__full">
            <div className="earnings-section">
              <div className="earnings-header">
                <div className="earnings-total">
                  <h2 className="earnings-total__title">Tổng Doanh Thu</h2>
                  <p className="earnings-total__amount">${stats.revenue.toLocaleString()}</p>
                  <span className="earnings-total__subtitle">Tất cả các khóa học</span>
                </div>
                <div className="earnings-month">
                  <h3 className="earnings-month__title">Tháng Này</h3>
                  <p className="earnings-month__amount">${stats.thisMonthRevenue.toLocaleString()}</p>
                </div>
              </div>

              <div className="earnings-grid">
                {earningsData.map((earning, index) => (
                  <div key={index} className="earning-card">
                    <div className="earning-card__header">
                      <h3 className="earning-card__title">{earning.source}</h3>
                      <span className="earning-card__percentage">{earning.percentage}%</span>
                    </div>
                    <p className="earning-card__amount">${earning.amount.toLocaleString()}</p>
                    <div className="progress-bar progress-bar--colored">
                      <div 
                        className="progress-bar__fill" 
                        style={{ 
                          width: `${earning.percentage}%`,
                          backgroundColor: ['#667eea', '#764ba2', '#f59e0b', '#10b981'][index % 4]
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
