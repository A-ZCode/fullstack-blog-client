// Checks if you're running the front-end locally or on any non-local host domain,
// then sets the correct BASE_URL (local backend or live).
const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://fullstack-blog-production-1bf9.up.railway.app";

// Handles form submission when user clicks "submit".
document.getElementById("postForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = this.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = "Publishing...";

  // Grabs the values typed in the form fields and stores them in the const variables.
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const author = document.getElementById("author").value;

  // Iniitiates an HTTP request to the backend, targeting specifically /posts
  fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, author }),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("statusMsg").textContent =
        data.message || "Post created!";
      setTimeout(() => (window.location.href = "index.html"), 1500);
    })
    .catch((err) => {
      console.error("Error:", err);
      document.getElementById("statusMsg").textContent =
        "Failed to create post.";
      submitBtn.disabled = false;
      submitBtn.textContent = "Publish";
    });
});
