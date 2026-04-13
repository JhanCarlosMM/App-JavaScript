import { Product } from "./Product.js";
import { UI } from "./UI.js";

// DOM Events - Form Submit
document
  .getElementById("product-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value,
      price = document.getElementById("price").value,
      year = document.getElementById("year").value;
      const product = new Product(name, price, year);

    const ui = new UI();

    // Input Validation
    if (name === "" || price === "" || year === "") {
      ui.showMessage("Por favor completa todos los campos", "danger");
      return;
    }

    // Save Product
    ui.addProduct(product);
    ui.showMessage("Producto Agregado Exitosamente", "success");
    ui.resetForm();
  });
