'use client';
import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Play, Pause, Volume2, VolumeX, Maximize, CheckCircle, ChevronLeft, ChevronRight, FileText, MessageSquare, BookOpen } from 'lucide-react';
import { courseService } from '@/services/course.service';
import { useAuthStore } from '@/store/authStore';
import { useCourseStore } from '@/store/courseStore';
import type { Lesson } from '@/data/courses';

const SAMPLE_VIDEO = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function LearnPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { markLessonComplete, getProgress } = useCourseStore();

  const [currentLesson,  setCurrentLesson]  = useState<Lesson | null>(null);
  const [activeTab,      setActiveTab]       = useState<'overview' | 'notes' | 'qa'>('overview');
  const [note,           setNote]            = useState('');
  const [isPlaying,      setIsPlaying]       = useState(false);
  const [isMuted,        setIsMuted]         = useState(false);
  const [progress,       setProgress]        = useState(0);
  const [currentTime,    setCurrentTime]     = useState(0);
  const [duration,       setDuration]        = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { data: course, isLoading } = useQuery({
    queryKey: ['course-learn', courseId],
    queryFn: async () => {
      const all = await courseService.getAll();
      return all.find(c => c.id === courseId) ?? null;
    },
  });

  const courseProgress = course ? getProgress(course.id) : undefined;

  // Auth guard
  useEffect(() => {
    if (!isAuthenticated) router.push('/auth/login');
  }, [isAuthenticated, router]);

  // Set first lesson
  useEffect(() => {
    if (course && !currentLesson) {
      setCurrentLesson(course.curriculum[0]?.lessons[0] ?? null);
    }
  }, [course, currentLesson]);

  // Video events
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime: ct, duration: d } = videoRef.current;
    setCurrentTime(ct);
    setDuration(d || 1);
    setProgress((ct / (d || 1)) * 100);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause(); else videoRef.current.play();
    setIsPlaying(p => !p);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(p => !p);
  };

  const seekTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = (parseFloat(e.target.value) / 100) * duration;
  };

  const handleFullscreen = () => {
    if (videoRef.current) videoRef.current.requestFullscreen?.();
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const allLessons = course?.curriculum.flatMap(s => s.lessons) ?? [];
  const currentIdx  = allLessons.findIndex(l => l.id === currentLesson?.id);

  const goToLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setIsPlaying(false);
    setProgress(0);
    if (videoRef.current) { videoRef.current.currentTime = 0; videoRef.current.pause(); }
  };

  const handleComplete = () => {
    if (course && currentLesson) {
      markLessonComplete(course.id, currentLesson.id);
      // Auto-advance
      const next = allLessons[currentIdx + 1];
      if (next) goToLesson(next);
    }
  };

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="spinner" />
    </div>
  );
  if (!course) return null;

  const completedIds = new Set(
    Object.values(courseProgress?.lessons ?? {}).filter(l => l.completed).map(l => l.lessonId)
  );
  const totalLessons = allLessons.length;
  const doneCount    = completedIds.size;
  const pct          = totalLessons ? Math.round((doneCount / totalLessons) * 100) : 0;

  return (
    <div className="learn-layout">
      {/* ── Lesson Sidebar ── */}
      <aside className="lesson-sidebar">
        <div className="lesson-sidebar__header">
          <h3>{course.title}</h3>
          <div className="lesson-sidebar__progress">
            <span>{doneCount}/{totalLessons} bài đã hoàn thành</span>
            <span>{pct}%</span>
          </div>
          <div className="lesson-sidebar__progress-bar">
            <span style={{ width: `${pct}%` }} />
          </div>
        </div>

        {course.curriculum.map(section => (
          <div key={section.id}>
            <div className="lesson-sidebar__section-title">
              {section.title}
              <span>{section.lessons.length} bài</span>
            </div>
            {section.lessons.map(lesson => (
              <div
                key={lesson.id}
                className={`lesson-sidebar__lesson${currentLesson?.id === lesson.id ? ' lesson-sidebar__lesson--active' : ''}${completedIds.has(lesson.id) ? ' lesson-sidebar__lesson--completed' : ''}`}
                onClick={() => goToLesson(lesson)}
              >
                <div className="lesson-sidebar__lesson-check">
                  {completedIds.has(lesson.id) ? <CheckCircle size={12} /> : ''}
                </div>
                <div className="lesson-sidebar__lesson-info">
                  <div className="lesson-sidebar__lesson-title">{lesson.title}</div>
                  <div className="lesson-sidebar__lesson-meta">
                    {lesson.type === 'quiz' ? '📝' : <Play size={10} />}
                    <span>{lesson.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </aside>

      {/* ── Video Area ── */}
      <div className="video-area">
        {/* Player */}
        <div className="video-area__player-wrap">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            ref={videoRef}
            src={SAMPLE_VIDEO}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleTimeUpdate}
            onEnded={handleComplete}
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Seeker */}
        <div style={{ background: '#1a1a2e', padding: '4px 16px' }}>
          <input
            type="range" min={0} max={100}
            value={progress}
            onChange={seekTo}
            className="video-area__seeker"
            style={{ width: '100%' }}
          />
        </div>

        {/* Controls */}
        <div className="video-area__controls">
          <div className="video-area__controls-left">
            <button className="video-area__controls-btn" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button className="video-area__controls-btn" onClick={toggleMute} aria-label="Mute">
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <span className="video-area__controls-time">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 500, textAlign: 'center', flex: 1 }}>
            {currentLesson?.title}
          </div>
          <div className="video-area__controls-right">
            {currentIdx > 0 && (
              <button className="video-area__controls-btn" onClick={() => goToLesson(allLessons[currentIdx - 1])} title="Bài trước">
                <ChevronLeft size={16} />
              </button>
            )}
            <button className="video-area__controls-btn video-area__controls-btn--active" onClick={handleComplete} title="Đánh dấu hoàn thành">
              <CheckCircle size={16} />
            </button>
            {currentIdx < allLessons.length - 1 && (
              <button className="video-area__controls-btn" onClick={() => goToLesson(allLessons[currentIdx + 1])} title="Bài tiếp theo">
                <ChevronRight size={16} />
              </button>
            )}
            <button className="video-area__controls-btn" onClick={handleFullscreen} title="Toàn màn hình">
              <Maximize size={16} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="video-area__tabs">
          {[
            { key: 'overview', label: 'Tổng quan',  icon: <BookOpen size={14} /> },
            { key: 'notes',    label: 'Ghi chú',    icon: <FileText size={14} /> },
            { key: 'qa',       label: 'Hỏi & Đáp',  icon: <MessageSquare size={14} /> },
          ].map(tab => (
            <button
              key={tab.key}
              className={`video-area__tabs-btn${activeTab === tab.key ? ' video-area__tabs-btn--active' : ''}`}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="video-area__tab-content">
          {activeTab === 'overview' && (
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{currentLesson?.title}</h3>
              <p style={{ color: '#6B7280', lineHeight: 1.7 }}>
                {course.description}
              </p>
              <div style={{ marginTop: 20, padding: 16, background: '#F0FDF4', borderRadius: 12, border: '1px solid #BBF7D0' }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: '#065F46', marginBottom: 8 }}>📌 Trong bài này bạn sẽ học:</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {course.outcomes.slice(0, 4).map((o, i) => (
                    <li key={i} style={{ fontSize: 13, color: '#047857', display: 'flex', gap: 6 }}>
                      <CheckCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} /> {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="video-area__notes">
              <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 12 }}>Ghi chú tại thời điểm <strong>{formatTime(currentTime)}</strong></p>
              <textarea
                className="video-area__notes-area"
                placeholder="Nhập ghi chú của bạn tại đây..."
                value={note}
                onChange={e => setNote(e.target.value)}
              />
              <button className="btn btn--primary btn--sm video-area__notes-save"
                onClick={() => alert('Đã lưu ghi chú!')}>
                Lưu ghi chú
              </button>
            </div>
          )}

          {activeTab === 'qa' && (
            <div>
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6B7280' }}>
                <MessageSquare size={40} style={{ margin: '0 auto 12px', color: '#D1D5DB' }} />
                <p style={{ fontSize: 14 }}>Chưa có câu hỏi nào. Hãy là người đầu tiên đặt câu hỏi!</p>
                <button className="btn btn--primary btn--sm" style={{ marginTop: 16 }}>
                  Đặt câu hỏi mới
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
