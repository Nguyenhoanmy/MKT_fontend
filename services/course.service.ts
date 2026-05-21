import { apiGet } from './apiClient';
import { COURSES, getCourseBySlug, getFeaturedCourses, type Course } from '@/data/courses';
import { CATEGORIES } from '@/data/categories';

export const courseService = {
  async getAll(): Promise<Course[]> {
    return apiGet(COURSES);
  },

  async getFeatured(): Promise<Course[]> {
    return apiGet(getFeaturedCourses());
  },

  async getBySlug(slug: string): Promise<Course | null> {
    return apiGet(getCourseBySlug(slug));
  },

  async getByCategory(category: string): Promise<Course[]> {
    const filtered = COURSES.filter(c => c.category === category);
    return apiGet(filtered);
  },

  async search(query: string): Promise<Course[]> {
    const q = query.toLowerCase();
    const results = COURSES.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.instructor.name.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q))
    );
    return apiGet(results, 200);
  },

  async getCategories() {
    return apiGet(CATEGORIES, 300);
  },
};
