import { useState, useEffect } from 'react';
import WhatsAppButton from '../components/WhatsAppButton';
import Reveal from '../components/Reveal';
import PageTransition from '../components/PageTransition';
import MagneticButton from '../components/MagneticButton';
import Icon from '../components/Icon';
import { api } from '../services/api';

const Contact = () => {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    api.getContact().then(setContact).catch(() => {});
  }, []);

  return (
    <PageTransition>
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <header className="mb-stack-lg">
          <h1 className="animate-fade-up text-display-lg font-display-lg text-on-surface mb-stack-sm">اتصل بنا</h1>
          <p className="animate-fade-up max-w-readable text-body-base text-on-surface-variant" style={{ animationDelay: '80ms' }}>زورنا في شارع جاوا أو تواصل معنا أونلاين</p>
        </header>

        <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-gutter items-stretch">
          <div className="lg:col-span-3 flex flex-col gap-stack-md">
            <div className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-xl p-8 shadow-ambient flex flex-col gap-6">
              {contact && (
                <>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg text-primary">
                      <Icon name="location_on" className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-headline-md text-on-surface mb-1">موقعنا</h3>
                      <p className="text-on-surface-variant">{contact.address_ar}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg text-primary">
                      <Icon name="phone" className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-headline-md text-on-surface mb-1">رقم الهاتف</h3>
                      <p className="text-on-surface-variant">{contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg text-primary">
                      <Icon name="schedule" className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-headline-md text-on-surface mb-1">ساعات العمل</h3>
                      <p className="text-on-surface-variant">{contact.hours_ar}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg text-primary">
                      <Icon name="facebook" className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-headline-md text-on-surface mb-1">فيسبوك</h3>
                      <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline transition-colors duration-160 ease-out-strong">تابعنا على فيسبوك</a>
                    </div>
                  </div>
                </>
              )}
              <div className="pt-4 flex flex-col gap-3">
                <WhatsAppButton className="w-full justify-center" />
                {contact && (
                  <MagneticButton
                    href={`tel:${contact.phone}`}
                    className="w-full bg-tertiary text-on-tertiary font-label-caps text-label-caps px-6 py-3 rounded-xl shadow-ambient text-center flex items-center justify-center gap-2"
                  >
                    <Icon name="phone" className="w-5 h-5" />
                    اتصل الآن
                  </MagneticButton>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 rounded-xl overflow-hidden shadow-ambient min-h-[400px] relative">
            {contact && (
              <iframe
                title="موقع المتجر على خرائط جوجل"
                src={`https://maps.google.com/maps?q=${contact.maps_query}&output=embed`}
                className="w-full h-full absolute inset-0 border-0"
                loading="lazy"
                allowFullScreen
              />
            )}
            <div className="absolute bottom-4 left-4 right-4 flex justify-center">
              <a
                href="https://maps.app.goo.gl/WPgaCqvevjm7qWwU6"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-tertiary text-on-tertiary font-label-caps text-label-caps px-6 py-3 rounded-xl shadow-ambient inline-flex items-center gap-2 transition-transform duration-160 ease-out-strong active:scale-[0.97]"
              >
                <Icon name="map" className="w-4 h-4" />
                احصل على الاتجاهات
              </a>
            </div>
          </div>
        </div>
        </Reveal>
      </main>
    </PageTransition>
  );
};

export default Contact;
