'use client';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { courseService } from '@/services/course.service';
import { Course } from '@/data/courses';
import { Edit2, LogOut, Save, X, BookOpen, TrendingUp, Award } from 'lucide-react';

export default function ProfilePage() {
  const { user, logout, updateProfile } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'info' | 'courses' | 'settings'>('info');
  const [isEditing, setIsEditing] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
    bio: user?.bio || '',
  });

  useEffect(() => {
    if (user?.enrolledCourses && user.enrolledCourses.length > 0) {
      setIsLoading(true);
      // Load enrolled courses
      const loadCourses = async () => {
        try {
          const courses = await courseService.getAllCourses();
          const enrolled = courses.filter(c => user.enrolledCourses?.includes(c.id));
          setEnrolledCourses(enrolled);
        } catch (error) {
          console.error('Error loading courses:', error);
        } finally {
          setIsLoading(false);
        }
      };
      loadCourses();
    }
  }, [user]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleLogout = () => {
    if (confirm('Bạn chắc chắn muốn đăng xuất?')) {
      logout();
      window.location.href = '/';
    }
  };

  if (!user) {
    return (
      <div className="profile-page profile-page--empty">
        <div className="container">
          <p>Bạn cần đăng nhập để xem hồ sơ cá nhân</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        {/* Header */}
        <div className="profile-page__header">
          <div className="profile-page__hero">
            <div className="profile-page__avatar-section">
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="profile-page__avatar"
                />
              )}
              <div className="profile-page__user-info">
                <h1 className="profile-page__name">{user.name}</h1>
                <p className="profile-page__email">{user.email}</p>
                {user.enrolledCourses && (
                  <p className="profile-page__stats">
                    Đang học {user.enrolledCourses.length} khóa học
                  </p>
                )}
              </div>
            </div>

            <div className="profile-page__actions">
              <button
                className="btn btn--secondary"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit2 size={18} />
                {isEditing ? 'Hủy' : 'Chỉnh sửa'}
              </button>
              <button
                className="btn btn--danger"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                Đăng xuất
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="profile-page__tabs">
            <button
              className={`profile-page__tab ${activeTab === 'info' ? 'active' : ''}`}
              onClick={() => setActiveTab('info')}
            >
              <Award size={18} /> Thông tin cá nhân
            </button>
            <button
              className={`profile-page__tab ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              <BookOpen size={18} /> Khóa học ({enrolledCourses.length})
            </button>
            <button
              className={`profile-page__tab ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <TrendingUp size={18} /> Thống kê
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="profile-page__content">
          {/* Info Tab */}
          {activeTab === 'info' && (
            <div className="profile-page__section">
              <div className="profile-card">
                {isEditing ? (
                  <form onSubmit={handleEditSubmit} className="profile-form">
                    <h2 className="profile-form__title">Chỉnh sửa thông tin cá nhân</h2>

                    <div className="profile-form__group">
                      <label>Tên đầy đủ</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nhập tên của bạn"
                        required
                      />
                    </div>

                    <div className="profile-form__row">
                      <div className="profile-form__group">
                        <label>Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="email@example.com"
                          required
                        />
                      </div>

                      <div className="profile-form__group">
                        <label>Số điện thoại</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="0912345678"
                        />
                      </div>
                    </div>

                    <div className="profile-form__group">
                      <label>URL Avatar</label>
                      <input
                        type="url"
                        value={formData.avatar}
                        onChange={e => setFormData({ ...formData, avatar: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>

                    <div className="profile-form__group">
                      <label>Tiểu sử</label>
                      <textarea
                        value={formData.bio}
                        onChange={e => setFormData({ ...formData, bio: e.target.value })}
                        placeholder="Viết một vài dòng về bạn..."
                        rows={4}
                      />
                    </div>

                    <div className="profile-form__actions">
                      <button type="submit" className="btn btn--primary">
                        <Save size={18} /> Lưu thay đổi
                      </button>
                      <button
                        type="button"
                        className="btn btn--secondary"
                        onClick={() => setIsEditing(false)}
                      >
                        <X size={18} /> Hủy
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="profile-info">
                    <h2 className="profile-info__title">Thông tin cá nhân</h2>

                    <div className="profile-info__item">
                      <span className="profile-info__label">Tên:</span>
                      <span className="profile-info__value">{user.name}</span>
                    </div>

                    <div className="profile-info__item">
                      <span className="profile-info__label">Email:</span>
                      <span className="profile-info__value">{user.email}</span>
                    </div>

                    {user.phone && (
                      <div className="profile-info__item">
                        <span className="profile-info__label">Số điện thoại:</span>
                        <span className="profile-info__value">{user.phone}</span>
                      </div>
                    )}

                    {user.bio && (
                      <div className="profile-info__item">
                        <span className="profile-info__label">Tiểu sử:</span>
                        <span className="profile-info__value">{user.bio}</span>
                      </div>
                    )}

                    <div className="profile-info__item">
                      <span className="profile-info__label">Ngày tham gia:</span>
                      <span className="profile-info__value">
                        {new Date(user.createdAt || new Date()).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="profile-page__section">
              {isLoading ? (
                <div className="profile-page__loading">Đang tải...</div>
              ) : enrolledCourses.length > 0 ? (
                <>
                  <h2 className="profile-page__section-title">
                    Các khóa học đang học ({enrolledCourses.length})
                  </h2>
                  <div className="profile-page__courses-grid">
                    {enrolledCourses.map(course => (
                      <div key={course.id} className="course-card-mini">
                        {course.thumbnail && (
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="course-card-mini__image"
                          />
                        )}
                        <div className="course-card-mini__content">
                          <h3 className="course-card-mini__title">{course.title}</h3>
                          <p className="course-card-mini__teacher">
                            Giáo viên: {course.instructor}
                          </p>

                          <div className="course-card-mini__progress">
                            <div className="course-card-mini__progress-bar">
                              <div
                                className="course-card-mini__progress-fill"
                                style={{ width: `${course.progress || 0}%` }}
                              ></div>
                            </div>
                            <span className="course-card-mini__progress-text">
                              {course.progress || 0}%
                            </span>
                          </div>

                          <div className="course-card-mini__stats">
                            <span>{course.duration} tuần</span>
                            <span>•</span>
                            <span>{course.lessons} bài học</span>
                          </div>

                          <a href={`/learn/${course.id}`} className="btn btn--small">
                            Tiếp tục học
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="profile-page__empty">
                  <BookOpen size={48} />
                  <h3>Bạn chưa đăng ký khóa học nào</h3>
                  <p>Hãy khám phá các khóa học tuyệt vời của chúng tôi!</p>
                  <a href="/courses" className="btn btn--primary">
                    Xem các khóa học
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Statistics Tab */}
          {activeTab === 'settings' && (
            <div className="profile-page__section">
              <h2 className="profile-page__section-title">Thống kê học tập</h2>

              <div className="profile-page__stats">
                <div className="stat-card">
                  <div className="stat-card__icon">📚</div>
                  <div className="stat-card__content">
                    <h3>Tổng khóa học</h3>
                    <p className="stat-card__value">{enrolledCourses.length}</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-card__icon">⏱️</div>
                  <div className="stat-card__content">
                    <h3>Thời gian học</h3>
                    <p className="stat-card__value">
                      {enrolledCourses.length > 0
                        ? `${enrolledCourses.reduce((a, b) => a + (b.duration || 0), 0)} giờ`
                        : '0 giờ'}
                    </p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-card__icon">🎯</div>
                  <div className="stat-card__content">
                    <h3>Tiến độ trung bình</h3>
                    <p className="stat-card__value">
                      {enrolledCourses.length > 0
                        ? Math.round(
                            enrolledCourses.reduce((a, b) => a + (b.progress || 0), 0) /
                              enrolledCourses.length
                          )
                        : 0}
                      %
                    </p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-card__icon">⭐</div>
                  <div className="stat-card__content">
                    <h3>Đã hoàn thành</h3>
                    <p className="stat-card__value">
                      {enrolledCourses.filter(c => (c.progress || 0) === 100).length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="profile-page__achievements">
                <h3>Thành tựu</h3>
                <div className="achievements-grid">
                  <div className="achievement achievement--earned">
                    <div className="achievement__icon">🌟</div>
                    <p className="achievement__name">Người mới bắt đầu</p>
                  </div>
                  {enrolledCourses.length >= 5 && (
                    <div className="achievement achievement--earned">
                      <div className="achievement__icon">🔥</div>
                      <p className="achievement__name">Người yêu thích học tập</p>
                    </div>
                  )}
                  {enrolledCourses.filter(c => (c.progress || 0) === 100).length >= 3 && (
                    <div className="achievement achievement--earned">
                      <div className="achievement__icon">🏆</div>
                      <p className="achievement__name">Người chinh phục</p>
                    </div>
                  )}
                  <div className="achievement">
                    <div className="achievement__icon">💎</div>
                    <p className="achievement__name">Chuyên gia (khóa 10 khóa học)</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
