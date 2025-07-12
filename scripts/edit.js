// Checks if you're running the front-end locally or on any non-local host domain,
// then sets the correct BASE_URL (local backend or live).
const BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : 'https://fullstack-blog-production-1bf9.up.railway.app';

// Extracts the posts ID from the browsers URL and assigns it to postId
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

//  These grab the form elements (title and content input fields),
// and the message area where we’ll display status updates like "Loaded!" or "Failed!"
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const statusMsg = document.getElementById("statusMsg");

// Loading existing post data
fetch(`${BASE_URL}/posts/${postId}`)
  .then(res => {
    if (!res.ok) throw new Error("Post not found");
    return res.json();
  })
  .then(post => {
    titleInput.value = post.title;
    contentInput.value = post.content;
  })
  .catch(err => {
    statusMsg.textContent = "Failed to load post.";
    console.error(err);
  });

// Handle form submission (update post) when the user submits the form
document.getElementById("editForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const updatedPost = {
    title: titleInput.value,
    content: contentInput.value
  };

  // Sends the updated post data to the backend using a PUT request
  fetch(`${BASE_URL}/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedPost)
  })
    .then(res => {
      if (!res.ok) throw new Error("Update failed");
      return res.json();
    })
    .then(data => {
      statusMsg.textContent = data.message || "Post updated successfully!";
      setTimeout(() => {
        window.location.href = `post.html?id=${postId}`;
      }, 1500);
    })
    .catch(err => {
      statusMsg.textContent = "Failed to update post.";
      console.error(err);
    });
});
