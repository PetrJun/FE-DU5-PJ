import React, { useState } from "react";
import { Modal, Button, Form, InputGroup, Alert } from 'react-bootstrap'
import { useData } from "../../providers/dataProvider";
import { useTranslation } from "react-i18next";

const AddMemberModal = ({ id, showAddMemberModal, handleClose, shoppingList }) => {
    const { t } = useTranslation();
    const { addMember, users } = useData();
    const [selectedUserId, setSelectedUserId] = useState(null)
    const [showAlert, setShowAlert] = useState(false);

    const handleSave = () => {
        if(selectedUserId !== null){
            addMember(id, selectedUserId);
            setSelectedUserId(null);
            setShowAlert(false);
            handleClose();
        } else {
            setShowAlert(true);
        }
    };

    const availableUsers = users.filter(user => 
        user.id !== shoppingList?.ownerId && 
        !shoppingList?.members.some(member => member.id === user.id)
    );

    const noAvailableUsers = availableUsers.length === 0

    return (
        <Modal show={showAddMemberModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{t('detail.addMember.title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {noAvailableUsers ?
                    <p>{t('detail.addMember.noAvailableUsers')}</p>
                :
                    <InputGroup className="my-3">
                        <Form.Select 
                            value={selectedUserId || ''} 
                            onChange={(e) => setSelectedUserId(e.target.value)}
                        >
                            <option value="">{t('detail.addMember.chooseMember')}</option>
                            {availableUsers.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </Form.Select>
                    </InputGroup>
                }
                {showAlert && 
                    <Alert key='warning' variant='warning'>
                        {t('detail.addMember.alert')}
                    </Alert>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t('public.close')}
                </Button>
                {!noAvailableUsers && 
                    <Button variant="primary" onClick={handleSave}>
                        {t('public.save')}
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    );
};

export default AddMemberModal;
