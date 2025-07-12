// Checks if you're running the front-end locally or on any non-local host domain,
// then sets the correct BASE_URL (local backend or live).
const BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : 'https://fullstack-blog-production-1bf9.up.railway.app';

// Extracts the blog post ID from the URL string which will be used to 
// fetch the correct post from the backend.
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

// Grabs the elements on the page to update later
const titleEl = document.getElementById("postTitle");
const authorEl = document.getElementById("postAuthor");
const dateEl = document.getElementById("postDate");
const contentEl = document.getElementById("postContent");
const deleteBtn = document.getElementById("deleteBtn");

// Points to the correct backend and fetches the specific post using its ID
fetch(`${BASE_URL}/posts/${postId}`)
  .then(res => {
    if (!res.ok) throw new Error("Post not found");
    return res.json();
  })
  .then(post => {
    titleEl.textContent = post.title;
    authorEl.textContent = post.author;
    dateEl.textContent = new Date(post.date).toLocaleString();
    contentEl.textContent = post.content;
  })
  .catch(err => {
    titleEl.textContent = "Post not found.";
    contentEl.textContent = "";
    deleteBtn.style.display = "none";
  });

// Add a link to edit this post on the linked edit page
const editLink = document.createElement('a');
editLink.href = `edit.html?id=${postId}`;
editLink.textContent = "✏️ Edit Post";
document.getElementById("postContainer").appendChild(editLink);

// Handle deletion of the post
deleteBtn.addEventListener("click", () => {
  const confirmed = confirm("Are you sure you want to delete this post?");
  if (!confirmed) return;

  // Sends a delete request to the backend for that specific post
  fetch(`${BASE_URL}/posts/${postId}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message || "Post deleted.");
      window.location.href = "index.html";
    })
    .catch(err => {
      alert("Failed to delete post.");
    });
});
