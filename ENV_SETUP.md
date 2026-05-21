# 🔧 Environment Setup Guide

## Tổng Quan

Dự án MKT sử dụng environment variables để quản lý cấu hình theo từng môi trường (development, staging, production).

## 📁 File Môi Trường

### 1. `.env.example` ✅ (Commit lên GitHub)
- File mẫu cho tất cả các biến môi trường
- Hướng dẫn nhà phát triển những gì cần cấu hình
- **LỤC LƯỠI:** Không chứa giá trị thực

### 2. `.env.local` ❌ (KHÔNG commit lên GitHub)
- File thực tế với các giá trị cụ thể
- Mỗi developer tạo file này riêng cho máy của mình
- Chứa credentials nhạy cảm (mật khẩu, API keys, etc.)
- Được tự động ignore bởi `.gitignore`

### 3. `.env.production` ❌ (KHÔNG commit lên GitHub - deploy khác)
- Cấu hình cho production
- Được set trên server/hosting platform (Vercel, AWS, etc.)

## 🚀 Hướng Dẫn Setup

### Bước 1: Clone Repository
```bash
git clone https://github.com/your-username/mkt-frontend.git
cd mkt-frontend
```

### Bước 2: Tạo .env.local
```bash
# Copy từ .env.example
cp .env.example .env.local
```

### Bước 3: Chỉnh Sửa .env.local
Mở file `.env.local` và điền các giá trị:

```bash
# Biên tập với editor
code .env.local  # hoặc editor yêu thích của bạn
```

### Bước 4: Cấu Hình Các Dịch Vụ

#### 📚 Local Development (Không cần setup)
```
NEXT_PUBLIC_APP_NAME=MKT
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=development
```

#### 🔐 NextAuth (Optional)
```bash
# Generate secret:
openssl rand -base64 32

# Paste vào .env.local:
NEXTAUTH_SECRET=your_generated_secret_here
NEXTAUTH_URL=http://localhost:3000
```

#### 🗄️ MongoDB (Optional)
```bash
# Local MongoDB
DATABASE_URL=mongodb://localhost:27017/mkt_db

# Hoặc MongoDB Atlas (Cloud)
# https://www.mongodb.com/cloud/atlas
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/mkt_db
```

#### 📧 Email (Optional - Mailtrap for Dev)
```
1. Đăng ký tài khoản free tại: https://mailtrap.io/
2. Copy SMTP credentials
3. Paste vào .env.local:
   SMTP_HOST=smtp.mailtrap.io
   SMTP_PORT=2525
   SMTP_USER=your_username
   SMTP_PASSWORD=your_password
```

#### ☁️ AWS S3 (Optional - Image Upload)
```bash
# Tạo IAM user trên AWS
# Lấy Access Key & Secret Key
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=mkt-uploads-dev
```

#### 🔐 Google OAuth (Optional)
```bash
# 1. Vào: https://console.cloud.google.com/
# 2. Tạo OAuth 2.0 Client ID
# 3. Copy giá trị vào:
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret
```

#### 💳 Stripe (Optional - Payment)
```bash
# https://stripe.com
# Copy test keys từ dashboard
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## 📝 Best Practices

### ✅ DO's
- ✅ Giữ `.env.example` update với tất cả biến cần thiết
- ✅ Commit `.env.example` lên GitHub
- ✅ Tạo `.env.local` cục bộ trên máy
- ✅ Thêm `.env.local` vào `.gitignore`
- ✅ Sử dụng biến env thay vì hardcode values
- ✅ Document các biến env mới trong `.env.example`
- ✅ Sử dụng `NEXT_PUBLIC_` prefix cho biến client-side

### ❌ DON'Ts
- ❌ Không commit `.env.local` lên GitHub
- ❌ Không share `.env.local` files
- ❌ Không hardcode sensitive data trong code
- ❌ Không push production keys lên GitHub
- ❌ Không để credentials trong version control

## 🔍 Kiểm Tra Setup

### 1. Kiểm tra file tồn tại
```bash
# .env.local và .env.example nên cùng thư mục root
ls -la .env*

# Output mong đợi:
# .env.example      (commit)
# .env.local        (local only)
```

### 2. Kiểm tra .gitignore
```bash
# .env.local không nên được track
git status

# Không nên thấy:
# .env.local
```

### 3. Chạy development server
```bash
npm install
npm run dev

# Nếu không có error → setup OK ✅
```

## 🚨 Nếu Vô Tình Commit .env.local

```bash
# 1. Remove file khỏi git (nhưng giữ local)
git rm --cached .env.local

# 2. Commit change
git commit -m "Remove .env.local from tracking"

# 3. Push
git push

# 4. (Important) Rotate tất cả secrets nếu đã expose
```

## 📦 Deployment

### Vercel
```
1. Vào: https://vercel.com/
2. Connect GitHub repo
3. Vào Project Settings → Environment Variables
4. Thêm tất cả environment variables
5. Deploy
```

### AWS/EC2
```bash
# SSH vào server
ssh ec2-user@your-server-ip

# Tạo .env.production trên server
nano .env.production

# Paste các biến production
# Ctrl+O → Enter → Ctrl+X

# Build & start
npm install
npm run build
npm run start
```

### Docker
```dockerfile
# .dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Với environment variables
ENV NEXT_PUBLIC_APP_URL=https://mkt.vn
ENV NODE_ENV=production

EXPOSE 3000
CMD ["npm", "start"]
```

## 🔗 Useful Links

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Mailtrap](https://mailtrap.io/) - Email testing
- [Stripe](https://stripe.com/) - Payment
- [AWS IAM](https://console.aws.amazon.com/iam/)
- [Google OAuth Setup](https://console.cloud.google.com/)

## ❓ FAQ

### Q: Tôi nên push .env.local lên GitHub không?
**A:** Tuyệt đối không! File này chứa credentials nhạy cảm.

### Q: Làm cách nào để share config với team?
**A:** Tạo `.env.example` với tất cả biến cần thiết (không có values). Team sẽ tạo `.env.local` của riêng mình.

### Q: Development có cần tất cả services không?
**A:** Không! Chỉ cấu hình những services bạn sử dụng. Còn lại để trống hoặc comment.

### Q: Làm cách nào để test environment variables?
**A:** Tạo file test:
```typescript
// pages/api/env-test.ts
export default function handler(req, res) {
  res.json({
    APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    NODE_ENV: process.env.NODE_ENV
  });
}
```

### Q: Có cách nào để encrypt .env.local không?
**A:** Có! Sử dụng tool như `dotenv-enc` hoặc git-crypt, nhưng đối với team nhỏ, chỉ cần .gitignore là đủ.

## 📞 Support

Nếu gặp vấn đề, kiểm tra:
1. `.env.local` có tồn tại không?
2. Các biến có được set đúng không?
3. Có missing dependencies không?
4. NextAuth secret đủ dài không (>= 32 chars)?

Liên hệ team development nếu cần help!
