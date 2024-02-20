import { Link, useLocation } from "react-router-dom";
import "./sidebar.scoped.scss";
import { IconX } from "@tabler/icons-react";
import { useRef, useContext } from "react";
import { AuthUserContext } from "../../../context/AuthUserContext";
import { LanguageContext } from "../../../context/LanguageContext";
import { changeLanguage } from "../../../translations/i18n";
import { t } from "i18next";

export default function SidebarComponent({ toggleSidebar, sidebarOpen, categories, brands, aboutUs }) {
    /**
     * Hooks
     *
     */
    const { pathname } = useLocation();

    /**
     * Context
     *
     */
    const { user, doLogout } = useContext(AuthUserContext);
    const { language, setLanguage } = useContext(LanguageContext);

    const sidebarRef = useRef();

    const handleLanguageChange = lng => {
        changeLanguage(lng);
        setLanguage(lng);
    };

    return (
        <aside className={`${sidebarOpen ? "show" : ""}`} ref={sidebarRef}>
            <ul className="side-links-wrapper">
                <li className="side-link-item">
                    <Link
                        to={"/"}
                        onClick={() => {
                            if (pathname == "/") {
                                window.location.reload();
                            }
                        }}
                        className={`side-link-item-a ${pathname == "/" ? "active" : ""}`}
                    >
                        {t("home").toUpperCase()}
                    </Link>
                </li>
                <li className="side-link-item">
                    <Link to={"/shop"} className={`side-link-item-a ${pathname.includes("/shop") ? "active" : ""}`}>
                        {t("shop").toUpperCase()}
                    </Link>
                </li>
                <li
                    className="side-link-item dropdown"
                    onClick={e => {
                        e.currentTarget.classList.toggle("show-dropdown");
                    }}
                >
                    <Link className={`side-link-item-a ${pathname.includes("/collective") ? "active" : ""}`}>
                        {t("collective").toUpperCase()}
                    </Link>

                    <ul className="dropdown-content">
                        {categories.map((data, index) => {
                            if (data.name.toUpperCase() == "OTHER") return null;
                            return (
                            <li key={index}>
                                <a href={`/collective/${data.id}`}>{data.name}</a>
                            </li>
                        )})}
                    </ul>
                </li>
                <li
                    className="side-link-item dropdown"
                    onClick={e => {
                        e.currentTarget.classList.toggle("show-dropdown");
                    }}
                >
                    <Link className={`side-link-item-a ${pathname.includes("/designers") ? "active" : ""}`}>
                        {t("designers").toUpperCase()}
                    </Link>

                    <ul className="dropdown-content">
                        {brands.map((data, index) => (
                            <li key={index}>
                                <a href={`/designers/${data.id}`}>{data.name}</a>
                            </li>
                        ))}
                    </ul>
                </li>
                <li className="side-link-item">
                    <Link
                        to={"/about-us"}
                        className={`side-link-item-a ${pathname.includes("/about-us") ? "active" : ""}`}
                    >
                        {t("aboutus").toUpperCase()}
                    </Link>
                </li>
                <li className="side-link-item">
                    <Link
                        to={"/consignment"}
                        className={`side-link-item-a ${pathname.includes("/consignment") ? "active" : ""}`}
                    >
                        {t("consignment").toUpperCase()}
                    </Link>
                </li>
                <li className="side-link-item">
                    <Link
                        to={"/contact"}
                        className={`side-link-item-a ${pathname.includes("/contact") ? "active" : ""}`}
                    >
                        {t("contact").toUpperCase()}
                    </Link>
                </li>
                <li className="side-link-item event">
                    <Link to={"/event"} className={`side-link-item-a ${pathname.includes("/event") ? "active" : ""}`}>
                        {t("event").toUpperCase()}
                    </Link>
                </li>
                <li className="side-link-item">
                    {user ? (
                        <Link
                            to={"/profile"}
                            className={`side-link-item-a ${pathname.includes("/profile") ? "active" : ""}`}
                        >
                            {t("profile").toUpperCase()}
                        </Link>
                    ) : (
                        <Link
                            to={"/login"}
                            className={`side-link-item-a ${pathname.includes("/login") ? "active" : ""}`}
                        >
                            {t("signin").toUpperCase()}
                        </Link>
                    )}
                </li>
                <li className="side-link-item">
                    <a href={aboutUs.maps} className="side-link-item-a">
                        {t("locationstore").toUpperCase()}
                    </a>
                </li>
                <li className="side-link-item dropdown">
                    <Link
                        className="side-link-item-a"
                        onClick={e => e.currentTarget.parentElement.classList.toggle("show-dropdown")}
                    >
                        {t("language").toUpperCase()}
                        <span className="flag">
                            <span className={`circle-flag fi fi-${language == "id" ? "id" : "us"}`} />
                            {language == "id" ? "ID" : "ENGLISH (US)"}
                        </span>
                    </Link>
                    <ul className="dropdown-content languages">
                        <li>
                            <a
                                href={`javascript:void(0)`}
                                className={`${language == "id" ? "active" : ""}`}
                                onClick={() => handleLanguageChange("id")}
                            >
                                <span className="circle-flag fi fi-id" /> ID
                            </a>
                        </li>
                        <li>
                            <a
                                href={`javascript:void(0)`}
                                className={`${language != "id" ? "active" : ""}`}
                                onClick={() => handleLanguageChange("en")}
                            >
                                <span className="circle-flag fi fi-us" /> ENGLISH (US)
                            </a>
                        </li>
                    </ul>
                </li>
                {user ? (
                    <li className="side-link-item">
                        <Link
                            className="side-link-item-a"
                            onClick={e => {
                                e.preventDefault();
                                doLogout(() => {
                                    window.location.href = "/login";
                                });
                            }}
                        >
                            {t("logout").toUpperCase()}
                        </Link>
                    </li>
                ) : null}
            </ul>
            <button
                className="close-sidebar-btn"
                onClick={() => {
                    toggleSidebar();
                }}
            >
                <IconX />
            </button>
        </aside>
    );
}
