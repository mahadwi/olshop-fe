import { useContext } from "react";
import { ModalAddressContext } from "../../../context/ModalAddressContext";
import "./modalAddress.scoped.scss";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { IconCircleX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function ModalAddressComponent() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { showModalAddress, setShowModalAddress } = useContext(ModalAddressContext)

    return (
        <>
            {/* Modal Confirm */}
            <Modal
                centered
                show={showModalAddress}
                onHide={() => {
                    setShowModalAddress(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t("confirmation")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-confirm-body">
                        <div>
                            <IconCircleX size={212} color={`#ff3333`} />
                        </div>
                        <div className="mt-3">
                            {t("confirmaddnewaddress")}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="modal-confirm-body-footer">
                        <button
                            type="button"
                            onClick={() => {
                                setShowModalAddress(false);
                            }}
                        >
                            {t("cancel")}
                        </button>
                        <button
                            type="button"
                            className="blue desktop"
                            onClick={() => {
                                setShowModalAddress(false);
                                navigate("/account/address");
                            }}
                        >
                            {t("addnewaddress")}
                        </button>
                        <button
                            type="button"
                            className="blue mobile"
                            onClick={() => {
                                setShowModalAddress(false);
                                navigate("/profile/address");
                            }}
                        >
                            {t("addnewaddress")}
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
            {/* End of Modal Confirm */}
        </>
    );
}
