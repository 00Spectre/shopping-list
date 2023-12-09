import React from 'react';

const ListItem = ({ item, onAddRemoveItem, onSetItemResolved }) => {
  return (
    <div>
      <span>{item.name}</span>
      {!item.resolved && <button onClick={onSetItemResolved}>Resolve</button>}
      <button onClick={onAddRemoveItem}>Remove Item</button>
    </div>
  );
};

export default ListItem;
