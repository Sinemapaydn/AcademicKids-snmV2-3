// FoodSearch.js
import React, { useState } from "react";
import "./FoodSearch.css";
import { searchFood } from "./Server/Api";

const FoodSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setError("Please enter a food name");
      return;
    }

    try {
      const { parsed, hints } = await searchFood(searchTerm);
      const results = [...parsed, ...hints];
      if (results.length === 0) {
        setError("No food found");
      } else {
        setSearchResults(results);
        setError("");
        window.history.pushState({}, "", `/foods/${searchTerm}`);
      }
    } catch (error) {
      setSearchResults([]);
      setError(error.message);
    }
  };

  return (
    <div className="food-search-container">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Enter food name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div>
        {searchResults.length > 0 && (
          <div>
            {searchResults.map((result, index) => (
              <div key={index} className="food-item">
                <h3>{result.food.label}</h3>
                <p>Calories: {result.food.nutrients.ENERC_KCAL}</p>
                <p>Protein: {result.food.nutrients.PROCNT}g</p>
                <p>Fat: {result.food.nutrients.FAT}g</p>
                <p>Carbs: {result.food.nutrients.CHOCDF}g</p>
                <p>Fiber: {result.food.nutrients.FIBTG}g</p>
                {result.food.image && <img className="img-size" src={result.food.image} alt={result.food.label} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodSearch;
