import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useData } from "../../providers/dataProvider";
import { useTranslation } from'react-i18next';

const AddItemModal = ({ id, showAddItemModal, handleClose }) => {
    const { t } = useTranslation();
    const { addItem } = useData();
    const [itemName, setItemName] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const handleSave = () => {
        if (!itemName.trim()) {
            setShowAlert(true)
            return;
        }
        addItem(id, itemName);
        setItemName("");
        setShowAlert(false)
        handleClose();
    };

    return (
        <Modal show={showAddItemModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{t('detail.addItem.title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formItemName">
                        <Form.Label>{t('detail.addItem.itemName')}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={t('detail.addItem.placeholder')}
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                {showAlert && 
                    <Alert key='warning' variant='warning'>
                        {t('detail.addItem.alert')}
                    </Alert>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t('public.close')}
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    {t('public.save')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddItemModal;
