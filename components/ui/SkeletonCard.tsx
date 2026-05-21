export default function SkeletonCard() {
  return (
    <div className="course-card course-card--skeleton">
      <div className="course-card__image-wrap" />
      <div className="course-card__body" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div className="course-card__category" style={{ width: 70 }} />
        <div className="course-card__title" style={{ height: 16 }} />
        <div className="course-card__title-2" />
        <div className="course-card__instructor" style={{ width: 110 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <div className="course-card__price" style={{ width: 80 }} />
          <div style={{ width: 50, height: 18, background: '#e5e7eb', borderRadius: 999, animation: 'skeleton-shimmer 1.5s infinite', backgroundSize: '200% 100%', backgroundImage: 'linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%)' }} />
        </div>
      </div>
    </div>
  );
}
