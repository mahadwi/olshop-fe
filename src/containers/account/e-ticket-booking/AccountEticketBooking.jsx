import { useContext, useEffect, useState } from "react";
import BreadCrumb from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import "./account-eticket-booking.scss";
import TicketBookingSummaryComponent from "../../../components/pages/event/booking/ticket-booking-summary/TicketBookingSummaryComponent";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { AuthUserContext } from "../../../context/AuthUserContext";
import { LoadingContext } from "../../../context/LoadingContext";
import Api from "../../../utils/Api";
import { useTranslation } from "react-i18next";

const DATA_DUMMY = {
    "id": 2,
    "name": "JAKARTA FASHION WEEK 2023",
    "description": "<p>\tJakarta Fashion Week (JFW) adalah acara fashion tahunan yang diselenggarakan di Jakarta, Indonesia. Ini dianggap sebagai pekan mode terbesar dan paling berpengaruh di Asia Tenggara. Acara ini menampilkan koleksi terbaru desainer Indonesia dan internasional, dan merupakan platform utama untuk mempromosikan mode Indonesia ke dunia. JFW pertama kali diadakan pada tahun 2008, dan telah tumbuh dalam popularitas dan prestise setiap tahun. Acara ini kini dihadiri oleh ribuan pembeli, jurnalis, dan penggemar mode dari seluruh dunia. JFW lebih dari sekedar peragaan busana; itu juga merupakan acara budaya besar. Acara ini menampilkan berbagai kegiatan yang berhubungan dengan mode, seperti lokakarya, seminar, dan pesta. JFW juga merupakan platform untuk memamerkan budaya Indonesia kepada dunia. Jakarta Fashion Week berikutnya akan dilaksanakan mulai 23-29 Oktober 2023, di Pondok Indah Mall 3 di Jakarta. Acara ini akan menampilkan lebih dari 200 desainer dari Indonesia dan seluruh dunia. Berikut adalah beberapa sorotan dari Jakarta Fashion Week:</p><ul><li><strong>Pertunjukan runway:</strong> Acara utama JFW adalah pertunjukan landasan pacu, di mana desainer memamerkan koleksi terbaru mereka. </li><li><strong>Stan pameran</strong>: Selain pertunjukan landasan pacu, JFW juga menampilkan sejumlah stan pameran, di mana desainer dapat menjual produk mereka kepada pembeli dan konsumen. </li><li><strong>Seminar dan lokakarya:</strong> JFW juga menyelenggarakan sejumlah seminar dan lokakarya tentang topik yang berkaitan dengan mode, seperti desain, pemasaran, dan keberlanjutan. </li><li><strong>Pesta dan acara:</strong> JFW juga merupakan acara sosial besar, dengan sejumlah pesta dan acara diadakan sepanjang minggu. Jika Anda tertarik dengan fashion, Indonesia, atau Asia Tenggara, maka Jakarta Fashion Week adalah acara yang tidak boleh Anda lewatkan.</li></ul>",
    "description_en": "<p>\tJakarta Fashion Week (JFW) is an annual fashion event held in Jakarta, Indonesia. It is considered the largest and most influential fashion week in Southeast Asia. The event showcases the latest collections of Indonesian and international designers, and it is a major platform for promoting Indonesian fashion to the world.</p><p>JFW was first held in 2008, and it has grown in popularity and prestige each year. The event is now attended by thousands of buyers, journalists, and fashion enthusiasts from around the world.</p><p>JFW is more than just a fashion show; it is also a major cultural event. The event features a variety of fashion-related activities, such as workshops, seminars, and parties. JFW is also a platform for showcasing Indonesian culture to the world. The next Jakarta Fashion Week will be held from October 23 to 29, 2023, at Pondok Indah Mall 3 in Jakarta. The event will feature more than 200 designers from Indonesia and around the world.</p><p>Here are some of the highlights of Jakarta Fashion Week:</p><ul><li><strong>Runway shows:&nbsp;</strong>The main event of JFW is the runway shows, where designers showcase their latest collections.</li><li><strong>Exhibition booths:&nbsp;</strong>In addition to the runway shows, JFW also features a number of exhibition booths, where designers can sell their products to buyers and consumers.</li><li><strong>Seminars and workshops:&nbsp;</strong>JFW also hosts a number of seminars and workshops on topics related to fashion, such as design, marketing, and sustainability.</li><li><strong>Parties and events:&nbsp;</strong>JFW is also a major social event, with a number of parties and events held throughout the week.</li></ul><p>If you are interested in fashion, Indonesia, or Southeast Asia, then Jakarta Fashion Week is an event you should not miss.</p>",
    "start_date": "23-12-2023",
    "end_date": "29-12-2023",
    "time_start": "03:00 PM",
    "time_end": "06:00 PM",
    "place": "At Pondok Indah Mall 3 in Jakarta",
    "maps": "https://www.google.com/maps/place/Monumen+Nasional/@-6.175408,106.827159,16z/data=!4m6!3m5!1s0x2e69f5d2e764b12d:0x3d2ad6e1e0e9bcc8!8m2!3d-6.1753924!4d106.8271528!16zL20vMDNxN2hz?hl=id&entry=ttu",
    "detail_maps": "<p>Jl. Kartika Utama Nomor 1, RT.6, RW.3, Pondok Pinang, Kec. Kebayoran Lama, Jakarta Selatan</p>",
    "cover_image": "https://dev-olshop.berkatsoft.com/image/event/65683390af718.jpeg",
    "banner_image": "https://dev-olshop.berkatsoft.com/image/event/65683390af48a.jpeg",
    "details": [
        {
            "name": "[Pre-Sale] Admission Ticket - 1 Day Access",
            "id": 42,
            "date": "23-11-23",
            "time_start": "03:00 PM",
            "time_end": "06:00 PM",
            "contact": "081804058981",
            "price": "100000",
            "capacity": "Unlimited",
            "quota": 0,
            "is_refundable": false,
            "event": {
                "id": 2,
                "name": "JAKARTA FASHION WEEK 2023",
                "description": "<p>\tJakarta Fashion Week (JFW) adalah acara fashion tahunan yang diselenggarakan di Jakarta, Indonesia. Ini dianggap sebagai pekan mode terbesar dan paling berpengaruh di Asia Tenggara. Acara ini menampilkan koleksi terbaru desainer Indonesia dan internasional, dan merupakan platform utama untuk mempromosikan mode Indonesia ke dunia. JFW pertama kali diadakan pada tahun 2008, dan telah tumbuh dalam popularitas dan prestise setiap tahun. Acara ini kini dihadiri oleh ribuan pembeli, jurnalis, dan penggemar mode dari seluruh dunia. JFW lebih dari sekedar peragaan busana; itu juga merupakan acara budaya besar. Acara ini menampilkan berbagai kegiatan yang berhubungan dengan mode, seperti lokakarya, seminar, dan pesta. JFW juga merupakan platform untuk memamerkan budaya Indonesia kepada dunia. Jakarta Fashion Week berikutnya akan dilaksanakan mulai 23-29 Oktober 2023, di Pondok Indah Mall 3 di Jakarta. Acara ini akan menampilkan lebih dari 200 desainer dari Indonesia dan seluruh dunia. Berikut adalah beberapa sorotan dari Jakarta Fashion Week:</p><ul><li><strong>Pertunjukan runway:</strong> Acara utama JFW adalah pertunjukan landasan pacu, di mana desainer memamerkan koleksi terbaru mereka. </li><li><strong>Stan pameran</strong>: Selain pertunjukan landasan pacu, JFW juga menampilkan sejumlah stan pameran, di mana desainer dapat menjual produk mereka kepada pembeli dan konsumen. </li><li><strong>Seminar dan lokakarya:</strong> JFW juga menyelenggarakan sejumlah seminar dan lokakarya tentang topik yang berkaitan dengan mode, seperti desain, pemasaran, dan keberlanjutan. </li><li><strong>Pesta dan acara:</strong> JFW juga merupakan acara sosial besar, dengan sejumlah pesta dan acara diadakan sepanjang minggu. Jika Anda tertarik dengan fashion, Indonesia, atau Asia Tenggara, maka Jakarta Fashion Week adalah acara yang tidak boleh Anda lewatkan.</li></ul>",
                "description_en": "<p>\tJakarta Fashion Week (JFW) is an annual fashion event held in Jakarta, Indonesia. It is considered the largest and most influential fashion week in Southeast Asia. The event showcases the latest collections of Indonesian and international designers, and it is a major platform for promoting Indonesian fashion to the world.</p><p>JFW was first held in 2008, and it has grown in popularity and prestige each year. The event is now attended by thousands of buyers, journalists, and fashion enthusiasts from around the world.</p><p>JFW is more than just a fashion show; it is also a major cultural event. The event features a variety of fashion-related activities, such as workshops, seminars, and parties. JFW is also a platform for showcasing Indonesian culture to the world. The next Jakarta Fashion Week will be held from October 23 to 29, 2023, at Pondok Indah Mall 3 in Jakarta. The event will feature more than 200 designers from Indonesia and around the world.</p><p>Here are some of the highlights of Jakarta Fashion Week:</p><ul><li><strong>Runway shows:&nbsp;</strong>The main event of JFW is the runway shows, where designers showcase their latest collections.</li><li><strong>Exhibition booths:&nbsp;</strong>In addition to the runway shows, JFW also features a number of exhibition booths, where designers can sell their products to buyers and consumers.</li><li><strong>Seminars and workshops:&nbsp;</strong>JFW also hosts a number of seminars and workshops on topics related to fashion, such as design, marketing, and sustainability.</li><li><strong>Parties and events:&nbsp;</strong>JFW is also a major social event, with a number of parties and events held throughout the week.</li></ul><p>If you are interested in fashion, Indonesia, or Southeast Asia, then Jakarta Fashion Week is an event you should not miss.</p>",
                "start_date": "23-12-2023",
                "end_date": "29-12-2023",
                "time_start": "03:00 PM",
                "time_end": "06:00 PM",
                "place": "At Pondok Indah Mall 3 in Jakarta",
                "maps": "https://www.google.com/maps/place/Monumen+Nasional/@-6.175408,106.827159,16z/data=!4m6!3m5!1s0x2e69f5d2e764b12d:0x3d2ad6e1e0e9bcc8!8m2!3d-6.1753924!4d106.8271528!16zL20vMDNxN2hz?hl=id&entry=ttu",
                "detail_maps": "<p>Jl. Kartika Utama Nomor 1, RT.6, RW.3, Pondok Pinang, Kec. Kebayoran Lama, Jakarta Selatan</p>",
                "cover_image": "https://dev-olshop.berkatsoft.com/image/event/65683390af718.jpeg",
                "banner_image": "https://dev-olshop.berkatsoft.com/image/event/65683390af48a.jpeg"
            }
        },
        {
            "name": "[Pre-Sale] Admission Ticket - 2 Day Access",
            "id": 43,
            "date": "24-11-23",
            "time_start": "03:00 PM",
            "time_end": "06:00 PM",
            "contact": "081804058981",
            "price": "200000",
            "capacity": "Unlimited",
            "quota": 0,
            "is_refundable": false,
            "event": {
                "id": 2,
                "name": "JAKARTA FASHION WEEK 2023",
                "description": "<p>\tJakarta Fashion Week (JFW) adalah acara fashion tahunan yang diselenggarakan di Jakarta, Indonesia. Ini dianggap sebagai pekan mode terbesar dan paling berpengaruh di Asia Tenggara. Acara ini menampilkan koleksi terbaru desainer Indonesia dan internasional, dan merupakan platform utama untuk mempromosikan mode Indonesia ke dunia. JFW pertama kali diadakan pada tahun 2008, dan telah tumbuh dalam popularitas dan prestise setiap tahun. Acara ini kini dihadiri oleh ribuan pembeli, jurnalis, dan penggemar mode dari seluruh dunia. JFW lebih dari sekedar peragaan busana; itu juga merupakan acara budaya besar. Acara ini menampilkan berbagai kegiatan yang berhubungan dengan mode, seperti lokakarya, seminar, dan pesta. JFW juga merupakan platform untuk memamerkan budaya Indonesia kepada dunia. Jakarta Fashion Week berikutnya akan dilaksanakan mulai 23-29 Oktober 2023, di Pondok Indah Mall 3 di Jakarta. Acara ini akan menampilkan lebih dari 200 desainer dari Indonesia dan seluruh dunia. Berikut adalah beberapa sorotan dari Jakarta Fashion Week:</p><ul><li><strong>Pertunjukan runway:</strong> Acara utama JFW adalah pertunjukan landasan pacu, di mana desainer memamerkan koleksi terbaru mereka. </li><li><strong>Stan pameran</strong>: Selain pertunjukan landasan pacu, JFW juga menampilkan sejumlah stan pameran, di mana desainer dapat menjual produk mereka kepada pembeli dan konsumen. </li><li><strong>Seminar dan lokakarya:</strong> JFW juga menyelenggarakan sejumlah seminar dan lokakarya tentang topik yang berkaitan dengan mode, seperti desain, pemasaran, dan keberlanjutan. </li><li><strong>Pesta dan acara:</strong> JFW juga merupakan acara sosial besar, dengan sejumlah pesta dan acara diadakan sepanjang minggu. Jika Anda tertarik dengan fashion, Indonesia, atau Asia Tenggara, maka Jakarta Fashion Week adalah acara yang tidak boleh Anda lewatkan.</li></ul>",
                "description_en": "<p>\tJakarta Fashion Week (JFW) is an annual fashion event held in Jakarta, Indonesia. It is considered the largest and most influential fashion week in Southeast Asia. The event showcases the latest collections of Indonesian and international designers, and it is a major platform for promoting Indonesian fashion to the world.</p><p>JFW was first held in 2008, and it has grown in popularity and prestige each year. The event is now attended by thousands of buyers, journalists, and fashion enthusiasts from around the world.</p><p>JFW is more than just a fashion show; it is also a major cultural event. The event features a variety of fashion-related activities, such as workshops, seminars, and parties. JFW is also a platform for showcasing Indonesian culture to the world. The next Jakarta Fashion Week will be held from October 23 to 29, 2023, at Pondok Indah Mall 3 in Jakarta. The event will feature more than 200 designers from Indonesia and around the world.</p><p>Here are some of the highlights of Jakarta Fashion Week:</p><ul><li><strong>Runway shows:&nbsp;</strong>The main event of JFW is the runway shows, where designers showcase their latest collections.</li><li><strong>Exhibition booths:&nbsp;</strong>In addition to the runway shows, JFW also features a number of exhibition booths, where designers can sell their products to buyers and consumers.</li><li><strong>Seminars and workshops:&nbsp;</strong>JFW also hosts a number of seminars and workshops on topics related to fashion, such as design, marketing, and sustainability.</li><li><strong>Parties and events:&nbsp;</strong>JFW is also a major social event, with a number of parties and events held throughout the week.</li></ul><p>If you are interested in fashion, Indonesia, or Southeast Asia, then Jakarta Fashion Week is an event you should not miss.</p>",
                "start_date": "23-12-2023",
                "end_date": "29-12-2023",
                "time_start": "03:00 PM",
                "time_end": "06:00 PM",
                "place": "At Pondok Indah Mall 3 in Jakarta",
                "maps": "https://www.google.com/maps/place/Monumen+Nasional/@-6.175408,106.827159,16z/data=!4m6!3m5!1s0x2e69f5d2e764b12d:0x3d2ad6e1e0e9bcc8!8m2!3d-6.1753924!4d106.8271528!16zL20vMDNxN2hz?hl=id&entry=ttu",
                "detail_maps": "<p>Jl. Kartika Utama Nomor 1, RT.6, RW.3, Pondok Pinang, Kec. Kebayoran Lama, Jakarta Selatan</p>",
                "cover_image": "https://dev-olshop.berkatsoft.com/image/event/65683390af718.jpeg",
                "banner_image": "https://dev-olshop.berkatsoft.com/image/event/65683390af48a.jpeg"
            }
        },
        {
            "name": "[Pre-Sale] Admission Ticket - 3 Day Access",
            "id": 44,
            "date": "25-11-23",
            "time_start": "03:00 PM",
            "time_end": "06:00 PM",
            "contact": "081804058981",
            "price": "300000",
            "capacity": "Unlimited",
            "quota": 0,
            "is_refundable": false,
            "event": {
                "id": 2,
                "name": "JAKARTA FASHION WEEK 2023",
                "description": "<p>\tJakarta Fashion Week (JFW) adalah acara fashion tahunan yang diselenggarakan di Jakarta, Indonesia. Ini dianggap sebagai pekan mode terbesar dan paling berpengaruh di Asia Tenggara. Acara ini menampilkan koleksi terbaru desainer Indonesia dan internasional, dan merupakan platform utama untuk mempromosikan mode Indonesia ke dunia. JFW pertama kali diadakan pada tahun 2008, dan telah tumbuh dalam popularitas dan prestise setiap tahun. Acara ini kini dihadiri oleh ribuan pembeli, jurnalis, dan penggemar mode dari seluruh dunia. JFW lebih dari sekedar peragaan busana; itu juga merupakan acara budaya besar. Acara ini menampilkan berbagai kegiatan yang berhubungan dengan mode, seperti lokakarya, seminar, dan pesta. JFW juga merupakan platform untuk memamerkan budaya Indonesia kepada dunia. Jakarta Fashion Week berikutnya akan dilaksanakan mulai 23-29 Oktober 2023, di Pondok Indah Mall 3 di Jakarta. Acara ini akan menampilkan lebih dari 200 desainer dari Indonesia dan seluruh dunia. Berikut adalah beberapa sorotan dari Jakarta Fashion Week:</p><ul><li><strong>Pertunjukan runway:</strong> Acara utama JFW adalah pertunjukan landasan pacu, di mana desainer memamerkan koleksi terbaru mereka. </li><li><strong>Stan pameran</strong>: Selain pertunjukan landasan pacu, JFW juga menampilkan sejumlah stan pameran, di mana desainer dapat menjual produk mereka kepada pembeli dan konsumen. </li><li><strong>Seminar dan lokakarya:</strong> JFW juga menyelenggarakan sejumlah seminar dan lokakarya tentang topik yang berkaitan dengan mode, seperti desain, pemasaran, dan keberlanjutan. </li><li><strong>Pesta dan acara:</strong> JFW juga merupakan acara sosial besar, dengan sejumlah pesta dan acara diadakan sepanjang minggu. Jika Anda tertarik dengan fashion, Indonesia, atau Asia Tenggara, maka Jakarta Fashion Week adalah acara yang tidak boleh Anda lewatkan.</li></ul>",
                "description_en": "<p>\tJakarta Fashion Week (JFW) is an annual fashion event held in Jakarta, Indonesia. It is considered the largest and most influential fashion week in Southeast Asia. The event showcases the latest collections of Indonesian and international designers, and it is a major platform for promoting Indonesian fashion to the world.</p><p>JFW was first held in 2008, and it has grown in popularity and prestige each year. The event is now attended by thousands of buyers, journalists, and fashion enthusiasts from around the world.</p><p>JFW is more than just a fashion show; it is also a major cultural event. The event features a variety of fashion-related activities, such as workshops, seminars, and parties. JFW is also a platform for showcasing Indonesian culture to the world. The next Jakarta Fashion Week will be held from October 23 to 29, 2023, at Pondok Indah Mall 3 in Jakarta. The event will feature more than 200 designers from Indonesia and around the world.</p><p>Here are some of the highlights of Jakarta Fashion Week:</p><ul><li><strong>Runway shows:&nbsp;</strong>The main event of JFW is the runway shows, where designers showcase their latest collections.</li><li><strong>Exhibition booths:&nbsp;</strong>In addition to the runway shows, JFW also features a number of exhibition booths, where designers can sell their products to buyers and consumers.</li><li><strong>Seminars and workshops:&nbsp;</strong>JFW also hosts a number of seminars and workshops on topics related to fashion, such as design, marketing, and sustainability.</li><li><strong>Parties and events:&nbsp;</strong>JFW is also a major social event, with a number of parties and events held throughout the week.</li></ul><p>If you are interested in fashion, Indonesia, or Southeast Asia, then Jakarta Fashion Week is an event you should not miss.</p>",
                "start_date": "23-12-2023",
                "end_date": "29-12-2023",
                "time_start": "03:00 PM",
                "time_end": "06:00 PM",
                "place": "At Pondok Indah Mall 3 in Jakarta",
                "maps": "https://www.google.com/maps/place/Monumen+Nasional/@-6.175408,106.827159,16z/data=!4m6!3m5!1s0x2e69f5d2e764b12d:0x3d2ad6e1e0e9bcc8!8m2!3d-6.1753924!4d106.8271528!16zL20vMDNxN2hz?hl=id&entry=ttu",
                "detail_maps": "<p>Jl. Kartika Utama Nomor 1, RT.6, RW.3, Pondok Pinang, Kec. Kebayoran Lama, Jakarta Selatan</p>",
                "cover_image": "https://dev-olshop.berkatsoft.com/image/event/65683390af718.jpeg",
                "banner_image": "https://dev-olshop.berkatsoft.com/image/event/65683390af48a.jpeg"
            }
        }
    ]
};

