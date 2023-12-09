import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getShoppingLists, createShoppingList, deleteShoppingList } from '../services/api';

const ShoppingLists = ({ showArchived }) => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const fetchedLists = await getShoppingLists();
        setLists(fetchedLists);
      } catch (error) {
        console.error('Error fetching shopping lists:', error);
      }
    };

    fetchLists();
  }, []);

  const handleCreateList = async () => {
    if (newListName.trim() !== '') {
      try {
        const newList = await createShoppingList({ name: newListName, owner: 'Current User' });
        setLists((prevLists) => [...prevLists, newList]);
        setNewListName('');
        setShowCreateForm(false);
      } catch (error) {
        console.error('Error creating shopping list:', error);
      }
    } else {
      alert('Please enter a valid shopping list name.');
    }
  };

  const handleCancelCreate = () => {
    setNewListName('');
    setShowCreateForm(false);
  };

  const handleDeleteConfirmation = async (listId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this shopping list?');
    if (isConfirmed) {
      try {
        await deleteShoppingList(listId);
        setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
      } catch (error) {
        console.error('Error deleting shopping list:', error);
      }
    }
  };

  const filteredLists = showArchived ? lists : lists.filter((list) => !list.archived);

  return (
    <div>
      <h2>Shopping Lists</h2>
      <div className="shopping-lists">
        {filteredLists.map((list) => (
          <div key={list.id} className="shopping-list-tile">
            <Link to={`/list/${list.id}`}>
              <h3>{list.name}</h3>
            </Link>
            <p>Owner: {list.owner}</p>
            <button onClick={() => handleDeleteConfirmation(list.id)}>Delete</button>
          </div>
        ))}
      </div>
      <button onClick={() => setShowCreateForm(true)}>Create New Shopping List</button>

      {showCreateForm && (
        <div className="modal">
          <h3>Create New Shopping List</h3>
          <input
            type="text"
            placeholder="Enter Shopping List Name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <button onClick={handleCreateList}>Create</button>
          <button onClick={handleCancelCreate}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ShoppingLists;
