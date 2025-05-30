import React, { useState } from "react";
import "./App.css";
import avocadoToastImg from "./assets/avocado_toast.jpg";

/*
  PRIMARY COLORS (from requirements):

  --primary:   #FFA07A  [Light Salmon, used for buttons, highlights]
  --secondary: #FFF5EE  [Seashell, used for background, cards]
  --accent:    #8B4513  [SaddleBrown, used for titles, icons]
  Layout: Light/white background, colorful headers, grid cards, sidebar filter.
*/

/**
 * Example static recipes dataset.
 * In production, this would be fetched from an API or provided as props.
 */
const RECIPES = [
  {
    id: 1,
    title: "Classic Pancakes",
    category: "Breakfast",
    ingredient: "Flour",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    ingredients: [
      "1 cup flour",
      "2 tbsp sugar",
      "2 tsp baking powder",
      "1/2 tsp salt",
      "1 cup milk",
      "1 egg",
      "2 tbsp melted butter"
    ],
    instructions: [
      "Mix dry ingredients together.",
      "Whisk in milk, egg, and melted butter.",
      "Heat a skillet, pour batter, cook until bubbles form and flip.",
      "Serve warm with syrup."
    ]
  },
  {
    id: 2,
    title: "Spaghetti Carbonara",
    category: "Dinner",
    ingredient: "Pasta",
    image: "https://images.unsplash.com/photo-1519864600265-c3da1b67a651?auto=format&fit=crop&w=400&q=80",
    ingredients: [
      "200g spaghetti",
      "100g pancetta",
      "2 large eggs",
      "50g grated parmesan",
      "Black pepper",
      "Salt"
    ],
    instructions: [
      "Cook spaghetti in salted water.",
      "Fry pancetta until crisp.",
      "Whisk eggs and parmesan together.",
      "Drain pasta, combine quickly with pancetta and remove from heat.",
      "Mix in egg-cheese mixture stirring rapidly.",
      "Serve immediately, topped with pepper and extra parmesan."
    ]
  },
  {
    id: 3,
    title: "Chocolate Chip Cookies",
    category: "Dessert",
    ingredient: "Chocolate",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
    ingredients: [
      "2 1/4 cups flour",
      "1 tsp baking soda",
      "1 tsp salt",
      "1 cup butter",
      "3/4 cup sugar",
      "3/4 cup brown sugar",
      "2 eggs",
      "2 cups chocolate chips"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "Cream together butter and sugars.",
      "Add eggs, then dry ingredients.",
      "Fold in chocolate chips.",
      "Drop by spoonfuls onto a baking tray.",
      "Bake 9-12 minutes until golden."
    ]
  },
  {
    id: 4,
    title: "Avocado Toast",
    category: "Breakfast",
    ingredient: "Avocado",
    image: avocadoToastImg,
    ingredients: [
      "2 slices wholegrain bread",
      "1 ripe avocado",
      "Salt, pepper, chili flakes",
      "Optional: poached egg"
    ],
    instructions: [
      "Toast the bread.",
      "Mash the avocado with salt and pepper.",
      "Spread on toast, top with chili flakes and optional poached egg."
    ]
  },
  {
    id: 5,
    title: "Chicken Stir-fry",
    category: "Lunch",
    ingredient: "Chicken",
    image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
    ingredients: [
      "1 chicken breast, sliced",
      "Mixed vegetables",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil",
      "1 clove garlic, minced"
    ],
    instructions: [
      "Heat oil in a wok or pan.",
      "Stir-fry garlic and chicken until browned.",
      "Add vegetables, cook until just tender.",
      "Stir in soy sauce, serve hot."
    ]
  },
];

/**
 * Extract unique categories and main ingredients from recipe list for filter options.
 */
