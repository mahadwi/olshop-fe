import './ticket-booking-summary.scoped.scss'
import ticketBookingSummaryBg from './../../../../../images/62782f1f7146ee3c859503f63905372f.jpeg'

export default function TicketBookingSummaryComponent({activedIndexState}) {
    return (
        <div className={`card-ticket-purchase-item ${activedIndexState == 2 ? "last" : ""}`}>
            <h3 className="card-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.245 2H16.755C17.914 2 18.493 2 18.961 2.163C19.4023 2.31939 19.8015 2.57541 20.1277 2.91118C20.454 3.24695 20.6984 3.65342 20.842 4.099C21 4.581 21 5.177 21 6.37V20.374C21 21.232 20.015 21.688 19.392 21.118C19.2172 20.9565 18.988 20.8668 18.75 20.8668C18.512 20.8668 18.2828 20.9565 18.108 21.118L17.625 21.56C17.3188 21.8432 16.9171 22.0004 16.5 22.0004C16.0829 22.0004 15.6812 21.8432 15.375 21.56C15.0688 21.2768 14.6671 21.1196 14.25 21.1196C13.8329 21.1196 13.4312 21.2768 13.125 21.56C12.8188 21.8432 12.4171 22.0004 12 22.0004C11.5829 22.0004 11.1812 21.8432 10.875 21.56C10.5688 21.2768 10.1671 21.1196 9.75 21.1196C9.33293 21.1196 8.93121 21.2768 8.625 21.56C8.31879 21.8432 7.91707 22.0004 7.5 22.0004C7.08293 22.0004 6.68121 21.8432 6.375 21.56L5.892 21.118C5.71721 20.9565 5.48798 20.8668 5.25 20.8668C5.01202 20.8668 4.78279 20.9565 4.608 21.118C3.985 21.688 3 21.232 3 20.374V6.37C3 5.177 3 4.58 3.158 4.1C3.458 3.187 4.153 2.471 5.039 2.163C5.507 2 6.086 2 7.245 2ZM15.059 8.5C15.1902 8.35154 15.2574 8.15717 15.2458 7.95935C15.2342 7.76154 15.1448 7.57635 14.9971 7.44424C14.8494 7.31213 14.6554 7.24384 14.4576 7.25429C14.2597 7.26474 14.074 7.35307 13.941 7.5L10.929 10.874L10.059 9.9C9.92604 9.75307 9.74033 9.66474 9.54245 9.65429C9.34457 9.64384 9.15059 9.71213 9.0029 9.84424C8.8552 9.97635 8.76579 10.1615 8.75419 10.3594C8.74259 10.5572 8.80975 10.7515 8.941 10.9L10.369 12.5C10.4394 12.5788 10.5256 12.6419 10.622 12.685C10.7184 12.7282 10.8229 12.7505 10.9285 12.7505C11.0341 12.7505 11.1386 12.7282 11.235 12.685C11.3314 12.6419 11.4176 12.5788 11.488 12.5L15.06 8.5H15.059ZM7.5 14.75C7.30109 14.75 7.11032 14.829 6.96967 14.9697C6.82902 15.1103 6.75 15.3011 6.75 15.5C6.75 15.6989 6.82902 15.8897 6.96967 16.0303C7.11032 16.171 7.30109 16.25 7.5 16.25H16.5C16.6989 16.25 16.8897 16.171 17.0303 16.0303C17.171 15.8897 17.25 15.6989 17.25 15.5C17.25 15.3011 17.171 15.1103 17.0303 14.9697C16.8897 14.829 16.6989 14.75 16.5 14.75H7.5Z" fill="#FFAC33" />
                </svg>
                <span>{activedIndexState == 2 ? <>E-Ticket</> : <>Booking Summary</> }</span>
            </h3>
            <div className='card-ticket-detail'>
                <div className='ticket-day-pax-wrapper'>
                    <img src={ticketBookingSummaryBg} alt="" />
                    <div>
                        <h4>[Pre-Sale] Admission Ticket - 1 Day Access</h4>
                        <span>Pax : 1</span>
                    </div>
                </div>
                <h2>Rp. 500.000</h2>
            </div>
            <div className="card-detail">
                <ul>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M4.35423 1.4375C4.35423 1.32147 4.30813 1.21019 4.22609 1.12814C4.14404 1.04609 4.03276 1 3.91673 1C3.80069 1 3.68941 1.04609 3.60737 1.12814C3.52532 1.21019 3.47923 1.32147 3.47923 1.4375V2.35917C2.63923 2.42625 2.08856 2.59075 1.68373 2.99617C1.27831 3.401 1.11381 3.95225 1.04614 4.79167H12.6206C12.553 3.95167 12.3885 3.401 11.9831 2.99617C11.5782 2.59075 11.027 2.42625 10.1876 2.35858V1.4375C10.1876 1.32147 10.1415 1.21019 10.0594 1.12814C9.97737 1.04609 9.86609 1 9.75006 1C9.63403 1 9.52275 1.04609 9.4407 1.12814C9.35865 1.21019 9.31256 1.32147 9.31256 1.4375V2.32008C8.92464 2.3125 8.48948 2.3125 8.00006 2.3125H5.66673C5.17731 2.3125 4.74214 2.3125 4.35423 2.32008V1.4375Z" fill="#A2A3B1" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1 6.97852C1 6.4891 1 6.05393 1.00758 5.66602H12.6591C12.6667 6.05393 12.6667 6.4891 12.6667 6.97852V8.14518C12.6667 10.3449 12.6667 11.4451 11.983 12.1282C11.2999 12.8118 10.1997 12.8118 8 12.8118H5.66667C3.46692 12.8118 2.36675 12.8118 1.68367 12.1282C1 11.4451 1 10.3449 1 8.14518V6.97852ZM9.75 8.14518C9.90471 8.14518 10.0531 8.08372 10.1625 7.97433C10.2719 7.86493 10.3333 7.71656 10.3333 7.56185C10.3333 7.40714 10.2719 7.25877 10.1625 7.14937C10.0531 7.03997 9.90471 6.97852 9.75 6.97852C9.59529 6.97852 9.44692 7.03997 9.33752 7.14937C9.22812 7.25877 9.16667 7.40714 9.16667 7.56185C9.16667 7.71656 9.22812 7.86493 9.33752 7.97433C9.44692 8.08372 9.59529 8.14518 9.75 8.14518ZM9.75 10.4785C9.90471 10.4785 10.0531 10.4171 10.1625 10.3077C10.2719 10.1983 10.3333 10.0499 10.3333 9.89518C10.3333 9.74047 10.2719 9.5921 10.1625 9.4827C10.0531 9.37331 9.90471 9.31185 9.75 9.31185C9.59529 9.31185 9.44692 9.37331 9.33752 9.4827C9.22812 9.5921 9.16667 9.74047 9.16667 9.89518C9.16667 10.0499 9.22812 10.1983 9.33752 10.3077C9.44692 10.4171 9.59529 10.4785 9.75 10.4785ZM7.41667 7.56185C7.41667 7.71656 7.35521 7.86493 7.24581 7.97433C7.13642 8.08372 6.98804 8.14518 6.83333 8.14518C6.67862 8.14518 6.53025 8.08372 6.42085 7.97433C6.31146 7.86493 6.25 7.71656 6.25 7.56185C6.25 7.40714 6.31146 7.25877 6.42085 7.14937C6.53025 7.03997 6.67862 6.97852 6.83333 6.97852C6.98804 6.97852 7.13642 7.03997 7.24581 7.14937C7.35521 7.25877 7.41667 7.40714 7.41667 7.56185ZM7.41667 9.89518C7.41667 10.0499 7.35521 10.1983 7.24581 10.3077C7.13642 10.4171 6.98804 10.4785 6.83333 10.4785C6.67862 10.4785 6.53025 10.4171 6.42085 10.3077C6.31146 10.1983 6.25 10.0499 6.25 9.89518C6.25 9.74047 6.31146 9.5921 6.42085 9.4827C6.53025 9.37331 6.67862 9.31185 6.83333 9.31185C6.98804 9.31185 7.13642 9.37331 7.24581 9.4827C7.35521 9.5921 7.41667 9.74047 7.41667 9.89518ZM3.91667 8.14518C4.07138 8.14518 4.21975 8.08372 4.32915 7.97433C4.43854 7.86493 4.5 7.71656 4.5 7.56185C4.5 7.40714 4.43854 7.25877 4.32915 7.14937C4.21975 7.03997 4.07138 6.97852 3.91667 6.97852C3.76196 6.97852 3.61358 7.03997 3.50419 7.14937C3.39479 7.25877 3.33333 7.40714 3.33333 7.56185C3.33333 7.71656 3.39479 7.86493 3.50419 7.97433C3.61358 8.08372 3.76196 8.14518 3.91667 8.14518ZM3.91667 10.4785C4.07138 10.4785 4.21975 10.4171 4.32915 10.3077C4.43854 10.1983 4.5 10.0499 4.5 9.89518C4.5 9.74047 4.43854 9.5921 4.32915 9.4827C4.21975 9.37331 4.07138 9.31185 3.91667 9.31185C3.76196 9.31185 3.61358 9.37331 3.50419 9.4827C3.39479 9.5921 3.33333 9.74047 3.33333 9.89518C3.33333 10.0499 3.39479 10.1983 3.50419 10.3077C3.61358 10.4171 3.76196 10.4785 3.91667 10.4785Z" fill="#A2A3B1" />
                        </svg>
                        <span>Use on <b>selected visit date</b></span>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <g clip-path="url(#clip0_639_3109)">
                                <path d="M6.99996 1.16602C10.2217 1.16602 12.8333 3.7776 12.8333 6.99935C12.8333 10.2211 10.2217 12.8327 6.99996 12.8327C3.77821 12.8327 1.16663 10.2211 1.16663 6.99935C1.16663 3.7776 3.77821 1.16602 6.99996 1.16602ZM6.99996 2.33268C5.76228 2.33268 4.5753 2.82435 3.70013 3.69952C2.82496 4.57469 2.33329 5.76167 2.33329 6.99935C2.33329 8.23703 2.82496 9.42401 3.70013 10.2992C4.5753 11.1743 5.76228 11.666 6.99996 11.666C8.23764 11.666 9.42462 11.1743 10.2998 10.2992C11.175 9.42401 11.6666 8.23703 11.6666 6.99935C11.6666 5.76167 11.175 4.57469 10.2998 3.69952C9.42462 2.82435 8.23764 2.33268 6.99996 2.33268ZM6.99996 3.49935C7.14284 3.49937 7.28074 3.55182 7.38751 3.64677C7.49428 3.74171 7.56249 3.87254 7.57921 4.01443L7.58329 4.08268V6.75785L9.16238 8.33693C9.267 8.44191 9.32773 8.58277 9.33226 8.73091C9.33678 8.87904 9.28475 9.02335 9.18673 9.13451C9.08871 9.24567 8.95205 9.31536 8.80452 9.32941C8.65698 9.34347 8.50962 9.30084 8.39238 9.21018L8.33754 9.16177L6.58754 7.41177C6.49688 7.32103 6.43865 7.20293 6.42188 7.07577L6.41663 6.99935V4.08268C6.41663 3.92797 6.47808 3.7796 6.58748 3.6702C6.69688 3.56081 6.84525 3.49935 6.99996 3.49935Z" fill="#A2A3B1" />
                            </g>
                            <defs>
                                <clipPath id="clip0_639_3109">
                                    <rect width="14" height="14" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <span>
                            <b>Event Time</b> : 3 - 6 PM
                        </span>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M11.6375 12.25C10.4222 12.25 9.22153 11.985 8.03542 11.4549C6.84931 10.9249 5.77014 10.1739 4.79792 9.20208C3.82569 8.22986 3.07475 7.15069 2.54508 5.96458C2.01542 4.77847 1.75039 3.57778 1.75 2.3625C1.75 2.1875 1.80833 2.04167 1.925 1.925C2.04167 1.80833 2.1875 1.75 2.3625 1.75H4.725C4.86111 1.75 4.98264 1.79628 5.08958 1.88883C5.19653 1.98139 5.25972 2.09067 5.27917 2.21667L5.65833 4.25833C5.67778 4.41389 5.67292 4.54514 5.64375 4.65208C5.61458 4.75903 5.56111 4.85139 5.48333 4.92917L4.06875 6.35833C4.26319 6.71806 4.494 7.06553 4.76117 7.40075C5.02833 7.73597 5.32253 8.05933 5.64375 8.37083C5.94514 8.67222 6.26111 8.95183 6.59167 9.20967C6.92222 9.4675 7.27222 9.70317 7.64167 9.91667L9.0125 8.54583C9.1 8.45833 9.21433 8.39261 9.3555 8.34867C9.49667 8.30472 9.63511 8.29267 9.77083 8.3125L11.7833 8.72083C11.9194 8.75972 12.0312 8.83031 12.1187 8.93258C12.2062 9.03486 12.25 9.149 12.25 9.275V11.6375C12.25 11.8125 12.1917 11.9583 12.075 12.075C11.9583 12.1917 11.8125 12.25 11.6375 12.25Z" fill="#00AE65" />
                        </svg>
                        <span>Need to Reserve</span>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M10.5 6.41667H3.50004C3.19062 6.41667 2.89388 6.53958 2.67508 6.75838C2.45629 6.97717 2.33337 7.27391 2.33337 7.58333V12.25C2.33337 12.5594 2.45629 12.8562 2.67508 13.075C2.89388 13.2937 3.19062 13.4167 3.50004 13.4167H10.5C10.8095 13.4167 11.1062 13.2937 11.325 13.075C11.5438 12.8562 11.6667 12.5594 11.6667 12.25V7.58333C11.6667 7.27391 11.5438 6.97717 11.325 6.75838C11.1062 6.53958 10.8095 6.41667 10.5 6.41667ZM10.5 9.91667H3.50004V8.16667H10.5M9.91671 2.91667V5.83333H9.04171V3.79167H5.76337L7.17504 5.20917L6.55671 5.83333L4.08337 3.35417L6.55671 0.875L7.17504 1.49917L5.76337 2.91667H9.91671Z" fill="#A2A3B1" />
                        </svg>
                        <span>Non - refunable</span>
                    </li>
                </ul>
                <div>
                    <h2></h2>
                </div>
            </div>
            {
                activedIndexState == 2 ?
                <>
                    <div className="divider" />
                    <div className="card-bottom">
                        <div className="id">
                            <div className="item">
                                <div>
                                    Booking ID
                                </div>
                                <div className="id-number">
                                    283429312321
                                </div>
                            </div>
                            <img src={`https://i.ibb.co/1K3VCSd/image.png`} alt="barcode" />
                        </div>
                        <div className="detail">
                            <div className="item">
                                <div>
                                    Full Name
                                </div>
                                <div>
                                    Inon_5471
                                </div>
                            </div>
                            <div className="item">
                                <div>
                                    Email Address
                                </div>
                                <div>
                                    Inon@gmail.com
                                </div>
                            </div>
                            <div className="item">
                                <div>
                                    Phone Number
                                </div>
                                <div>
                                    081111222233
                                </div>
                            </div>
                        </div>
                        <div className="address">
                            <div className="item">
                                <div>
                                    Address
                                </div>
                                <div>
                                    Jl. ABC,Kec.ABC,Jawa Tengah
                                </div>
                            </div>
                            <a href="#" className="download">Download</a>
                        </div>
                    </div>
                </>
            : null }
        </div >
    )
}
