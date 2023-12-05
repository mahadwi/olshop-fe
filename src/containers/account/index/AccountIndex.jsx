import FooterComponent from "../../../components/footer/FooterComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import NavbarComponent from "../../../components/general/navbar/NavbarComponent";
import ScreenContainerComponent from "../../../components/general/screen-container/ScreenContainerComponent";

export default function AccountIndex() {
    return (
        <div>
            <NavbarComponent />
            <ScreenContainerComponent>
                <ContainerComponent>
                    <div style={{ paddingTop: '2rem', paddingBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                        <button onClick={() => {
                            localStorage.removeItem('apiToken')
                            window.location.href = '/login'
                        }}>Logout</button>
                    </div>
                </ContainerComponent>
            </ScreenContainerComponent>
            <FooterComponent />
        </div>
    )
}