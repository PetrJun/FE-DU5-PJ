import { useData } from "../../providers/dataProvider";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";


const RemoveShoppingList = ({ shoppingList, showRemoveShoppingListModal, handleClose }) => {
    const { t } = useTranslation();
    const { deleteShoppingList } = useData();

    const handleSave = () => {
        deleteShoppingList(shoppingList);
        handleClose();
    };

    return (
        <Modal show={showRemoveShoppingListModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{t('dashboard.removeShoppingList.title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{t('dashboard.removeShoppingList.body')} <b>{shoppingList.name}</b>?</p>
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

export default RemoveShoppingList;