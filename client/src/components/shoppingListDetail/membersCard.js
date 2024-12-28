import { useData } from "../../providers/dataProvider";
import AddMemberModal from '../../modals/shoppingListDetail/addMemberModal'
import { Button, Card, ListGroup } from 'react-bootstrap'
import { Plus, DoorClosedFill } from 'react-bootstrap-icons'
import { useState } from "react";
import RemoveMemberModal from '../../modals/shoppingListDetail/removeMemberModal'
import { useTranslation } from "react-i18next";

const MembersCard = ({ id, shoppingList }) => {
    const { t } = useTranslation();
    const { loggedInUser } = useData();
    const [showAddMember, setShowAddMember] = useState(false);
    const [removeMember, setRemoveMember] = useState(null);

    return (
        <Card>
            <Card.Body>
                <h3 className="h5 mb-3">{t('detail.membersCard.members')}</h3>
                <ListGroup variant="flush">
                    <ListGroup.Item key={shoppingList?.ownerId} className="d-flex justify-content-between align-items-center">
                        {shoppingList?.ownerName} ({t('detail.membersCard.owner')})
                    </ListGroup.Item>
                    {shoppingList?.members.map((member) => (
                        <ListGroup.Item key={member.id} className="d-flex justify-content-between align-items-center">
                            {member.name}
                            {(Number(loggedInUser.id) === shoppingList?.ownerId || Number(loggedInUser.id) === member.id) &&
                                <DoorClosedFill 
                                    className="text-danger"
                                    onClick={() => {
                                        setRemoveMember(member)
                                    }}
                                />
                            }
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                {Number(loggedInUser.id) === shoppingList.ownerId &&
                    <div className="d-flex justify-content-end">
                        <Button 
                            variant="light"
                            className="border mt-3" 
                            onClick={() => setShowAddMember(true)}
                        >
                            <Plus size={20} className="me-2" />
                            {t('detail.membersCard.addMember')}
                        </Button>
                    </div>
                }
                <AddMemberModal 
                    id={id}
                    showAddMemberModal={showAddMember}
                    handleClose={() => setShowAddMember(false)}
                    shoppingList={shoppingList}
                />
                {removeMember && 
                    <RemoveMemberModal 
                        id={id}
                        member={removeMember}
                        showRemoveMemberModal={!!removeMember}
                        handleClose={() => setRemoveMember(null)}
                    />
                }
            </Card.Body>
        </Card>
    )
}

export default MembersCard;