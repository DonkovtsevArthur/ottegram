const DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
const DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
const DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
const THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
const HIDDEN_DETAIL_CLASS = "hidden-detail";
const TINY_EFFECT_CLASS = "is-tiny";
const ESC_KEY = 27;

const setDetails = (imageUrl, titleText) => {
  let detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imageUrl);

  let detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
};

const imageFromThumb = thumbnail => {
  return thumbnail.getAttribute("data-image-url");
};
const titleFromThumb = thumbnail => {
  return thumbnail.getAttribute("data-image-title");
};

const setDetailsFromThumb = thumbnail => {
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
};

const addThumbClickHandler = thumb => {
  thumb.addEventListener("click", e => {
    e.preventDefault();
    setDetailsFromThumb(thumb);
    showDetails();
  });
};
const getThumbnailsArray = () => {
  let thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  let thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
};

const hiddenDetails = () => {
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
};
const showDetails = () => {
  const frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(() => {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
};

const addKeyPressHandler = () => {
  document.body.addEventListener("keyup", e => {
    e.preventDefault();
    console.log(e.keyCode);
    if (e.keyCode === ESC_KEY) {
      hiddenDetails();
    }
  });
};

const initializeEvents = () => {
  const thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();
};

initializeEvents();
