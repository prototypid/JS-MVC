import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultView.js";
import paginationView from "./views/paginationView.js";

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
    resultView.renderSpinner();
    const query = searchView.getQuery();

    if (!query) return;

    await model.loadSearchResults(query);

    resultView.render(model.getSearchResultspage());

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (page) {
  resultView.render(model.getSearchResultspage(page));
  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addEventHandler(renderRecipe);
  searchView.addEventHandler(searchForRecipes);
  paginationView.addEventHandler(controlPagination);
};

init();

// hmr
if (module.hot) {
  module.hot.accept();
}
