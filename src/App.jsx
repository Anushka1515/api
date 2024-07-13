import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('');
  const [articles, setArticles] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        location,
        gender,
      });
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div>
      <h1>Predict Articles by Location and Gender</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Gender:
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Predict</button>
      </form>
      {articles.length > 0 && (
        <div>
          <h2>Recommended Articles:</h2>
          <pre>{JSON.stringify(articles, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;




