import React, { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import GroceryitemComponent from "./GroceryitemComponent";

const GroceryComponent = () => {
  const inputRef = useRef();
  const [error, setError] = useState("");

  const [item, setItem] = useState("");
  const [groceryItems, setGroceryItems] = useState([]);

  const handleAddItem = () => {
    if (item) {
      setGroceryItems([...groceryItems, { id: uuid(), name: item }]);
      setItem("");
      setError("");
    } else {
      setError("The input must not be empty");
      inputRef.current.focus();
    }
  };

  const handleEditItem = (id, newItem) => {
    const updatedGroceryItems = groceryItems.map((item) => {
      if (item.id === id) {
        return { ...item, name: newItem };
      }
      return item;
    });
    setGroceryItems(updatedGroceryItems);
  };

  const handleDeleteItem = (removeId) => {
    const filteredItems = groceryItems.filter((item) => item.id !== removeId);
    setGroceryItems(filteredItems);
  };

  return (
    <div className="grocery-buddy">
      <h1>Grocery Buddy</h1>
      <div className="input-section">
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter an Item..."
            value={item}
            onChange={(event) => setItem(event.target.value)}
          />
          <button onClick={handleAddItem} className="btn-add">
            Add Item
          </button>
        </div>
        <ul className="grocery-list">
          {groceryItems.map((item) => (
            <GroceryitemComponent
              key={item.id}
              item={item}
              handleEditItem={handleEditItem}
              handleDeleteItem={handleDeleteItem}
            />
          ))}
        </ul>
      </div>
      {error ? <p className="errors">{error}</p> : null}
    </div>
  );
};

export default GroceryComponent;
