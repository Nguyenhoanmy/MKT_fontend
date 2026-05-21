'use client';
import Image from 'next/image';
import { Teacher } from '@/data/teachers';
import { Star, Mail, Phone, Briefcase } from 'lucide-react';

interface TeacherCardProps {
  teacher: Teacher;
  onEdit?: (teacher: Teacher) => void;
  onDelete?: (teacherId: string) => void;
  isAdmin?: boolean;
}

export default function TeacherCard({
  teacher,
  onEdit,
  onDelete,
  isAdmin = false,
}: TeacherCardProps) {
  return (
    <div className="teacher-card">
      <div className="teacher-card__header">
        {teacher.avatar && (
          <div className="teacher-card__avatar">
            <img
              src={teacher.avatar}
              alt={teacher.name}
              style={{ width: '100%', height: '100%', borderRadius: '50%' }}
            />
          </div>
        )}
        <div className="teacher-card__info">
          <h3 className="teacher-card__name">{teacher.name}</h3>
          <p className="teacher-card__specialization">{teacher.specialization.join(', ')}</p>
          <div className="teacher-card__rating">
            <Star size={14} fill="#F59E0B" color="#F59E0B" />
            <span>{teacher.rating}</span>
          </div>
        </div>
        {teacher.status && (
          <span
            className={`teacher-card__status teacher-card__status--${teacher.status}`}
          >
            {teacher.status === 'active'
              ? 'Hoạt động'
              : teacher.status === 'inactive'
                ? 'Tạm khóa'
                : 'Chờ duyệt'}
          </span>
        )}
      </div>

      {teacher.bio && <p className="teacher-card__bio">{teacher.bio}</p>}

      <div className="teacher-card__stats">
        <div className="teacher-card__stat">
          <Briefcase size={16} />
          <span>{teacher.experience} năm kinh nghiệm</span>
        </div>
        <div className="teacher-card__stat">
          <span>👥 {teacher.students} học viên</span>
        </div>
        <div className="teacher-card__stat">
          <span>📚 {teacher.courses.length} khóa học</span>
        </div>
      </div>

      <div className="teacher-card__contact">
        {teacher.email && (
          <a href={`mailto:${teacher.email}`} className="teacher-card__contact-link">
            <Mail size={14} />
            {teacher.email}
          </a>
        )}
        {teacher.phone && (
          <a href={`tel:${teacher.phone}`} className="teacher-card__contact-link">
            <Phone size={14} />
            {teacher.phone}
          </a>
        )}
      </div>

      {isAdmin && (
        <div className="teacher-card__actions">
          {onEdit && (
            <button
              className="teacher-card__btn teacher-card__btn--edit"
              onClick={() => onEdit(teacher)}
            >
              Sửa
            </button>
          )}
          {onDelete && (
            <button
              className="teacher-card__btn teacher-card__btn--delete"
              onClick={() => onDelete(teacher.id)}
            >
              Xóa
            </button>
          )}
        </div>
      )}
    </div>
  );
}
