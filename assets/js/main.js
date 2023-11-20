$(document).ready(function () {
  $("body").append($("<div>").load("navigation.html"));
  $("body").append($("<div>").load("banner.html"));
  $("body").append($("<div>").load("product.html"));

  function loadProducts(products) {
    let listProduct = "";

    function fetchProduct() {
      $.get(
        "https://645643ff2e41ccf169182280.mockapi.io/products",
        function (data, status) {
          console.log("data"), console.log("status");
        }
      );
    }

    products.forEach((product) => {
      listProduct += `
      <li>
      <a href="#" data-id="${product.id}">
        <div class="item-img">
          <img
            src="${product.imageName}"
            alt=""
          />
        </div>
        <h3>${product.name}</h3>
        <strong class="price">
        ${product.price}
          
        </strong>
        <p class="vote-txt">
          <b>${product.star}</b
          ><img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAB+CAMAAADV/VW6AAAAaVBMVEX////tihnshADtiRTsgADsggDrfQDtiA3shgD87eH99O3759f//fv++/f40rX53cf1v5ftjSLvl0P2yKLukDD64tD0u5DwoFn3z6/xqWz1w5v2yaf417zulDrzs3vwnVTxpmHvl0rzt4abrr/OAAAEiElEQVRoge2b2aLiIAyGW8LWzVqt1aqty/s/5OB2Ru1GOEDnYnJ/zsefhDQEDIL/ZmpxFMWzwZMaKIU6mYe+5hLCECRfz0Hf0fBpdOefHhfwwkPhPwGWJPwxsvSOp+Gbcd/0d/H+5WcC3vEgMq/4PQs/jO190uMSPvFQ+kz+NQ2/jHqsPR3xfuV/R95v9NOiI17JD30l/4F06WrvHzzhSY94JZ/4oR96In+Pvhf5WTftX8nvI/q7zp5/GfUgP1sNiFfyV+7lD4v30fakQ5H3E/1d755/GXEtv6/gvckv3NIXA3v+ZWzhFD8u3rX8xUjaP4w6lJ8O7/kf+Q73/nFSvJJ/dEVPV2IaL1apI7yOeIfyGw3xSn7jhr4YLXh/zc3ez/qbnK45OfJEeq5/uD+yy06TimjTFZ9UkZX8z+IoX7enldD1/NP/BFandp1HsWEc0uzGrS8Fo4wIFPu5AkHUnxaX+raKDOGLOD9UdUM4ZVKAAfhjESAko5w0dXXIx49hSu+iOoecUyJN9I4uQ0hCOQ/P1UL54lvvRnHLAoiZnzGrUAgoSrWKzcsX2bJhSvBv/YxYBChXsGZ/90J8ot7AH4ug25sDzpq11L6xcxDkE92bU34etHI+vLwG5Xz0EJpgRrriB80saf+kr4JqtsRXZ7IqSObLfCCqL6hm47PqVvZarQbWvtH2UfQrPgedV68vXjWDflr9/eJevcefvdH96/+kB8Hea/y7V38Hj3zeMwI6ePN///hx7an8Do2+/egfnj0ePcSfjxz/c+748ws8H6Yr/bizHJpOJkYfR+mQD3Jy8HJ01/UDHfX8wzau+EA303TFx0wS9E0QLbrK/8IBXxQann/qD63zRaip/WaJ7f0HAvW8JgKr+kWInHVFpUW+KNGTtsQeX5QGD5s21r6/ujvu066W+ORqQg8iS59/ajZiTUMruw9Cs/mqxs2NFt7weqP3jYQBvjDDx5ZaL272pmVjK/WM9l2wtnTwY2YvimyN3GRrQk+3lqqu2JrkXmxr5mX2niqyV/NNyl5u7cil0+B2zFbiG6Z+bW3WLGsD/MVeu3HB03ueBJqaSeonNns9fLNl85aD4VN/aXHUYvCK+GzxkkWe0Xg7vcbD8K95MrunHOxFdmJ1ykawqa/7UEMTj33OYTPxDVL/rBV7EHo33uKMxOscMSSF0wmoxg6FEEdPp5tsSdt7GxG1GgvguH4rmcKLJ/y+gJpOhYrjUn83XvEF2X78v2Q7MQ1juEeco3ebwC6db0i+YmPZQqo+yqDVw2KA9o/IjsXIPFKgGp5ssMkG2gyWkEU5uABoMGU3Hgi9gu9Gcjg7lEMhYJiGJ+ltsoGU+wkR8bLsHwlSTOr3Jj4hlYaEuCJ9aYtK/WUXL/lV03/xlXfrEMNU/c4zdMlaRPDiln0vAPV4/WuoJVmNHYrWXwvAjbfeD9eCnAymksnpvRAiP3nRz5UW0JXJCTG4FcKfMgAc6b2E3TeQoI0h/L6A5v4tAsLQ7ouvJaVk+8tHr4stobTU3TOfC4ii+NcPPtNZfyn8j9sfsMFDKIDh8R4AAAAASUVORK5CYII="
            alt=""
          />
        </p>
      </a>
    </li>
      
      `;
      $("#products ul").html(listProduct);

      $("#products ul li a").click(function () {
        const id = $(this).data("id");
        console.log("Sản phẩm: ", id);
      });
    });
  }

  $.ajax({
    url: "https://645643ff2e41ccf169182280.mockapi.io/products",
    method: "GET",
    success: function (data) {
      console.log("Data recieve: ", data);
      loadProducts(data);
    },
    error: function () {
      console.log("Error loading data");
    },
  });
});
