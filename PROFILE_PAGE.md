# 👤 Trang Hồ Sơ Cá Nhân

## Tổng Quan

Trang hồ sơ cá nhân cho phép người dùng xem, chỉnh sửa thông tin cá nhân, theo dõi khóa học đang học, và xem thành tựu học tập.

## 📍 URL

```
https://mkt.vn/profile
```

## 📁 Cấu Trúc File

```
app/
  └── profile/
      ├── page.tsx           # Trang hồ sơ cá nhân
      └── layout.tsx         # Layout & metadata

styles/
  └── pages/
      └── _profile.scss      # Styling

services/
  └── auth.service.ts        # AuthUser interface (cập nhật)

store/
  └── authStore.ts           # updateProfile action (cập nhật)
```

## 🎨 Các Tab

### 1. **Thông tin cá nhân** (Info Tab)
- Hiển thị thông tin: Tên, Email, Điện thoại, Tiểu sử, Ngày tham gia
- Nút "Chỉnh sửa" để sửa thông tin
- Form modal để cập nhật:
  - Tên đầy đủ
  - Email
  - Số điện thoại
  - URL Avatar
  - Tiểu sử

### 2. **Khóa học** (Courses Tab)
- Danh sách tất cả khóa học đang học
- Hiển thị từng khóa học với:
  - Thumbnail & tiêu đề
  - Tên giáo viên
  - Thanh tiến độ (progress bar)
  - Thời gian khóa học & số bài học
  - Nút "Tiếp tục học" để quay lại khóa học
- Nếu chưa có khóa học → hiển thị CTA "Xem các khóa học"

### 3. **Thống kê** (Statistics Tab)
- **Thẻ thống kê:**
  - 📚 Tổng khóa học đang học
  - ⏱️ Tổng thời gian học (tính từ tất cả khóa học)
  - 🎯 Tiến độ trung bình (%)
  - ⭐ Số khóa học đã hoàn thành

- **Phần Thành tựu (Achievements):**
  - 🌟 Người mới bắt đầu (earned mặc định)
  - 🔥 Người yêu thích học tập (khi học >= 5 khóa học)
  - 🏆 Người chinh phục (khi hoàn thành >= 3 khóa học)
  - 💎 Chuyên gia (chưa unlock - cần hoàn thành 10 khóa học)

## 💾 Data Structure

### AuthUser Interface (cập nhật)
```typescript
interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  phone?: string;           // NEW
  bio?: string;            // NEW
  enrolledCourses: string[];
  createdAt?: string;      // NEW
}
```

### Course Interface (cập nhật)
```typescript
interface Course {
  // ... existing fields
  progress?: number;       // NEW: 0-100 percentage
  lessons?: number;        // NEW: số bài học
}
```

## 🔧 API Actions

### useAuthStore

```typescript
const { user, updateProfile } = useAuthStore();

// Cập nhật hồ sơ
await updateProfile({
  name: 'Nguyễn Văn An',
  phone: '0912345678',
  bio: 'Tôi là một lập trình viên',
  avatar: 'https://...'
});

// Đăng xuất
logout();
```

### useTeacherStore

```typescript
const { fetchTeachers } = useTeacherStore();

// Lấy danh sách giáo viên
await fetchTeachers();
```

## 🎯 Tính Năng

### Header Info
- Avatar (vòng tròn)
- Tên người dùng
- Email
- Số khóa học đang học
- Nút "Chỉnh sửa"
- Nút "Đăng xuất"

### Form Chỉnh Sửa
- Modal dialog
- Input fields:
  - Tên (required)
  - Email (required)
  - Điện thoại
  - Avatar URL
  - Tiểu sử (textarea)
- Nút "Lưu thay đổi" & "Hủy"
- Xác thực dữ liệu trước khi lưu

### Tab Navigation
- Tab buttons với icon
- Hiển thị số lượng khóa học trên tab "Khóa học"
- Smooth transition giữa các tab (fade-in animation)

