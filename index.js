let list = document.querySelectorAll(".products .sanpham");
let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");
//
openShopping.addEventListener("click", () => {
  body.classList.add("active");
});
closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

const cart = [];

function addToCart(index) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const post = posts[index];
  const exist = cart.find((x) => x.id === post.id);
  if (exist) {
    exist.quantity += 1;
  } else {
    cart.push({ ...post, quantity: 1 });
  }
  renderCart();
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  listCard.innerHTML = cart
    .map(
      (item) => `
    <div class="item" data-key="${item.id}">
    <img src="${item.image}" alt="">
    <div class="content">
        <h3>${item.name}</h3>
        <span>${item.price}đ</span>
    </div>
    <div class="quantity">
        <button class="minus" onclick="minusQuantity(${item.id})">-</button>
        <input type="text" value="${item.quantity}" disabled>
        <button class="plus" onclick="plusQuantity(${item.id})">+</button>
    </div>
    <button class="remove" onclick="removeItem(${item.id})">Xóa</button>
</div>
    `
    )
    .join("");
  total.innerHTML = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  quantity.innerHTML = cart.reduce((total, item) => total + item.quantity, 0);
}

function removeItem(id) {
  const index = cart.findIndex((x) => x.id === id);
  cart.splice(index, 1);
  renderCart();
  localStorage.setItem("cart", JSON.stringify(cart));
}

//
list.forEach((sanpham) => {
  sanpham.addEventListener("addToCart", function (event) {
    if (event.target.classList.contains("add")) {
      var sanphamNew = sanpham.cloneNode(true);
      let checkIsset = false;

      let listCart = document.querySelectorAll(".cart .sanpham");
      listCart.forEach((cart) => {
        if (
          cart.getAttribute("data-key") == sanphamNew.getAttribute("data-key")
        ) {
          checkIsset = true;
          cart.classList.add("danger");
          setTimeout(function () {
            cart.classList.remove("danger");
          }, 1000);
        }
      });
      if (checkIsset == false) {
        document.querySelector(".listCart").appendChild(sanphamNew);
      }
    }
  });
});
function Remove($key) {
  let listCart = document.querySelectorAll(".cart .item");
  listCart.forEach((item) => {
    if (item.getAttribute("data-key") == $key) {
      item.remove();
      return;
    }
  });
}

loadPosts("");

const searchFormElement = document.getElementById("search-form");
const searchInputElement = document.getElementById("search-input");

searchFormElement.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(searchInputElement.value);
  const searchValue = searchInputElement.value;
  loadPosts(searchValue);
});

function loadPosts(searchValue) {
  const productsElement = document.getElementById("products");
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  productsHTML = "";
  for (let [index, post] of posts.entries()) {
    console.log(post);
    if (post.name.toLowerCase().includes(searchValue.toLowerCase())) {
      if (document.querySelector("#products")) {
        productsHTML += `
              <div class="sanpham" data-key="7">
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
                          <li><a href="#" data-tip="Add to Wishlist"><i class="fas fa-heart"></i></a></li>
                          <li><a href="#" data-tip="Add to Cart" onclick="addToCart(${index})"><i class="fa fa-shopping-cart"></i></a></li>
                      </ul>
                  </div>
                  <div class="product-content">
                      <h3 class="title"><a href="#">${post.name}</a></h3>
                      <span class="price">${post.price}đ</span>
                  </div>
              </div>
          </div>
          `;
      }
    }
  }
  productsElement.innerHTML = productsHTML;
}
