document.addEventListener("DOMContentLoaded", () => {
  // Grab initial data set
  const data = DmdNTWSettings_5531c97f9a924834a27e41be8f361496;
  const {
    curWeekDate,
    dates,
    pageItems
  } = data;

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
  let showNumber2 = document.getElementById("page-2");
  let showPageCount = document.getElementById("pageCount");
  let showPageCount2 = document.getElementById("pageCount-2");
  let showDate = document.getElementById("date");

  let buttonBack = document.getElementById("back");
  let buttonBack2 = document.getElementById("back-2");
  let buttonForward = document.getElementById("forward");
  let buttonForward2 = document.getElementById("forward-2");

  // Create event listeners

  buttonBack.addEventListener("click", () => {
    changePage("back");
  });
  buttonForward.addEventListener("click", () => {
    changePage("forward");
  });
  buttonBack2.addEventListener("click", () => {
    changePage("back");
  });
  buttonForward2.addEventListener("click", () => {
    changePage("forward");
  });

  // Functional Logic

  const makePageObj = () => {
    let pageObj = {};
    let currentIndex = 0;
    let dataSet = state.selectedData;
    let comicCount = state.comicsPerPage();

    for (let i = 0; i < state.numberOfPages(); i++) {
      let pageItems = dataSet.slice(currentIndex, comicCount);
      pageObj[i] = pageItems;
      dataSet.splice(0, comicCount);
      // currentIndex += state.numberOfPages();

    }
    return (state.pageObj = pageObj);
  };

  function changePage(direction) {
    if (direction === "back" && state.selectedPage > 0) {
      state.selectedPage -= 1;
      setButtonState();
      return drawComics(state.selectedPage);
    }

    if (
      direction === "forward" &&
      state.selectedPage + 1 < state.numberOfPages()
    ) {
      state.selectedPage += 1;
      setButtonState();
      return drawComics(state.selectedPage);
    }
  }

  // Button State
  // Checks for start page or end page
  // Then Changes look of buttons
  function setButtonState() {
    // Removes off class
    buttonBack.classList.remove("off");
    buttonBack2.classList.remove("off");
    buttonForward.classList.remove("off");
    buttonForward2.classList.remove("off");

    // Checks for start page
    if(state.selectedPage === 0) {
      buttonBack.classList.add("off");
      buttonBack2.classList.add("off");
    }

    // Checks for end page
    if(state.selectedPage + 1 === state.numberOfPages()) {
      buttonForward.classList.add("off");
      buttonForward2.classList.add("off");
    }
  }

  // Writes comic data to the page. 
  function drawComics(page) {
    showDisplay.innerHTML = "";

    showDate.innerHTML = data.curWeekDate;
    showNumber.innerHTML = state.selectedPage + 1;
    showPageCount.innerHTML = state.numberOfPages();

    showNumber2.innerHTML = state.selectedPage + 1;
    showPageCount2.innerHTML = state.numberOfPages();
    

    //src="https://previewsworld.com/SiteImage/CatalogThumbnail/${comic.StockNo}"
    //${titleLink}
    // ${comic.Title}
    //${comic.Publisher}

    state.pageObj[`${page}`].map((comic, index) => {
      const titleLink = comic.Title.split(' ').join('-').replace(/[|#&;$%@"<>()+,]/g, "");

      showDisplay.innerHTML += `
        <a href="https://www.previewsworld.com/Catalog/${comic.DiamdNo}" class="product-card new-releases-item" target="_blank">
          <div class="product-card__image-container">
            <div class="product-card__image-wrapper">
              <div style="max-width: 100%;" data-image-id="${comic.StockNo}" data-image-with-placeholder-wrapper>
                <div class="new-releases--comic-img">
                  <img class="lazyload" src="https://previewsworld.com/SiteImage/CatalogThumbnail/${comic.StockNo}" alt="${comic.Title}" >
                </div>
                <div class="placeholder-background--animation" data-image-placeholder></div>
              </div>
            </div>
          </div>
          <div class="product-card__info">
            <div class="product-card__brand">${comic.Publisher}</div>
            <div class="product-card__name">${comic.Title}</div>
          </div>
          <div class="product-card__overlay">
            <span class="btn product-card__overlay-btn">View</span>
          </div>
        </a>`;
    });
  }

  // Start up script
  makePageObj();
  drawComics(0);
  setButtonState();
});