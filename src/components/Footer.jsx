import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CONTACT_INFO } from '../constants/data';
import logo from '../assets/logo.png';

const floatAnimation = {
  y: [0, -6, 0],
  transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
};

const Footer = () => {
  return (
    <footer className="bg-surface-container-low dark:bg-inverse-surface mt-auto">
      <div className="w-full py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="flex flex-col space-y-stack-sm">
          <Link to="/" className="w-fit">
            <motion.img
              src={logo}
              alt="مكتبة عبق الياسمينة"
              className="h-14 w-auto"
              animate={floatAnimation}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            />
          </Link>
          <p className="font-body-sm text-body-sm text-on-secondary-container dark:text-secondary-fixed-dim max-w-xs">
            مصدرك الموثوق للمستلزمات المكتبية والأكاديمية في قلب عمان
          </p>
        </div>

        <div className="flex flex-col space-y-unit font-body-sm text-body-sm">
          <h4 className="font-headline-md text-body-base text-on-surface mb-2">تواصل</h4>
          <a 
            href={`https://wa.me/${CONTACT_INFO.whatsapp}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-on-secondary-container dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary transition-colors duration-160 ease-out-strong active:scale-[0.97] underline opacity-80 hover:opacity-100"
          >
            واتساب
          </a>
          <a 
            href={`tel:${CONTACT_INFO.phone}`} 
            className="text-on-secondary-container dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary transition-colors duration-160 ease-out-strong active:scale-[0.97] underline opacity-80 hover:opacity-100"
          >
            اتصال هاتفي
          </a>
          <a 
            href={CONTACT_INFO.facebook} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-on-secondary-container dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary transition-colors duration-160 ease-out-strong active:scale-[0.97] underline opacity-80 hover:opacity-100"
          >
            فيسبوك
          </a>
        </div>

        <div className="flex flex-col space-y-unit font-body-sm text-body-sm">
          <h4 className="font-headline-md text-body-base text-on-surface mb-2">زورنا</h4>
          <span className="text-on-secondary-container dark:text-secondary-fixed-dim">
            {CONTACT_INFO.addressAr}
          </span>
          <span className="text-on-secondary-container dark:text-secondary-fixed-dim">
            ساعات العمل: {CONTACT_INFO.hoursAr}
          </span>
        </div>

        <div className="col-span-1 md:col-span-3 mt-stack-md pt-stack-sm border-t border-surface-variant font-body-sm text-body-sm text-on-secondary-container dark:text-secondary-fixed-dim text-center">
          © {new Date().getFullYear()} مكتبة عبق الياسمينة. جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
};

export default Footer;
