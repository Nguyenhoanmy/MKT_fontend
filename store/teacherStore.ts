import { create } from 'zustand';
import { Teacher } from '@/data/teachers';
import { teacherService } from '@/services/teacher.service';

interface TeacherStore {
  teachers: Teacher[];
  isLoading: boolean;
  error: string | null;
  selectedTeacher: Teacher | null;

  // Actions
  fetchTeachers: () => Promise<void>;
  fetchTeacher: (id: string) => Promise<void>;
  createTeacher: (data: Omit<Teacher, 'id'>) => Promise<boolean>;
  updateTeacher: (id: string, data: Partial<Teacher>) => Promise<boolean>;
  deleteTeacher: (id: string) => Promise<boolean>;
  setSelectedTeacher: (teacher: Teacher | null) => void;
  clearError: () => void;
}

export const useTeacherStore = create<TeacherStore>((set, get) => ({
  teachers: [],
  isLoading: false,
  error: null,
  selectedTeacher: null,

  fetchTeachers: async () => {
    set({ isLoading: true, error: null });
    try {
      const teachers = await teacherService.getAllTeachers();
      set({ teachers, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch teachers';
      set({ error: message, isLoading: false });
    }
  },

  fetchTeacher: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const teacher = await teacherService.getTeacher(id);
      if (teacher) {
        set({ selectedTeacher: teacher, isLoading: false });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch teacher';
      set({ error: message, isLoading: false });
    }
  },

  createTeacher: async (data: Omit<Teacher, 'id'>) => {
    set({ isLoading: true, error: null });
    try {
      const newTeacher = await teacherService.createTeacher(data);
      if (newTeacher) {
        const { teachers } = get();
        set({ teachers: [...teachers, newTeacher], isLoading: false });
        return true;
      }
      return false;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create teacher';
      set({ error: message, isLoading: false });
      return false;
    }
  },

  updateTeacher: async (id: string, data: Partial<Teacher>) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await teacherService.updateTeacher(id, data);
      if (updated) {
        const { teachers, selectedTeacher } = get();
        const updatedTeachers = teachers.map(t => (t.id === id ? updated : t));
        set({
          teachers: updatedTeachers,
          selectedTeacher: selectedTeacher?.id === id ? updated : selectedTeacher,
          isLoading: false,
        });
        return true;
      }
      return false;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update teacher';
      set({ error: message, isLoading: false });
      return false;
    }
  },

  deleteTeacher: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const success = await teacherService.deleteTeacher(id);
      if (success) {
        const { teachers, selectedTeacher } = get();
        const updatedTeachers = teachers.filter(t => t.id !== id);
        set({
          teachers: updatedTeachers,
          selectedTeacher: selectedTeacher?.id === id ? null : selectedTeacher,
          isLoading: false,
        });
        return true;
      }
      return false;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete teacher';
      set({ error: message, isLoading: false });
      return false;
    }
  },

  setSelectedTeacher: (teacher: Teacher | null) => {
    set({ selectedTeacher: teacher });
  },

  clearError: () => {
    set({ error: null });
  },
}));
