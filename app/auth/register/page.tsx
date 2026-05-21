'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/auth.service';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirm: string;
  role: 'student' | 'instructor';
  agreed: boolean;
}

interface FormErrors { name?: string; email?: string; password?: string; confirm?: string; agreed?: string; }

export default function RegisterPage() {
  const router = useRouter();
  const { setUser, setLoading, isLoading } = useAuthStore();

  const [form, setForm] = useState<FormData>({
    name: '', email: '', password: '', confirm: '', role: 'student', agreed: false,
  });
  const [showPwd,  setShowPwd]  = useState(false);
  const [errors,   setErrors]   = useState<FormErrors>({});
  const [apiError, setApiError] = useState('');

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim() || form.name.length < 2) e.name = 'Tên phải có ít nhất 2 ký tự';
    if (!form.email.includes('@'))                   e.email = 'Email không hợp lệ';
    if (form.password.length < 6)                    e.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    if (form.password !== form.confirm)              e.confirm = 'Mật khẩu xác nhận không khớp';
    if (!form.agreed)                                e.agreed = 'Vui lòng đồng ý với điều khoản';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;
    setLoading(true);
    try {
      const user = await authService.register({ name: form.name, email: form.email, password: form.password, role: form.role });
      setUser(user);
      router.push('/');
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  const field = (key: keyof FormData) => ({
    value: form[key] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm(f => ({ ...f, [key]: e.target.value }));
      setErrors(err => ({ ...err, [key]: undefined }));
    },
  });

  const pwStrength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const pwColors   = ['', '#EF4444', '#F59E0B', '#10B981'];
  const pwLabels   = ['', 'Yếu', 'Trung bình', 'Mạnh'];

  return (
    <div className="auth-page">
      {/* Visual */}
      <div className="auth-page__visual">
        <div className="auth-page__visual-content">
          <div className="auth-page__visual-icon">🚀</div>
          <h2 className="auth-page__visual-title">Bắt đầu hành trình của bạn</h2>
          <p className="auth-page__visual-desc">
            Tham gia cùng 50,000+ học viên đang học tập và phát triển sự nghiệp với MKT.
          </p>
          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              '✓ Truy cập 1000+ khóa học chất lượng cao',
              '✓ Học theo tốc độ của bạn, mọi lúc mọi nơi',
              '✓ Chứng chỉ được công nhận bởi doanh nghiệp',
              '✓ Cộng đồng học viên hỗ trợ lẫn nhau',
            ].map(i => (
              <div key={i} style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', display: 'flex', gap: 8 }}>{i}</div>
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
          <h1 className="auth-page__form-title">Tạo tài khoản miễn phí</h1>
          <p className="auth-page__form-subtitle">
            Đã có tài khoản? <Link href="/auth/login" style={{ color: '#4F46E5', fontWeight: 600 }}>Đăng nhập</Link>
          </p>

          {apiError && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#DC2626', display: 'flex', gap: 8 }}>
              <AlertCircle size={15} /> {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Role selector */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Tôi muốn đăng ký với tư cách</label>
              <div className="role-selector">
                <div className="role-selector__option">
                  <input type="radio" id="role-student" name="role" value="student"
                    checked={form.role === 'student'} onChange={() => setForm(f => ({ ...f, role: 'student' }))} />
                  <label htmlFor="role-student">🎓 Học viên</label>
                </div>
                <div className="role-selector__option">
                  <input type="radio" id="role-instructor" name="role" value="instructor"
                    checked={form.role === 'instructor'} onChange={() => setForm(f => ({ ...f, role: 'instructor' }))} />
                  <label htmlFor="role-instructor">👨‍🏫 Giảng viên</label>
                </div>
              </div>
            </div>

            {/* Name */}
            <div className="form-group">
              <label htmlFor="reg-name">Họ và tên</label>
              <div className="input-wrapper">
                <User className="input-wrapper-icon" size={16} />
                <input id="reg-name" type="text" placeholder="Nguyễn Văn An"
                  className={`input${errors.name ? ' input--error' : ''}`} {...field('name')} />
              </div>
              {errors.name && <div className="input__error-msg"><AlertCircle size={12} /> {errors.name}</div>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="reg-email">Email</label>
              <div className="input-wrapper">
                <Mail className="input-wrapper-icon" size={16} />
                <input id="reg-email" type="email" placeholder="email@example.com"
                  className={`input${errors.email ? ' input--error' : ''}`} {...field('email')} />
              </div>
              {errors.email && <div className="input__error-msg"><AlertCircle size={12} /> {errors.email}</div>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="reg-password">Mật khẩu</label>
              <div className="input-wrapper">
                <Lock className="input-wrapper-icon" size={16} />
                <input id="reg-password" type={showPwd ? 'text' : 'password'} placeholder="Tối thiểu 6 ký tự"
                  className={`input${errors.password ? ' input--error' : ''}`} {...field('password')} />
                <button type="button" className="input-wrapper-toggle" onClick={() => setShowPwd(p => !p)}>
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password && (
                <div style={{ marginTop: 6 }}>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                    {[1,2,3].map(i => (
                      <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i <= pwStrength ? pwColors[pwStrength] : '#E5E7EB', transition: 'background 0.3s' }} />
                    ))}
                  </div>
                  <span style={{ fontSize: 11, color: pwColors[pwStrength] }}>{pwLabels[pwStrength]}</span>
                </div>
              )}
              {errors.password && <div className="input__error-msg"><AlertCircle size={12} /> {errors.password}</div>}
            </div>

            {/* Confirm */}
            <div className="form-group">
              <label htmlFor="reg-confirm">Xác nhận mật khẩu</label>
              <div className="input-wrapper">
                <Lock className="input-wrapper-icon" size={16} />
                <input id="reg-confirm" type="password" placeholder="Nhập lại mật khẩu"
                  className={`input${errors.confirm ? ' input--error' : ''}`} {...field('confirm')} />
                {form.confirm && form.confirm === form.password && (
                  <CheckCircle size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#10B981' }} />
                )}
              </div>
              {errors.confirm && <div className="input__error-msg"><AlertCircle size={12} /> {errors.confirm}</div>}
            </div>

            {/* Terms */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', cursor: 'pointer', fontSize: 13, color: '#4B5563' }}>
                <input type="checkbox" checked={form.agreed}
                  onChange={e => { setForm(f => ({ ...f, agreed: e.target.checked })); setErrors(err => ({ ...err, agreed: undefined })); }}
                  style={{ marginTop: 2, accentColor: '#4F46E5' }} />
                <span>Tôi đồng ý với <Link href="/terms" style={{ color: '#4F46E5' }}>Điều khoản sử dụng</Link> và <Link href="/privacy" style={{ color: '#4F46E5' }}>Chính sách bảo mật</Link></span>
              </label>
              {errors.agreed && <div className="input__error-msg" style={{ marginTop: 4 }}><AlertCircle size={12} /> {errors.agreed}</div>}
            </div>

            <button type="submit" id="register-submit" className="btn btn--primary btn--lg btn--full" disabled={isLoading}>
              {isLoading ? 'Đang tạo tài khoản...' : '🚀 Tạo tài khoản miễn phí'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
