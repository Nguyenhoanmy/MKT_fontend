// ============================================================
// DATA — MOCK COURSES
// 12 courses với đầy đủ metadata
// ============================================================

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: { name: string; avatar: string; bio: string; rating: number; students: number; };
  category: string;
  categoryIcon: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  studentCount: number;
  duration: string; // "12h 30m"
  lessonCount: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  lastUpdated: string;
  badge?: 'bestseller' | 'new' | 'hot';
  tags: string[];
  outcomes: string[];
  requirements: string[];
  curriculum: Section[];
  reviews: Review[];
  progress?: number; // 0-100 percentage
  lessons?: number; // số bài học
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'quiz' | 'reading';
  isPreview: boolean;
  videoUrl?: string;
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

const THUMBNAILS = [
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80',
  'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&q=80',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
  'https://images.unsplash.com/photo-1560472355-536de3962603?w=600&q=80',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
];

const AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
];

const makeCurriculum = (sections: number, lessonsPerSection: number): Section[] =>
  Array.from({ length: sections }, (_, si) => ({
    id: `s${si + 1}`,
    title: `Chương ${si + 1}: ${['Giới thiệu & Tổng quan', 'Kiến thức nền tảng', 'Thực hành nâng cao', 'Dự án thực tế', 'Tổng kết & Bước tiếp theo'][si % 5]}`,
    lessons: Array.from({ length: lessonsPerSection }, (_, li) => ({
      id: `s${si + 1}l${li + 1}`,
      title: `Bài ${li + 1}: ${['Khái niệm cơ bản', 'Cài đặt môi trường', 'Hello World', 'Deep dive', 'Mini project', 'Best practices', 'Q&A'][li % 7]}`,
      duration: `${Math.floor(Math.random() * 20) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      type: li % 5 === 4 ? 'quiz' : 'video',
      isPreview: li === 0,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    })),
  }));

const makeReviews = (): Review[] => [
  { id: 'r1', user: 'Nguyễn Văn An', avatar: AVATARS[0], rating: 5, date: '2024-03-15',
    comment: 'Khóa học rất hay và chi tiết. Giảng viên giải thích rõ ràng, dễ hiểu. Tôi đã áp dụng được ngay vào công việc thực tế.' },
  { id: 'r2', user: 'Trần Thị Bình', avatar: AVATARS[1], rating: 5, date: '2024-03-10',
    comment: 'Nội dung cực kỳ thực tế, không lý thuyết suông. Rất recommend cho ai mới bắt đầu!' },
  { id: 'r3', user: 'Lê Hoàng Cường', avatar: AVATARS[2], rating: 4, date: '2024-02-28',
    comment: 'Tốt lắm, chỉ thiếu một vài ví dụ nâng cao hơn một chút nhưng nhìn chung rất đáng tiền.' },
  { id: 'r4', user: 'Phạm Thị Dung', avatar: AVATARS[3], rating: 5, date: '2024-02-20',
    comment: 'Khoá học tuyệt vời! Instructor nhiệt tình, hỗ trợ nhanh trong phần Q&A.' },
];

export const COURSES: Course[] = [
  {
    id: '1', slug: 'react-nextjs-tu-zero-den-hero',
    title: 'React & Next.js: Từ Zero đến Hero',
    description: 'Nắm vững React 19, Next.js App Router, TypeScript và xây dựng ứng dụng fullstack production-ready.',
    thumbnail: THUMBNAILS[0],
    instructor: { name: 'Nguyễn Minh Tuấn', avatar: AVATARS[0], bio: 'Senior Frontend Engineer tại Google, 8 năm kinh nghiệm', rating: 4.9, students: 24500 },
    category: 'Web Development', categoryIcon: '🌐',
    price: 599000, originalPrice: 1200000,
    rating: 4.8, reviewCount: 3420, studentCount: 18200,
    duration: '32h 15m', lessonCount: 180, level: 'beginner',
    language: 'Tiếng Việt', lastUpdated: '2024-03',
    badge: 'bestseller',
    tags: ['React', 'Next.js', 'TypeScript', 'TailwindCSS'],
    outcomes: [
      'Xây dựng SPA & SSR với React + Next.js', 'Nắm vững Hooks, Context, Redux Toolkit',
      'TypeScript trong dự án thực tế', 'Triển khai lên Vercel',
      'Tích hợp REST API & GraphQL', 'Authentication với NextAuth.js',
      'Tối ưu Core Web Vitals', 'Testing với Vitest & Playwright',
    ],
    requirements: ['Biết HTML/CSS cơ bản', 'Biết JavaScript ES6+'],
    curriculum: makeCurriculum(6, 8),
    progress: 65,
    reviews: makeReviews(),
  },
  {
    id: '2', slug: 'nodejs-express-api-development',
    title: 'Node.js & Express: Xây dựng REST API Chuyên nghiệp',
    description: 'Học cách thiết kế và phát triển RESTful API với Node.js, Express, MongoDB và bảo mật JWT.',
    thumbnail: THUMBNAILS[1],
    instructor: { name: 'Trần Đức Long', avatar: AVATARS[1], bio: 'Backend Lead tại Shopee Việt Nam, chuyên gia Node.js', rating: 4.8, students: 15300 },
    category: 'Backend', categoryIcon: '⚙️',
    price: 499000, originalPrice: 999000,
    rating: 4.7, reviewCount: 2180, studentCount: 12400,
    duration: '24h 30m', lessonCount: 140, level: 'intermediate',
    language: 'Tiếng Việt', lastUpdated: '2024-02',
    badge: 'hot',
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    outcomes: [
      'Thiết kế RESTful API chuẩn', 'Authentication & Authorization', 'Database MongoDB Atlas',
      'Deploy lên AWS EC2', 'Rate limiting & Security', 'API Documentation với Swagger',
    ],
    requirements: ['JavaScript ES6+', 'Hiểu HTTP cơ bản'],
    curriculum: makeCurriculum(5, 7),
    reviews: makeReviews(),
  },
  {
    id: '3', slug: 'python-data-science-machine-learning',
    title: 'Python cho Data Science & Machine Learning',
    description: 'Từ Python cơ bản đến Machine Learning với scikit-learn, pandas, numpy và visualization.',
    thumbnail: THUMBNAILS[2],
    instructor: { name: 'Lê Thị Hương', avatar: AVATARS[2], bio: 'Data Scientist tại VinAI, PhD Computer Science', rating: 4.9, students: 31000 },
    category: 'Data Science', categoryIcon: '📊',
    price: 699000, originalPrice: 1500000,
    rating: 4.9, reviewCount: 5620, studentCount: 28900,
    duration: '45h 20m', lessonCount: 240, level: 'beginner',
    language: 'Tiếng Việt', lastUpdated: '2024-03',
    badge: 'bestseller',
    tags: ['Python', 'Pandas', 'Scikit-learn', 'TensorFlow'],
    outcomes: [
      'Python nâng cao cho dữ liệu', 'EDA với Pandas & Matplotlib', 'ML algorithms từ cơ bản đến nâng cao',
      'Deep Learning với TensorFlow/Keras', 'Deploy ML model lên production', 'Kaggle competition ready',
    ],
    requirements: ['Toán cơ bản', 'Không cần biết lập trình trước'],
    curriculum: makeCurriculum(8, 9),
    progress: 40,
    reviews: makeReviews(),
  },
  {
    id: '4', slug: 'ui-ux-design-figma-mastery',
    title: 'UI/UX Design Master: Figma từ A đến Z',
    description: 'Thiết kế giao diện chuyên nghiệp với Figma, Design System, Prototype và Handoff cho Developer.',
    thumbnail: THUMBNAILS[3],
    instructor: { name: 'Phạm Thành Nam', avatar: AVATARS[3], bio: 'Lead Designer tại Grab Southeast Asia', rating: 4.8, students: 19200 },
    category: 'Design', categoryIcon: '🎨',
    price: 449000, originalPrice: 899000,
    rating: 4.8, reviewCount: 3100, studentCount: 17500,
    duration: '28h 45m', lessonCount: 160, level: 'beginner',
    language: 'Tiếng Việt', lastUpdated: '2024-01',
    badge: 'new',
    tags: ['Figma', 'UI Design', 'UX Research', 'Prototyping'],
    outcomes: [
      'Thiết kế với Figma thành thục', 'Xây dựng Design System', 'User Research & Wireframing',
      'Interactive Prototype', 'Handoff với Zeplin', 'Portfolio chuyên nghiệp',
    ],
    requirements: ['Không cần kinh nghiệm thiết kế', 'Có Figma account miễn phí'],
    curriculum: makeCurriculum(5, 8),
    reviews: makeReviews(),
  },
  {
    id: '5', slug: 'devops-docker-kubernetes',
    title: 'DevOps với Docker & Kubernetes',
    description: 'Containerization, orchestration, CI/CD pipeline và cloud deployment trên AWS/GCP.',
    thumbnail: THUMBNAILS[4],
    instructor: { name: 'Võ Thanh Hải', avatar: AVATARS[0], bio: 'DevOps Engineer tại FPT Software, AWS Certified', rating: 4.7, students: 8900 },
    category: 'DevOps', categoryIcon: '🚀',
    price: 799000, originalPrice: 1600000,
    rating: 4.7, reviewCount: 1540, studentCount: 7800,
    duration: '38h 10m', lessonCount: 200, level: 'advanced',
    language: 'Tiếng Việt', lastUpdated: '2024-02',
    tags: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    outcomes: [
      'Docker & Docker Compose thuần thục', 'Kubernetes cluster production', 'Jenkins/GitHub Actions CI/CD',
      'Monitoring với Prometheus & Grafana', 'AWS EKS deployment', 'Infrastructure as Code',
    ],
    requirements: ['Linux cơ bản', 'Biết ít nhất 1 ngôn ngữ lập trình'],
    curriculum: makeCurriculum(7, 8),
    progress: 25,
    reviews: makeReviews(),
  },
  {
    id: '6', slug: 'flutter-mobile-app-development',
    title: 'Flutter: Phát triển App Mobile Đa nền tảng',
    description: 'Xây dựng ứng dụng iOS & Android chuyên nghiệp với Flutter và Dart từ cơ bản đến nâng cao.',
    thumbnail: THUMBNAILS[5],
    instructor: { name: 'Đặng Thị Lan', avatar: AVATARS[1], bio: 'Flutter Developer, Google Developer Expert', rating: 4.9, students: 12600 },
    category: 'Mobile', categoryIcon: '📱',
    price: 549000, originalPrice: 1100000,
    rating: 4.9, reviewCount: 2890, studentCount: 11200,
    duration: '35h 30m', lessonCount: 190, level: 'intermediate',
    language: 'Tiếng Việt', lastUpdated: '2024-03',
    badge: 'hot',
    tags: ['Flutter', 'Dart', 'iOS', 'Android'],
    outcomes: [
      'Flutter & Dart từ cơ bản', 'State Management với Bloc/Provider', 'REST API integration',
      'Firebase backend', 'App Store & Google Play deployment', 'Animations & Custom UI',
    ],
    requirements: ['OOP cơ bản', 'Biết ít nhất 1 ngôn ngữ lập trình'],
    curriculum: makeCurriculum(6, 9),
    reviews: makeReviews(),
  },
  {
    id: '7', slug: 'cybersecurity-ethical-hacking',
    title: 'Cybersecurity & Ethical Hacking',
    description: 'Pentest, bảo mật web, network security và chuẩn bị chứng chỉ CEH/OSCP.',
    thumbnail: THUMBNAILS[6],
    instructor: { name: 'Nguyễn Bảo Châu', avatar: AVATARS[2], bio: 'Security Researcher, Bug Bounty Hunter tại HackerOne', rating: 4.8, students: 6700 },
    category: 'Security', categoryIcon: '🔐',
    price: 899000, originalPrice: 1800000,
    rating: 4.8, reviewCount: 1230, studentCount: 5900,
    duration: '42h 00m', lessonCount: 220, level: 'advanced',
    language: 'Tiếng Việt', lastUpdated: '2024-01',
    tags: ['Hacking', 'Penetration Testing', 'OWASP', 'Kali Linux'],
    outcomes: [
      'Kali Linux & Security tools', 'OWASP Top 10 vulnerabilities', 'Network packet analysis',
      'Web application penetration testing', 'Social Engineering', 'CTF challenges',
    ],
    requirements: ['Networking cơ bản', 'Linux command line'],
    curriculum: makeCurriculum(7, 9),
    reviews: makeReviews(),
  },
  {
    id: '8', slug: 'digital-marketing-seo-growth',
    title: 'Digital Marketing & SEO Growth Hacking',
    description: 'Chiến lược marketing digital, SEO on-page/off-page, Google Ads, Facebook Ads và Growth Hacking.',
    thumbnail: THUMBNAILS[7],
    instructor: { name: 'Trịnh Minh Anh', avatar: AVATARS[3], bio: 'CMO startup unicorn, 10 năm digital marketing', rating: 4.7, students: 22400 },
    category: 'Marketing', categoryIcon: '📈',
    price: 399000, originalPrice: 799000,
    rating: 4.7, reviewCount: 4100, studentCount: 20100,
    duration: '20h 15m', lessonCount: 120, level: 'beginner',
    language: 'Tiếng Việt', lastUpdated: '2024-03',
    badge: 'bestseller',
    tags: ['SEO', 'Google Ads', 'Facebook Ads', 'Content Marketing'],
    outcomes: [
      'SEO technical & content', 'Google Ads ROAS optimization', 'Facebook & TikTok Ads',
      'Email marketing automation', 'Analytics & Data-driven decision', 'Growth Hacking strategies',
    ],
    requirements: ['Không yêu cầu kinh nghiệm'],
    curriculum: makeCurriculum(4, 8),
    reviews: makeReviews(),
  },
  {
    id: '9', slug: 'blockchain-web3-solidity',
    title: 'Blockchain & Web3: Lập trình Solidity Smart Contract',
    description: 'Ethereum, Solidity, DeFi, NFT và xây dựng DApp với ethers.js và Hardhat.',
    thumbnail: THUMBNAILS[8],
    instructor: { name: 'Cao Văn Đức', avatar: AVATARS[0], bio: 'Blockchain Developer, DeFi Protocol contributor', rating: 4.6, students: 4500 },
    category: 'Blockchain', categoryIcon: '⛓️',
    price: 749000, originalPrice: 1500000,
    rating: 4.6, reviewCount: 890, studentCount: 4100,
    duration: '30h 00m', lessonCount: 165, level: 'advanced',
    language: 'Tiếng Việt', lastUpdated: '2024-02',
    badge: 'new',
    tags: ['Solidity', 'Ethereum', 'DeFi', 'NFT', 'Web3'],
    outcomes: [
      'Ethereum & Solidity fundamentals', 'Smart Contract security', 'DeFi protocols từ A-Z',
      'NFT marketplace development', 'ethers.js & Web3.js', 'Hardhat testing & deployment',
    ],
    requirements: ['JavaScript ES6+', 'Basic cryptography concepts'],
    curriculum: makeCurriculum(6, 7),
    reviews: makeReviews(),
  },
  {
    id: '10', slug: 'game-development-unity',
    title: 'Game Development với Unity & C#',
    description: 'Tạo game 2D/3D chuyên nghiệp với Unity Engine, C# scripting và publish lên các nền tảng.',
    thumbnail: THUMBNAILS[9],
    instructor: { name: 'Bùi Thị Thanh', avatar: AVATARS[1], bio: 'Unity Developer, 15+ games published on Steam', rating: 4.8, students: 9800 },
    category: 'Game Dev', categoryIcon: '🎮',
    price: 649000, originalPrice: 1300000,
    rating: 4.8, reviewCount: 2100, studentCount: 8900,
    duration: '40h 45m', lessonCount: 210, level: 'beginner',
    language: 'Tiếng Việt', lastUpdated: '2024-01',
    tags: ['Unity', 'C#', 'Game Design', '2D/3D'],
    outcomes: [
      'Unity Engine thành thục', 'C# cho game scripting', 'Physics & Animation',
      'Mobile game optimization', 'Multiplayer với Photon', 'Publish Steam & App Store',
    ],
    requirements: ['Không cần kinh nghiệm lập trình'],
    curriculum: makeCurriculum(7, 8),
    reviews: makeReviews(),
  },
  {
    id: '11', slug: 'aws-cloud-architect',
    title: 'AWS Cloud: Solutions Architect Associate',
    description: 'Chuẩn bị chứng chỉ AWS SAA-C03, kiến trúc cloud, serverless, security và cost optimization.',
    thumbnail: THUMBNAILS[10],
    instructor: { name: 'Phan Minh Khoa', avatar: AVATARS[2], bio: 'AWS Solutions Architect Professional, 5 AWS certifications', rating: 4.9, students: 13400 },
    category: 'Cloud', categoryIcon: '☁️',
    price: 799000, originalPrice: 1600000,
    rating: 4.9, reviewCount: 3200, studentCount: 12100,
    duration: '36h 20m', lessonCount: 195, level: 'intermediate',
    language: 'Tiếng Việt', lastUpdated: '2024-03',
    badge: 'hot',
    tags: ['AWS', 'Cloud Architecture', 'Serverless', 'SAA-C03'],
    outcomes: [
      'AWS core services mastery', 'High availability architecture', 'Serverless với Lambda',
      'Security & IAM best practices', 'Cost optimization strategies', 'Pass AWS SAA exam',
    ],
    requirements: ['IT networking cơ bản', 'Biết 1 ngôn ngữ lập trình'],
    curriculum: makeCurriculum(6, 9),
    reviews: makeReviews(),
  },
  {
    id: '12', slug: 'typescript-advanced-patterns',
    title: 'TypeScript Nâng cao: Design Patterns & Architecture',
    description: 'TypeScript generics, decorators, design patterns và clean architecture cho enterprise apps.',
    thumbnail: THUMBNAILS[11],
    instructor: { name: 'Đỗ Quang Vinh', avatar: AVATARS[3], bio: 'Tech Lead tại Tiki, TypeScript contributor', rating: 4.8, students: 7600 },
    category: 'Web Development', categoryIcon: '🌐',
    price: 549000, originalPrice: 1099000,
    rating: 4.8, reviewCount: 1780, studentCount: 6900,
    duration: '26h 00m', lessonCount: 145, level: 'advanced',
    language: 'Tiếng Việt', lastUpdated: '2024-02',
    badge: 'new',
    tags: ['TypeScript', 'Design Patterns', 'Clean Architecture', 'SOLID'],
    outcomes: [
      'TypeScript advanced types', 'Generic programming', 'GoF Design Patterns in TS',
      'Clean Architecture implementation', 'SOLID principles', 'Testing with Jest & Vitest',
    ],
    requirements: ['TypeScript/JavaScript intermediate', 'OOP experience'],
    curriculum: makeCurriculum(5, 8),
    reviews: makeReviews(),
  },
];

export const getFeaturedCourses = () =>
  COURSES.filter(c => c.badge === 'bestseller' || c.badge === 'hot').slice(0, 6);

export const getCourseBySlug = (slug: string) =>
  COURSES.find(c => c.slug === slug) ?? null;

export const getCoursesByCategory = (category: string) =>
  COURSES.filter(c => c.category === category);
