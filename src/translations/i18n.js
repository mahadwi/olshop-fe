import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const storedLanguage = localStorage.getItem('selectedLanguage');

i18n
  .use(initReactI18next)
  .init({
    // Add configuration options here
    resources: {
      en: {
        translation: {
          shop: 'SHOP',
          collective: 'COLLECTIVE',
          designers: 'DESIGNERS',
          aboutus: 'ABOUT US',
          contact: 'CONTACT',
          event: 'EVENT',
          signupgoogle : "Sign Up With Google",
          slingbag : "Sling Bag",
          minibag : 'Mini Bag',
          handbag: 'Hand Bag',
          totebag : 'Tote Bag',
          backpack : 'Backpack'
          // Add other EN translations here
        },
      },
      id: {
        translation: {
            shop: 'TOKO',
            collective: 'KOLEKTIF',
            designers: 'PERANCANG',
            aboutus: 'TENTANG KAMI',
            contact: 'KONTAK',
            event: 'ACARA',
            signupgoogle : "Daftar Dengan Google",
            slingbag : 'Tas selempang',
            minibag :'Tas Mini',
            handbag : 'Tas Tangan',
            totebag : 'Tas Jinjing',
            backpack : 'Ransel'
          // Add other ID translations here
        },
      },
      // Add other language translations here
    },
    lng: storedLanguage || 'en', // Set default language
    fallbackLng: 'en', // Fallback to English if translation not found
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

  export const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('selectedLanguage', lng);
  }; 

export default i18n;