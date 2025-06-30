import React, { useState } from "react";
import "./App.css";
import RecipeCard from "./components/RecipeCard";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); 
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await res.json();

      if (data.meals) {
        setRecipes(data.meals);
        setError("");
      } else {
        setRecipes([]);
        setError("No recipes found. Try a different keyword.");
      }
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("Something went wrong!");
    }
  };

  const isVeg = (category) => {
    const nonVeg = ["Beef", "Chicken", "Lamb", "Goat", "Pork", "Seafood"];
    return !nonVeg.includes(category);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    if (filter === "veg") return isVeg(recipe.strCategory);
    if (filter === "nonveg") return !isVeg(recipe.strCategory);
    return true;
  });

  return (
    <div className="App">
  <div className="app-header-box">
  <img src="/applogo.png" alt="App Logo" className="header-logo" />
  <span className="header-text">Let's Cook</span>
</div>


      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Filter Buttons */}
      {recipes.length > 0 && (
        <div className="filter-buttons">
          <button onClick={() => setFilter("all")}>🍽 All</button>
          <button onClick={() => setFilter("veg")}>🟢 Veg</button>
          <button onClick={() => setFilter("nonveg")}>🔴 Non-Veg</button>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      <div className="recipes">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default App;


