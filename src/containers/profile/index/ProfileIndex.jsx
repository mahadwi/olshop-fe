import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom'
import './profile.scoped.scss';
import AvatarComponent from "../../../components/pages/profile/index/AvatarComponent";
import { AuthUserContext } from "../../../context/AuthUserContext";
import { IconBoxSeam, IconChevronRight, IconClipboardList, IconHeart, IconLogout, IconMapPin, IconStarFilled, IconTruckDelivery, IconUser, IconWallet } from "@tabler/icons-react";

export default function ProfileIndex() {

    /**
     * Hooks
     * 
     */
    const { pathname } = useLocation();

    /**
     * Context
     * 
     */
    const { user } = useContext(AuthUserContext)

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className='profile-index-page'>
            <AvatarComponent user={user} />
            <div className='profile-wrapper'>
                <div className='order'>
                    <IconClipboardList color='#081CC9' size={16} />
                    <div>Pesanan Saya</div>
                    <Link>View All <IconChevronRight size={22} /></Link>
                </div>
                <div className='icon-menu'>
                    <Link><IconWallet /> Unpaid</Link>
                    <Link><IconBoxSeam /> On Process</Link>
                    <Link><IconTruckDelivery/> On Going</Link>
                    <Link><IconStarFilled /> Rate</Link>
                </div>
                <div className='links'>
                    <Link to={'account'}><IconUser size={16} color='#081CC9' /> My Account <IconChevronRight color='#FFAC33' /></Link>
                    <Link><IconHeart size={16} color='#F24E1E' /> Wishist <IconChevronRight color='#FFAC33' /></Link>
                    <Link><IconTruckDelivery size={16} color='#E4A951' /> Orders <IconChevronRight color='#FFAC33' /></Link>
                    <Link><IconMapPin size={16} color='#F24E1E' /> Address<IconChevronRight color='#FFAC33' /></Link>
                </div>
                <div>
                    <Link to={'/logout'} className='link inline'><IconLogout color='#111' size={16}    /> Logout</Link>
                </div>
            </div>
        </div>
    )
}
