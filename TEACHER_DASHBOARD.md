# 🎓 Teacher Dashboard - Hướng Dẫn

## 📋 Giới Thiệu

**Teacher Dashboard** là một trang quản lý toàn diện dành cho giáo viên, cho phép họ:
- 📊 Xem thống kê và phân tích doanh thu
- 📚 Quản lý danh sách khóa học
- 👥 Theo dõi số lượng học sinh
- ⭐ Xem bình luận và đánh giá từ học sinh
- ⚡ Thực hiện các hành động nhanh

---

## 🗂️ Cấu Trúc Tệp

```
app/
├── teacher/
│   └── dashboard/
│       └── page.tsx                    # Trang dashboard giáo viên
components/
├── TeacherDashboard.tsx                # Component chính dashboard
styles/
├── pages/
│   └── _teacher-dashboard.scss         # Styling dashboard
```

---

## 🎯 Tính Năng Chính

### 1. **Header Dashboard**
```
👋 Dashboard Giáo Viên
Xin chào, [Tên Giáo Viên]! Đây là tổng quan hoạt động của bạn.
[+ Tạo Khóa Học Mới]
```
- Chào mừng cá nhân hóa
- Nút nhanh để tạo khóa học mới

### 2. **Thống Kê (Stats Grid)**
Hiển thị 4 chỉ số chính:

| Icon | Chỉ Số | Mô Tả |
|------|--------|-------|
| 📚 | Khóa Học | Số khóa học đang giảng dạy |
| 👥 | Học Sinh | Tổng số học sinh trong tất cả khóa |
| ⭐ | Xếp Hạng | Điểm xếp hạng trung bình |
| 💰 | Doanh Thu | Tổng doanh thu ($50 per student) |

**Tính Toán:**
```typescript
totalStudents = sum của (course.studentCount)
averageRating = sum(course.rating) / courses.length
revenue = totalStudents * 50 // $50 per student
```

### 3. **Danh Sách Khóa Học**
Liệt kê tất cả khóa học của giáo viên:

```
📖 Khóa Học Của Tôi [2 khóa]

[Course Item]
├─ Title: "Khóa học XXX" ⭐ 4.8
├─ Stats: 👥 1250 học sinh | 📈 65% tiến độ
└─ Progress Bar: [========------] 65%
```

**Tương Tác:**
- Click để select khóa học
- Hiện thị progress bar
- Hover để highlight

### 4. **Biểu Đồ Đăng Ký**
Hiển thị xu hướng đăng ký trong 6 tháng:

```
📊 Đăng Ký 6 Tháng Gần Đây

     150
     │  ▁▂▃▄▅▆▇█
     │  ████████
  50 │  ████████
     └─ Jan Feb Mar Apr May Jun
```

**Dữ Liệu Mock:**
- Tháng: 6 tháng gần nhất (Jan-Jun)
- Giá trị: Random 50-250 enrollments/month

### 5. **Hành Động Nhanh (Quick Actions)**
Bộ nút tiện ích nhanh:

```
⚡ Hành Động Nhanh
├─ [📝 Tạo Bài Học]      (Primary button)
├─ [💬 Tin Nhắn]         (Secondary)
├─ [📊 Báo Cáo]          (Secondary)
└─ [⚙️ Cài Đặt]           (Secondary)
```

**Kiểu Nút:**
- Primary: Gradient màu tím/xanh
- Secondary: Màu xám, hover trượt sang phải

### 6. **Bình Luận Gần Đây (Recent Reviews)**
Hiển thị 3 bình luận mới nhất:

```
⭐ Bình Luận Gần Đây

[Review Item]
├─ Nguyễn Hà My ⭐ 5.0
├─ "Khóa học rất tuyệt vời..."
└─ 2 giờ trước
```

**Thành Phần:**
- Tên học sinh
- Xếp hạng (1-5 sao)
- Nội dung bình luận
- Thời gian

### 7. **Hộp Mẹo**
Hộp thông tin với gradient nền cam:

```
ℹ️ Mẹo
"Hãy thường xuyên cập nhật nội dung khóa học
để tăng sự hài lòng của học sinh..."
```

---

## 🛣️ Routing

### Đường Dẫn
```
/teacher/dashboard          # Dashboard giáo viên
/courses/create            # Tạo khóa học mới (nút header)
```

### Access Control
```typescript
// Chỉ giáo viên (role === 'instructor') mới có thể truy cập
if (!isAuthenticated || user?.role !== 'instructor') {
  redirect('/login')
}
```

---

## 💾 Dữ Liệu & API

### Nguồn Dữ Liệu
```typescript
// Teacher data
const teacher = TEACHERS[0]; // Sử dụng giáo viên đầu tiên

// Course data
const courses = COURSES.filter(c => teacher.courses.includes(c.id))

// Mock stats
- totalStudents: calculated từ course.studentCount
- revenue: totalStudents * 50
- enrollmentData: 6 tháng gần nhất (mock random)
```

### Mock Data Structure
```typescript
interface TeacherCourse {
  id: string;
  title: string;
  students: number;
  rating: number;
  progress: number; // 0-100%
}

interface EnrollmentData {
  month: string;
  enrollments: number;
}
```

---

## 🎨 Styling & Responsive

### Breakpoints
```scss
// Desktop (1200px+)
- 2-column layout (main + sidebar)
- Full stat cards

// Tablet (768px-1199px)
- Single column layout
- Sidebar becomes grid of 2 columns
- Adjusted font sizes

// Mobile (480px-767px)
- Single column
- Stats grid: 2 columns
- Smaller padding & gaps

// Small Mobile (< 480px)
- All single column
- Minimal padding
```

