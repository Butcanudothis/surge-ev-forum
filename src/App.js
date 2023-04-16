import React, { useState,useEffect } from "react";
import "./style.css";
import supabase from "./supabase";


const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesLikes: 24,
    votesMindBlown: 9,
    votesNegatives: 4,
    createdIn: 2021,
    image_src:
      "https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png",
  },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState(initialFacts);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState("all");
  useEffect(() => {
    async function getPosts() {
      setIsLoading(true);

      let query = supabase.from("posts")
      .select("*");
      if (currentCategory !== "all") {
        query = query.eq("category", currentCategory);
      }
      const { data: posts, error } = await query.order("votesLikes", { ascending: false }).limit(1000);

        if (!error) {
        setPosts(posts);
        } else {
          alert("Error loading posts");
        }
        setIsLoading(false);
    }
    getPosts();
  }, [currentCategory]);



  return (
    <>
      {/* header */}
      <Header showForm={showForm} setShowForm={setShowForm} />

      {showForm ? <NewPostForm setPosts={setPosts} setShowForm={setShowForm} /> : null}

      <main className="main">
      <CategoryFilter setCurrentCategory={setCurrentCategory}/>
        {isLoading ? loader() : <PostList posts={posts} setPosts={setPosts}/>}
      </main>
      <Footer />
    </>
  );
}

function loader() {
  return <p className="message">Loading...</p>;
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
  { name: "Motor Tech", color: "#f87171" },
  { name: "Battery Tech", color: "#60a5fa" },
  { name: "Charging", color: "#34d399" },
  { name: "EV Performance", color: "#f59e0b" },
  { name: "Body Design", color: "#6b7280" },
  // { name: "Safety", color: "#9f7aea" },
  // { name: "Range & Efficiency", color: "#10b981" },
  { name: "Sustainability", color: "#22d3ee" },
  // { name: "Industry News", color: "#a3e635" },
  { name: "Customer Stories", color: "#f472b6" },
  // { name: "Maintenance", color: "#fbbf24" },
  { name: "Partnerships", color: "#4b5563" },
  // { name: "Company News", color: "#8b5cf6" },
  // { name: "Investor Relations", color: "#dc2626" },
  // { name: "Government Updates", color: "#059669" },
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
  const [uploading, setUploading] = useState(false);
  async function handleSubmit(event) {
    event.preventDefault();
    console.log("submit");
    // check if data is valid
   if (text && category && isValidHttpUrl(source) && isValidHttpUrl(image) && text.length <= 200) {

    setUploading(true);
    const { data: newPost, error } = await supabase
    .from("posts")
    .insert({text: text, source:source, category:category, image_src: image})
    .select();
    setUploading(false);

    console.log(newPost);
    // create new post object
    // add new post to the UI: add the post to state
    if (!error) setPosts((posts) => [newPost[0], ...posts]);
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
        disabled={uploading}
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
        disabled={uploading}
      />
      <input
        type="text"
        placeholder="Image source"
        value={image}
        onChange={(event) => {
          setImage(event.target.value);
        }}
        disabled={uploading}
      />
      <select
        value={category}
        onChange={(event) => {
          setCategory(event.target.value);
        }}
        disabled={uploading}
      >
        <option value="">Choose Category</option>
        {CATEGORIES.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <button className="btn btn-large"
      disabled={uploading}
      >Post</button>
    </form>
  );
}

function CategoryFilter({setCurrentCategory}) {
  return (
    <aside className="category-filter">
      <ul>
        <li>
          <button className="btn btn-all-categories"
          onClick={() => setCurrentCategory("all")}
          >All</button>
        </li>
        {CATEGORIES.map((category) => (
          <li key={category.name} className="categories">
            <button
              className="btn btn-categories"
              style={{ backgroundColor: category.color }}
              onClick={() => setCurrentCategory(category.name)}
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

function PostList({ posts ,setPosts}) {

  if (posts.length === 0) {
    return (
      <section className="message">
        <p>No posts to show. Create the first one!</p>
      </section>
    );
  }
  return (
    <section>
      <ul className="postList">
        {posts.map((post) => (
          <Post key={post.id} post={post} setPosts={setPosts}/>
        ))}
      </ul>
    </section>
  );
}

function Post({ post, setPosts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isPopular = post.votesLikes - post.votesNegatives >= 10;
  async function handleVotes(voteType) {
    setIsUpdating(true);
    const { data: updatedPost, error } =
    await supabase
      .from("posts")
      .update({ [voteType]: post[voteType] + 1 })
      .eq("id", post.id)
      .select();
    setIsUpdating(false);
    console.log(updatedPost);
    if(!error) setPosts((posts) => posts.map((p) => p.id === post.id ? updatedPost[0] : p));
  }

  return (
    <div className="post-wrapper">
      {" "}
      <li className="post">
        <img className="post-image" src={post.image_src} alt="Post"></img>
        <p>
          {post.text}
          <a className="source" href={post.source}>
            show full post
          </a>
        </p>
        <div className="post-info">
        {isPopular ? <span className="popular"> Popular 🔥</span> : null}
        <span
          className="tag"
          style={{ backgroundColor: getCategoryColor(post.category) }}
        >
          {post.category}
        </span>
        <div className="reactionButtons">
          <button onClick={()=>handleVotes("votesLikes")} disabled={isUpdating}
          >👍{post.votesLikes}</button>
          <button onClick={()=>handleVotes("votesMindBlown")} disabled={isUpdating}
          >🤯{post.votesMindBlown}</button>
          <button onClick={()=>handleVotes("votesNegatives")} disabled={isUpdating}
          >⛔️{post.votesNegatives}</button>
        </div>
        </div>
      </li> {" "}
    </div>

  );
}
function Footer() {
  return (
    <footer>
      <p>© 2023 Surge EV. All rights reserved.
      Built with ❤️ by Akshay Varma</p>
    </footer>
  );
}

export default App;
