export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  company: string;
  rating: number;
  quote: string;
  course: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Nguyễn Văn Hùng',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    role: 'Frontend Engineer',
    company: 'VNG Corporation',
    rating: 5,
    quote: 'Sau khi hoàn thành khóa React & Next.js, tôi đã được nhận vào VNG với mức lương tăng 80%. Chất lượng giảng dạy ở đây thực sự vượt xa những gì tôi mong đợi.',
    course: 'React & Next.js: Từ Zero đến Hero',
  },
  {
    id: 't2',
    name: 'Trần Thị Mai Linh',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    role: 'Data Scientist',
    company: 'Momo',
    rating: 5,
    quote: 'Khóa học Python Data Science rất thực tế. Từ một người không biết gì về ML, tôi đã có thể xây dựng model recommendation cho startup của mình chỉ sau 2 tháng.',
    course: 'Python cho Data Science & Machine Learning',
  },
  {
    id: 't3',
    name: 'Lê Quốc Bảo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    role: 'DevOps Engineer',
    company: 'Tiki',
    rating: 5,
    quote: 'Nội dung DevOps rất chuyên sâu và cập nhật theo industry trends. Instructor hỗ trợ rất nhiệt tình, giải đáp mọi thắc mắc trong vòng 24h.',
    course: 'DevOps với Docker & Kubernetes',
  },
];
