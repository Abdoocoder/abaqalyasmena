import WhatsAppButton from '../components/WhatsAppButton';
import spiralSetImg from '../assets/product-spiral-set.jpg';
import artImg from '../assets/category-art.jpg';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

const springBundle = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20, delay: i * 0.12 },
  }),
};

const Offers = () => {
  const bundles = [
    {
      id: 'bundle-1',
      title: 'Back to School Pack',
      titleAr: 'حزمة العودة للمدارس',
      description: '10 دفاتر + 5 أقلام + علبة هندسة',
      price: '25.00 JOD',
      image: spiralSetImg,
      tag: 'الأكثر طلباً'
    },
    {
      id: 'bundle-2',
      title: 'Art Essentials Kit',
      titleAr: 'طقم الأدوات الفنية',
      description: 'مجموعة ألوان مائية + كراسة رسم + فرش',
      price: '18.00 JOD',
      image: artImg,
      tag: 'أفضل قيمة'
    }
  ];

  return (
    <PageTransition>
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <header className="mb-stack-lg">
          <h1 className="animate-fade-up text-display-lg font-display-lg text-on-surface mb-stack-sm">عروض وحزم خاصة</h1>
          <p className="animate-fade-up max-w-readable text-body-base text-on-surface-variant" style={{ animationDelay: '80ms' }}>حزم مكتبية مختارة للطلاب والمحترفين</p>
        </header>

        <div className="flex flex-col gap-8">
          {bundles.map((bundle, i) => (
            <motion.div
              key={bundle.id}
              className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-3xl overflow-hidden flex flex-col md:flex-row items-stretch shadow-ambient border border-primary/10 transition-shadow duration-200 ease-out-strong hover:shadow-ambient-hover"
              variants={springBundle}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={i}
            >
              <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
                <img src={bundle.image} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 ease-out-strong hover:scale-105" alt={bundle.titleAr} />
              </div>
              <div className="p-8 md:p-10 flex-1 flex flex-col justify-center text-right">
                <span className="bg-tertiary text-on-tertiary text-label-caps font-bold px-3 py-1 rounded-full w-fit mb-4 pulse-soft">{bundle.tag}</span>
                <h2 className="text-[clamp(24px,4vw,32px)] font-display-lg text-on-surface leading-tight mb-2">{bundle.titleAr}</h2>
                <h3 className="text-headline-md text-primary font-medium mb-4">{bundle.title}</h3>
                <p className="max-w-readable text-body-base text-on-surface-variant mb-6">{bundle.description}</p>
                <div className="flex items-center gap-6 mt-auto">
                  <div className="text-2xl font-bold text-on-surface">{bundle.price}</div>
                  <WhatsAppButton productName={bundle.titleAr} className="px-8" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </PageTransition>
  );
};

export default Offers;
