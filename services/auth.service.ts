import { apiPost } from './apiClient';

export interface LoginPayload { email: string; password: string; }
export interface RegisterPayload { name: string; email: string; password: string; role: 'student' | 'instructor'; }

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  phone?: string;
  bio?: string;
  enrolledCourses: string[];
  createdAt?: string;
}

const MOCK_USERS: AuthUser[] = [
  {
    id: 'u1',
    name: 'Nguyễn Văn An',
    email: 'student@demo.com',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    phone: '0912345678',
    bio: 'Sinh viên năm cuối, đam mê lập trình web',
    enrolledCourses: ['1', '3', '5'],
    createdAt: '2023-01-15',
  },
  {
    id: 'u2',
    name: 'Nguyễn Minh Tuấn',
    email: 'instructor@demo.com',
    role: 'instructor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    phone: '0987654321',
    bio: 'Giảng viên chuyên trách',
    enrolledCourses: [],
    createdAt: '2022-06-20',
  },
  {
    id: 'u3',
    name: 'Admin',
    email: 'admin@demo.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    phone: '0911111111',
    enrolledCourses: [],
    createdAt: '2021-01-01',
  },
];

export const authService = {
  async login({ email, password }: LoginPayload): Promise<AuthUser> {
    const user = MOCK_USERS.find(u => u.email === email);
    if (!user) throw new Error('Email không tồn tại');
    if (password.length < 6) throw new Error('Mật khẩu không đúng');
    return apiPost(user);
  },

  async register(payload: RegisterPayload): Promise<AuthUser> {
    const newUser: AuthUser = {
      id: `u${Date.now()}`,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(payload.name)}&background=4F46E5&color=fff`,
      phone: '',
      bio: '',
      enrolledCourses: [],
      createdAt: new Date().toISOString().split('T')[0],
    };
    return apiPost(newUser);
  },

  async logout(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 200));
  },
};
