import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'development' ? '' : 'http://your-api-url';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const mockData = {
  shoppingLists: [
    { id: 1, name: 'Groceries', items: [{ id: 1, name: 'Ham', resolved: false }] },
    { id: 2, name: 'Electronics', items: [{ id: 2, name: 'Laptop', resolved: false }] },
  ],
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getShoppingLists = async () => {
  await delay(1000); 
  return mockData.shoppingLists;
};

export const createShoppingList = async (listData) => {
  await delay(1000); 
  const newList = { id: mockData.shoppingLists.length + 1, ...listData, items: [] };
  mockData.shoppingLists.push(newList);
  return newList;
};

export const updateShoppingList = async (listId, updatedListData) => {
  await delay(1000);
  mockData.shoppingLists = mockData.shoppingLists.map((list) =>
    list.id === listId ? { ...list, ...updatedListData } : list
  );
  return mockData.shoppingLists.find((list) => list.id === listId);
};

export const deleteShoppingList = async (listId) => {
  await delay(1000);
  mockData.shoppingLists = mockData.shoppingLists.filter((list) => list.id !== listId);
};

export const addItemToShoppingList = async (listId, itemName) => {
  await delay(1000);
  const newItem = { id: mockData.shoppingLists.length + 1, name: itemName, resolved: false };
  mockData.shoppingLists = mockData.shoppingLists.map((list) =>
    list.id === listId ? { ...list, items: [...list.items, newItem] } : list
  );
  return newItem;
};

export const removeItemFromShoppingList = async (listId, itemId) => {
  await delay(1000); 
  mockData.shoppingLists = mockData.shoppingLists.map((list) =>
    list.id === listId ? { ...list, items: list.items.filter((item) => item.id !== itemId) } : list
  );
};

export default api;
