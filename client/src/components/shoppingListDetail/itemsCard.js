import { useState } from "react";
import { useData } from "../../providers/dataProvider"
import AddItemModal from '../../modals/shoppingListDetail/addItemModal'
import { Button, Card, ListGroup, Form, ButtonGroup } from 'react-bootstrap'
import { Trash, Plus } from 'react-bootstrap-icons'
import RemoveItemModal from '../../modals/shoppingListDetail/removeItemModal'
import { useTranslation } from "react-i18next";

const ItemsCard = ({ id, items }) => {
    const { t } = useTranslation();
    const { toggleItemChecked } = useData();
    const [filter, setFilter] = useState('all');
    const [showAddItem, setShowAddItem] = useState(false);
    const [removeItem, setRemoveItem] = useState(null);

    return (
        <Card className="mb-4">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="h5 mb-0">{t('detail.itemsCard.items')}</h3>
                    <ButtonGroup>
                        <Button 
                            size="sm" 
                            variant={filter === 'all' ? 'secondary' : 'outline-secondary'}
                            onClick={() => setFilter('all')}
                        >
                            {t('detail.itemsCard.all')}
                        </Button>
                        <Button 
                            size="sm" 
                            variant={filter === 'active' ? 'secondary' : 'outline-secondary'}
                            onClick={() => setFilter('active')}
                        >
                            {t('detail.itemsCard.notDone')}
                        </Button>
                    </ButtonGroup>
                </div>

                <ListGroup variant="flush">
                    {items
                        .filter(item => filter === 'all' || !item.status)
                        .map(item => (
                            <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                                <Form.Check 
                                    type="checkbox"
                                    label={item.name}
                                    checked={item.status}
                                    onChange={() => {
                                        toggleItemChecked(id, item.id)
                                    }}
                                />
                                <Trash 
                                    className="text-danger"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        setRemoveItem(item)
                                    }}
                                />
                            </ListGroup.Item>
                        ))}
                </ListGroup>
                <div className="d-flex justify-content-end">
                    <Button 
                        variant="light" 
                        className="border mt-3" 
                        onClick={() => setShowAddItem(true)}
                    >
                        <Plus size={20} className="me-2" />
                        {t('detail.itemsCard.addItem')}
                    </Button>
                    </div>
                <AddItemModal 
                    id={id}
                    showAddItemModal={showAddItem}
                    handleClose={() => setShowAddItem(false)}
                />
                {removeItem &&   
                    <RemoveItemModal
                        id={id}
                        item={removeItem}
                        showRemoveItemModal={!!removeItem}
                        handleClose={() => setRemoveItem(null)}
                    />
                }
            </Card.Body>
        </Card>
    )
}

export default ItemsCard;