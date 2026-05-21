'use client';
import { useEffect, useState } from 'react';
import { useTeacherStore } from '@/store/teacherStore';
import TeacherCard from '@/components/ui/TeacherCard';
import { Search } from 'lucide-react';

export default function TeachersPage() {
  const { teachers, isLoading, fetchTeachers } = useTeacherStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const uniqueSpecializations = Array.from(
    new Set(teachers.flatMap(t => t.specialization))
  ).sort();

  const filteredTeachers = teachers.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSpec = !selectedSpec || t.specialization.includes(selectedSpec);

    return matchesSearch && matchesSpec && t.status === 'active';
  });

  return (
    <div className="teachers-page">
      {/* Hero */}
      <section className="teachers-page__hero">
        <div className="container">
          <h1 className="teachers-page__title">Đội ngũ Giáo viên Chuyên Gia</h1>
          <p className="teachers-page__subtitle">
            Những chuyên gia từ các công ty hàng đầu thế giới - Google, Meta, Shopee, và nhiều hơn nữa
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="teachers-page__filters">
        <div className="container">
          <div className="teachers-page__search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm giáo viên..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="teachers-page__search-input"
            />
          </div>

          <div className="teachers-page__specializations">
            <button
              className={`teachers-page__spec-btn ${!selectedSpec ? 'active' : ''}`}
              onClick={() => setSelectedSpec(null)}
            >
              Tất cả
            </button>
            {uniqueSpecializations.map(spec => (
              <button
                key={spec}
                className={`teachers-page__spec-btn ${selectedSpec === spec ? 'active' : ''}`}
                onClick={() => setSelectedSpec(spec)}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="teachers-page__content">
        <div className="container">
          {isLoading ? (
            <div className="teachers-page__loading">Đang tải...</div>
          ) : filteredTeachers.length > 0 ? (
            <>
              <p className="teachers-page__count">Tìm thấy {filteredTeachers.length} giáo viên</p>
              <div className="teachers-page__grid">
                {filteredTeachers.map(teacher => (
                  <TeacherCard
                    key={teacher.id}
                    teacher={teacher}
                    isAdmin={false}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="teachers-page__empty">
              <p>Không tìm thấy giáo viên nào phù hợp</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