export default function AccountEticketBooking() {
    /**
     * Hooks
     *
     */
    const { pathname } = useLocation();
    const { id, ticket } = useParams();
    const [searchParams] = useSearchParams();
    const { t } = useTranslation();

    /**
     * Context
     *
     */
    const { setLoading } = useContext(LoadingContext);

    /**
     * Main State
     *
     */
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [eventDetailObj, setEventDetailObj] = useState({});

    useEffect(() => {
        loadBreadcrumbs();
        loadEventDetailObj(id);
    }, []);

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const loadBreadcrumbs = () => {
        setBreadcrumbs([
            {
                label: t("e-ticket"),
                url: "/account/e-ticket"
            },
            {
                label: t("information")
            }
        ]);
    };

    const loadEventDetailObj = id => {
        setEventDetailObj(DATA_DUMMY);
        // if (id) {
        //     setLoading(true);
        //     Api.get("/event/" + id).then(res => {
        //         setEventDetailObj(res.data.data);
        //         setLoading(false);
        //     });
        // }
    };

    return (
        <div className="event-booking-container">
            <ContainerComponent>
                <BreadCrumb lists={breadcrumbs} />

                <TicketBookingSummaryComponent
                    bookingCode={"200"}
                    ticketId={ticket}
                    event={eventDetailObj}
                    activedIndexState={2}
                />

            </ContainerComponent>
        </div>
    );
}
