# ⚡ Quick Start Guide

## 🎯 5 Phút Setup Project

Theo dõi các bước dưới đây để setup và chạy project trong 5 phút:

### 1️⃣ Clone & Install
```bash
git clone https://github.com/your-username/mkt-frontend.git
cd mkt-frontend
npm install
```

### 2️⃣ Tạo Environment File
```bash
# Copy template
cp .env.example .env.local

# Mở và chỉnh sửa (optional cho dev local)
# - Có thể để trống hoặc giữ giá trị mặc định
# - Chỉ thay đổi nếu cần dùng external services
```

### 3️⃣ Start Development Server
```bash
npm run dev
```

### 4️⃣ Mở Browser
```
http://localhost:3000
```

### 5️⃣ Bắt đầu Code! 🚀

---

## 🧪 Test Tài Khoản Demo

### Student Account
```
Email: student@demo.com
Password: password (or any 6+ chars)
```

### Instructor Account
```
Email: instructor@demo.com
Password: password
```

### Admin Account
```
Email: admin@demo.com
Password: password
```

---

## 📂 Cấu Trúc Project

```
mkt-frontend/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Trang chủ
│   ├── courses/             # Danh sách khóa học
│   ├── learn/               # Trang học
│   ├── profile/             # Hồ sơ cá nhân
│   ├── my-courses/          # Khóa học của tôi
│   ├── teachers/            # Danh sách giáo viên
│   ├── admin/               # Admin panel
│   └── auth/                # Trang login/register
├── components/              # React components
│   ├── layout/              # Header, Footer
│   ├── ui/                  # UI components
│   └── *.tsx                # Page-specific components
├── services/                # API services
├── store/                   # Zustand stores
├── styles/                  # SCSS
├── data/                    # Mock data
├── public/                  # Static assets
├── .env.example            # Environment template ✅
├── .env.local              # Local env (git ignored) ❌
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
└── README.md               # Project docs
```

---

## 🚀 Useful Commands

```bash
# Development
npm run dev              # Start dev server (port 3000)
npm run dev -- -p 3001  # Run on different port

# Build
npm run build           # Create production build
npm run start           # Run production build

# Linting & Formatting
npm run lint            # Run ESLint
npm run format          # Format code with Prettier (if available)

# Type checking
npm run type-check      # Run TypeScript compiler

# Cleaning
rm -rf .next node_modules
npm install
npm run build
```

---

## 🔍 Project Features

### ✅ Implemented
- [x] Trang chủ (home page)
- [x] Danh sách khóa học (courses listing)
- [x] Chi tiết khóa học (course detail)
- [x] Trang học (learning page)
- [x] Authentication (login/register)
- [x] Hồ sơ cá nhân (user profile)
- [x] Khóa học của tôi (my courses)
- [x] Quản lý giáo viên (admin)
- [x] Danh sách giáo viên (teachers listing)
- [x] Responsive design
- [x] SCSS styling

### 🚧 In Progress / TODO
- [ ] Backend API integration
- [ ] Database (MongoDB)
- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Social features (comments, discussions)
- [ ] Certificate generation
- [ ] Analytics dashboard
- [ ] Advanced search & filters

---

## 📚 Documentation

- [**ENV_SETUP.md**](ENV_SETUP.md) - Environment variables guide
- [**TEACHER_MANAGEMENT.md**](TEACHER_MANAGEMENT.md) - Teacher management system
- [**PROFILE_PAGE.md**](PROFILE_PAGE.md) - User profile documentation
- [**MY_COURSES.md**](MY_COURSES.md) - My courses page documentation
- [**README.md**](README.md) - Full project documentation

---

## 🆘 Troubleshooting

### Port 3000 already in use
```bash
# Run on different port
npm run dev -- -p 3001

# Or kill process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :3000
kill -9 <PID>
```

### Module not found errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Changes not reflected
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Environment variables not loading
```bash
# Check file exists
ls -la .env.local

# Verify format (no spaces around =)
# ✅ CORRECT: KEY=value
# ❌ WRONG: KEY = value

# Restart dev server (Ctrl+C then npm run dev)
```

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

---

## 📞 Support

- **Docs:** Check [ENV_SETUP.md](ENV_SETUP.md) & other docs
- **Issues:** Open GitHub issue
- **Chat:** Contact team on Slack/Discord

---

## 📄 License

This project is proprietary. All rights reserved.

---

**Happy Coding! 🎉**
