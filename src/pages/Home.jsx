import { useState, useEffect } from 'react';
import WhatsAppButton from '../components/WhatsAppButton';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import PageTransition from '../components/PageTransition';
import FloatingImage from '../components/FloatingImage';
import MagneticButton from '../components/MagneticButton';
import Icon from '../components/Icon';
import { motion } from 'framer-motion';
import heroBg from '../assets/hero-bg.jpg';
import { api } from '../services/api';

const springUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20, delay: i * 0.06 },
  }),
};

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [contact, setContact] = useState(null);

  useEffect(() => {
    api.getCategories().then(setCategories).catch(() => {});
    api.getContact().then(setContact).catch(() => {});
  }, []);

  return (
    <PageTransition>
      <section className="relative w-full min-h-[100dvh] bg-surface-container-low dark:bg-surface-container-low-dark overflow-hidden">
        <div className="absolute inset-0">
          <img
            alt="أدوات مكتبية مرتبة على طاولة"
            className="w-full h-full object-cover opacity-20 object-center"
            src={heroBg}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-surface-container-low via-surface-container-low/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-5 gap-gutter min-h-[100dvh] items-center">
          <div className="lg:col-span-3 lg:pr-12 flex flex-col space-y-stack-md py-24 lg:py-0">
            <motion.h1
              className="font-display-lg text-display-lg text-on-surface leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
              <span className="text-primary block">مكتبة عبق الياسمينة</span>
              وجهتك للقرطاسية
            </motion.h1>
            <motion.p
              className="max-w-readable text-body-base text-on-surface-variant"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.08 }}
            >
              متجرك الموثوق للأدوات المكتبية في شارع جاوا، عمان
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-stack-sm pt-unit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.16 }}
            >
              {contact && (
                <MagneticButton
                  href={`tel:${contact.phone}`}
                  className="bg-tertiary text-on-tertiary font-label-caps text-label-caps px-6 py-3 rounded-xl shadow-ambient flex items-center space-x-reverse space-x-2"
                >
                  <Icon name="phone" className="w-[18px] h-[18px]" />
                  <span>اتصل بالمتجر</span>
                </MagneticButton>
              )}
              <WhatsAppButton />
            </motion.div>
          </div>
          <div className="hidden lg:block lg:col-span-2 relative">
            <FloatingImage
              src={heroBg}
              alt="طاولة عمل منظمة مع دفتر ملاحظات"
              className="relative rounded-3xl overflow-hidden shadow-ambient aspect-[3/4]"
            />
          </div>
        </div>
      </section>

      <Reveal>
        <section className="max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop -mt-12 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {contact && (
              <>
                <motion.div
                  className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-xl p-stack-md shadow-ambient border border-primary/10 lg:col-span-2 flex items-start space-x-reverse space-x-stack-sm"
                  variants={springUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0}
                >
                  <div className="bg-primary/10 p-3 rounded-lg text-primary flex-shrink-0">
                    <Icon name="location_on" className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-headline-md text-body-base text-on-surface dark:text-inverse-on-surface mb-unit">الموقع</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-inverse-on-surface/80">{contact.address_ar}</p>
                  </div>
                </motion.div>
                <motion.div
                  className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-xl p-stack-md shadow-ambient border border-primary/10 flex items-start space-x-reverse space-x-stack-sm"
                  variants={springUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={1}
                >
                  <div className="bg-primary/10 p-3 rounded-lg text-primary flex-shrink-0">
                    <Icon name="schedule" className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-headline-md text-body-base text-on-surface dark:text-inverse-on-surface mb-unit">ساعات العمل</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-inverse-on-surface/80">{contact.hours_ar}</p>
                  </div>
                </motion.div>
                <motion.div
                  className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-xl p-stack-md shadow-ambient border border-primary/10 flex items-start space-x-reverse space-x-stack-sm"
                  variants={springUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={2}
                >
                  <div className="bg-primary/10 p-3 rounded-lg text-primary flex-shrink-0">
                    <Icon name="support_agent" className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-headline-md text-body-base text-on-surface dark:text-inverse-on-surface mb-unit">اتصال مباشر</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-inverse-on-surface/80">{contact.phone}</p>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </section>
      </Reveal>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <Reveal>
          <header className="mb-stack-lg">
            <h2 className="text-display-lg font-display-lg text-on-surface mb-stack-sm">التصنيفات</h2>
            <p className="max-w-readable text-body-base text-on-surface-variant">استكشف مجموعتنا من المنتجات المكتبية</p>
          </header>
        </Reveal>
        <div className="stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {categories.slice(0, 4).map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="group relative block overflow-hidden rounded-xl bg-surface-container-lowest dark:bg-surface-container-lowest-dark shadow-ambient transition-transform duration-160 ease-out-strong hover:-translate-y-1 hover:shadow-ambient-hover active:scale-[0.97] aspect-[4/5]"
            >
              <div className="absolute inset-0 bg-surface-container-highest dark:bg-surface-container-highest-dark">
                {cat.image_url && <img src={cat.image_url} loading="lazy" className="w-full h-full object-cover opacity-80 transition-transform duration-500 ease-out-strong group-hover:scale-105" alt={cat.name_ar} />}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-inverse-surface/90 to-transparent flex items-end justify-between">
                <div>
                  {cat.tagline && <span className="text-label-caps font-label-caps text-primary-fixed tracking-wider mb-1 block uppercase pulse-soft">{cat.tagline}</span>}
                  <h3 className="text-headline-md font-headline-md text-on-primary font-bold">{cat.name_ar}</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center text-on-primary transition-all duration-200 ease-out-strong group-hover:opacity-100 opacity-0 -translate-x-2 group-hover:translate-x-0">
                  <Icon name="arrow_back" className="w-5 h-5" />
                </div>
              </div>
            </Link>
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
