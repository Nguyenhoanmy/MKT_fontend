'use client';
import { useEffect, useState } from 'react';
import { useTeacherStore } from '@/store/teacherStore';
import { Teacher } from '@/data/teachers';
import TeacherCard from '@/components/ui/TeacherCard';
import { X, Plus, Search } from 'lucide-react';

export default function TeacherManagementAdmin() {
  const {
    teachers,
    isLoading,
    error,
    fetchTeachers,
    createTeacher,
    updateTeacher,
    deleteTeacher,
  } = useTeacherStore();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState<Omit<Teacher, 'id'>>({
    name: '',
    email: '',
    phone: '',
    avatar: '',
    bio: '',
    specialization: [],
    experience: 0,
    courses: [],
    rating: 0,
    students: 0,
    joinDate: new Date().toISOString().split('T')[0],
    status: 'active',
  });

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const handleEdit = (teacher: Teacher) => {
    setEditingId(teacher.id);
    const { id, ...rest } = teacher;
    setFormData(rest);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn chắc chắn muốn xóa giáo viên này?')) {
      await deleteTeacher(id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      alert('Vui lòng điền tên và email');
      return;
    }

    if (editingId) {
      await updateTeacher(editingId, formData);
    } else {
      await createTeacher(formData);
    }

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      avatar: '',
      bio: '',
      specialization: [],
      experience: 0,
      courses: [],
      rating: 0,
      students: 0,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active',
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleSpecializationChange = (spec: string) => {
    setFormData(prev => ({
      ...prev,
      specialization: prev.specialization.includes(spec)
        ? prev.specialization.filter(s => s !== spec)
        : [...prev.specialization, spec],
    }));
  };

  const filteredTeachers = teachers.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const SPECIALIZATIONS = [
    'React',
    'Next.js',
    'Node.js',
    'Python',
    'UI Design',
    'UX Design',
    'Data Science',
    'Machine Learning',
    'Figma',
  ];

  return (
    <div className="admin-teachers">
      <div className="admin-teachers__header">
        <div>
          <h1 className="admin-teachers__title">Quản lý Giáo viên</h1>
          <p className="admin-teachers__subtitle">Quản lý danh sách giáo viên ({teachers.length})</p>
        </div>
        <button
          className="btn btn--primary"
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData({
              name: '',
              email: '',
              phone: '',
              avatar: '',
              bio: '',
              specialization: [],
              experience: 0,
              courses: [],
              rating: 0,
              students: 0,
              joinDate: new Date().toISOString().split('T')[0],
              status: 'active',
            });
          }}
        >
          <Plus size={18} /> Thêm Giáo viên
        </button>
      </div>

      {error && <div className="admin-teachers__error">{error}</div>}

      {/* Search Bar */}
      <div className="admin-teachers__search">
        <Search size={18} />
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, email, hoặc chuyên môn..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="admin-teachers__search-input"
        />
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="admin-teachers__modal">
          <div className="admin-teachers__modal-content">
            <div className="admin-teachers__modal-header">
              <h2>{editingId ? 'Sửa Giáo viên' : 'Thêm Giáo viên mới'}</h2>
              <button
                className="admin-teachers__modal-close"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-teachers__form">
              <div className="admin-teachers__form-group">
                <label>Tên giáo viên *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nhập tên giáo viên"
                  required
                />
              </div>

              <div className="admin-teachers__form-row">
                <div className="admin-teachers__form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    required
                  />
                </div>

                <div className="admin-teachers__form-group">
                  <label>Điện thoại</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0912345678"
                  />
                </div>
              </div>

              <div className="admin-teachers__form-group">
                <label>URL Avatar</label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={e => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="admin-teachers__form-group">
                <label>Tiểu sử</label>
                <textarea
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Nhập tiểu sử giáo viên"
                  rows={3}
                />
              </div>

              <div className="admin-teachers__form-group">
                <label>Chuyên môn</label>
                <div className="admin-teachers__specializations">
                  {SPECIALIZATIONS.map(spec => (
                    <label key={spec} className="admin-teachers__checkbox">
                      <input
                        type="checkbox"
                        checked={formData.specialization.includes(spec)}
                        onChange={() => handleSpecializationChange(spec)}
                      />
                      {spec}
                    </label>
                  ))}
                </div>
              </div>

              <div className="admin-teachers__form-row">
                <div className="admin-teachers__form-group">
                  <label>Kinh nghiệm (năm)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.experience}
                    onChange={e =>
                      setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>

                <div className="admin-teachers__form-group">
                  <label>Rating</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={e =>
                      setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })
                    }
                  />
                </div>

                <div className="admin-teachers__form-group">
                  <label>Số học viên</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.students}
                    onChange={e =>
                      setFormData({ ...formData, students: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>

              <div className="admin-teachers__form-row">
                <div className="admin-teachers__form-group">
                  <label>Ngày tham gia</label>
                  <input
                    type="date"
                    value={formData.joinDate}
                    onChange={e => setFormData({ ...formData, joinDate: e.target.value })}
                  />
                </div>

                <div className="admin-teachers__form-group">
                  <label>Trạng thái</label>
                  <select
                    value={formData.status}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        status: e.target.value as 'active' | 'inactive' | 'pending',
                      })
                    }
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Tạm khóa</option>
                    <option value="pending">Chờ duyệt</option>
                  </select>
                </div>
              </div>

              <div className="admin-teachers__form-actions">
                <button type="submit" className="btn btn--primary">
                  {editingId ? 'Cập nhật' : 'Thêm mới'}
                </button>
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Teachers Grid */}
      {isLoading ? (
        <div className="admin-teachers__loading">Đang tải...</div>
      ) : filteredTeachers.length > 0 ? (
        <div className="admin-teachers__grid">
          {filteredTeachers.map(teacher => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isAdmin={true}
            />
          ))}
        </div>
      ) : (
        <div className="admin-teachers__empty">
          <p>Không tìm thấy giáo viên nào</p>
        </div>
      )}
    </div>
  );
}
