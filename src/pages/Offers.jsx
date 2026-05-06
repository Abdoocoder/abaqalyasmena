import React from 'react';
import Layout from '../components/Layout';
import WhatsAppButton from '../components/WhatsAppButton';

const Offers = () => {
  const bundles = [
    {
      id: 'bundle-1',
      title: 'Back to School Pack',
      titleAr: 'حزمة العودة للمدارس',
      description: '10 Notebooks + 5 Pens + 1 Geometry Box',
      price: '25.00 JOD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuConlj_VJWPCT4nDeW4I1XhMEqGTHuRnvZrpMOAKajhN-TyaStbLLGp_mfZ6NU0-nVHtwFVa0X0zJP0_6kWSkfafvORzr4aVKLLC-C4wFPc_TXGDxoGrDANBn-ghphEh6MHoI6i2ufqrSlwKMgaulcImuJtiI7Ipa0d0Z-HdIxt6EbXD3qJDU9eKc2NyTrusN5jQ2HbkNxQ0l8VO6H2cIRC3xVjRiKvs8qZn-oXo47MlCNAuxkbVJ7k-DCoKvx3YImZSvAeFmeqHpU',
      tag: 'POPULAR'
    },
    {
      id: 'bundle-2',
      title: 'Art Essentials Kit',
      titleAr: 'طقم الأدوات الفنية',
      description: 'Watercolor set + Sketchbook + Brush set',
      price: '18.00 JOD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNkQKw7WPUEsfoAEBfXZD2h9G79OnwlIPGD6kO4CGhalhyjWormgpXqdJzwawHd36_yhpstKMWLd9mHulOcriV2fmq1iish8ZbfG2fLnJxL0__8gymPgrploI1BuBTAiyW5Gf7aQe_i_lgKJChhKJEgiWkkKKU6zXMnld99ncbkaTMBq5esj5DA8jIKKz63yUHz_wU2TqU6LayAKB31G1xIaD2MpvsMPj0WWsmbzJ5Oouda9RJRxXkCZ3eNg62LWKdiF-BwKSCXUk',
      tag: 'BEST VALUE'
    }
  ];

  return (
    <Layout>
      <main className="max-w-container-max mx-auto px-margin-desktop py-stack-lg">
        <header className="mb-stack-lg text-center">
          <h1 className="text-display-lg font-display-lg text-on-surface mb-stack-sm">Special Offers & Bundles</h1>
          <p className="text-body-base text-on-surface-variant max-w-2xl mx-auto">Get more for less with our curated stationery packs for students and professionals.</p>
        </header>

        <div className="flex flex-col gap-8">
          {bundles.map((bundle) => (
            <div key={bundle.id} className="bg-surface-container-low rounded-[2rem] overflow-hidden flex flex-col md:flex-row items-stretch shadow-ambient border border-surface-variant/20 hover:shadow-ambient-hover transition-shadow duration-300">
              <div className="w-full md:w-1/3 h-64 md:h-auto overflow-hidden">
                <img src={bundle.image} className="w-full h-full object-cover" alt={bundle.title} />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-center items-end text-right">
                <span className="bg-primary text-on-primary text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-4">{bundle.tag}</span>
                <h2 className="text-[32px] font-display-lg text-on-surface leading-tight mb-2">{bundle.titleAr}</h2>
                <h3 className="text-headline-md text-primary font-medium mb-4">{bundle.title}</h3>
                <p className="text-body-base text-on-surface-variant mb-6">{bundle.description}</p>
                <div className="flex items-center gap-6 mt-auto">
                  <div className="text-2xl font-bold text-on-surface">{bundle.price}</div>
                  <WhatsAppButton productName={bundle.titleAr} className="px-8" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Offers;
