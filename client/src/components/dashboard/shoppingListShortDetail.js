import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../providers/dataProvider"
import { Button, Card, Form } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'
import RemoveShoppingList from '../../modals/dashboard/removeShoppingList'
import { useTranslation } from "react-i18next";

const ShoppingListShortDetail = ({ shoppingList }) => {
    const { t } = useTranslation();

    const { changeStateShoppingList, loggedInUser } = useData();
    const navigate = useNavigate();

    const [removeShoppingList, setRemoveShoppingList] = useState(null)
    const [state, setState] = useState(shoppingList.status === 'active' ? true : false)

    const showState = (shoppingList) => {
        if (shoppingList.status === 'active') {
            return t('dashboard.shortDetail.active')
        } else {
            return t('dashboard.shortDetail.done')
        }
    }

    const changeState = (value) => {
        console.log("klik: ", value);
        const stateString = value === true ? "active" : "done";
        console.log(stateString);
        setState(value)
        changeStateShoppingList(shoppingList.id, stateString)
    }

    const isOwner = Number(loggedInUser?.id) === Number(shoppingList.ownerId)

    return (
        <Card className="mb-4">
            <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="h3 mb-0">{shoppingList.name}</h3>
                        <h4 className="h4 mb-0">{isOwner ? t('dashboard.shortDetail.owner') : t('dashboard.shortDetail.member')}</h4>
                    </div>
                    <p>{showState(shoppingList)}</p>
                <div className={`d-flex ${isOwner ? 'justify-content-between' : 'justify-content-end'} align-items-center`}>
                    {isOwner && <Trash 
                        className="text-danger"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setRemoveShoppingList(shoppingList)
                        }}
                    />}
                    {isOwner && <Form.Check
                        checked={state}
                        type="switch"
                        id="switch"
                        onChange={(e) => changeState(e.target.checked)}
                    />}
                    <Button
                        variant="success"
                        size="small"
                        onClick={() =>
                            navigate(
                                `/ShoppingListDetail/${shoppingList.id}`
                            )
                        }
                    >
                        {t('dashboard.shortDetail.detail')}
                    </Button>
                </div>
            </Card.Body>
            {!!removeShoppingList && 
                <RemoveShoppingList 
                    shoppingList={removeShoppingList}
                    showRemoveShoppingListModal={!!removeShoppingList}
                    handleClose={() => setRemoveShoppingList(null)}
                />
            }
        </Card>
    )
}

export default ShoppingListShortDetail;