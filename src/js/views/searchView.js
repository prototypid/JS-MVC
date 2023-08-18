class SearchView {
  #parentEl = document.querySelector(".search");

  getQuery() {
    const query = this.#parentEl.querySelector(".search__field").value;
    this.#clearInput();
    return query;
  }

  addEventHandler(cb) {
    this.#parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      cb();
    });
  }

  #clearInput() {
    this.#parentEl.querySelector(".search__field").value = "";
  }
}

export default new SearchView();
