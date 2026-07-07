import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useTranslation } from '../contexts/TranslationContext';
import Section from './Section';
import { MapPin, Phone, Send, CheckCircle, Loader2 } from 'lucide-react';

const contactLinks = [
  { icon: MapPin, labelKey: 'contact.location', value: 'Lattakia, Syria', href: '#' },
];

const phoneNumbers = [
  { number: '0935341243' },
  { number: '0944247463' },
];

export default function Contact() {
  const { t, language } = useTranslation();
  const block = useReveal();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <Section id="contact" tone="light" className="py-20 sm:py-24 md:py-32 relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-paper via-paper-soft to-paper-dark opacity-95" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-copper/10 rounded-full blur-3xl animate-floatY" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal/10 rounded-full blur-3xl animate-floatY" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container-main w-full relative z-10">
        <div ref={block.ref}
          className={`max-w-6xl mx-auto transition-all duration-1000
                      ${block.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <span className="inline-block px-4 py-2 bg-copper/10 border border-copper/20 rounded-full text-copper text-[10px] sm:text-xs uppercase tracking-widest mb-6 animate-glowPulse">
            {t('contact.tag')}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone mb-4 text-center" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {t('contact.title')}<br />
            <span className="text-copper">{t('contact.titleHighlight')}</span>
          </h2>
          <p className="text-stone-muted text-sm sm:text-base mb-12 sm:mb-16 max-w-2xl mx-auto text-center">
            {t('contact.description')}
          </p>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            {/* Contact Cards */}
            <div className="space-y-4 sm:space-y-6">
              {/* Phone Numbers */}
              <div className="space-y-4">
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-stone-muted mb-2">{t('contact.phone')}</div>
                {phoneNumbers.map((phone, index) => (
                  <a
                    key={phone.number}
                    href={`tel:${phone.number}`}
                    className="group block"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="p-5 sm:p-6 rounded-2xl backdrop-blur-xl bg-white/60 border border-stone/10 hover:bg-white/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-copper/10 hover:border-copper/30">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center group-hover:bg-copper/20 transition-colors duration-300">
                          <Phone className="w-6 h-6 text-copper animate-floatY" style={{ animationDelay: `${index * 0.5}s` }} />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm sm:text-base font-medium text-stone group-hover:text-copper transition-colors duration-300">{phone.number}</div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-copper/10 flex items-center justify-center group-hover:bg-copper group-hover:scale-110 transition-all duration-300">
                          <Phone className="w-4 h-4 text-copper group-hover:text-white transition-colors duration-300" />
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {contactLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.labelKey}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="group block"
                    style={{ animationDelay: `${(index + 2) * 150}ms` }}
                  >
                    <div className="p-5 sm:p-6 rounded-2xl backdrop-blur-xl bg-white/60 border border-stone/10 hover:bg-white/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-copper/10 hover:border-copper/30">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center group-hover:bg-copper/20 transition-colors duration-300">
                          <Icon className="w-6 h-6 text-copper animate-floatY" />
                        </div>
                        <div>
                          <div className="text-[10px] sm:text-xs uppercase tracking-widest text-stone-muted mb-1">{t(link.labelKey)}</div>
                          <div className="text-sm sm:text-base font-medium text-stone group-hover:text-copper transition-colors duration-300">{link.value}</div>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Contact Form */}
            <div className="p-6 sm:p-8 rounded-2xl backdrop-blur-xl bg-white/60 border border-stone/10">
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div>
                  <label className="block text-[10px] sm:text-xs uppercase tracking-widest text-stone-muted mb-2">{t('contact.formName')}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/80 border border-stone/20 rounded-xl text-stone placeholder-stone-muted/50 focus:outline-none focus:border-copper/50 focus:ring-2 focus:ring-copper/20 transition-all duration-300"
                    placeholder={t('contact.formNamePlaceholder')}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs uppercase tracking-widest text-stone-muted mb-2">{t('contact.formEmail')}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/80 border border-stone/20 rounded-xl text-stone placeholder-stone-muted/50 focus:outline-none focus:border-copper/50 focus:ring-2 focus:ring-copper/20 transition-all duration-300"
                    placeholder={t('contact.formEmailPlaceholder')}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs uppercase tracking-widest text-stone-muted mb-2">{t('contact.formMessage')}</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/80 border border-stone/20 rounded-xl text-stone placeholder-stone-muted/50 focus:outline-none focus:border-copper/50 focus:ring-2 focus:ring-copper/20 transition-all duration-300 resize-none"
                    placeholder={t('contact.formMessagePlaceholder')}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full py-4 bg-copper hover:bg-copper-light text-white font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-copper/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t('contact.sending')}
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      {t('contact.sent')}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('contact.sendButton')}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
