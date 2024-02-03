import { IconBrandWhatsapp } from "@tabler/icons-react";
import "./whatsapp.scoped.scss";

export default function WhatsappComponent() {
    return (
        <div className="whatsapp-component-wrapper">
            <a
                className={`whatsapp-component`}
                href="https://api.whatsapp.com/send?phone=6281804058981&text=Terima%20Kasih%20and%20telah%20menghubungi%20Luxuryhub.%20Silahkan%20tinggalkan%20pesan%20untuk%20dapat%20admin%20bantu"
            >
                <IconBrandWhatsapp size={42} />
            </a>
            <span>Message Us</span>
        </div>
    );
}
