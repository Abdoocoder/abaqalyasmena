import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import logo from '../assets/logo.png';

const floatAnimation = {
  y: [0, -6, 0],
  transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
};

const springHover = {
  type: 'spring', stiffness: 200, damping: 12,
};

const Footer = () => {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    api.getContact().then(setContact).catch(() => {});
  }, []);

  return (
    <footer className="bg-surface-container-low dark:bg-inverse-surface mt-auto">
      <div className="w-full py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <motion.div
          className="flex flex-col space-y-stack-sm"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <Link to="/" className="w-fit">
            <motion.img
              src={logo}
              alt="مكتبة عبق الياسمينة"
              className="h-14 w-auto"
              animate={floatAnimation}
              whileHover={{ scale: 1.05 }}
              transition={springHover}
            />
          </Link>
          <p className="font-body-sm text-body-sm text-on-secondary-container dark:text-secondary-fixed-dim max-w-xs">
            مصدرك الموثوق للمستلزمات المكتبية والأكاديمية في قلب عمان
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col gap-2 font-body-sm text-body-sm"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.06 }}
        >
          <h4 className="font-headline-md text-body-base text-on-surface mb-2">تواصل</h4>
          {contact && (
            <>
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-secondary-container dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary transition-colors duration-160 ease-out-strong active:scale-[0.97] underline opacity-80 hover:opacity-100 w-fit"
              >
                واتساب
              </a>
              <a
                href={`tel:${contact.phone}`}
                className="text-on-secondary-container dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary transition-colors duration-160 ease-out-strong active:scale-[0.97] underline opacity-80 hover:opacity-100 w-fit"
              >
                اتصال هاتفي
              </a>
              <a
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-secondary-container dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary transition-colors duration-160 ease-out-strong active:scale-[0.97] underline opacity-80 hover:opacity-100 w-fit"
              >
                فيسبوك
              </a>
            </>
          )}
        </motion.div>

        <motion.div
          className="flex flex-col gap-2 font-body-sm text-body-sm"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.12 }}
        >
          <h4 className="font-headline-md text-body-base text-on-surface mb-2">زورنا</h4>
          {contact && (
            <>
              <span className="text-on-secondary-container dark:text-secondary-fixed-dim opacity-80">
                {contact.address_ar}
              </span>
              <span className="text-on-secondary-container dark:text-secondary-fixed-dim opacity-80">
                ساعات العمل: {contact.hours_ar}
              </span>
            </>
          )}
        </motion.div>

        <motion.div
          className="col-span-1 md:col-span-3 mt-stack-md pt-stack-sm border-t border-surface-variant font-body-sm text-body-sm text-on-secondary-container dark:text-secondary-fixed-dim text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          © {new Date().getFullYear()} مكتبة عبق الياسمينة. جميع الحقوق محفوظة
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
