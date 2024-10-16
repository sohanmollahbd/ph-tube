console.log("Video script added");

//  second to hours and minutes
function getTimeString(time) {
  // get hour and rest seconds
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${hour} hour ${minute} minute ${remainingSecond} second ago`;
}

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

// load category videos
const loadCategoryVideos = (id) => {
  // alert(id);

  // fetch the data
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.category))
    .catch((error) => console.log(error));
};

// const cardDemo = {
//   "category_id": "1001",
//   "video_id": "aaaa",
//   "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//   "title": "Shape of You",
//   "authors": [
//       {
//           "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//           "profile_name": "Olivia Mitchell",
//           "verified": ""
//       }
//   ],
//   "others": {
//       "views": "100K",
//       "posted_date": "16278"
//   },
//   "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }

const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos");
  videosContainer.innerHTML = "";
  // no contents available
  if (videos.length == 0) {
    videosContainer.classList.remove("grid");
    videosContainer.innerHTML = `
    <div class="min-h-[300px] flex  flex-col gap-5 justify-center items-center ">
      <img src="assets/icon.png" />

      <h2 class="text-center text-xl font-bold">
        NO contents here in this category
      </h2>

    </div>
    `;
    return;
  } else {
    videosContainer.classList.add("grid");
  }

  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
        <div class="-z-10">
          <figure class="h-[200px] relative">
        <img class="h-full w-full object-cover"
          src=${video.thumbnail}
          alt="Shoes" />
          ${
            video.others.posted_date?.length == 0
              ? ""
              : `<span class="absolute text-xs right-2 bottom-2 bg-black p-1 rounded text-white">${getTimeString(
                  video.others.posted_date
                )}</span>`
          }
          
      </figure>
      <div class="px-0 py-2 flex gap-2">
        <div>
        <img class="w-10 h-10 rounded-full object-cover" src="${
          video.authors[0].profile_picture
        }" />
        </div>
        <div>
        <h2 class="font-bold">${video.title}</h2>
        <div class="flex items-center gap-2">
          <P class="text-gray-400">${video.authors[0].profile_name}</P>
          ${
            video.authors[0].verified === true
              ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" />`
              : ""
          }
        </div>
        <P></P>
        </div>
        
      </div>
        </div>
    `;
    videosContainer.append(card);
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
    const buttonContainer = document.createElement("div");

    buttonContainer.innerHTML = `
    <button onclick ="loadCategoryVideos(${item.category_id})" class="btn">
    ${item.category}
    </button>
    `;
    // button.classList = "btn";
    // button.innerText = item.category;
    // button.onclick = () =>{
    //   alert('Hello')
    // }
    //  add button to categoryContainer
    categoryContainer.append(buttonContainer);
  });
};

loadCategories();
loadVideos();
