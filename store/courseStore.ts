'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LessonProgress {
  lessonId: string;
  completed: boolean;
  lastWatched: number; // seconds
}

interface CourseProgress {
  courseId: string;
  lessons: Record<string, LessonProgress>;
  completedPercent: number;
  currentLessonId: string | null;
}

interface CourseStore {
  progress: Record<string, CourseProgress>;
  markLessonComplete: (courseId: string, lessonId: string) => void;
  updateWatchTime: (courseId: string, lessonId: string, seconds: number) => void;
  setCurrentLesson: (courseId: string, lessonId: string) => void;
  getProgress: (courseId: string) => CourseProgress | undefined;
}

export const useCourseStore = create<CourseStore>()(
  persist(
    (set, get) => ({
      progress: {},

      markLessonComplete: (courseId, lessonId) =>
        set((state) => {
          const cp = state.progress[courseId] ?? { courseId, lessons: {}, completedPercent: 0, currentLessonId: null };
          const updated = {
            ...cp,
            lessons: {
              ...cp.lessons,
              [lessonId]: { lessonId, completed: true, lastWatched: cp.lessons[lessonId]?.lastWatched ?? 0 },
            },
          };
          const total = Object.keys(updated.lessons).length;
          const done = Object.values(updated.lessons).filter(l => l.completed).length;
          updated.completedPercent = Math.round((done / total) * 100);
          return { progress: { ...state.progress, [courseId]: updated } };
        }),

      updateWatchTime: (courseId, lessonId, seconds) =>
        set((state) => {
          const cp = state.progress[courseId] ?? { courseId, lessons: {}, completedPercent: 0, currentLessonId: null };
          return {
            progress: {
              ...state.progress,
              [courseId]: {
                ...cp,
                lessons: {
                  ...cp.lessons,
                  [lessonId]: { lessonId, completed: cp.lessons[lessonId]?.completed ?? false, lastWatched: seconds },
                },
              },
            },
          };
        }),

      setCurrentLesson: (courseId, lessonId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [courseId]: {
              ...state.progress[courseId] ?? { courseId, lessons: {}, completedPercent: 0 },
              currentLessonId: lessonId,
            },
          },
        })),

      getProgress: (courseId) => get().progress[courseId],
    }),
    { name: 'elearning-progress' }
  )
);
