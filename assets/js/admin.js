const api = `https://645643ff2e41ccf169182280.mockapi.io/products`;
function loadProduct(products) {
  let listProducts = "";

  products.forEach((product, index) => {
    listProducts += `
    <tr data-id=${product.id}>
          <th>${index + 1}</th>
          <th>${product.name}</th>
          <th>${product.price}</th>
          <th>${product.info}</th>
                          
          <th>${product.star}</th>
          <th><img src = ${product.imageName} width="55"> </th>
                            
            
          <th><button class="button btn-warning" id="button-edit" >Edit</button></th>
          <th><button class="button btn-danger" id="button-delete">Delete</button></th>
    </tr>
    `;
    $("#table-product tbody").html(listProducts);
  });
}
function getProcuct(id) {
  $.ajax({
    url: `${api}/${id}`,
    method: "GET",
    success: function (product) {
      updateForm(product);
      $("#modalEdit").modal("show");
    },
    error: function () {
      console.log("Error loading data");
    },
  });
}
function fetchProduct() {
  $.ajax({
    url: "https://645643ff2e41ccf169182280.mockapi.io/products",
    method: "GET",
    success: function (data) {
      loadProduct(data);
    },
    error: function () {
      console.log("Error loading data");
    },
  });
}

function addProduct(data) {
  $.ajax({
    url: "https://645643ff2e41ccf169182280.mockapi.io/products",
    method: "POST",
    data,
    success: function (data) {
      console.log("Data recieve: ", data);
      fetchProduct();
      $("#exampleModal").modal("hide");
      alert("Success");
    },
    error: function () {
      console.log("Error loading data");
    },
  });
}
function updateForm(product) {
  $('#form-edit-product input[name="name"]').val(product.name);
  $('#form-edit-product input[name="price"]').val(product.price);
  $('#form-edit-product input[name="info"]').val(product.info);
  $('#form-edit-product input[name="star"]').val(product.star);
  $('#form-edit-product input[name="imageName"]').val(product.imageName);
  $('#form-edit-product input[name="id"]').val(product.id);
}
$(function () {
  fetchProduct();

  // Add new product to API
  $("#button-add-product").click(function () {
    const formValues = $("#form-add-product")
      .serializeArray()
      .reduce((prev, curr) => ({ ...prev, [curr.name]: curr.value }), {});

    addProduct(formValues);

    console.log("formValues", formValues);
  });

  // Edit product
  $(document).on("click", "#button-edit", function () {
    const id = $(this).parents("tr").data("id");
    getProcuct(id);
  });
  // Upate product

  $("#button-edit-product").click(function () {
    const formValues = $("#form-edit-product")
      .serializeArray()
      .reduce((prev, curr) => ({ ...prev, [curr.name]: curr.value }), {});

    $.ajax({
      url: `${api}/${formValues.id}`,
      method: "PUT",
      data: formValues,
      success: function (data) {
        console.log("Data recieved: ", data);
        fetchProduct();
        alert("Sửa thành công");
        $("#modalEdit").modal("hide");
      },
      error: function () {
        console.log("Error loading data");
      },
    });
  });

  // Delete
  $(document).on("click", "#button-delete", function () {
    const isConfirmed = confirm("Bạn có chắc muốn xoá sản phẩm này?");
    const id = $(this).parents("tr").data("id");

    if (isConfirmed) {
      $.ajax({
        url: `${api}/${id}`,
        method: "DELETE",
        success: function (data) {
          fetchProduct();
          alert("Xoá thành công");
        },
        error: function () {
          console.log("Error loading data");
        },
      });
    }
  });
});
