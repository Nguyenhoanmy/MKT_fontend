'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { courseService } from '@/services/course.service';
import CourseCard from '@/components/ui/CourseCard';
import SkeletonCard from '@/components/ui/SkeletonCard';
import type { Course } from '@/data/courses';

const LEVELS    = ['Tất cả', 'Cơ bản', 'Trung cấp', 'Nâng cao'];
const PRICE_OPT = ['Tất cả', 'Miễn phí', 'Có phí'];
const RATINGS   = ['4.5+', '4.0+', '3.5+'];
const SORT_OPT  = [
  { label: 'Phổ biến nhất',    value: 'popular'    },
  { label: 'Đánh giá cao nhất', value: 'rating'    },
  { label: 'Mới nhất',         value: 'newest'     },
  { label: 'Giá thấp nhất',    value: 'price-asc'  },
  { label: 'Giá cao nhất',     value: 'price-desc' },
];

export default function CoursesPage() {
  const [sort,          setSort]          = useState('popular');
  const [levelFilter,   setLevelFilter]   = useState('Tất cả');
  const [priceFilter,   setPriceFilter]   = useState('Tất cả');
  const [minRating,     setMinRating]     = useState<number | null>(null);
  const [selectedCats,  setSelectedCats]  = useState<string[]>([]);
  const [page,          setPage]          = useState(1);
  const [showFilter,    setShowFilter]    = useState(false);
  const PER_PAGE = 9;

  const { data: allCourses, isLoading } = useQuery({
    queryKey: ['courses', 'all'],
    queryFn: () => courseService.getAll(),
  });
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => courseService.getCategories(),
  });

  const LEVEL_MAP: Record<string, string> = { 'Cơ bản': 'beginner', 'Trung cấp': 'intermediate', 'Nâng cao': 'advanced' };

  const filtered: Course[] = (allCourses ?? []).filter(c => {
    if (levelFilter !== 'Tất cả' && c.level !== LEVEL_MAP[levelFilter]) return false;
    if (priceFilter === 'Miễn phí' && c.price !== 0) return false;
    if (priceFilter === 'Có phí'   && c.price === 0) return false;
    if (minRating && c.rating < minRating) return false;
    if (selectedCats.length && !selectedCats.includes(c.category)) return false;
    return true;
  }).sort((a, b) => {
    if (sort === 'rating')    return b.rating - a.rating;
    if (sort === 'price-asc') return a.price  - b.price;
    if (sort === 'price-desc')return b.price  - a.price;
    return b.studentCount - a.studentCount;
  });

  const totalPages   = Math.ceil(filtered.length / PER_PAGE);
  const paginated    = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const toggleCat    = (name: string) =>
    setSelectedCats(prev => prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]);

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      {/* Page Header */}
      <div style={{ background: 'linear-gradient(135deg,#0F172A 0%,#1E1B4B 100%)', padding: '48px 0 40px' }}>
        <div className="container">
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Tất cả khóa học</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16 }}>
            Khám phá {allCourses?.length ?? 0}+ khóa học từ các chuyên gia hàng đầu
          </p>
        </div>
      </div>

      <div className="courses-page">
        {/* Filter Sidebar — Desktop */}
        <aside className="courses-filter">
          <div className="courses-filter__title">
            <span>Bộ lọc</span>
            {(levelFilter !== 'Tất cả' || priceFilter !== 'Tất cả' || minRating || selectedCats.length > 0) && (
              <button className="btn btn--ghost btn--sm" style={{ fontSize: 12, color: '#EF4444' }}
                onClick={() => { setLevelFilter('Tất cả'); setPriceFilter('Tất cả'); setMinRating(null); setSelectedCats([]); }}>
                Xóa tất cả
              </button>
            )}
          </div>

          {/* Category */}
          <div className="courses-filter__section">
            <div className="courses-filter__label">Danh mục</div>
            {categories?.map(cat => (
              <label key={cat.id} className="courses-filter__option">
                <input type="checkbox" checked={selectedCats.includes(cat.name)}
                  onChange={() => toggleCat(cat.name)} />
                <span>{cat.icon} {cat.name} ({cat.courseCount})</span>
              </label>
            ))}
          </div>

          {/* Level */}
          <div className="courses-filter__section">
            <div className="courses-filter__label">Cấp độ</div>
            {LEVELS.map(l => (
              <label key={l} className="courses-filter__option">
                <input type="radio" name="level" checked={levelFilter === l} onChange={() => setLevelFilter(l)} />
                <span>{l}</span>
              </label>
            ))}
          </div>

          {/* Price */}
          <div className="courses-filter__section">
            <div className="courses-filter__label">Học phí</div>
            {PRICE_OPT.map(p => (
              <label key={p} className="courses-filter__option">
                <input type="radio" name="price" checked={priceFilter === p} onChange={() => setPriceFilter(p)} />
                <span>{p}</span>
              </label>
            ))}
          </div>

          {/* Rating */}
          <div className="courses-filter__section">
            <div className="courses-filter__label">Đánh giá tối thiểu</div>
            {RATINGS.map(r => {
              const val = parseFloat(r);
              return (
                <label key={r} className="courses-filter__option">
                  <input type="radio" name="rating" checked={minRating === val} onChange={() => setMinRating(val)} />
                  <span>{'★'.repeat(Math.floor(val))} {r}</span>
                </label>
              );
            })}
            {minRating && (
              <button className="btn btn--ghost btn--sm" style={{ fontSize: 12 }} onClick={() => setMinRating(null)}>Bỏ lọc rating</button>
            )}
          </div>
        </aside>

        {/* Main content */}
        <div className="courses-main">
          <div className="courses-main__header">
            <div className="courses-main__count">
              Hiển thị <span>{filtered.length}</span> khóa học
            </div>
            <div className="courses-main__sort">
              <span>Sắp xếp:</span>
              <select value={sort} onChange={e => { setSort(e.target.value); setPage(1); }}>
                {SORT_OPT.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          <div className="courses-main__grid">
            {isLoading
              ? Array.from({ length: PER_PAGE }).map((_, i) => <SkeletonCard key={i} />)
              : paginated.map(course => <CourseCard key={course.id} course={course} />)
            }
          </div>

          {!isLoading && filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: '#6B7280' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <h3 style={{ fontSize: 20, marginBottom: 8 }}>Không tìm thấy khóa học</h3>
              <p>Thử điều chỉnh bộ lọc để xem kết quả khác.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="courses-main__pagination">
              {page > 1 && (
                <button className="courses-main__page-btn" onClick={() => setPage(p => p - 1)}>←</button>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} className={`courses-main__page-btn${p === page ? ' courses-main__page-btn--active' : ''}`}
                  onClick={() => setPage(p)}>{p}</button>
              ))}
              {page < totalPages && (
                <button className="courses-main__page-btn" onClick={() => setPage(p => p + 1)}>→</button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
