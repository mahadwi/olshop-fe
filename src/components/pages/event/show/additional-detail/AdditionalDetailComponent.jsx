import ContainerComponent from '../../../../general/container/ContainerComponent'
import './additional-detail.scoped.scss'
import { useTranslation } from 'react-i18next';

export default function AdditionalDetailComponent() {
    const { t } = useTranslation();

    return (
        <ContainerComponent>
            <div className='additional-detail'>
                <p>
                    {t('herearesomeadditionaldetailsabout')} Jakarta Fashion Week:
                    <ul>
                        <li>
                            Website: <a href="">https://www.jakartafashionweek.co.id/</a>
                        </li>
                        <li>
                            {t('socialmedia')}:

                            <ul>
                                <li>
                                    Facebook: <a href="https://m.facebook.com/profile.php?id=132973626743441">https://www.instagram.com/jfwofficial/?hl=en</a>
                                </li>
                                <li>
                                    Instagram: <a href="https://www.instagram.com/jfwofficial/?hl=en">https://www.instagram.com/jfwofficial/?hl=en</a>
                                </li>
                                <li>
                                    Twitter: <a href="https://www.instagram.com/jfwofficial/?hl=en">https://twitter.com/JKTfashion</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </p>
            </div>
        </ContainerComponent>
    )
}
