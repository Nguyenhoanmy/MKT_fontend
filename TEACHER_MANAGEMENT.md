# 📚 Hệ Thống Quản Lý Giáo Viên

## Tổng Quan

Hệ thống quản lý giáo viên bao gồm:
- Admin Dashboard để quản lý giáo viên (CRUD)
- Trang công khai xem danh sách giáo viên
- Service layer tương tác API
- Zustand store quản trị state

## 📁 Cấu Trúc File

```
data/
  └── teachers.ts              # Data model và dữ liệu mẫu
services/
  └── teacher.service.ts       # Service API cho giáo viên
store/
  └── teacherStore.ts          # Zustand store
components/
  ├── TeacherManagementAdmin.tsx  # Admin dashboard
  └── ui/
      └── TeacherCard.tsx       # Component hiển thị card giáo viên
styles/
  ├── components/
  │   └── _admin.scss           # Style cho admin panel
  └── pages/
      └── _teachers.scss        # Style cho trang giáo viên
app/
  ├── admin/
  │   ├── layout.tsx            # Admin layout
  │   └── teachers/
  │       └── page.tsx          # Admin dashboard
  └── teachers/
      ├── page.tsx              # Trang công khai giáo viên
      └── layout.tsx            # Layout trang giáo viên
```

## 🚀 Sử Dụng

### Admin Dashboard
**URL:** `/admin/teachers`

#### Chức năng:
- ✅ Xem danh sách tất cả giáo viên
- ✅ Tạo giáo viên mới
- ✅ Chỉnh sửa thông tin giáo viên
- ✅ Xóa giáo viên
- ✅ Tìm kiếm giáo viên

#### Form fields:
```typescript
- name: string              // Tên giáo viên
- email: string             // Email (bắt buộc)
- phone?: string            // Số điện thoại
- avatar?: string           // URL avatar
- bio?: string              // Tiểu sử
- specialization: string[]  // Danh sách chuyên môn
- experience: number        // Năm kinh nghiệm
- courses: string[]         // Danh sách ID khóa học
- rating: number            // Rating (0-5)
- students: number          // Số học viên
- joinDate: string          // Ngày tham gia (YYYY-MM-DD)
- status: 'active' | 'inactive' | 'pending'  // Trạng thái
```

### Trang Công Khai Giáo Viên
**URL:** `/teachers`

#### Chức năng:
- ✅ Xem danh sách giáo viên hoạt động
- ✅ Tìm kiếm theo tên, email, chuyên môn
- ✅ Lọc theo chuyên môn
- ✅ Xem chi tiết giáo viên

## 💾 Data Model

```typescript
interface Teacher {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  specialization: string[];  // ['React', 'Next.js', 'Node.js']
  experience: number;         // năm
  courses: string[];          // mảng ID khóa học
  rating: number;             // 0-5
  students: number;           // số học viên
  joinDate: string;           // YYYY-MM-DD
  status: 'active' | 'inactive' | 'pending';
}
```

## 🔧 Service API

### teacherService

```typescript
// Lấy tất cả giáo viên
await teacherService.getAllTeachers()

// Lấy một giáo viên
await teacherService.getTeacher(id)

// Tạo mới
await teacherService.createTeacher(data)

// Cập nhật
await teacherService.updateTeacher(id, data)

// Xóa
await teacherService.deleteTeacher(id)

// Tìm theo email
await teacherService.getTeacherByEmail(email)
```

## 📦 Zustand Store

```typescript
const { teachers, isLoading, error, selectedTeacher } = useTeacherStore();

// Actions
await useTeacherStore().fetchTeachers();
await useTeacherStore().fetchTeacher(id);
await useTeacherStore().createTeacher(data);
await useTeacherStore().updateTeacher(id, data);
await useTeacherStore().deleteTeacher(id);
useTeacherStore().setSelectedTeacher(teacher);
useTeacherStore().clearError();
```

## 🎨 Component TeacherCard

```typescript
<TeacherCard
  teacher={teacher}
  onEdit={(teacher) => {...}}      // Optional
  onDelete={(id) => {...}}         // Optional
  isAdmin={false}                  // Hiện nút chỉnh sửa/xóa nếu true
/>
```

## 📱 Responsive Design

- Desktop: 3-4 cột
- Tablet: 2-3 cột
- Mobile: 1 cột

## 🔐 Bảo Mật (cần implement)

Để bảo vệ admin panel, bạn nên:
1. Thêm authentication check
2. Kiểm tra role/permission (admin)
3. Implement middleware

```typescript
// app/admin/layout.tsx
import { redirect } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function AdminLayout({ children }) {
  const { user } = useAuthStore();
  
  if (!user || user.role !== 'admin') {
    redirect('/');
  }
  
  return ...
}
```

## 🔌 Kết Nối Backend API

Cập nhật `services/teacher.service.ts` để kết nối với backend thực:

```typescript
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
```

Endpoints cần backend:
- `GET /api/teachers` - Lấy danh sách
- `GET /api/teachers/:id` - Lấy chi tiết
- `POST /api/teachers` - Tạo mới
- `PUT /api/teachers/:id` - Cập nhật
- `DELETE /api/teachers/:id` - Xóa
- `GET /api/teachers/email/:email` - Tìm theo email

## 📝 Ví dụ Sử Dụng

### Lấy danh sách giáo viên trong component

```typescript
'use client';
import { useEffect } from 'react';
import { useTeacherStore } from '@/store/teacherStore';

export default function MyComponent() {
  const { teachers, isLoading, fetchTeachers } = useTeacherStore();

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div>
      {teachers.map(teacher => (
        <div key={teacher.id}>{teacher.name}</div>
      ))}
    </div>
  );
}
```

### Thêm giáo viên mới

```typescript
const { createTeacher } = useTeacherStore();

const newTeacher = await createTeacher({
  name: 'Trần Văn A',
  email: 'tranvana@mkt.com',
  specialization: ['React', 'Next.js'],
  experience: 5,
  rating: 4.8,
  students: 500,
  joinDate: '2024-01-01',
  status: 'active',
  courses: [],
});
```

## 🚧 Các Tính Năng Có Thể Thêm

- [ ] Phân trang
- [ ] Sắp xếp (theo tên, rating, học viên)
- [ ] Bulk delete
- [ ] Export danh sách
- [ ] Filter theo trạng thái
- [ ] Analytics dashboard
- [ ] Integration với scheduling system
- [ ] Email notifications

## 📞 Liên Hệ Support

Nếu cần support hoặc có câu hỏi, vui lòng liên hệ team development.
