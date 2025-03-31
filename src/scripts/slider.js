//
const sliderWrapper = document.querySelector(".slider-wrapper");
const sliderSlides = document.querySelectorAll(".slider-slide");
const sliderSlidesTotal = sliderSlides.length;

const nextButton = document.querySelector(".slider-control__next");
const prevButton = document.querySelector(".slider-control__prev");
const pauseButton = document.querySelector(".slider-control__pause");
const paginationContainer = document.querySelector(".slider-pagination");

//
let currentSlide = 0;

//
for (let i = 0; i < sliderSlidesTotal; i++) {
  const dot = document.createElement("div");
  dot.classList.add("slider-pagination__dot");
  paginationContainer.appendChild(dot);
}

const paginationDots = document.querySelectorAll(".slider-pagination__dot");

//
paginationDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    sliderRender(currentSlide);
  });
});

//
function sliderRender(index) {
  sliderWrapper.style.transform = `translateX(-${index * 100}%)`;

  paginationDots.forEach((dot, i) => {
    dot.classList.toggle("slider-pagination__dot--active", i === index);
  });
}

//
function sliderSwipeNext() {
  currentSlide = (currentSlide + 1) % sliderSlidesTotal;
  sliderRender(currentSlide);
}

//
function sliderSwipePrev() {
  currentSlide = (currentSlide - 1 + sliderSlidesTotal) % sliderSlidesTotal;
  sliderRender(currentSlide);
}

//
nextButton.addEventListener("click", sliderSwipeNext);
prevButton.addEventListener("click", sliderSwipePrev);

//
let autoplayInterval = null;

function startAutoplay() {
  autoplayInterval = setInterval(sliderSwipeNext, 2400);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
  autoplayInterval = null;
}

//
function toggleAutoplay() {
  if (autoplayInterval === null) {
    startAutoplay();
    pauseButton.textContent = "||";
  } else {
    stopAutoplay();
    pauseButton.textContent = "▶";
  }
}

pauseButton.addEventListener("click", toggleAutoplay);

//
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    sliderSwipeNext();
  } else if (event.key === "ArrowLeft") {
    sliderSwipePrev();
  }
});

//
sliderRender(currentSlide);
startAutoplay();

//
let startX = 0;
let endX = 0;

//
sliderWrapper.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

sliderWrapper.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

//
sliderWrapper.addEventListener("mousedown", (e) => {
  startX = e.clientX;
});

sliderWrapper.addEventListener("mouseup", (e) => {
  endX = e.clientX;
  handleSwipe();
});

function handleSwipe() {
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      sliderSwipeNext();
    } else {
      sliderSwipePrev();
    }
  }
}
