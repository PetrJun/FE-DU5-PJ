import { useEffect, useState } from 'react'
import { Button, Form, InputGroup, Container } from 'react-bootstrap'
import { useData } from '../../providers/dataProvider';
import ItemsCard from './itemsCard'
import MembersCard from './membersCard'
import { useTranslation } from 'react-i18next';

export default function ShoppingListDetail({id}) {
    const { t } = useTranslation();
    const { shoppingLists, changeShoppingListName, loggedInUser } = useData();

    const [shoppingList, setShoppingList] = useState(null)
    const [editingName, setEditingName] = useState(false)
    const [listName, setListName] = useState('')

    const handleNameChange = () => {
        changeShoppingListName(id, listName);
        setListName(listName);
        setEditingName(false);
    };

    useEffect(() => {
        const list = shoppingLists?.find(list => Number(list.id) === id);
        setShoppingList(list);
        setListName(list.name);
    }, [id, shoppingLists]);

    console.log("loggedInUser.id: ", loggedInUser.id);
    console.log("shoppingList?.ownerId: ", shoppingList?.ownerId);
    console.log("shoppingList?.members: ", shoppingList?.members);

    const rules = (Number(loggedInUser.id) === shoppingList?.ownerId || shoppingList?.members.some(member => member.id === Number(loggedInUser.id)))

    return (
        <Container className="col-12 col-lg-6 p-3">
            {shoppingList && rules ? (
                <>
                    <h2 className="h3 text-center mb-3">
                        {editingName ? (
                            <InputGroup>
                                <Form.Control
                                    value={listName}
                                    onChange={(e) => setListName(e.target.value)}
                                    placeholder={t('detail.placeholder')}
                                />
                                <Button variant="success" onClick={handleNameChange}>
                                    {t('detail.confirm')}
                                </Button>
                            </InputGroup>
                        ) : (
                            listName
                        )}
                    </h2>
                    <hr />

                    {/* Change Name Button (Only visible if user is the owner and not editing) */}
                    {!editingName && Number(loggedInUser.id) === shoppingList?.ownerId && (
                        <Button 
                            variant="light" 
                            className="border d-block mb-3" 
                            onClick={() => setEditingName(true)}
                        >
                            {t('detail.changeName')}
                        </Button>
                    )}

                    {/* ItemsCard */}
                    <ItemsCard 
                        id={id}
                        items={shoppingList.items}
                    />

                    {/* MembersCard */}
                    <MembersCard 
                        id={id}
                        shoppingList={shoppingList}
                    />
                </>
            ) : (
                <h1>{t('detail.noRules')}</h1>
            )}
        </Container>
    )
}
