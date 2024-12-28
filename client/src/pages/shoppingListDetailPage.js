import { useParams } from "react-router-dom";
import ShoppingListDetail from "../components/shoppingListDetail/shoppingListDetail";

function ShoppingListDetailPage() {
    const { id } = useParams();

    const idOfList = Number(id);

    return (
        <ShoppingListDetail id={idOfList} />
    );
}

export default ShoppingListDetailPage;