import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";

///////////////////////////////////////

const renderRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();
    // Load recipe
    await model.loadRecipe(id);

    const { recipe } = model.state;

    // Rendering Recipe
    recipeView.render(recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const searchForRecipes = async function () {
  try {
    const query = searchView.getQuery();

    if (!query) return;

    await model.loadSearchResults(query);

    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};
const init = function () {
  recipeView.addEventHandler(renderRecipe);
  searchView.addEventHandler(searchForRecipes);
};

init();
