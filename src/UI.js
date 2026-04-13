/**
 * User Interface Class
 */
export class UI {
  /**
   * Add a New Product 
   * @param {Object} product A new product Object
   */
  addProduct(product) {
    // Add to left section - Product cards with grid layout
    const productList = document.getElementById("product-list");
    const cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.innerHTML = `
      <div class="card-body">
        <div class="product-info">
          <strong>Producto:</strong> ${product.name}
        </div>
        <div class="product-info">
          <strong>Precio:</strong> $${product.price}
        </div>
        <div class="product-info">
          <strong>Año:</strong> ${product.year}
        </div>
        <button class="btn btn-danger delete-btn" data-id="${Date.now()}">Eliminar</button>
      </div>
    `;
    productList.insertBefore(cardElement, productList.firstChild);

    // Add to right section - Summary list
    const summary = document.getElementById("products-summary");
    const summaryItem = document.createElement("div");
    const itemId = `summary-${Date.now()}`;
    summaryItem.id = itemId;
    summaryItem.className = "product-item";
    summaryItem.innerHTML = `
      <div class="product-item-info">
        <div class="product-item-name">${product.name}</div>
        <div class="product-item-details">
          <span><strong>$</strong>${product.price}</span>
          <span><strong>Año:</strong> ${product.year}</span>
        </div>
      </div>
      <button class="btn btn-danger product-item-delete delete-summary-btn" data-item-id="${itemId}">Eliminar</button>
    `;
    
    // Remove empty message if exists
    const emptyMsg = summary.querySelector('.empty-message');
    if (emptyMsg) {
      emptyMsg.remove();
    }
    
    summary.insertBefore(summaryItem, summary.firstChild);

    // Add event listeners for delete buttons
    cardElement.querySelector('.delete-btn').addEventListener('click', () => {
      this.deleteProduct(cardElement, itemId);
    });

    summaryItem.querySelector('.delete-summary-btn').addEventListener('click', () => {
      this.deleteProduct(cardElement, itemId);
    });
  }

  /**
   * Reset Form Values
   */
  resetForm() {
    document.getElementById("product-form").reset();
  }

  /**
   * Delete Product from both lists
   */
  deleteProduct(cardElement, summaryId) {
    // Remove from card list
    if (cardElement) {
      cardElement.remove();
    }
    
    // Remove from summary list
    const summaryItem = document.getElementById(summaryId);
    if (summaryItem) {
      summaryItem.remove();
    }

    // Check if both lists are empty
    const productList = document.getElementById("product-list");
    const summary = document.getElementById("products-summary");
    
    if (productList.children.length === 0 && summary.children.length === 0) {
      const emptyMsg = document.createElement("p");
      emptyMsg.className = "empty-message";
      emptyMsg.textContent = "No hay productos agregados";
      summary.appendChild(emptyMsg);
    }

    this.showMessage("Producto Eliminado Exitosamente", "success");
  }

  showMessage(message, cssClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass} mt-2`;
    div.appendChild(document.createTextNode(message));

    // Show in The DOM
    const container = document.querySelector(".container");
    const app = document.querySelector("#App");

    // Insert Message in the UI
    container.insertBefore(div, app);

    // Remove the Message after 3 seconds
    setTimeout(function () {
      div.remove();
    }, 3000);
  }
}
