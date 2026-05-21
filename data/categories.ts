export interface Category {
  id: string;
  name: string;
  icon: string;
  courseCount: number;
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: 'web', name: 'Web Development', icon: '🌐', courseCount: 128, color: '#4F46E5' },
  { id: 'mobile', name: 'Mobile App', icon: '📱', courseCount: 86, color: '#06B6D4' },
  { id: 'data', name: 'Data Science', icon: '📊', courseCount: 94, color: '#8B5CF6' },
  { id: 'design', name: 'UI/UX Design', icon: '🎨', courseCount: 72, color: '#EC4899' },
  { id: 'devops', name: 'DevOps & Cloud', icon: '☁️', courseCount: 61, color: '#F59E0B' },
  { id: 'security', name: 'Cybersecurity', icon: '🔐', courseCount: 45, color: '#EF4444' },
  { id: 'game', name: 'Game Dev', icon: '🎮', courseCount: 38, color: '#10B981' },
  { id: 'marketing', name: 'Marketing', icon: '📈', courseCount: 115, color: '#F97316' },
  { id: 'blockchain', name: 'Blockchain', icon: '⛓️', courseCount: 29, color: '#6366F1' },
  { id: 'ai', name: 'AI & ML', icon: '🤖', courseCount: 77, color: '#14B8A6' },
  { id: 'business', name: 'Business', icon: '💼', courseCount: 142, color: '#84CC16' },
  { id: 'language', name: 'Ngoại ngữ', icon: '🗣️', courseCount: 63, color: '#A78BFA' },
];
