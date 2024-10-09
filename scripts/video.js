console.log("Video script added");

// 1. Fetch, load and show categories on html

// create loadCategories /GET: Categories
const loadCategories = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// GET: Videos
const loadVideos = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

const displayVideos = (videos) => {
   const videosContainer = document.getElementById("videos");
  videos.forEach((video) => {
console.log(video);
  });
};

// {
//    "category_id": "1001",
//    "category": "Music"
//  }

// create displayCategories
const displayCategories = (categories) => {
  // btn container niye asha
  const categoryContainer = document.getElementById("categories");

  categories.forEach((item) => {
    console.log(item);
    //create a button
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;

    //  add button to categoryContainer
    categoryContainer.append(button);
  });
};

loadCategories();
loadVideos();
