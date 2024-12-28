import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useData } from "../../providers/dataProvider";
import { useTranslation } from 'react-i18next';

const AddShoppingList = ({ showAddShoppingListModal, handleClose }) => {
    const { addShoppingList, loggedInUser } = useData();
    const [shoppingListName, setShoppingListName] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const { t } = useTranslation();

    const handleSave = () => {
        if (!shoppingListName.trim()) {
            setShowAlert(true)
            return;
        }
        addShoppingList(loggedInUser.id, shoppingListName);
        setShoppingListName("");
        setShowAlert(false)
        handleClose();
    };

    return (
        <Modal show={showAddShoppingListModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{t('dashboard.addShoppingList.title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formShoppingListName">
                        <Form.Label>{t('dashboard.addShoppingList.name')}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={t('dashboard.addShoppingList.placeholder')}
                            value={shoppingListName}
                            onChange={(e) => setShoppingListName(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                {showAlert && 
                    <Alert key='warning' variant='warning'>
                        {t('dashboard.addShoppingList.error')}
                    </Alert>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t('public.close')}
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    {t('public.create')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddShoppingList;