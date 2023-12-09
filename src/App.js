import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ShoppingLists from './components/ShoppingLists';
import ShoppingListDetail from './components/ShoppingListDetail';
import api from './services/api';
import './App.css';

const App = () => {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShoppingLists = async () => {
      try {
        const lists = await api.getShoppingLists();
        setLists(lists);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchShoppingLists();
  }, []);

  const handleViewList = (listId) => {
    const selected = lists.find((list) => list.id === listId);
    setSelectedList(selected);
  };

  const handleDeleteList = async (listId) => {
    try {
      await api.deleteShoppingList(listId);
      setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
      setSelectedList(null);
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  const handleCreateList = async (listName) => {
    try {
      const newList = await api.createShoppingList({ name: listName, owner: 'Current User', items: [] });
      setLists((prevLists) => [...prevLists, newList]);
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  const handleEditListName = async (listId, newName) => {
    try {
      await api.updateShoppingList(listId, { name: newName });
      setLists((prevLists) =>
        prevLists.map((list) => (list.id === listId ? { ...list, name: newName } : list))
      );
    } catch (error) {
      console.error('Error updating list name:', error);
    }
  };

  const handleAddRemoveItem = async (listId, itemName, action) => {
    try {
      if (action === 'add') {
        const newItem = await api.addItemToList(listId, { name: itemName, resolved: false });
        setLists((prevLists) =>
          prevLists.map((list) =>
            list.id === listId ? { ...list, items: [...list.items, newItem] } : list
          )
        );
      } else if (action === 'remove') {
        await api.removeItemFromList(listId, itemName);
        setLists((prevLists) =>
          prevLists.map((list) =>
            list.id === listId ? { ...list, items: list.items.filter((item) => item.id !== itemName) } : list
          )
        );
      }
    } catch (error) {
      console.error('Error adding/removing item:', error);
    }
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ShoppingLists
            lists={lists}
            onDeleteList={handleDeleteList}
            onViewList={handleViewList}
            onCreateList={handleCreateList}
          />
        </Route>
        <Route path="/list/:id">
          {({ match }) => {
            const listId = parseInt(match.params.id, 10);
            const selectedList = lists.find((list) => list.id === listId);
            return selectedList ? (
              <ShoppingListDetail
                list={selectedList}
                onEditListName={(newName) => handleEditListName(selectedList.id, newName)}
                onAddRemoveMember={() => {}}
                onLeaveList={() => {}}
                onAddRemoveItem={(itemName, action) => handleAddRemoveItem(selectedList.id, itemName, action)}
                onSetItemResolved={() => {}}
              />
            ) : (
              <p>List not found</p>
            );
          }}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
