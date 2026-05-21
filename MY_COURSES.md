# 📚 Trang Khóa Học Của Tôi

## Tổng Quan

Trang "Khóa Học Của Tôi" cho phép người dùng xem danh sách tất cả các khóa học mà họ đã đăng ký, theo dõi tiến độ học tập, tìm kiếm và sắp xếp các khóa học.

## 📍 URL

```
https://mkt.vn/my-courses
```

## 📁 Cấu Trúc File

```
app/
  └── my-courses/
      ├── page.tsx           # Trang khóa học của tôi
      └── layout.tsx         # Layout & metadata

styles/
  └── pages/
      └── _my-courses.scss   # Styling
```

## 🎨 Các Thành Phần

### 1. **Header Section**
- Tiêu đề: "Khóa Học Của Tôi"
- Subtitle hiển thị tổng số khóa học & trạng thái

### 2. **Statistics Section**
- 4 thẻ thống kê:
  - 📚 **Tổng khóa học** - số khóa học đã đăng ký
  - 📈 **Đang học** - số khóa học đang học (progress > 0 && < 100)
  - ✅ **Hoàn thành** - số khóa học đã hoàn thành (progress == 100)
  - ⏱️ **Thời gian học** - tổng giờ từ tất cả khóa học

### 3. **Controls Section**
- **Search Bar** - tìm kiếm khóa học theo tên hoặc mô tả
- **Filter Options:**
  - Filter theo trạng thái: Tất cả, Đang học, Hoàn thành
  - Sắp xếp: Theo tiến độ, Theo tên (A-Z), Gần đây nhất

### 4. **Courses Grid**
- Grid responsive hiển thị từng khóa học
- Mỗi thẻ bao gồm:
  - **Thumbnail** với badge "✓ Hoàn thành" (nếu đã hoàn thành)
  - **Tiêu đề khóa học** (2 dòng max)
  - **Tên giáo viên**
  - **Danh mục (Category)**
  - **Thanh tiến độ** (progress bar + %)
  - **Thống kê** (số bài học, thời gian)
  - **Rating** (số sao + lượt đánh giá)
  - **Nút "Tiếp tục học"** hoặc **"Xem lại khóa học"**

### 5. **Empty State**
- Hiển thị khi:
  - User chưa đăng ký khóa học nào
  - Không tìm thấy khóa học phù hợp
- Bao gồm:
  - Icon 📚
  - Thông báo
  - CTA link tới `/courses`

## 💾 Data Structure

### Dữ Liệu Sử Dụng
- `user.enrolledCourses` - mảng ID khóa học
- `Course.progress` - tiến độ học (0-100)
- `Course.title`, `.instructor`, `.duration`, `.lessonCount`, `.rating`

### State Management
```typescript
const { user } = useAuthStore();
const [courses, setCourses] = useState<Course[]>([]);
const [searchQuery, setSearchQuery] = useState('');
const [sortBy, setSortBy] = useState<'progress' | 'title' | 'date'>('progress');
const [filterStatus, setFilterStatus] = useState<'all' | 'in-progress' | 'completed'>('all');
```

## 🔧 API Actions

### Lấy Khóa Học

```typescript
// Load enrolled courses
const allCourses = await courseService.getAllCourses();
const enrolled = allCourses.filter(c => 
  user.enrolledCourses?.includes(c.id)
);
```

## 🎯 Tính Năng

### Search & Filter
```typescript
// Tìm kiếm theo tên hoặc mô tả
const matchesSearch = c.title.toLowerCase().includes(searchQuery) ||
  c.description.toLowerCase().includes(searchQuery);

// Filter theo trạng thái
- 'all' → tất cả khóa học
- 'in-progress' → progress > 0 && < 100
- 'completed' → progress == 100
```

### Sorting
```typescript
- 'progress' → giảm dần (progress cao nhất trước)
- 'title' → A-Z
- 'date' → gần đây nhất (không implement vì data không có date)
```

## 📱 Responsive Design

```
Desktop:   3-4 cột
Tablet:    2 cột
Mobile:    1 cột
```

## 🔐 Bảo Mật

**Hiện tại:** Chỉ kiểm tra basic
**Cần thêm:**
- Kiểm tra user đã login
- Chỉ xem được khóa học của mình

```typescript
'use client';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function MyCoursesPage() {
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

### Xem Khóa Học Của Tôi
```
1. Đăng nhập
2. Vào /my-courses
3. Xem danh sách khóa học đã đăng ký
```

### Tìm Kiếm
```
1. Nhập từ khóa vào search box
2. Danh sách lọc theo tên hoặc mô tả
```

### Filter & Sort
```
1. Chọn trạng thái (Tất cả, Đang học, Hoàn thành)
2. Chọn cách sắp xếp
3. Danh sách cập nhật tự động
```

### Tiếp Tục Học
```
1. Click nút "Tiếp tục học" trên thẻ khóa học
2. Redirect tới /learn/{courseId}
```

## 📝 Ví Dụ Sử Dụng

### User với 3 khóa học
```typescript
{
  id: 'u1',
  name: 'Nguyễn Văn An',
  enrolledCourses: ['1', '3', '5'],
  ...
}

Courses:
- Course 1: React (65%)
- Course 3: Data Science (40%)
- Course 5: DevOps (25%)
```

### Stats hiển thị
```
📚 Tổng khóa học: 3
📈 Đang học: 3
✅ Hoàn thành: 0
⏱️ Thời gian học: 105h (32 + 45 + 38)
```

### Search "React"
```
Results: 1 khóa học (React & Next.js)
```

### Filter "Hoàn thành"
```
Results: 0 khóa học (vì tất cả còn đang học)
```

## 🎨 UI Components

- **Stat Box** - thẻ thống kê
- **Course Card** - thẻ khóa học
- **Search Input** - tìm kiếm
- **Filter Dropdown** - bộ lọc
- **Sort Dropdown** - sắp xếp
- **Progress Bar** - thanh tiến độ
- **Empty State** - trạng thái rỗng

## 🛠️ Công Nghệ

- React 19
- Next.js 16
- TypeScript
- Zustand (state management)
- SCSS (styling)
- Lucide React (icons)

## 🚧 Tính Năng Có Thể Thêm

- [ ] Continued learning (display recent courses first)
- [ ] Certificate download
- [ ] Share on social media
- [ ] Export course list
- [ ] Wishlist courses
- [ ] Recommend next courses
- [ ] Time tracking per course
- [ ] Quiz/test results
- [ ] Peer comparison (if available)
- [ ] Bulk enroll/unenroll
- [ ] Course reviews
- [ ] Bookmark lessons
- [ ] Learning goals
- [ ] Achievements unlock details
- [ ] Performance analytics

## 📞 Support

Nếu cần support hoặc có câu hỏi, vui lòng liên hệ team development.
