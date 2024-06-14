import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/fashion-items')
      .then(response => setItems(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleLike = () => {
    const itemId = items[currentItem].id;
    axios.post('http://localhost:5000/api/like', { userId: 'user123', itemId })
      .then(() => setCurrentItem(currentItem + 1))
      .catch(error => console.error(error));
  };

  const handleDislike = () => {
    const itemId = items[currentItem].id;
    axios.post('http://localhost:5000/api/dislike', { userId: 'user123', itemId })
      .then(() => setCurrentItem(currentItem + 1))
      .catch(error => console.error(error));
  };

  return (
    <div className="App">
      <h1>Fashion Tinder</h1>
      {items.length > 0 && currentItem < items.length ? (
        <div className="card">
          <img src={items[currentItem].imageUrl} alt={items[currentItem].name} />
          <h2>{items[currentItem].name}</h2>
          <p>{items[currentItem].description}</p>
          <button onClick={handleLike}>Like</button>
          <button onClick={handleDislike}>Dislike</button>
        </div>
      ) : (
        <p>No more items</p>
      )}
    </div>
  );
}

export default App;
