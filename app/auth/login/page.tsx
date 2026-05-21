'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/auth.service';

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setLoading, isLoading } = useAuthStore();

  const [email,    setEmail]    = useState('student@demo.com');
  const [password, setPassword] = useState('password123');
  const [showPwd,  setShowPwd]  = useState(false);
  const [error,    setError]    = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Vui lòng điền đầy đủ thông tin'); return; }
    setLoading(true);
    try {
      const user = await authService.login({ email, password });
      setUser(user);
      router.push('/');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Visual Panel */}
      <div className="auth-page__visual">
        <div className="auth-page__visual-content">
          <div className="auth-page__visual-icon">🎓</div>
          <h2 className="auth-page__visual-title">Chào mừng trở lại!</h2>
          <p className="auth-page__visual-desc">
            Đăng nhập để tiếp tục hành trình học tập của bạn và truy cập tất cả các khóa học đã đăng ký.
          </p>
          <div className="auth-page__visual-stats">
            {[{ number: '50K+', label: 'Học viên' }, { number: '1K+', label: 'Khóa học' }, { number: '4.9★', label: 'Đánh giá' }].map(s => (
              <div key={s.label} className="auth-page__visual-stat">
                <div className="auth-page__visual-stat-number">{s.number}</div>
                <div className="auth-page__visual-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="auth-page__form-wrap">
        <div className="auth-page__form">
          <div className="auth-page__form-logo">
            <div className="auth-page__form-logo-icon">M</div>
            <span className="auth-page__form-logo-text">MKT</span>
          </div>
          <h1 className="auth-page__form-title">Đăng nhập</h1>
          <p className="auth-page__form-subtitle">
            Chưa có tài khoản? <Link href="/auth/register" style={{ color: '#4F46E5', fontWeight: 600 }}>Đăng ký miễn phí</Link>
          </p>

          {/* Demo hint */}
          <div style={{ background: '#F0FDF4', border: '1px solid #A7F3D0', borderRadius: 10, padding: '10px 14px', marginBottom: 20, fontSize: 12, color: '#047857' }}>
            💡 <strong>Demo:</strong> student@demo.com / password123 (bất kỳ ≥6 ký tự)
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {error && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#DC2626', display: 'flex', gap: 8, alignItems: 'center' }}>
                <AlertCircle size={15} /> {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="login-email">Email</label>
              <div className="input-wrapper">
                <Mail className="input-wrapper-icon" size={16} />
                <input id="login-email" type="email" className="input" placeholder="email@example.com"
                  value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="login-password" style={{ display: 'flex', justifyContent: 'space-between' }}>
                Mật khẩu
                <Link href="/auth/forgot-password" style={{ fontSize: 12, color: '#4F46E5' }}>Quên mật khẩu?</Link>
              </label>
              <div className="input-wrapper">
                <Lock className="input-wrapper-icon" size={16} />
                <input id="login-password" type={showPwd ? 'text' : 'password'} className="input"
                  placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
                <button type="button" className="input-wrapper-toggle" onClick={() => setShowPwd(p => !p)} aria-label="Hiện/ẩn mật khẩu">
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" id="login-submit" className="btn btn--primary btn--lg btn--full" disabled={isLoading}>
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          <div className="auth-divider">hoặc</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: '🔵 Tiếp tục với Google', bg: '#fff', color: '#111827', border: '1.5px solid #E5E7EB' },
              { label: '🔷 Tiếp tục với GitHub', bg: '#24292E', color: '#fff', border: 'none' },
            ].map(btn => (
              <button key={btn.label} className="btn btn--lg"
                style={{ background: btn.bg, color: btn.color, border: btn.border, fontWeight: 600, width: '100%' }}
                onClick={() => alert('OAuth chưa được tích hợp trong demo này')}>
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