## 📱 Responsive Design

```
Desktop:   3-4 cột cho courses grid
Tablet:    2 cột
Mobile:    1 cột
```

## 🔐 Bảo Mật

**Hiện tại:** Không có bảo mật
**Cần thêm:**
- Kiểm tra authentication trước khi render
- Kiểm tra quyền (chỉ xem được profile của mình)
- Mã hóa dữ liệu nhạy cảm

```typescript
// app/profile/page.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user]);

  // ...
}
```

## 🚀 Sử Dụng

### Xem Hồ Sơ

```typescript
// User xem hồ sơ của mình
// URL: /profile
```

### Chỉnh Sửa Thông Tin

```typescript
1. Click nút "Chỉnh sửa"
2. Form modal xuất hiện
3. Sửa các trường thông tin
4. Click "Lưu thay đổi"
5. Dữ liệu được lưu vào store & persisted
```

### Theo Dõi Khóa Học

```typescript
// Tab "Khóa học"
- Xem danh sách khóa học đang học
- Xem tiến độ từng khóa học
- Click "Tiếp tục học" để quay lại khóa học
```

### Xem Thành Tựu

```typescript
// Tab "Thống kê"
- Xem các achievement đã unlock
- Achievement chưa unlock sẽ mờ đi
```

## 📝 Ví dụ Sử Dụng

### Khi User login
```typescript
const { setUser } = useAuthStore();

setUser({
  id: 'u1',
  name: 'Nguyễn Văn An',
  email: 'student@mkt.com',
  role: 'student',
  avatar: 'https://...',
  phone: '0912345678',
  bio: 'Lập trình viên mong muốn',
  enrolledCourses: ['1', '3', '5'],
  createdAt: '2023-01-15'
});
```

### Profile được hiển thị
- Tên & email ở header
- 3 khóa học đang học
- Thống kê: 3 khóa học, 105h học, 43% trung bình, 0 hoàn thành
- Thành tựu: Người mới bắt đầu (unlock), 3 cái khác lock

## 🚧 Tính Năng Có Thể Thêm

- [ ] Cập nhật avatar trực tiếp (upload file)
- [ ] Phân trang khóa học
- [ ] Export profile/transcript
- [ ] Change password
- [ ] Two-factor authentication
- [ ] Manage enrolled courses (unenroll)
- [ ] Learning history/timeline
- [ ] Recommendations dựa trên progress
- [ ] Earning certificates
- [ ] Integration với social media
- [ ] Notification preferences

## 🔗 Liên Kết

- **Profile page:** `/profile`
- **Admin teachers:** `/admin/teachers`
- **Teachers listing:** `/teachers`
- **My courses:** `/my-courses` (có thể thêm sau)
- **Dashboard:** `/dashboard` (có thể thêm sau)

## 📚 Data Mẫu

### User Student
```typescript
{
  id: 'u1',
  name: 'Nguyễn Văn An',
  email: 'student@demo.com',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  phone: '0912345678',
  bio: 'Sinh viên năm cuối, đam mê lập trình web',
  enrolledCourses: ['1', '3', '5'],
  createdAt: '2023-01-15'
}
```

### Courses Đang Học
- Course 1 (React): 65% done
- Course 3 (Data Science): 40% done
- Course 5 (DevOps): 25% done

## 🎨 UI Components

- **Tabs Navigation** - switch giữa 3 tab
- **Profile Card** - hiển thị info hoặc form
- **Course Card Mini** - thẻ khóa học trong grid
- **Stat Card** - thẻ thống kê
- **Achievement Grid** - danh sách thành tựu
- **Progress Bar** - tiến độ khóa học

## 🛠️ Công Nghệ

- React 19
- Next.js 16
- TypeScript
- Zustand (state management)
- SCSS (styling)
- Lucide React (icons)

## 📞 Support

Nếu cần support hoặc có câu hỏi, vui lòng liên hệ team development.
