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
      const titleLink = comic.Title.split(' ').join('-').replace(/[|#&;$%@"<>()+,]/g, "");

      showDisplay.innerHTML += `
      <a href="/products/${titleLink}" class="product-card">
        <div class="product-card__image-container">
          <div class="product-card__image-wrapper">
          <img class="lazyload"
          data-src="https://previewsworld.com/SiteImage/CatalogThumbnail/${comic.StockNo}"
          data-widths="[100, 140, 180, 250, 305, 440, 610, 720, 930, 1080]"
      
          data-sizes="auto"
          data-parent-fit="contain"
          data-image
          alt="comic cover">
        
          </div>
        </div>
       
          <div>
          </div>
          <div> ${comic.Title} </div>
          <div> ${comic.Publisher} </div>

      </a>
      `;
    });
  }

  // Start up script
  makePageObj();
  drawComics(0);
});
