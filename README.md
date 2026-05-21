# 📚 E-LEARNING PLATFORM

## 👥 Thành viên nhóm

| Tên | Vai trò |
|-----|---------|
| Nguyễn Hoàn Mỹ | Developer |
| Đinh Tiến Tài | Developer |
| Triệu Nguyên Kim | Developer |

---

## 📝 Mô tả chức năng

**E-Learning Platform** là một nền tảng e-learning hiện đại, cung cấp những tính năng sau:

- 👤 **Xác thực người dùng** - Hệ thống đăng ký và đăng nhập bảo mật
- 📚 **Danh sách khoá học** - Duyệt, khám phá khoá học theo danh mục
- 📖 **Chi tiết khoá học** - Xem thông tin chi tiết và xếp hạng khoá học
- 🎓 **Giao diện học tập** - Giao diện tương tác dành cho học tập khoá học
- ⭐ **Hệ thống đánh giá** - Đánh giá và bình luận khoá học
- 📱 **Responsive Design** - Tương thích với desktop, tablet và mobile
- 🎨 **Giao diện hiện đại** - Thiết kế chuyên nghiệp, dễ sử dụng

---

## 🛠️ Công nghệ sử dụng

| Công nghệ | Mô tả |
|-----------|-------|
| **Next.js 15+** | Framework React với App Router |
| **TypeScript** | Ngôn ngữ tĩnh an toàn kiểu dữ liệu |
| **SCSS** | Preprocessor CSS với kiến trúc component |
| **Zustand** | Quản lý state nhẹ |
| **Axios** | HTTP client cho API communication |
| **React** | Thư viện UI component |

---

## 📋 Yêu cầu hệ thống

Trước khi bắt đầu, đảm bảo bạn đã cài đặt:
- **Node.js** phiên bản 18 trở lên
- **npm**, **yarn** hoặc **pnpm**
- **Web browser** hiện đại (Chrome, Firefox, Safari, Edge)

---

## 🚀 Hướng dẫn cài đặt và chạy trên localhost

### Bước 1: Clone hoặc tải project
```bash
# Nếu sử dụng Git
git clone [repository-url]
cd elearning-platform
```

### Bước 2: Cài đặt dependencies
```bash
npm install
# hoặc
yarn install
# hoặc
pnpm install
```

### Bước 3: Cấu hình Environment Variables
```bash
# Copy .env.example thành .env.local
cp .env.example .env.local

# Chỉnh sửa .env.local với các giá trị của bạn
# Xem chi tiết tại: ENV_SETUP.md
```

> **⚠️ Quan trọng:** KHÔNG bao giờ commit `.env.local` lên GitHub. File này đã được thêm vào `.gitignore`

### Bước 4: Chạy development server
```bash
npm run dev
# hoặc
yarn dev
# hoặc
pnpm dev
```

### Bước 4: Mở ứng dụng
Mở trình duyệt và truy cập: **[http://localhost:3000](http://localhost:3000)**

Application sẽ tự động reload khi bạn chỉnh sửa code.

---

### Các lệnh khác

| Lệnh | Mô tả |
|------|-------|
| `npm run dev` | Chạy development server |
| `npm run build` | Build cho production |
| `npm run start` | Chạy production server |
| `npm run lint` | Kiểm tra code với ESLint |

---


## 📁 Cấu trúc project

```
elearning-platform/
├── app/                    # Next.js pages & routing
├── components/             # React components
├── data/                   # Static data & fixtures
├── services/               # API services
├── store/                  # State management (Zustand)
├── styles/                 # SCSS styles
└── public/                 # Static files
```

---

## 📱 Các trang chính

- **Trang chủ** (`/`) - Landing page với các khoá học nổi bật
- **Giới thiệu** (`/about`) - Thông tin về nền tảng
- **Khoá học** (`/courses`) - Danh sách tất cả khoá học
- **Chi tiết khoá học** (`/courses/[slug]`) - Thông tin chi tiết một khoá học
- **Học tập** (`/learn/[courseId]`) - Giao diện học tập tương tác
- **Đăng nhập** (`/auth/login`) - Xác thực người dùng
- **Đăng ký** (`/auth/register`) - Tạo tài khoản mới

---

## ✅ Troubleshooting

### Port 3000 đang được sử dụng
```bash
npm run dev -- -p 3001
```

### Xóa cache và cài đặt lại
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📧 Liên hệ

Nếu có câu hỏi hoặc cần hỗ trợ, vui lòng liên hệ với thành viên nhóm.

---

**Happy Learning! 🎓**
