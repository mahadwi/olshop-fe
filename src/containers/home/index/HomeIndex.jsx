import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe, GetBanner, GetGallery } from '../../../config/api';
import { useEffect, useState } from 'react';
import NavbarHome from '../../../components/homeComponents/navbar/NavbarComponent';
import IndexFooter from '../../../components/footer/indexFooter';
import axios from 'axios';
import ContainerComponent from '../../../components/general/container/ContainerComponent';
import Section3Component from '../../../components/homeComponents/section-3/Section3Component';
import Section4Component from '../../../components/homeComponents/section-4/Section4Component';
import Section5Component from '../../../components/homeComponents/section-5/Section5Component';
import Section6Component from '../../../components/homeComponents/section-6/Section6Component';
import Section7Component from '../../../components/homeComponents/section-7/Section7Component';
import Section8Component from '../../../components/homeComponents/section-8/Section8Component';
import Section9Component from '../../../components/homeComponents/section-9/Section9Component';
import SubscriptionComponent from '../../../components/general/subscription/SubscriptionComponent';
import LoadingComponent from '../../../components/general/loading/LoadingComponent';
import Section1Component from '../../../components/homeComponents/section-1/Section1Component';
import Api from '../../../utils/Api';
import Section2Component from '../../../components/homeComponents/section-2/Section2Component';

function HomeIndex() {
    const [loading, setLoading] = useState(true);
    const [dataBanner, setDataBanner] = useState([]);
    const [dataGallery, setDataGallery] = useState([]);
    const [objSection1, setObjSection1] = useState({})
    const [objSection2, setObjSection2] = useState({})
    const [objSection3, setObjSection3] = useState({})
    const [objSection4, setObjSection4] = useState({})
    const [objSection5, setObjSection5] = useState({})
    const [objSection6, setObjSection6] = useState({})
    const [objSection7, setObjSection7] = useState({})

    useEffect(() => {
        loadGalleries()
        loadBanners()
    }, [])

    useEffect(() => {
        if (dataGallery.length > 0) {
            setObjSection3(dataGallery.find((e) => e.section == 'Section 3'))
            setObjSection4(dataGallery.find((e) => e.section == 'Section 4'))
            setObjSection5(dataGallery.find((e) => e.section == 'Section 5'))
            setObjSection6(dataGallery.find((e) => e.section == 'Section 6'))
            setObjSection7(dataGallery.find((e) => e.section == 'Section 7'))
        }
    }, [dataGallery])

    useEffect(() => {
        if (dataBanner.length > 0) {
            setObjSection1(dataBanner.find((e) => e.section == 'Section 1'))
            setObjSection2(dataBanner.find((e) => e.section == 'Section 2'))
        }
    }, [dataBanner])

    useEffect(() => {
        if (dataGallery.length > 0 && dataBanner.length > 0) {
            setLoading(false)
        }
    }, [dataGallery, dataBanner])

    const loadGalleries = () => {
        Api.get('/gallery')
            .then((res) => {
                if (res) {
                    setDataGallery(res.data.data)
                }
            })
    }

    const loadBanners = () => {
        Api.get('/banner')
            .then((res) => {
                if (res) {
                    setDataBanner(res.data.data)
                }
            })
    }

    return (
        <div style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
            <LoadingComponent loading={loading} />
            <div style={{ display: loading ? 'none' : 'block' }}>
                <NavbarHome />
                <Section1Component item={objSection1} />
                <Fragment>
                    <Section2Component item={objSection2} />
                    <Section3Component item={objSection3} />

                    <Section4Component item={objSection4} />
                    <Section5Component item={objSection5} />
                    <Section6Component item={objSection6} />
                    <Section7Component item={objSection7} />
                    <Section8Component />
                    <Section9Component />

                    {/* Subs */}
                    <SubscriptionComponent loading={loading} />
                    {/* End Subs */}
                </Fragment>
                <IndexFooter />
            </div>
        </div>
    );
}

export default HomeIndex;
