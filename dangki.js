document.addEventListener("DOMContentLoaded", () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (document.querySelector("#register-form")) {
    document.querySelector("#register-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const username = e.target.username.value;
      const password = e.target.password.value;

      if (users.find((user) => user.username === username)) {
        alert("Tên đăng nhập đã tồn tại");
        return;
      }

      users.push({ username, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Đăng ký thành công");
      window.location.href = "dangnhap.html";
    });
  }
});
