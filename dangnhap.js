document.addEventListener("DOMContentLoaded", () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (document.querySelector("#login-form")) {
    document.querySelector("#login-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const username = e.target.username.value;
      const password = e.target.password.value;

      const user = users.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Đăng nhập thành công");
        window.location.href = "index.html";
      } else {
        alert("Tên đăng nhập hoặc mật khẩu không đúng");
      }
    });
  }
});