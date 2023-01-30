import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, onItemsUpdated }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearchInputText] = useState("");

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function onSearchChange(event) {
    setSearchInputText(event.target.value)
    console.log(event.target.value)
  }

  function onItemFormSubmit(newItem) {
    onItemsUpdated(newItem)
  }

  const itemsToDisplay = items
  .filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  })
  .filter((item) => {
    if (search === "") {
      return true
    }

    if (item.name.toLowerCase().includes(search.toLowerCase())) {
      return true
    }
  })

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit}/>
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={onSearchChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
