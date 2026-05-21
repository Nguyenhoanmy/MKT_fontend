export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  specialization: string[];
  experience: number;
  courses: string[];
  rating: number;
  students: number;
  joinDate: string;
  status: 'active' | 'inactive' | 'pending';
}

export const TEACHERS: Teacher[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    email: 'teacher1@mkt.com',
    phone: '0912345678',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher1',
    bio: 'Senior Full Stack Developer tại Google',
    specialization: ['React', 'Next.js', 'Node.js'],
    experience: 8,
    courses: ['1', '2'],
    rating: 4.8,
    students: 1250,
    joinDate: '2023-01-15',
    status: 'active',
  },
  {
    id: '2',
    name: 'Trần Thị B',
    email: 'teacher2@mkt.com',
    phone: '0987654321',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher2',
    bio: 'UI/UX Designer tại Meta',
    specialization: ['UI Design', 'UX Design', 'Figma'],
    experience: 6,
    courses: ['3'],
    rating: 4.7,
    students: 890,
    joinDate: '2023-03-10',
    status: 'active',
  },
  {
    id: '3',
    name: 'Lê Minh C',
    email: 'teacher3@mkt.com',
    phone: '0933333333',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher3',
    bio: 'Data Science Engineer tại Shopee',
    specialization: ['Python', 'Data Science', 'Machine Learning'],
    experience: 5,
    courses: ['4', '5'],
    rating: 4.9,
    students: 2100,
    joinDate: '2023-05-20',
    status: 'active',
  },
];
