import { cart } from "../data/cart.js";

let productsHTML = "";

products.forEach((products) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img
          class="product-image"
          src="${products.image}"
        />
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${products.name}
      </div>

      <div class="product-rating-container">
        <img
          class="product-rating-stars"
          src="images/ratings/rating-${products.rating.stars * 10}.png"
        />
        <div class="product-rating-count link-primary">${
          products.rating.count
        }</div>
      </div>

      <div class="product-price">$${(products.priceCents / 100).toFixed(
        2
      )}</div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${products.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-message-${products.id}"
      data-product-id="${products.id}">
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${products.id}">
        Add to Cart
      </button>
    </div>
  `;
});

// Insert generated product HTML into the page
document.querySelector(".js-products-grid").innerHTML = productsHTML;

const addedMessageTimeouts = {};

// Set up the event listeners for each "Add to Cart" button
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;
    productId;

    // Update the cart based on the selected quantity
    let matchingItem;

    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    const quantitySelector = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    const quantity = Number(quantitySelector.value);

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }

    // Update the cart quantity display
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

    // Show the "Added to Cart" message
    const addedMessage = document.querySelector(
      `.js-added-message-${productId}`
    );
    if (!addedMessage) {
      console.error(
        `No added message element found for product ID: ${productId}`
      );
      return;
    }

    // Make the "Added" message visible
    addedMessage.classList.add("added-to-cart-visible");

    // Clear any existing timeout for this product
    if (addedMessageTimeouts[productId]) {
      clearTimeout(addedMessageTimeouts[productId]);
    }

    // Set a new timeout to hide the message after 2 seconds
    const timeoutId = setTimeout(() => {
      addedMessage.classList.remove("added-to-cart-visible");
    }, 2000);

    // Store the timeout ID for this product
    addedMessageTimeouts[productId] = timeoutId;
  });
});
