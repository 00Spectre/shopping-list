const mockData = [
    { id: 1, name: 'Groceries', items: [] },
    { id: 2, name: 'Electronics', items: [] },
  ];
  
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
  export const getShoppingLists = async () => {
    await delay(1000); 
    return mockData;
  };
  
  export const createShoppingList = async (listData) => {
    await delay(1000);
    const newList = { id: mockData.length + 1, ...listData, items: [] };
    mockData.push(newList);
    return newList;
  };
  
  export const updateShoppingList = async (listId, updatedData) => {
    await delay(1000); 
    const index = mockData.findIndex((list) => list.id === listId);
    if (index !== -1) {
      mockData[index] = { ...mockData[index], ...updatedData };
      return mockData[index];
    }
    throw new Error('Shopping list not found');
  };
  
  export const deleteShoppingList = async (listId) => {
    await delay(1000); 
    const index = mockData.findIndex((list) => list.id === listId);
    if (index !== -1) {
      const deletedList = mockData.splice(index, 1);
      return deletedList[0];
    }
    throw new Error('Shopping list not found');
  };
  
  export const addItemToShoppingList = async (listId, newItem) => {
    await delay(1000);
    const index = mockData.findIndex((list) => list.id === listId);
    if (index !== -1) {
      mockData[index].items.push(newItem);
      return mockData[index];
    }
    throw new Error('Shopping list not found');
  };
  
  export const removeItemFromShoppingList = async (listId, itemId) => {
    await delay(1000);
    const listIndex = mockData.findIndex((list) => list.id === listId);
    if (listIndex !== -1) {
      const itemIndex = mockData[listIndex].items.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        const deletedItem = mockData[listIndex].items.splice(itemIndex, 1);
        return { list: mockData[listIndex], deletedItem: deletedItem[0] };
      }
      throw new Error('Item not found in the shopping list');
    }
    throw new Error('Shopping list not found');
  };
  
  export default {
    getShoppingLists,
    createShoppingList,
    updateShoppingList,
    deleteShoppingList,
    addItemToShoppingList,
    removeItemFromShoppingList,
  };
  