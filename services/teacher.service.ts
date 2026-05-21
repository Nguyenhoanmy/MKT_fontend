import { Teacher } from '@/data/teachers';

// Simulate API calls
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const teacherService = {
  // Get all teachers
  async getAllTeachers(): Promise<Teacher[]> {
    try {
      const response = await fetch(`${API_BASE}/teachers`);
      if (!response.ok) throw new Error('Failed to fetch teachers');
      return response.json();
    } catch (error) {
      console.error('Error fetching teachers:', error);
      return [];
    }
  },

  // Get single teacher
  async getTeacher(id: string): Promise<Teacher | null> {
    try {
      const response = await fetch(`${API_BASE}/teachers/${id}`);
      if (!response.ok) throw new Error('Failed to fetch teacher');
      return response.json();
    } catch (error) {
      console.error('Error fetching teacher:', error);
      return null;
    }
  },

  // Create teacher
  async createTeacher(data: Omit<Teacher, 'id'>): Promise<Teacher | null> {
    try {
      const response = await fetch(`${API_BASE}/teachers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create teacher');
      return response.json();
    } catch (error) {
      console.error('Error creating teacher:', error);
      return null;
    }
  },

  // Update teacher
  async updateTeacher(id: string, data: Partial<Teacher>): Promise<Teacher | null> {
    try {
      const response = await fetch(`${API_BASE}/teachers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update teacher');
      return response.json();
    } catch (error) {
      console.error('Error updating teacher:', error);
      return null;
    }
  },

  // Delete teacher
  async deleteTeacher(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE}/teachers/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete teacher');
      return true;
    } catch (error) {
      console.error('Error deleting teacher:', error);
      return false;
    }
  },

  // Get teacher by email
  async getTeacherByEmail(email: string): Promise<Teacher | null> {
    try {
      const response = await fetch(`${API_BASE}/teachers/email/${email}`);
      if (!response.ok) throw new Error('Failed to fetch teacher');
      return response.json();
    } catch (error) {
      console.error('Error fetching teacher:', error);
      return null;
    }
  },
};
