document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("postForm");
    const postsContainer = document.getElementById("postsContainer");
  
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
  
    const renderPosts = () => {
      postsContainer.innerHTML = "";
  
      posts.forEach((post, index) => {
        const postEl = document.createElement("div");
        postEl.className = "post";
  
        postEl.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.content}</p>
          <form class="commentForm" data-index="${index}">
            <input type="text" placeholder="Write a comment..." required />
            <button type="submit">Comment</button>
          </form>
          <div class="comments">
            ${post.comments.map(comment => `<div class="comment">${comment}</div>`).join("")}
          </div>
        `;
  
        postsContainer.appendChild(postEl);
      });
  
      document.querySelectorAll(".commentForm").forEach(form => {
        form.addEventListener("submit", e => {
          e.preventDefault();
          const index = form.getAttribute("data-index");
          const input = form.querySelector("input");
          const comment = input.value.trim();
  
          if (comment) {
            posts[index].comments.push(comment);
            localStorage.setItem("posts", JSON.stringify(posts));
            renderPosts();
          }
        });
      });
    };
  
    form.addEventListener("submit", e => {
      e.preventDefault();
  
      const title = document.getElementById("title").value.trim();
      const content = document.getElementById("content").value.trim();
  
      if (title && content) {
        posts.unshift({ title, content, comments: [] });
        localStorage.setItem("posts", JSON.stringify(posts));
        form.reset();
        renderPosts();
      }
    });
  
    renderPosts();
  });
  