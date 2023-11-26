import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe, GetBanner, GetGallery } from '../../config/api';
import { useEffect, useState } from 'react';
import HomeSlider from '../../components/homeComponents/homeSlider';
import NavbarHome from '../../components/homeComponents/navbar/NavbarComponent';
import IndexFooter from '../../components/footer/indexFooter';
import Section3 from '../../components/homeComponents/section3';
import Section2 from '../../components/homeComponents/section2';
import TitleSection2 from '../../components/homeComponents/titleSection2';
import Section2footer from '../../components/homeComponents/section2footer';
import Section4 from '../../components/homeComponents/section4';
import Section5 from '../../components/homeComponents/section5';
import Section6 from '../../components/homeComponents/section6';
import Section7 from '../../components/homeComponents/section7';
import Section8 from '../../components/homeComponents/section8';
import Section9 from '../../components/homeComponents/section9/section9';
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

const override = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // You can adjust the background color and transparency
};

function IndexHome() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState('black');
    const [dataBanner, setDataBanner] = useState({});
    const [dataGallery, setDataGallery] = useState({});

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
            console.log('data gallery :', dataGallery);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {loading && (
                <BeatLoader
                    color={color}
                    loading={loading}
                    cssOverride={override}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            )}
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
                    <Section3Component />
                    <Section4Component />
                    <Section5Component />
                    <Section6Component />
                    <Section7Component />
                    <Section8Component />
                    <Section9Component />

                    {/* <Section2footer dataBanner={dataBanner && dataBanner.data} /> */}
                    {/* <Section3 dataGallery={dataGallery && dataGallery.data} /> */}
                    {/* <Section4 /> */}
                    {/* <Section5 /> */}
                    {/* <Section6 />
                    <Section7 /> */}
                    {/* <Section8 /> */}
                    {/* <Section9 /> */}
                </Fragment>
                <IndexFooter />
            </div>
        </div>
    );
}

export default IndexHome;
