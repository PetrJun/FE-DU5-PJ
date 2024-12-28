import { useEffect, useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { useData } from '../../providers/dataProvider';
import { Plus } from 'react-bootstrap-icons';
import ShoppingListShortDetail from './shoppingListShortDetail'
import AddShoppingList from '../../modals/dashboard/addShoppingList'
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../providers/themeProvider';

export default function DashboardDetail() {
    const { theme } = useTheme();
    const { loggedInUser, shoppingLists } = useData();

    const [shoppingListsDashboard, setShoppingListsDashboard] = useState([]);
    const [filter, setFilter] = useState('all');
    const [showAddShoppingList, setShowAddShoppingList] = useState(false);

    const { t } = useTranslation();

    useEffect(() => {
        if(loggedInUser?.id){
            console.log("--------------------------------");
            console.log("shoppingLists: ", shoppingLists);
            console.log("loggedInUser?.id: ", loggedInUser?.id);
            console.log("--------------------------------");
            setShoppingListsDashboard(shoppingLists.filter(list => 
                ((Number(list.ownerId) === Number(loggedInUser.id) || list.members.find(member => Number(member.id) == Number(loggedInUser.id))) && !list.deleted)
            ))
        } else {
            setShoppingListsDashboard([]);
        }
    }, [loggedInUser, shoppingLists])

    return (
        <div className="p-3">
            <ButtonGroup>
                <Button 
                    size="sm" 
                    variant={filter === 'all' ? 'secondary' : 'outline-secondary'}
                    onClick={() => setFilter('all')}
                >
                    {t('dashboard.all')}
                </Button>
                <Button 
                    size="sm" 
                    variant={filter === 'active' ? 'secondary' : 'outline-secondary'}
                    onClick={() => setFilter('active')}
                >
                    {t('dashboard.active')}
                </Button>
            </ButtonGroup>
            <hr />
            <div className="d-flex justify-content-end mb-3">
                <Button 
                    variant="light" 
                    className="border" 
                    onClick={() => setShowAddShoppingList(true)}
                >
                    <Plus size={20} className="me-2" />
                    {t('dashboard.create')}
                </Button>
            </div>
            {shoppingListsDashboard.length > 0 && 
                shoppingListsDashboard
                    .filter(list => filter === 'all' || list.status === 'active')
                    .map(shoppingList => (
                        <ShoppingListShortDetail
                            key={shoppingList.id}
                            shoppingList={shoppingList}
                        />
                    ))
            }
            {shoppingListsDashboard.length > 0 && 
                shoppingListsDashboard
                    .filter(list => filter === 'all' || list.status === 'active').length === 0 && 
                    <h1>
                        {t('dashboard.noActiveLists')}
                    </h1>
            }
            {shoppingListsDashboard.length == 0 && 
                <h1>
                    {t('dashboard.noLists')}
                </h1>
            }
            {showAddShoppingList &&
                <AddShoppingList
                    showAddShoppingListModal={!!showAddShoppingList}
                    handleClose={() => setShowAddShoppingList(false)}
                />
            }
        </div>
    )
}