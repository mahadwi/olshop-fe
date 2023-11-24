import ContainerComponent from '../../../../general/container/ContainerComponent'
import './additional-detail.scss'

export default function AdditionalDetailComponent() {
    return (
        <ContainerComponent>
            <div className='additional-detail'>
                <p>
                    Here are some additional details about Jakarta Fashion Week:
                    <ul>
                        <li>
                            Website: <a href="">https://www.jakartafashionweek.co.id/</a>
                        </li>
                        <li>
                            Social media:

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