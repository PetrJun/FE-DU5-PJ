import { useTranslation } from "react-i18next";
import { useData } from "../../providers/dataProvider";
import { Modal, Button } from "react-bootstrap";

const RemoveItemModal = ({ id, item, showRemoveItemModal, handleClose }) => {
    const { t } = useTranslation();
    const { deleteItem } = useData();

    const handleSave = () => {
        deleteItem(id, item.id);
        handleClose();
    };

    return (
        <Modal show={showRemoveItemModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{t('detail.removeItem.title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{t('detail.removeItem.body')} <b>{item.name}</b>?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t('public.close')}
                </Button>
                <Button variant="danger" onClick={handleSave}>
                    {t('public.delete')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RemoveItemModal;