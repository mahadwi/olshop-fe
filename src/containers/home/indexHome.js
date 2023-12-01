import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe, GetBanner, GetGallery } from '../../config/api';
import { useEffect, useState } from 'react';
import NavbarHome from '../../components/homeComponents/navbar/NavbarComponent';
import IndexFooter from '../../components/footer/indexFooter';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import HeroSliderComponent from '../../components/homeComponents/hero-slider/HeroSliderComponent';
import TitleBookSectionComponent from '../../components/homeComponents/title-book-section/TitleBookSectionComponent';
import DescriptionSectionComponent from '../../components/homeComponents/description-section-component/DescriptionSectionComponent';
import ContainerComponent from '../../components/general/container/ContainerComponent';
import Section3Component from '../../components/homeComponents/section-3/Section3Component';
import Section4Component from '../../components/homeComponents/section-4/Section4Component';
import Section5Component from '../../components/homeComponents/section-5/Section5Component';
import Section6Component from '../../components/homeComponents/section-6/Section6Component';
import Section7Component from '../../components/homeComponents/section-7/Section7Component';
import Section8Component from '../../components/homeComponents/section-8/Section8Component';
import Section9Component from '../../components/homeComponents/section-9/Section9Component';
import SubscriptionComponent from '../../components/general/subscription/SubscriptionComponent';
import LoadingComponent from '../../components/general/loading/LoadingComponent';

function IndexHome() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState('black');
    const [dataBanner, setDataBanner] = useState({});
    const [dataGallery, setDataGallery] = useState([]);
    const [objSection3, setObjSection3] = useState({})
    const [objSection4, setObjSection4] = useState({})
    const [objSection5, setObjSection5] = useState({})
    const [objSection6, setObjSection6] = useState({})
    const [objSection7, setObjSection7] = useState({})

    useEffect(() => {
        if (dataGallery.data) {
            setObjSection3(dataGallery.data.find((e) => e.section == 'Section 3'))
            setObjSection4(dataGallery.data.find((e) => e.section == 'Section 4'))
            setObjSection5(dataGallery.data.find((e) => e.section == 'Section 5'))
            setObjSection6(dataGallery.data.find((e) => e.section == 'Section 6'))
            setObjSection7(dataGallery.data.find((e) => e.section == 'Section 7'))
        }
    }, [dataGallery])

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate('/');
        }
    }, [isError, navigate]);

    useEffect(() => {
        getBanner();
    }, {});

    useEffect(() => {
        getGallery();
    }, {});

    const getBanner = async () => {
        try {
            const response = await axios.get(GetBanner);
            setTimeout(() => {
                setLoading(false);
                setDataBanner(response.data);
            }, 1000)
            console.log('data banner', dataBanner);
        } catch (error) {
            console.log(error);
        }
    };

    const getGallery = async () => {
        try {
            const response = await axios.get(GetGallery);
            setDataGallery(response.data);
            console.log('data gallery :', response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <LoadingComponent loading={loading} />
            <div style={{ display: loading ? 'none' : 'block' }}>
                <NavbarHome userName={user && user.name} />
                <HeroSliderComponent dataBanner={dataBanner} />
                <Fragment>
                    <TitleBookSectionComponent />
                    {/* <TitleSection2 dataBanner={dataBanner} /> */}
                    {/* <Section2 /> */}
                    <ContainerComponent>
                        <DescriptionSectionComponent />
                    </ContainerComponent>
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

export default IndexHome;
