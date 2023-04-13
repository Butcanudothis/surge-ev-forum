import React, { useState } from "react";
import "./style.css";

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
    image_src:
      "https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png",
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
    image_src:
      "https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png",
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
    image_src:
      "https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png",
  },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState(initialFacts);

  return (
    <>
      {/* header */}
      <Header showForm={showForm} setShowForm={setShowForm} />

      {showForm ? <NewPostForm setPosts={setPosts} setShowForm={setShowForm} /> : null}

      <main className="main">
        <CategoryFilter />
        <PostList posts={posts}/>
      </main>
      <Footer />
    </>
  );
}

function Header({ showForm, setShowForm }) {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="Surge EV logo" />
        <h1>Surge EV Updates</h1>
      </div>

      <button
        className="btn btn-large shareFactButton"
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close" : "Share an update"}
      </button>
    </header>
  );
}
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
  { name: "Government updates", color: "#059669" },
];
function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}


function NewPostForm({setPosts , setShowForm}) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log("submit");
    // check if data is valid
   if (text && category && isValidHttpUrl(source) && isValidHttpUrl(image) && text.length <= 200) {
    const newPost = {
      id: Math.floor(Math.random() * 1000),
      text: text,
      source: source,
      category: category,
      votesInteresting: 0,
      votesMindblowing: 0,
      votesFalse: 0,
      createdIn: new Date().getFullYear(),
      image_src: image,
    };

    // create new post object
    // add new post to the UI: add the post to state
   setPosts((posts) => [newPost, ...posts]);
    // reset input fields
    setText("");
    setCategory("");
    setSource("");
    setImage("");

    // close the form
    setShowForm(false);


  }
}

  return (
    <form className="factForm" onSubmit = {handleSubmit}
    >
      <input
        type="text"
        placeholder="Share your Thoughts"
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
      />
      <span style={
        text.length > 200 ? { color: "red" } : { color: "white" }
      }>{200 -text.length} characters</span>
      <input
        type="text"
        placeholder="Trustworthy source"
        value={source}
        onChange={(event) => {
          setSource(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Image source"
        value={image}
        onChange={(event) => {
          setImage(event.target.value);
        }}
      />
      <select
        value={category}
        onChange={(event) => {
          setCategory(event.target.value);
        }}
      >
        <option value="">Choose Category</option>
        {CATEGORIES.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <button className="btn btn-large">Post</button>
    </form>
  );
}

function CategoryFilter() {
  return (
    <aside>
      <ul>
        <li>
          <button className="btn btn-all-categories">All</button>
        </li>
        {CATEGORIES.map((category) => (
          <li key={category.name} className="categories">
            <button
              className="btn btn-categories"
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
function getCategoryColor(categoryName) {
  const category = CATEGORIES.find((c) => c.name === categoryName);
  return category ? category.color : "#121212";
}

function PostList({ posts }) {
  return (
    <section>
      <ul className="postList">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}

function Post({ post }) {
  return (
    <div className="post-wrapper">
      {" "}
      <li className="post">
        <img className="post-image" src={post.image_src} alt="Post"></img>
        <p>
          {post.text}
          <a className="source" href="http://google.com">
            show full post
          </a>
        </p>
        <span
          className="tag"
          style={{ backgroundColor: getCategoryColor(post.category) }}
        >
          {post.category}
        </span>
        <div className="reactionButtons">
          <button>👍{post.votesInteresting}</button>
          <button>🤯{post.votesMindblowing}</button>
          <button>⛔️{post.votesFalse}</button>
        </div>
      </li>{" "}
    </div>
  );
}
function Footer() {
  return (
    <footer>
      <p>© 2023 Surge EV. All rights reserved.</p>
      <p>built with ❤️ by Akshay Varma</p>
    </footer>
  );
}

export default App;