### Colors
```scss
// Primary Gradient
$gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%)

// Accent Colors
- Courses: #667eea (Blue)
- Students: #764ba2 (Purple)
- Rating: #f59e0b (Amber)
- Revenue: #10b981 (Green)
- Info Box: Orange gradient

// Neutral
- Background: White (#fff)
- Text: #1a1a1a
- Subtitle: #666
- Border: #f3f4f6
```

### Key Classes
```scss
.teacher-dashboard          // Container utama
.dashboard-header           // Header bagian atas
.stat-card                  // Kartu statistik
.dashboard-content          // Layout 2-column
.courses-section           // Bagian daftar kursus
.course-item               // Item kursus individual
.chart-section             // Grafik enrollment
.bar-chart                 // Visualisasi bar chart
.quick-actions             // Tombol aksi cepat
.recent-reviews            // Daftar ulasan
.info-box                  // Kotak tips
```

---

## 📱 Responsive Design

### Desktop Layout
```
┌─────────────────────────────────────────────┐
│               Dashboard Header              │
├─────────────────────────────────────────────┤
│         Stats Grid (4 columns)              │
├─────────────────────────────────────────────┤
│                                    │        │
│      Main Content (2/3)      │  Sidebar (1/3)
│  - Courses List              │  - Quick Actions
│  - Chart                      │  - Reviews
│                                    │ - Tips
└─────────────────────────────────────────────┘
```

### Mobile Layout
```
┌──────────────────────────┐
│  Dashboard Header        │
├──────────────────────────┤
│  Stats Grid (2 cols)     │
├──────────────────────────┤
│  Courses List            │
├──────────────────────────┤
│  Chart                   │
├──────────────────────────┤
│  Quick Actions           │
├──────────────────────────┤
│  Reviews                 │
├──────────────────────────┤
│  Tips Box                │
└──────────────────────────┘
```

---

## 🔄 Component Flow

```
TeacherDashboardPage (page.tsx)
  │
  ├─ Check authentication
  ├─ Check role === 'instructor'
  └─ Render TeacherDashboard
      │
      └─ TeacherDashboard.tsx
          ├─ useEffect: Load data
          │  ├─ Fetch teacher
          │  ├─ Calculate stats
          │  └─ Set enrollment data
          │
          └─ Render sections
              ├─ Header
              ├─ Stats Grid (4 cards)
              └─ Content Grid
                  ├─ Main: Courses + Chart
                  └─ Sidebar: Actions + Reviews + Tips
```

---

## 🔧 Customization

### Thay Đổi Giáo Viên Mặc Định
```typescript
// TeacherDashboard.tsx, line ~32
const teacherData = TEACHERS[0]; // Thay đổi index để chọn giáo viên khác
```

### Thay Đổi Revenue Formula
```typescript
// Line ~54
const revenue = totalStudents * 50; // Thay đổi 50 để adjust revenue per student
```

### Thay Đổi Số Tháng Biểu Đồ
```typescript
// Line ~56-58
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']; // Thêm/xóa tháng
```

### Thêm Bình Luận Mock
```typescript
// Chỉnh sửa return section trong render:
<div className="review-item">
  <div className="review-item__header">
    <strong className="review-item__name">Tên Học Sinh</strong>
    <span className="review-item__rating">⭐ 5.0</span>
  </div>
  <p className="review-item__comment">Bình luận...</p>
  <span className="review-item__date">Thời gian</span>
</div>
```

---

## ✨ Features & Animations

### Hover Effects
```scss
// Stat cards - translate up
.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

// Course items - subtle highlight
.course-item:hover {
  border-color: #667eea;
  background: #f8f9ff;
}

// Bar chart - scale up
.bar:hover {
  transform: scaleY(1.05);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}
```

### Transitions
```scss
// Progress bar fill
transition: width 0.3s ease;

// Button transform
transition: all 0.3s ease;

// Bar values show on hover
opacity: 0 → 1 (on hover)
```

---

## 🚀 Future Enhancements

### Planned Features
1. **Real-time Analytics**
   - Live enrollment tracking
   - Student activity logs

2. **Messaging System**
   - Direct messages with students
   - Announcement broadcasts

3. **Advanced Reports**
   - Detailed performance analytics
   - Export to PDF/CSV

4. **Course Editor**
   - Inline course editing
   - Lesson management interface

5. **Certificate Management**
   - Certificate template builder
   - Issue certificates to students

6. **Payment Analytics**
   - Revenue breakdown by course
   - Payment history

---

## 🐛 Troubleshooting

### Issue: "Access Denied" Error
**Cause:** User role không phải "instructor"
**Solution:** Login với tài khoản instructor:
```
Email: instructor@demo.com
Password: password
```

### Issue: Dữ Liệu Không Hiển Thị
**Cause:** Mock data chưa load
**Solution:** Check console cho errors, reload trang

### Issue: Responsive layout bị lỗi
**Cause:** CSS media queries conflict
**Solution:** Clear cache (.next folder) và rebuild

---

## 📚 Related Files

- [TEACHER_MANAGEMENT.md](./TEACHER_MANAGEMENT.md) - Admin teacher management
- [PROFILE_PAGE.md](./PROFILE_PAGE.md) - User profile page
- [MY_COURSES.md](./MY_COURSES.md) - Student's courses page

---

## 📝 Changelog

### Version 1.0 (Current)
- ✅ Dashboard layout & statistics
- ✅ Course listing with progress
- ✅ 6-month enrollment chart
- ✅ Quick actions panel
- ✅ Recent reviews section
- ✅ Responsive design
- ✅ Mock data integration

---

**Last Updated:** May 2026  
**Maintained By:** Development Team  
**Status:** ✅ Active Development
