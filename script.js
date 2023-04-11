// make the fact-form visible when share a fact button is clicked
console.log("script.js loaded");
const CATEGORIES = [
  { name: "Motor tech", color: "#f87171" },
  { name: "Battery tech", color: "#60a5fa" },
  { name: "Charging", color: "#34d399" },
  { name: "EV performance", color: "#f59e0b" },
  { name: "Body design", color: "#6b7280" },
  { name: "Safety", color: "#9f7aea" },
  { name: "Range & efficiency", color: "#10b981" },
  { name: "Sustainability", color: "#22d3ee" },
  { name: "Industry news", color: "#a3e635" },
  { name: "Customer stories", color: "#f472b6" },
  { name: "Maintenance", color: "#fbbf24" },
  { name: "Partnerships", color: "#4b5563" },
  { name: "Company news", color: "#8b5cf6" },
  { name: "Investor relations", color: "#dc2626" },
  { name: "Government updates", color: "#059669" }
  ];

// select DOM elements
const shareFactButton = document.querySelector(".shareFactButton");
const form = document.querySelector(".factForm");
const postList = document.querySelector(".postList");
// create DOM elements
postList.innerHTML = "";

function decodeBase64(str) {
  let decodedString = "";
  const base64Chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let char1, char2, char3;
  let enc1, enc2, enc3, enc4;
  let i = 0;

  // Remove any non-base64 characters and padding from the input string
  str = str.replace(/[^A-Za-z0-9+/=]/g, "");

  // Decode the input string into a decoded string
  while (i < str.length) {
    enc1 = base64Chars.indexOf(str.charAt(i++));
    enc2 = base64Chars.indexOf(str.charAt(i++));
    enc3 = base64Chars.indexOf(str.charAt(i++));
    enc4 = base64Chars.indexOf(str.charAt(i++));

    char1 = (enc1 << 2) | (enc2 >> 4);
    char2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    char3 = ((enc3 & 3) << 6) | enc4;

    decodedString += String.fromCharCode(char1);

    if (enc3 !== 64) {
      decodedString += String.fromCharCode(char2);
    }
    if (enc4 !== 64) {
      decodedString += String.fromCharCode(char3);
    }
  }

  return decodedString;
}
const encAKey = "ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKemRYQmhZbUZ6WlNJc0luSmxaaUk2SW1ocGMySm9kbUZpYkdSMmVYVnViWEZ2ZG1WcUlpd2ljbTlzWlNJNkltRnViMjRpTENKcFlYUWlPakUyTnprNU9EUXdNekVzSW1WNGNDSTZNVGs1TlRVMk1EQXpNWDAuZE1qQU92b1kwOF9DYU5UN3ZoOUVlN0dTMURGdTBkU3EyM2w1VUQtSUtURQ=="
const apiKey = decodeBase64(encAKey);

loadPosts();
// function to load posts from api
async function loadPosts() {
  const res = await fetch("https://hisbhvabldvyunmqovej.supabase.co/rest/v1/posts", {
    headers: {
      apikey: apiKey,
      authorization : "Bearer " + apiKey,
    },
  });
  const data = await res.json();
  createPostList(data);
}


function getCategoryColor(categoryName) {
  const category = CATEGORIES.find((c) => c.name === categoryName);
  return category ? category.color : "#121212";
}


function createPostList(dataArray) {
  const htmlArray = dataArray.map(
    (post) => ` <div class="post-wrapper">
    <li class = "post">
    <img class="post-image" src=${post.image_src} alt="Post ${post.id} Image">
  <p>
      ${post.text}
      <a class = "source" href=${post.source}>show full post</a>
  </p>
  <span class="tag" style="background-color: ${getCategoryColor(
    post.category
  )}">${post.category}</span>

  </li> </div>`
  );
  console.log(htmlArray);
  const htmlString = htmlArray.join("");
  postList.insertAdjacentHTML("afterbegin", htmlString);

}
//createPostList(initialPosts);
// toggle form visibility
shareFactButton.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    shareFactButton.textContent = "Cancel";
  } else {
    form.classList.add("hidden");
    shareFactButton.textContent = "Share a fact";
  }
});
