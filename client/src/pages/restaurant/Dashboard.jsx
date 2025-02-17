import React from 'react'

function Dashboard() {
  return (
    <div><div class="category-filter">
    <select id="category-select">
      <option value="all">All Categories</option>
      <option value="starters">Starters</option>
      <option value="mains">Mains</option>
      <option value="desserts">Desserts</option>
      <option value="beverages">Beverages</option>
    </select>
  </div>

  <div class="menu-items-list">
   
    <div class="menu-item">
      <h4>Item Name</h4>
      <p>Price: $10</p>
      <button>Edit</button>
      <button>Delete</button>
    </div>
   
  </div>

 
  <div class="add-item-form">
    <input type="text" placeholder="Item Name" />
    <textarea placeholder="Item Description"></textarea>
    <input type="number" placeholder="Price" />
    <select>
      <option value="starters">Starters</option>
      <option value="mains">Mains</option>
      <option value="desserts">Desserts</option>
      <option value="beverages">Beverages</option>
    </select>
    <button>Save Item</button>
  </div>
</div>

  )
}

export default Dashboard

