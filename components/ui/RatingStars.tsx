import { Star, StarHalf } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: number;
}

export default function RatingStars({ rating, reviewCount, size = 14 }: RatingStarsProps) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  return (
    <div className="rating">
      {Array.from({ length: full  }).map((_, i) => <Star  key={`f${i}`} size={size} className="rating__star rating__star--filled" fill="currentColor" />)}
      {half === 1 && <StarHalf size={size} className="rating__star rating__star--half" fill="currentColor" />}
      {Array.from({ length: empty }).map((_, i) => <Star  key={`e${i}`} size={size} className="rating__star" />)}
      {reviewCount !== undefined && (
        <span className="rating__count">({reviewCount.toLocaleString('vi-VN')})</span>
      )}
    </div>
  );
}
