import { useState, useEffect } from 'react';
import WhatsAppButton from '../components/WhatsAppButton';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import PageTransition from '../components/PageTransition';
import MagneticButton from '../components/MagneticButton';
import CategoryCard from '../components/CategoryCard';
import Icon from '../components/Icon';
import { motion } from 'framer-motion';
import heroBg from '../assets/hero-bg.jpg';
import { api } from '../services/api';

const ContactTile = ({ icon, title, value, delay = 0 }) => (
  <motion.div
    className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-xl p-stack-md shadow-ambient flex items-start space-x-reverse space-x-stack-sm"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 100, damping: 20, delay: delay * 0.06 }}
  >
    <div className="bg-primary/10 p-3 rounded-lg text-primary flex-shrink-0">
      <Icon name={icon} className="w-6 h-6" />
    </div>
    <div>
      <h3 className="font-headline-md text-body-base text-on-surface dark:text-inverse-on-surface mb-unit">{title}</h3>
      <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-inverse-on-surface/80">{value}</p>
    </div>
  </motion.div>
);

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [contact, setContact] = useState(null);

  useEffect(() => {
    api.getCategories().then(setCategories).catch(() => console.warn('Home: failed to load categories'));
    api.getContact().then(setContact).catch(() => console.warn('Home: failed to load contact'));
  }, []);

  return (
    <PageTransition>
      <section className="relative w-full min-h-[100dvh] bg-surface-container-low dark:bg-surface-container-low-dark overflow-hidden">
        <div className="absolute inset-0">
          <img
            alt="أدوات مكتبية مرتبة على طاولة"
            className="w-full h-full object-cover opacity-25 object-center"
            src={heroBg}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop min-h-[100dvh] flex flex-col justify-end pb-24 lg:pb-32">
          <motion.h1
            className="font-display-lg text-display-lg text-on-surface leading-tight max-w-[60ch]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <span className="text-primary block">مكتبة عبق الياسمينة</span>
            وجهتك للقرطاسية في عمان
          </motion.h1>
          <motion.p
            className="max-w-readable text-body-base text-on-surface-variant mt-stack-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.08 }}
          >
            متجرك الموثوق للأدوات المكتبية في شارع قوس قزح — جودة عالية، خدمة أسرع
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-stack-sm mt-stack-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.16 }}
          >
            <WhatsAppButton />
            {contact && (
              <MagneticButton
                href={`tel:${contact.phone}`}
                className="bg-transparent text-on-surface border-2 border-on-surface/20 font-label-caps text-label-caps px-6 py-3 rounded-xl flex items-center space-x-reverse space-x-2 hover:border-primary hover:text-primary transition-colors duration-160 ease-out-strong active:scale-[0.97]"
              >
                <Icon name="phone" className="w-[18px] h-[18px]" />
                <span>اتصل بالمتجر</span>
              </MagneticButton>
            )}
          </motion.div>
        </div>
      </section>

      <section className="max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {contact && (
            <>
              <div className="lg:col-span-2">
                <ContactTile icon="location_on" title="الموقع" value={contact.address_ar} delay={0} />
              </div>
              <ContactTile icon="schedule" title="ساعات العمل" value={contact.hours_ar} delay={1} />
              <ContactTile icon="support_agent" title="اتصال مباشر" value={contact.phone} delay={2} />
            </>
          )}
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg mt-stack-lg">
        <Reveal>
          <header className="mb-stack-lg">
            <span className="text-label-caps font-label-caps text-secondary tracking-widest mb-2 block">استكشف</span>
            <h2 className="text-display-lg font-display-lg text-on-surface mb-stack-sm">التصنيفات</h2>
            <p className="max-w-readable text-body-base text-on-surface-variant">دفاتر، أقلام، حقائب، أدوات فنية — كل ما تحتاج في مكان واحد</p>
          </header>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {categories.slice(0, 4).map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
        <div className="mt-stack-md text-left">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 text-primary font-bold transition-colors duration-160 ease-out-strong active:scale-[0.97] border-b-2 border-transparent hover:border-primary pb-1"
          >
            عرض جميع التصنيفات
            <Icon name="arrow_left_alt" className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