function getUnique(field, recipes) {
  return Array.from(new Set(recipes.map((r) => r[field]))).sort();
}
// PUBLIC_INTERFACE
function RecipeVaultAppContainer() {
  // Filters: You can select "All" (default), or narrow by category/ingredient
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedIngredient, setSelectedIngredient] = useState("All");
  // Selected recipe for detail view
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  // Prepare filter values
  const categories = ["All", ...getUnique("category", RECIPES)];
  const ingredients = ["All", ...getUnique("ingredient", RECIPES)];

  // Filter logic: Show all if All, else filter by match
  const filteredRecipes = RECIPES.filter((recipe) => {
    const categoryMatch = selectedCategory === "All" || recipe.category === selectedCategory;
    const ingredientMatch = selectedIngredient === "All" || recipe.ingredient === selectedIngredient;
    return categoryMatch && ingredientMatch;
  });

  // Find the selected recipe for detail
  const selectedRecipe = RECIPES.find((r) => r.id === selectedRecipeId);

  return (
    <div className="rv-app-bg">
      <nav className="rv-navbar">
        <div className="rv-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="rv-logo" style={{ color: "var(--rv-accent)" }}>
            <span className="rv-logo-symbol" style={{ fontSize: 28 }}>🍳</span> RecipeVault
          </div>
          <span style={{ color: "var(--rv-accent)", fontWeight: 500, fontSize: 16 }}>
            Curated Recipes
          </span>
        </div>
      </nav>

      <main style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: 94, minHeight: "75vh" }}>
        {/* Sidebar for filters */}
        <aside className="rv-sidebar" aria-label="Search filters">
          <section>
            <h3 className="rv-filter-title">Filter by Category</h3>
            <ul className="rv-filter-list">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    className={`rv-filter-btn${cat === selectedCategory ? " active" : ""}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h3 className="rv-filter-title">Filter by Main Ingredient</h3>
            <ul className="rv-filter-list">
              {ingredients.map((ing) => (
                <li key={ing}>
                  <button
                    className={`rv-filter-btn${ing === selectedIngredient ? " active" : ""}`}
                    onClick={() => setSelectedIngredient(ing)}
                  >
                    {ing}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </aside>

        <section className="rv-main-content">
          {/* Detail view */}
          {selectedRecipe ? (
            <RecipeDetail
              recipe={selectedRecipe}
              onBack={() => setSelectedRecipeId(null)}
            />
          ) : (
            <RecipeList
              recipes={filteredRecipes}
              onRecipeSelect={(id) => setSelectedRecipeId(id)}
            />
          )}
        </section>
      </main>
      <footer className="rv-footer">
        <span>RecipeVault &copy; 2024 &mdash; Created with <span style={{ color: "var(--rv-accent)", fontWeight: 600 }}>React</span></span>
      </footer>
    </div>
  );
}

// PUBLIC_INTERFACE
function RecipeList({ recipes, onRecipeSelect }) {
  // Grid of recipe cards
  if (recipes.length === 0) {
    return <div style={{
      padding: "48px 0", fontSize: 18, color: "var(--rv-accent)", textAlign: "center"
    }}>No recipes found with selected filters.</div>;
  }
  return (
    <div className="rv-grid">
      {recipes.map((recipe) => (
        <div
          className="rv-card"
          key={recipe.id}
          tabIndex={0}
          onClick={() => onRecipeSelect(recipe.id)}
          aria-label={`View details of ${recipe.title}`}
          style={{ cursor: "pointer" }}
          onKeyDown={(e) => { if (e.key === "Enter") onRecipeSelect(recipe.id); }}
        >
          <div className="rv-card-img" style={{ backgroundImage: `url(${recipe.image})` }} />
          <div className="rv-card-content">
            <h4 className="rv-card-title">{recipe.title}</h4>
            <div className="rv-card-meta">{recipe.category} &bull; {recipe.ingredient}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
function RecipeDetail({ recipe, onBack }) {
  return (
    <div className="rv-detail">
      <button className="rv-back-btn" onClick={onBack} aria-label="Back to recipe list">← Back</button>
      <div className="rv-detail-img" style={{ backgroundImage: `url(${recipe.image})` }} />
      <h2 className="rv-detail-title">{recipe.title}</h2>
      <div className="rv-detail-meta">{recipe.category} &bull; Main: {recipe.ingredient}</div>
      <h3>Ingredients</h3>
      <ul className="rv-detail-list">
        {recipe.ingredients.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
      <h3>Instructions</h3>
      <ol className="rv-detail-list">
        {recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
      </ol>
    </div>
  );
}

// Default export: wrap container for App entrypoint
export default RecipeVaultAppContainer;
