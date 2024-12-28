import { useData } from "../../providers/dataProvider";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";


const RemoveMemberModal = ({ id, member, showRemoveMemberModal, handleClose }) => {
    const { t } = useTranslation();
    const { deleteMember } = useData();

    const handleSave = () => {
        deleteMember(Number(id), Number(member.id));
        handleClose();
    };

    return (
        <Modal show={showRemoveMemberModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{t('detail.removeMember.title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{t('detail.removeMember.body')} <b>{member.name}</b>?</p>
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

export default RemoveMemberModal;