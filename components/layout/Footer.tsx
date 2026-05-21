import Link from 'next/link';
import { FaFacebook, FaGithub, FaTwitter, FaYoutube, FaLinkedin } from 'react-icons/fa';

const FooterLinks = {
  'Khóa học': [
    { label: 'Web Development', href: '/courses?cat=web' },
    { label: 'Data Science', href: '/courses?cat=data' },
    { label: 'Mobile Development', href: '/courses?cat=mobile' },
    { label: 'UI/UX Design', href: '/courses?cat=design' },
    { label: 'DevOps & Cloud', href: '/courses?cat=devops' },
  ],
  'Công ty': [
    { label: 'Về chúng tôi', href: '/about' },
    { label: 'Blog & Tin tức', href: '/blog' },
    { label: 'Tuyển dụng', href: '/careers' },
    { label: 'Đối tác', href: '/partners' },
  ],
  'Hỗ trợ': [
    { label: 'Trung tâm hỗ trợ', href: '/help' },
    { label: 'Điều khoản sử dụng', href: '/terms' },
    { label: 'Chính sách bảo mật', href: '/privacy' },
    { label: 'Liên hệ', href: '/contact' },
  ],
};

const SocialLinks = [
  { icon: FaFacebook,  href: '#', label: 'Facebook'  },
  { icon: FaYoutube,   href: '#', label: 'YouTube'   },
  { icon: FaTwitter,   href: '#', label: 'Twitter'   },
  { icon: FaLinkedin,  href: '#', label: 'LinkedIn'  },
  { icon: FaGithub,    href: '#', label: 'GitHub'    },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__brand-logo">
              <div className="footer__brand-icon">M</div>
              <span className="footer__brand-name">MKT</span>
            </div>
            <p className="footer__brand-desc">
              Nền tảng học trực tuyến hàng đầu Việt Nam với hơn 1000 khóa học chuyên nghiệp
              từ các chuyên gia tại Google, Meta, Shopee và các công ty công nghệ hàng đầu.
            </p>
            <div className="footer__social">
              {SocialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} className="footer__social-link" aria-label={label}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FooterLinks).map(([title, links]) => (
            <div key={title} className="footer__col">
              <h3 className="footer__col-title">{title}</h3>
              <nav className="footer__links">
                {links.map(link => (
                  <Link key={link.href} href={link.href} className="footer__links-item">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} MKT. All rights reserved. Made with ❤️ in Vietnam.
          </p>
          <div className="footer__legal">
            <Link href="/terms"   className="footer__legal-link">Điều khoản</Link>
            <Link href="/privacy" className="footer__legal-link">Bảo mật</Link>
            <Link href="/sitemap" className="footer__legal-link">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
