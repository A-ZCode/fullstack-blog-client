// Checks if you're running the front-end locally or on any non-local host domain,
// then sets the correct BASE_URL (local backend or live).
const BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : 'https://fullstack-blog-production-1bf9.up.railway.app';

// Load the blog posts from the backend by making a GET request to the /posts endpoint
fetch(`${BASE_URL}/posts`)
  .then(res => res.json())
  .then(posts => {
    const container = document.getElementById('posts');
    if (posts.length === 0) {
      container.innerHTML = "<p>No posts yet.</p>";
      return;
    }

    posts.forEach(post => {
      const div = document.createElement('div');
      div.classList.add('post-preview');
      div.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content.substring(0, 100)}...</p>
        <a href="post.html?id=${post.id}">Read More</a>
      `;
      container.appendChild(div);
    });
  })
  .catch(err => {
    console.error("Failed to fetch posts:", err);
  });
