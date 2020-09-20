document.addEventListener("DOMContentLoaded", () => {
  // Grab initial data set
  const data = DmdNTWSettings_5531c97f9a924834a27e41be8f361496;
  const { curWeekDate, dates, pageItems } = data;

  let state = {
    columns: 3,
    rows: 3,
    selectedPage: 0,
    selectedData: pageItems[dates.indexOf(curWeekDate)],
    amountOfComics: pageItems[dates.indexOf(curWeekDate)].length,
    comicsPerPage: function () {
      return this.rows * this.columns;
    },
    numberOfPages: function () {
      return Math.ceil(this.amountOfComics / this.comicsPerPage());
    },
  };

  // Grab dom elements
  let showDisplay = document.getElementById("display");
  let showNumber = document.getElementById("page");
  let showPageCount = document.getElementById("pageCount");
  let buttonBack = document.getElementById("back");
  let buttonForward = document.getElementById("forward");

  // Create event listeners

  buttonBack.addEventListener("click", () => {
    changePage("back");
  });
  buttonForward.addEventListener("click", () => {
    changePage("forward");
  });

  // Functional Logic

  const makePageObj = () => {
    let pageObj = {};
    let currentIndex = 0;
    for (let i = 0; i < state.numberOfPages(); i++) {
      let pageItems = state.selectedData.slice(
        currentIndex,
        currentIndex + state.comicsPerPage()
      );
      pageObj[i] = pageItems;
      currentIndex += state.numberOfPages();
    }
    return (state.pageObj = pageObj);
  };

  function changePage(direction) {
    if (direction === "back" && state.selectedPage > 0) {
      state.selectedPage -= 1;
      return drawComics(state.selectedPage);
    }

    if (
      direction === "forward" &&
      state.selectedPage + 1 < state.numberOfPages()
    ) {
      state.selectedPage += 1;
      return drawComics(state.selectedPage);
    }
  }

  function drawComics(page) {
    showDisplay.innerHTML = "";

    showNumber.innerHTML = state.selectedPage + 1;
    showPageCount.innerHTML = state.numberOfPages();

    state.pageObj[`${page}`].map((comic, index) => {
      showDisplay.innerHTML += `<div class="comic-item">
        <div>
          <img border="0" src="https://previewsworld.com/SiteImage/CatalogThumbnail/${comic.StockNo}" style="width:120px;vertical-align:middle;">
        </div>
        <div> ${comic.Title} </div>
        <div> ${comic.Publisher} </div>
      </div>`;
    });
  }

  // Start up script
  makePageObj();
  drawComics(0);
});
