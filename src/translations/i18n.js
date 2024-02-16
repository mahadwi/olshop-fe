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
                    shop: 'Shop',
                    collective: 'Collective',
                    designers: 'Designers',
                    aboutus: 'About Us',
                    contact: 'Contact',
                    event: 'Event',
                    signupgoogle: "Sign Up With Google",
                    slingbag: "Sling Bag",
                    minibag: 'Mini Bag',
                    handbag: 'Hand Bag',
                    totebag: 'Tote Bag',
                    backpack: 'Backpack',
                    filter: 'Filter',
                    result: 'Result',
                    categories: 'Categories',
                    category: 'Category',
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
                    contactindextitle: 'We’d love to hear from you',
                    contactindexdescquestion: 'Have a question? You may find an answer in our',
                    contactindexdesccontact: 'But you can also contact us',
                    contactus: 'Contact Us',
                    followuson: 'Follow us on',
                    contactindexformparagraphfoot_1: 'By sending your message, you agree to accept the',
                    contactindexformparagraphfoot_2: 'of Use and that your data will be processed in compliance with the',
                    contactindexformparagraphfoot_3: 'of',
                    firstname: 'First Name',
                    lastname: 'Last Name',
                    emailaddress: 'Email Address',
                    phonenumber: 'Phone Number',
                    subject: 'Subject',
                    messagebox: 'Message Box',
                    item: 'Item',
                    itemprice: 'Item Price',
                    quantity: 'Quantity',
                    platformvoucher: 'Platform Voucher',
                    selectorentercode: 'Select or Enter Code',
                    cartsubtotal: 'Cart Sub Total',
                    items: 'Items',
                    delete: 'Delete',
                    checkout: 'Checkout',
                    myshoppingcart: 'My Shopping Cart',
                    itemsinyourcart: 'Items in your cart',
                    productdetail: 'Product Detail',
                    weight: 'Weight',
                    height: 'Height',
                    width: 'Width',
                    length: 'Length',
                    condition: 'Condition',
                    history: 'History',
                    shippingoption: 'Shipping Option',
                    shippingto: 'Shipping To',
                    shippingfee: 'Shipping Fee',
                    totalstock: 'Total Stock',
                    subtotal: 'Sub Total',
                    receive: 'Receive',
                    checkprice: 'Check Price',
                    otherproduct: 'Other Product',
                    viewall: 'View All',
                    selectshippingoption: 'Select Shipping Option',
                    courier: 'Courier',
                    cancel: 'Cancel',
                    save: 'Save',
                    selectvoucher: 'Select Voucher',
                    addvoucher: 'Add Voucher',
                    apply: 'Apply',
                    expiring: 'Expiring',
                    selectshippingaddress: 'Select Shipping Address',
                    manageaddress: 'Manage Address',
                    productorder: 'Product Order',
                    notes: 'Notes',
                    change: 'Change',
                    shippingtotal: 'Shipping Total',
                    totalpayment: 'Total Payment',
                    placeorder: 'Place Order',
                    entercode: 'Enter code',
                    cart: 'Cart',
                    packagetracking: 'PACKAGE TRACKING',
                    packagetrackingcontent: 'Once your package has been shipped, we will send you a notification with your tracking number.',
                    insurance: 'INSURANCE',
                    insurancecontent: 'You may choose whether or not you want to add insurance to your delivery. The cost of insurance will be calculated according to the value of your order on the checkout page.',
                    welcometoluxi: 'Welcome to LUXI!',
                    startregistration: 'Start Registration',
                    startregistrationcontent: 'To start as a vendor, register and complete the following information by clicking start registration',
                    accountinformation: 'Account Information',
                    productinformation: 'Product Information',
                    reviewvendor: 'Review',
                    agreement: 'Agreement',
                    listingproduct: 'Listing Product',
                    name: 'Name',
                    idcardnumber: 'ID Card Number',
                    bankname: 'Bank Name',
                    selectbankname: 'Select Bank Name',
                    accountnumber: 'Account Number',
                    recipientname: 'Recipient Name',
                    address: 'Address',
                    next: 'Next',
                    youroffer: 'Your Offer',
                    sellgoods: 'Sell Goods',
                    goodssales: 'Goods Sales',
                    goodssaleshistory: 'Goods Sales History',
                    offeredon: 'Offered on',
                    'in review': 'In Review',
                    rejected: 'Rejected',
                    'not approved': 'Not Approved',
                    approved: 'Approved',
                    addphoto: 'Add Photo',
                    changephoto: 'Change Photo',
                    required: 'Required',
                    giveascompleteanexplanationaspossible: 'Give as complete an explanation as possible.',
                    commissiontype: 'Commission Type',
                    commission: 'Commission',
                    saleprice: 'Sale Price',
                    fulldetails: 'Full Details',
                    attractmoreinterestbyincludingmoredetails: 'Attract more interest by including more details.',
                    descriptionindonesia: 'Description Indonesia',
                    descriptionenglish: 'Description English',
                    historyindonesia: 'History Indonesia',
                    historyenglish: 'History English',
                    preview: 'Preview',
                    previewyouroffers: 'Preview Your Offers',
                    whencreatinganofferyoucanpreviewhowitwilllook: 'When creating an offer, you can preview how it will look',
                    title: 'Title',
                    offeredafewsecondsagoin: 'Offered a few seconds ago in',
                    sellerinformation: 'Seller Information',
                    sellerdetail: 'Seller Detail',
                    oneventtime: 'On',
                    at: 'At',
                    locationdetails: 'Location Details',
                    viewinmap: 'View In Map',
                    ticketpurchaselist: 'Ticket Purchase List',
                    eventtime: 'Event Time',
                    needtoreserve: 'Need to Reserve',
                    refundable: 'Refundable',
                    nonrefundable: 'Non - Refundable',
                    select: 'Select',
                    totalvisitor: 'Total Visitor',
                    booking: 'Booking',
                    herearesomeadditionaldetailsabout: 'Here are some additional details about',
                    socialmedia: 'Social Media',
                    confirmation: 'Confirmation',
                    thegoodsinstallationrate: 'The goods installation rate is 1% of the agreed goods price. Do you agree?',
                    agree: 'Agree',
                    isthedataenteredcorrect: 'Is the data entered correct?',
                    journal: 'JOURNAL',
                    eventjournaldescription: 'This page is a page that contains stories, pictures, activities, information about the LUXURYHUB shop which is packaged in a journal that can be enjoyed by readers anywhere and anytime to get to know more about what the LUXURYHUB shop is.',
                    joinusfor: 'JOIN US FOR',
                    grabhere: 'Grab Here',
                    bestjournalfromustoyou: 'Best journal from us to you',
                    thisisourjournal: 'THIS IS OUR JOURNAL',
                    backto: 'Back to',
                    canceltransaction: 'Cancel Transaction',
                    schedulemeeting: 'Schedule meeting',
                    note: 'Note',
                    priceforentrustinggoods: 'Price For Entrusting Goods',
                    vendorreviewproof: 'Save Proof of Transfer to be included in the Agreement process!',
                    depositmoneypaymentaccountinformation: 'Deposit Money Payment Account Information',
                    copy: 'Copy',
                    onbehalfof: 'On Behalf of',
                    action: 'Action',
                    upload: 'Upload',
                    document: 'Document',
                    agreementview: 'View',
                    download: 'Download',
                    viewlist: 'View List',
                    goodssalesstatus: 'Goods Sales Status',
                    edit: 'Edit',
                    productdeadline: 'Product Deadline',
                    new: 'New',
                    likenew: 'Like New',
                    pickituponthespot: 'PICK IT UP ON THE SPOT',
                    listoptions: 'List Options',
                    paymentoption: 'Method Payment',
                    choose: 'Choose',
                    paymentoptions: 'Payment Options',
                    paymentnow: 'Payment Now',
                    paymentlater: 'Payment Later',
                    paymentlaterdescription: 'Payment is made when picking up the goods',
                    information: 'Information',
                    measurements: 'Measurements',
                    home: 'Home',
                    signin: 'Sign In',
                    locationstore: 'Location Store',
                    language: 'Language',
                    logout: 'Log Out',
                    learnmore: 'Learn More',
                    trackorder: 'Track Order',
                    all: 'All',
                    unpaid: 'Unpaid',
                    'on process': 'On Process',
                    'on going': 'On Going',
                    completed: 'Completed',
                    'return': 'Return',
                    'offline': 'Offline',
                    order: 'Order',
                    orderstatus: 'Order Status',
                    viewmore: 'View More',
                    viewless: 'View Less',
                    addbrand: 'Add Brand',
                    totalorder: 'Total Order',
                    product: 'Product',
                    bills: 'Bills',
                    changeaddress: 'Change Address',
                    fileinformation: 'File Information',
                    uploadsuccess: 'Upload Success',
                    searchplaceholder: 'Search by brand, category, product name',
                    searchresultfor: 'Search Result For',
                    searchresultnotfound: 'Unfortunately, we couldn\'t find any result for',
                    receiptconsignment: 'Receipt Consignment',
                    canceltransactionconfirm: 'Are you sure to cancel transaction ?',
                    yes: 'Yes',
                    canceltransactionstatus: 'Cancel Transaction',
                    otherbrand: 'Other Brand',
                    deadline: 'Deadline',
                    toastuploaddocumentsuccess: 'Document uploaded successfully',
                    toastuploaddocumentfailed: 'Document failed to upload',
                    // Add other EN translations here
                },
            },
            id: {
                translation: {
                    shop: 'Toko',
                    collective: 'Kolektif',
                    designers: 'Perancang',
                    aboutus: 'Tentang Kami',
                    contact: 'Kontak',
                    event: 'Acara',
                    signupgoogle: "Daftar Dengan Google",
                    slingbag: 'Tas selempang',
                    minibag: 'Tas Mini',
                    handbag: 'Tas Tangan',
                    totebag: 'Tas Jinjing',
                    backpack: 'Ransel',
                    filter: 'Saring',
                    result: 'Hasil',
                    categories: 'Kategori',
                    category: 'Kategori',
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
                    consignment: 'Konsinyasi',
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
                    contactindextitle: 'Kami ingin mendengar pendapat Anda',
                    contactindexdescquestion: 'Punya pertanyaan? Anda mungkin menemukan jawabannya di ',
                    contactindexdesccontact: 'Namun Anda juga dapat menghubungi kami',
                    contactus: 'Hubungi Kami',
                    followuson: 'Ikuti kami di',
                    contactindexformparagraphfoot_1: 'Dengan mengirimkan pesan Anda, Anda setuju untuk menerima',
                    contactindexformparagraphfoot_2: 'Penggunaan dan bahwa data Anda akan diproses sesuai dengan',
                    contactindexformparagraphfoot_3: 'dari',
                    firstname: 'Nama Depan',
                    lastname: 'Nama Belakang',
                    emailaddress: 'Alaman Email',
                    phonenumber: 'Nomor Telepon',
                    subject: 'Subjek',
                    messagebox: 'Kotak Pesan',
                    item: 'Produk',
                    itemprice: 'Harga Produk',
                    quantity: 'Jumlah',
                    platformvoucher: 'Voucher Platform',
                    selectorentercode: 'Pilih atau Masukkan Kode',
                    cartsubtotal: 'Sub Total Keranjang',
                    items: 'Produk',
                    delete: 'Hapus',
                    checkout: 'Checkout',
                    myshoppingcart: 'Keranjang Saya',
                    itemsinyourcart: 'Item di keranjang Anda',
                    productdetail: 'Detail Produk',
                    weight: 'Berat',
                    height: 'Tinggi',
                    width: 'Lebar',
                    length: 'Panjang',
                    condition: 'Kondisi',
                    history: 'Sejarah',
                    shippingoption: 'Opsi Pengiriman',
                    shippingto: 'Dikirim Ke',
                    shippingfee: 'Biaya Pengiriman',
                    totalstock: 'Total Stok',
                    subtotal: 'Sub Total',
                    receive: 'Diterima',
                    checkprice: 'Cek Harga',
                    otherproduct: 'Produk Lainnya',
                    viewall: 'Lihat Semua',
                    selectshippingoption: 'Pilih Opsi Pengiriman',
                    courier: 'Kurir',
                    cancel: 'Batal',
                    save: 'Simpan',
                    selectvoucher: 'Pilih Voucher',
                    addvoucher: 'Tulis Voucher',
                    apply: 'Terapkan',
                    expiring: 'Kadaluwarsa',
                    selectshippingaddress: 'Pilih Alamat Pengiriman',
                    manageaddress: 'Atur Alamat',
                    productorder: 'Produk Pesanan',
                    notes: 'Catatan',
                    change: 'Ubah',
                    shippingtotal: 'Total Pengiriman',
                    totalpayment: 'Total Pembayaran',
                    placeorder: 'Pesan',
                    entercode: 'Masukan Kode',
                    cart: 'Keranjang',
                    packagetracking: 'PELACAKAN PAKET',
                    packagetrackingcontent: 'Setelah paket Anda dikirimkan, kami akan mengirimkan pemberitahuan berisi nomor pelacakan Anda.',
                    insurance: 'ASURANSI',
                    insurancecontent: 'Anda dapat memilih apakah Anda ingin menambahkan asuransi pada pengiriman Anda atau tidak. Biaya asuransi akan dihitung sesuai dengan nilai pesanan Anda di halaman pembayaran.',
                    welcometoluxi: 'Selamat datang di LUXI!',
                    startregistration: 'Mulai Pendaftaran',
                    startregistrationcontent: 'Untuk memulai sebagai vendor, daftar dan lengkapi informasi berikut dengan mengklik mulai pendaftaran',
                    accountinformation: 'Informasi Akun',
                    productinformation: 'Informasi Produk',
                    reviewvendor: 'Tinjauan',
                    agreement: 'Perjanjian',
                    listingproduct: 'Daftar Produk',
                    name: 'Nama',
                    idcardnumber: 'NIK',
                    bankname: 'Nama Bank',
                    selectbankname: 'Pilih Nama Bank',
                    accountnumber: 'Nomor Rekening',
                    recipientname: 'Nama Penerima',
                    address: 'Alamat',
                    next: 'Selanjutnya',
                    youroffer: 'Tawaran Anda',
                    sellgoods: 'Jual Barang',
                    goodssales: 'Penjualan Barang',
                    goodssaleshistory: 'Riwayat Penjualan Barang',
                    offeredon: 'Ditawarkan pada',
                    'in review': 'Sedang Ditinjau',
                    rejected: 'Ditolak',
                    'not approved': 'Tidak Disetujui',
                    approved: 'Disetujui',
                    addphoto: 'Tambahkan Foto',
                    changephoto: 'Ganti Foto',
                    required: 'Diperlukan',
                    giveascompleteanexplanationaspossible: 'Beri penjelasan selengkap mungkin.',
                    commissiontype: 'Tipe Komisi',
                    commission: 'Komisi',
                    saleprice: 'Harga Jual',
                    fulldetails: 'Detail Lengkap',
                    attractmoreinterestbyincludingmoredetails: 'Tarik lebih banyak minat dengan menyertakan lebih banyak detail.',
                    descriptionindonesia: 'Deskripsi Indonesia',
                    descriptionenglish: 'Deskripsi Inggris',
                    historyindonesia: 'Sejarah Indonesia',
                    historyenglish: 'Sejarah Inggris',
                    preview: 'Pratinjau',
                    previewyouroffers: 'Pratinjau Tawaran Anda',
                    whencreatinganofferyoucanpreviewhowitwilllook: 'Saat membuat tawaran, Anda bisa mempratinjau tampilannya',
                    title: 'Judul',
                    offeredafewsecondsagoin: 'Ditawarkan beberapa detik yang lalu di',
                    sellerdetail: 'Detail Penjualan',
                    oneventtime: 'Pada',
                    at: 'Di',
                    locationdetails: 'Detail Lokasi',
                    viewinmap: 'Lihat Di Peta',
                    ticketpurchaselist: 'Daftar Pembelian Tiket',
                    eventtime: 'Waktu Acara',
                    needtoreserve: 'Perlu Melakukan Reservasi',
                    refundable: 'Dapat Dikembalikan',
                    nonrefundable: 'Tidak Dapat Dikembalikan',
                    select: 'Pilih',
                    totalvisitor: 'Jumlah Pengunjung',
                    booking: 'Memesan',
                    herearesomeadditionaldetailsabout: 'Berikut ini beberapa detail tambahan tentang',
                    socialmedia: 'Media Sosial',
                    confirmation: 'Konfirmasi',
                    thegoodsinstallationrate: 'Tarif pemasangan barang senilai 1% dari harga barang yang disepakati. Apakah anda setuju?',
                    agree: 'Setuju',
                    isthedataenteredcorrect: 'Apakah data yang dimasukan sudah benar?',
                    journal: 'JURNAL',
                    eventjournaldescription: 'Halaman ini merupakan halaman yang berisi cerita, gambar, kegiatan, informasi mengenai toko LUXURYHUB yang dikemas dalam bentuk jurnal yang dapat dinikmati oleh pembaca dimana saja dan kapan saja untuk mengenal lebih jauh tentang apa itu toko LUXURYHUB.',
                    joinusfor: 'BERGABUNG DENGAN KAMI UNTUK',
                    grabhere: 'Ambil Di Sini',
                    bestjournalfromustoyou: 'Jurnal terbaik dari kami untuk anda',
                    thisisourjournal: 'INI JURNAL KAMI',
                    backto: 'Kembali ke',
                    canceltransaction: 'Batalkan Transaksi',
                    schedulemeeting: 'Jadwal Bertemu',
                    note: 'Catatan',
                    priceforentrustinggoods: 'Harga Titip Barang',
                    vendorreviewproof: 'Simpan Bukti Transfer untuk dapat disertakan dalam proses Perjanjian!',
                    depositmoneypaymentaccountinformation: 'Informasi Rekening Pembayaran Uang Titipan',
                    copy: 'Salin',
                    onbehalfof: 'Atas Nama',
                    action: 'Aksi',
                    upload: 'Unggah',
                    document: 'Dokumen',
                    agreementview: 'Liat',
                    download: 'Unduh',
                    viewlist: 'Lihat Daftar',
                    goodssalesstatus: 'Status Penjualan Barang',
                    edit: 'Sunting',
                    productdeadline: 'Deadline Produk',
                    new: 'Baru',
                    likenew: 'Seperti Baru',
                    pickituponthespot: 'AMBIL DI TEMPAT',
                    listoptions: 'List Opsi',
                    paymentoption: 'Metode Pembayaran',
                    choose: 'Pilih',
                    paymentoptions: 'Pilihan Pembayaran',
                    paymentnow: 'Pembayaran Sekarang',
                    paymentlater: 'Pembayaran Nanti',
                    paymentlaterdescription: 'Pembayaran akan dilakukan saat barang diambil',
                    information: 'Informasi',
                    measurements: 'Ukuran',
                    home: 'Beranda',
                    signin: 'Masuk',
                    locationstore: 'Lokasi Toko',
                    language: 'Bahasa',
                    logout: 'Keluar',
                    learnmore: 'Pelajari Lebih Lanjut',
                    trackorder: 'Lacak Pesanan',
                    all: 'Semua',
                    unpaid: 'Belum Dibayar',
                    'on process': 'Dalam Proses',
                    'on going': 'Sedang Berjalan',
                    completed: 'Selesai',
                    'return': 'Retur',
                    'offline': 'Offline',
                    order: 'Pesanan',
                    orderstatus: 'Status Pesanan',
                    viewmore: 'Lihat Lebih Banyak',
                    viewless: 'Lihat Lebih Sedikit',
                    addbrand: 'Tambahkan Brand',
                    totalorder: 'Jumlah Pesanan',
                    product: 'Produk',
                    bills: 'Tagihan',
                    changeaddress: 'Ganti Alamat',
                    fileinformation: 'Informasi Berkas',
                    uploadsuccess: 'Mengunggah Berhasil',
                    searchplaceholder: 'Cari dengan brand, kategori, nama produk',
                    searchresultfor: 'Hasil Pencarian Untuk',
                    searchresultnotfound: 'Sayangnya, kita tidak dapat menemukan hasil untuk',
                    receiptconsignment: 'Kuitansi Konsinyasi',
                    canceltransactionconfirm: 'Apakah anda yakin akan batalkan transaksi ?',
                    yes: 'Ya',
                    canceltransactionstatus: 'Transaksi Batal',
                    otherbrand: 'Brand Lain',
                    deadline: 'Tenggat Waktu',
                    toastuploaddocumentsuccess: 'Dokumen berhasil diunggah',
                    toastuploaddocumentfailed: 'Dokumen gagal diunggah',
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
