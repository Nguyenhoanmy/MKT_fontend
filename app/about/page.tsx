'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Users, Award, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const values = [
  {
    icon: <Target size={30} />,
    title: 'Thực Chiến 100%',
    desc: 'Không dạy lý thuyết suông. Mọi kiến thức đều áp dụng trực tiếp vào dự án thực tế ngay trong khóa học.'
  },
  {
    icon: <Lightbulb size={30} />,
    title: 'Đổi Mới Liên Tục',
    desc: 'Giáo trình luôn cập nhật những công nghệ, framework và xu hướng mới nhất từ thị trường quốc tế.'
  },
  {
    icon: <Users size={30} />,
    title: 'Cộng Đồng Gắn Kết',
    desc: 'Không ai bị bỏ lại phía sau. Một cộng đồng sẵn sàng hỗ trợ, chia sẻ kiến thức mọi thời điểm.'
  }
];

const team = [
  { name: 'Nguyễn Văn A', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
  { name: 'Trần Thị B', role: 'Head of Product', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
  { name: 'Lê Hoàng C', role: 'Lead Instructor', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' },
  { name: 'Phạm Minh D', role: 'Community Manager', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' }
];

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* HERO SECTION */}
      <section className="about-page__hero">
        <div className="container">
          <motion.div 
            className="about-page__hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="about-page__hero-title">Kiến Tạo Tương Lai Công Nghệ Việt</h1>
            <p className="about-page__hero-subtitle">
              EduVerse không chỉ là nền tảng học tập, chúng tôi là bệ phóng giúp hàng ngàn bạn trẻ tại Việt Nam chinh phục những nấc thang cao nhất trong ngành Công nghệ thông tin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="about-page__stats">
        <div className="container">
          <div className="about-page__stats-grid">
            {[
              { num: '50K+', label: 'Học viên tin tưởng' },
              { num: '1.2K+', label: 'Khóa học chất lượng' },
              { num: '98%', label: 'Sinh viên có việc làm' },
              { num: '200+', label: 'Giảng viên chuyên gia' }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="about-page__stat-num">{stat.num}</div>
                <div className="about-page__stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="about-page__vision">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Giá trị cốt lõi</h2>
            <p style={{ color: '#6B7280', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
              Những nguyên tắc dẫn lối mọi hoạt động và quyết định của đội ngũ EduVerse.
            </p>
          </div>
          
          <div className="about-page__grid">
            {values.map((v, i) => (
              <motion.div 
                key={i} 
                className="about-page__card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="about-page__card-icon">{v.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{v.title}</h3>
                <p style={{ color: '#6B7280', lineHeight: 1.6 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="about-page__team">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Đội ngũ sáng lập</h2>
            <p style={{ color: '#6B7280', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
              Những con người đam mê công nghệ và giáo dục, cùng chung một sứ mệnh.
            </p>
          </div>

          <div className="about-page__team-grid">
            {team.map((member, i) => (
              <motion.div 
                key={i}
                className="about-page__team-member"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={member.image} alt={member.name} />
                <h4>{member.name}</h4>
                <p>{member.role}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, color: '#9CA3AF' }}>
                  <FaFacebook size={18} style={{ cursor: 'pointer' }} />
                  <FaLinkedin size={18} style={{ cursor: 'pointer' }} />
                  <FaTwitter size={18} style={{ cursor: 'pointer' }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ background: 'linear-gradient(135deg,#4F46E5 0%,#7C3AED 100%)', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 16 }}>
            Bắt đầu tương lai của bạn ngay hôm nay
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 18, marginBottom: 40 }}>
            Hàng ngàn khóa học đang chờ bạn khám phá.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/courses" className="btn btn--lg" style={{ background: '#fff', color: '#4F46E5', fontWeight: 700 }}>
              Khám phá khóa học
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
