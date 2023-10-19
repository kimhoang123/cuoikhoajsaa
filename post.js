let products = [];
//-----------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  //danghinhanh
  const images = [];
  const fileInput = document.querySelector("#file-input");
  fileInput.addEventListener("change", (e) => {
    images.splice(0, images.length);
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        images.push(reader.result);
      };
    }
  });

  if (document.querySelector("#post-form")) {
    document.querySelector("#post-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const name = e.target.name.value;
      const price = e.target.price.value;

      posts.push({ name, price, images });
      localStorage.setItem("posts", JSON.stringify(posts));
      alert("Bài đăng đã được thêm");
      window.location.href = "post.html";
    });
  }

  if (document.querySelector("#products")) {
    const adminPostsContainer = document.querySelector("#products");
    adminPostsContainer.innerHTML = posts
      .map(
        (post, index) => `
            <div class="sanpham" data-key="">
              <div class="product-grid">
                  <div class="image">
                      <a href="#">
                          ${
                            post.images
                              ? post.images
                                  .map(
                                    (image, index) =>
                                      `<img class="pic-${
                                        index + 1
                                      }" src="${image}" width="100" height="100"/>`
                                  )
                                  .join("")
                              : ""
                          }
                      </a>
                      <ul class="social">
                          <li>
                            <button onclick="updatePost(${index})"><a href="#" data-tip="Add to Wishlist"><i class="fas fa-pencil"></i></a></button></li>
                            <li>
                            <button onclick="deletePost(${index})">
                            <a href="#" data-tip="Add to Cart" onclick="addToCart(${index})"><i class="fa fa-trash"></i></a></button>
                          </li>
                      </ul>
                  </div>
                  <div class="product-content">
                      <h3 class="title"><a href="#">${post.name}</a></h3>
                      <span class="price">${post.price}đ</span>
                  </div>
              </div>
          </div>
        `
      )
      .join("");
  }

  window.updatePost = (index) => {
    const name = prompt("Nhập tiêu đề mới:", posts[index].name);
    const price = prompt("Nhập nội dung mới:", posts[index].price);

    if (name && price) {
      posts[index] = { name, price };
      localStorage.setItem("posts", JSON.stringify(posts));
      window.location.reload();
    }
  };

  window.deletePost = (index) => {
    if (confirm("Bạn muốn xóa bài đăng này?")) {
      posts.splice(index, 1);
      localStorage.setItem("posts", JSON.stringify(posts));
      window.location.reload();
    }
  };
});
