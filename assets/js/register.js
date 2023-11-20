$(function () {
  // Local Storage

  function getUsers() {
    const localStorageUsers = localStorage.getItem("users");
    return localStorageUsers ? JSON.parse(localStorageUsers) : [];
  }
  function setUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  $("#button-register").click(function () {
    let formValid = true;
    const users = getUsers();

    const formValues = {
      fullname: $("#fullname").val(),
      email: $("#email").val(),
      password: $("#password").val(),
      repassword: $("#re-password").val(),
    };

    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    // Nếu ko  có Obj fullName
    if (!formValues.fullname) {
      formValid = false;
      alert("Bạn chưa nhập họ tên");
      return;
    }

    // Nếu ko  có email
    if (
      !formValues.email ||
      !validateEmail(formValues.email) ||
      users.find((user) => user.email === formValues.email)
    ) {
      formValid = false;
      alert("Email không hợp lệ");
      return;
    }

    // Nếu ko  có Obj Password
    if (!formValues.password) {
      formValid = false;
      alert("Bạn chưa đặt mật khẩu");
      return;
    }

    // Nếu ko  có Obj repassword
    if (
      !formValues.repassword ||
      formValues.repassword !== formValues.password
    ) {
      formValid = false;
      alert("Mật khẩu chưa khớp");
      return;
    }

    // Register Succes
    if (formValid) {
      alert("Register Succes");
      delete formValues.repassword;
      console.log("formValues", formValues);
      users.push(formValues);
      setUsers(users);
      window.location.href = "login.html";
    } else {
      alert("Register fail");
    }
  });

  // Reset form
  $("#button-reset").click(function () {
    $("#form-register")[0].reset();
  });

  $("#button-login").click(function () {
    const users = getUsers();

    const email = $("#email").val();
    const password = $("#password").val();
    if (email === "" || password === "") {
      alert("Đăng nhập thất bại");
    }
    if (email && password) {
      if (
        users.find((user) => user.email === email && user.password === password)
      ) {
        alert("Đăng nhập thành công");
        window.location.href = "index.html";
      } else {
        alert("Đăng nhập thất bại");
      }
    }
  });
});
