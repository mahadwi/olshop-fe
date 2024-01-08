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
          backpack : 'Backpack',
          filter: 'Filter',
          result: 'Result',
          categories: 'Categories',
          price: 'Price',
          color: 'Color',
          more: 'More',
          relevance: 'Relevance',
          'New Arrival': 'New Arrival',
          'Price, low to high': 'Price, low to high',
          'Price, high to low': 'Price, high to low',
          'ALphabetical, A - Z': 'Alphabetical, A - Z',
          'ALphabetical, Z - A': 'Alphabetical, Z - A',
          'Date, old to new': 'Date, old to new',
          'Date, new to old': 'Date, new to old',
          addtocart: 'Add to cart',
          buynow: 'Buy Now',
          checkprices: 'Check Prices',
          sold: 'Sold',
          search: 'Search',
          filterbybrand: 'Filter By Brand',
          filterbycategories: 'Filter By Categories',
          footertitle: 'Never Miss a Beat',
          footerdescription: 'Be the first to hear about product launches, collaborations, and more when you sign up for our emails.',
          submit: 'Submit',
          clientservice: 'Client Service',
          deliveryshipping: 'Delivery & Shipping',
          faq: 'FAQ',
          footercontact: 'Contact',
          consignsell: 'Consign & Sell',
          consignment: 'Consigment',
          authentication: 'Authentication',
          buy: 'Buy',
          ordertracking: 'Order Tracking',
          returnpolicy: 'Return Policy',
          footeraboutus: 'About Us',
          workwithus: 'Work With Us',
          review: 'Review',
          customercare: 'Customer Care',
          termconditions: 'Term & conditions',
          privacypolicy: 'Privacy Policy',
          yourprivacychoize: 'Your Privacy Choize',
          allrightsreserved: 'All rights Reserved',
          followoursocialmedia: 'Follow Our Social Media',
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
            backpack : 'Ransel',
            filter: 'Saring',
            result: 'Hasil',
            categories: 'Kategori',
            price: 'Harga',
            color: 'Warna',
            more: 'Lebih Banyak',
            relevance: 'Relevansi',
            'New Arrival': 'Produk Terbaru',
            'Price, low to high': 'Harga, terendah',
            'Price, high to low': 'Harga, tertinggi',
            'ALphabetical, A - Z': 'Nama, A - Z',
            'ALphabetical, Z - A': 'Nama, Z - A',
            'Date, old to new': 'Tanggal, tardahulu',
            'Date, new to old': 'Tanggal, terbaru',
            addtocart: 'Tambah ke keranjang',
            buynow: 'Beli Sekarang',
            checkprices: 'Cek Harga',
            sold: 'Terjual',
            search: 'Pencarian',
            filterbybrand: 'Saring Brand',
            filterbycategories: 'Saring Kategori',
            footertitle: 'Jangan Ketinggalan',
            footerdescription: 'Jadilah yang pertama mendapatkan informasi terbaru tentang produk, kolaborasi dan banyak hal menarik lainnya saat anda bergabung bersama kami.',
            submit: 'Kirim',
            clientservice: 'Layanan Pelanggan',
            deliveryshipping: 'Antar & Kirim',
            faq: 'Pertanyaan Umum',
            footercontact: 'Kontak',
            consignsell: 'Kirim & Jual',
            consignment: 'Kirim',
            authentication: 'Keaslian',
            buy: 'Beli',
            ordertracking: 'Pelacakan Pesanan',
            returnpolicy: 'Kebijakan pengembalian',
            footeraboutus: 'Tentang Kami',
            workwithus: 'Bekerja Dengan Kami',
            review: 'Ulasan',
            customercare: 'Layanan Pelanggan',
            termconditions: 'Syarat & ketentuan',
            privacypolicy: 'Kebijakan Privasi',
            yourprivacychoize: 'Pilihan Privasi Anda',
            allrightsreserved: 'Hak cipta dilindungi undang-undang',
            followoursocialmedia: 'Ikuti Sosial Media Kami',
          // Add other ID translations here
        },
      },
      // Add other language translations here
    },
    lng: storedLanguage || 'id', // Set default language
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
