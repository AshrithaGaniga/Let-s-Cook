import React from "react";
import "./RecipeCard.css";

const RecipeCard = ({ recipe }) => {

  const isNonVeg = ["Beef", "Chicken", "Goat", "Lamb", "Pork", "Seafood"].includes(
    recipe.strCategory
  );


  const getCourseLabel = () => {
    const tags = (recipe.strTags || "").toLowerCase();
    const name = recipe.strMeal.toLowerCase();
    const category = recipe.strCategory.toLowerCase();

    if (tags.includes("dessert") || name.includes("cake") || category.includes("dessert")) {
      return "Dessert";
    }

    if (
      tags.includes("starter") ||
      tags.includes("appetizer") ||
      tags.includes("side") ||
      name.includes("soup") ||
      category.includes("starter")
    ) {
      return "Starter";
    }

    return "Main Course"; 
  };


  const getCourseIcon = () => {
    const label = getCourseLabel();

    if (label === "Dessert") return "/dessert.png";
    if (label === "Starter") return "/starter.png";
    return "/maincourse.png";
  };

  return (
    <div className="card">
      {/* Meal Image */}
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="meal-img" />

      {/* Meal Name */}
      <h2>{recipe.strMeal}</h2>

      {/* Veg / Non-Veg Info */}
      <div className="info-line">
        <img
          src={isNonVeg ? "/nonveg.png" : "/veg.png"}
          alt={isNonVeg ? "Non-Veg" : "Veg"}
          className="icon"
        />
        <span>{isNonVeg ? "Non-Vegetarian" : "Vegetarian"}</span>
      </div>

      {/* Course Type Info */}
      <div className="info-line">
        <img
          src={getCourseIcon()}
          alt={getCourseLabel()}
          className="icon"
        />
        <span><strong>Course:</strong> {getCourseLabel()}</span>
      </div>

      {/* Origin Info */}
      <div className="info-line">
        <span>🌍 <strong>Origin:</strong> {recipe.strArea}</span>
      </div>

      {/* Recipe Link */}
      {(recipe.strSource || recipe.strYoutube) && (
        <a
          href={recipe.strSource || recipe.strYoutube}
          target="_blank"
          rel="noopener noreferrer"
          className="view-link"
        >
          🔗 View Full Recipe
        </a>
      )}
    </div>
  );
};

export default RecipeCard;
