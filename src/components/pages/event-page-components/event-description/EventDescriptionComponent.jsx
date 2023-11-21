import './event-description.scoped.scss'
import ticketBackground from './../../../../images/70965bd1d667f3ccf521671de5b1c634.png'

export default function EventDescriptionComponent() {
    return (
        <div className='event-description-section'>
            <div className='first-section'>
                <p>
                    Jakarta Fashion Week (JFW) is an annual fashion event held in Jakarta, Indonesia. It is considered the largest and most influential fashion week in Southeast Asia. The event showcases the latest collections of Indonesian and international designers, and it is a major platform for promoting Indonesian fashion to the world.
                </p>
                <p>
                    JFW was first held in 2008, and it has grown in popularity and prestige each year. The event is now attended by thousands of buyers, journalists, and fashion enthusiasts from around the world.
                </p>
                <p>
                    JFW is more than just a fashion show; it is also a major cultural event. The event features a variety of fashion-related activities, such as workshops, seminars, and parties. JFW is also a platform for showcasing Indonesian culture to the world.
                    The next Jakarta Fashion Week will be held from October 23 to 29, 2023, at Pondok Indah Mall 3 in Jakarta. The event will feature more than 200 designers from Indonesia and around the world.
                </p>
            </div>
            <div className='second-section'>
                <p>
                    Here are some of the highlights of Jakarta Fashion Week:
                </p>
                <ul>
                    <li>
                        <b>Runway shows: </b>The main event of JFW is the runway shows, where designers showcase their latest collections.
                    </li>
                    <li>
                        <b>Exhibition booths: </b>In addition to the runway shows, JFW also features a number of exhibition booths, where designers can sell their products to buyers and consumers.
                    </li>
                    <li>
                        <b>Seminars and workshops: </b>JFW also hosts a number of seminars and workshops on topics related to fashion, such as design, marketing, and sustainability.
                    </li>
                    <li>
                        <b>Parties and events: </b>JFW is also a major social event, with a number of parties and events held throughout the week.
                    </li>
                </ul>
                <p>
                    If you are interested in fashion, Indonesia, or Southeast Asia, then Jakarta Fashion Week is an event you should not miss.
                </p>
            </div>
            <div className='ticket-container' style={{ backgroundImage: `url(${ticketBackground})` }}>
                <button type='button'>Grab The Ticket</button>
            </div>
            <div className='third-section'>
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
        </div>
    )
}