import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Vytvoření contextu
const DataContext = createContext();

// URL serveru
const API_URL = "http://localhost:3001";

// Vytvoření provideru
export const DataProvider = ({ children }) => {
    const [shoppingLists, setShoppingLists] = useState([]);
    const [users, setUsers] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);

    const [eventLoadObject, setEventLoadObject] = useState({
        state: "idle", // idle | pending | ready | error
        error: null,
        data: null,
    });

    // Načtení dat při prvním renderu
    useEffect(() => {
        const fetchData = async () => {
        setEventLoadObject({ state: "pending", error: null, data: null });
        try {
            const [shoppingListsRes, usersRes] = await Promise.all([
                axios.get(`${API_URL}/shoppingLists`),
                axios.get(`${API_URL}/users`),
            ]);
            setShoppingLists(shoppingListsRes.data);
            setUsers(usersRes.data);
            setEventLoadObject({ state: "ready", error: null, data: { shoppingLists: shoppingListsRes.data, users: usersRes.data } });
        } catch (error) {
            setEventLoadObject({ state: "error", error, data: null });
        }
        };
        fetchData();
    }, []);

    const toggleItemChecked = async (shoppingListId, itemId) => {
        try {
            const list = shoppingLists.find((list) => Number(list.id) === shoppingListId);
            const item = list.items.find((item) => Number(item.id) === itemId);
            item.status = !item.status;
            await axios.put(`${API_URL}/shoppingLists/${shoppingListId}`, list);
            setShoppingLists((prev) =>
                prev.map((l) => (l.id === shoppingListId ? { ...list } : l))
            );
        } catch (error) {
            console.error("Error toggling item:", error);
        }
    };

    const addItem = async (shoppingListId, itemName) => {
        try {
            const list = shoppingLists.find((list) => Number(list.id) === shoppingListId);
            const newItem = { id: list.items.length + 1, name: itemName, status: false };
            list.items.push(newItem);
            await axios.put(`${API_URL}/shoppingLists/${shoppingListId}`, list);
            setShoppingLists((prev) =>
                prev.map((l) => (l.id === shoppingListId ? { ...list } : l))
            );
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    const deleteItem = async (shoppingListId, itemId) => {
        try {
            const list = shoppingLists.find((list) => Number(list.id) === shoppingListId);
            list.items = list.items.filter((item) => Number(item.id) !== itemId);
            await axios.put(`${API_URL}/shoppingLists/${shoppingListId}`, list);
            setShoppingLists((prev) =>
                prev.map((l) => (l.id === shoppingListId ? { ...list } : l))
            );
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const changeShoppingListName = async (shoppingListId, name) => {
        try {
            const list = shoppingLists.find((list) => Number(list.id) === shoppingListId);
            list.name = name;
            await axios.put(`${API_URL}/shoppingLists/${shoppingListId}`, list);
            setShoppingLists((prev) =>
                prev.map((l) => (l.id === shoppingListId ? { ...list } : l))
            );
        } catch (error) {
            console.error("Error changing shopping list name:", error);
        }
    };

    const logIn = async (userId) => {
        console.log(userId);
        try {
            const user = users.find((u) => u.id === userId);
            setLoggedInUser(user);
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    const logOut = () => {
        console.log("loggedInUser: ", loggedInUser);
        setLoggedInUser(null);
    };

    const addMember = async (shoppingListId, memberId) => {
        console.log("shoppingListId: ", shoppingListId);
        try {
            const list = shoppingLists.find((list) => Number(list.id) === Number(shoppingListId));
            if (!list.members.some((member) => Number(member.id) === Number(memberId))) {
                const newMember = users.find((user) => Number(user.id) === Number(memberId));
                list.members.push({ id: newMember.id, name: newMember.name });
                await axios.put(`${API_URL}/shoppingLists/${shoppingListId}`, list);
                setShoppingLists((prev) =>
                    prev.map((l) => (Number(l.id) === shoppingListId ? { ...list } : l))
                );
            }
        } catch (error) {
            console.error("Error adding member:", error);
        }
    };

    const deleteMember = async (shoppingListId, memberId) => {
        try {
            console.log("shoppingLists: ", shoppingLists);
            const list = shoppingLists.find((list) => Number(list.id) === shoppingListId);
            console.log("list: ", list);
            list.members = list.members.filter((member) => Number(member.id) !== memberId);
            await axios.put(`${API_URL}/shoppingLists/${shoppingListId}`, list);
            setShoppingLists((prev) =>
                prev.map((l) => (Number(l.id) === shoppingListId ? { ...list } : l))
            );
        } catch (error) {
            console.error("Error deleting member:", error);
        }
    };

    const deleteShoppingList = async (shoppingListId) => {
        console.log("shoppingListId: ", shoppingListId);
        try {
            await axios.delete(`${API_URL}/shoppingLists/${shoppingListId.id}`);
            setShoppingLists((prev) => prev.filter((list) => Number(list.id) !== Number(shoppingListId.id)));
        } catch (error) {
            console.error("Error deleting shopping list:", error);
        }
    };

    const changeStateShoppingList = async (shoppingListId, state) => {
        try {
            console.log(shoppingLists, shoppingListId, state);
            const list = shoppingLists.find((list) => Number(list.id) === Number(shoppingListId));
            list.status = state;
            await axios.put(`${API_URL}/shoppingLists/${shoppingListId}`, list);
            setShoppingLists((prev) =>
                prev.map((l) => (Number(l.id) === shoppingListId ? { ...list } : l))
            );
        } catch (error) {
            console.error("Error changing shopping list state:", error);
        }
    };

    const addShoppingList = async (userId, shoppingListName) => {
        try {
            const newShoppingList = {
                id: (shoppingLists.length + 1).toString(),
                status: "active",
                name: shoppingListName,
                ownerId: userId,
                ownerName: users.find((user) => user.id === userId).name,
                members: [],
                items: [],
                deleted: false,
            };
            const response = await axios.post(`${API_URL}/shoppingLists`, newShoppingList);
            setShoppingLists((prev) => [...prev, response.data]);
        } catch (error) {
            console.error("Error adding shopping list:", error);
        }
    };

    return (
        <DataContext.Provider
        value={{
            shoppingLists,
            setShoppingLists,
            users,
            toggleItemChecked,
            addItem,
            deleteItem,
            changeShoppingListName,
            logIn,
            logOut,
            loggedInUser,
            addMember,
            deleteMember,
            deleteShoppingList,
            changeStateShoppingList,
            addShoppingList,
            eventLoadObject,
        }}
        >
            {children}
        </DataContext.Provider>
    );
};

// Vytvoření custom hooku
export const useData = () => useContext(DataContext);