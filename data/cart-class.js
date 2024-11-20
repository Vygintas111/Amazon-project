class Cart {
  cartItems;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId, quantity) {
    if (typeof quantity !== "number" || quantity <= 0) {
      console.log("Invalid quantity: ", quantity);
    }

    // Update the cart based on the selected quantity
    let matchingItem;

    this.cartItems.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    // const quantitySelector = document.querySelector(
    //   `.js-quantity-selector-${productId}`
    // );
    // const quantity = Number(quantitySelector.value);

    if (matchingItem) {
      matchingItem.quantity += quantity; // quantity
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: quantity, // quantity
        deliveryOptionId: "1",
      });
    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;

    this.saveToStorage();
  }

  addedMessageTimeouts = {};

  addToCartMessage(productId) {
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
  }

  calculateCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((item) => {
      cartQuantity += item.quantity;
    });
    return cartQuantity;
  }

  updateQuantity(productId, newQuantity) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.quantity = newQuantity;

    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}

const cart = new Cart("cart-oop");
const businessCart = new Cart("cart-business");

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);

// export function updateCartQuantity() {
//   // Update the cart quantity display

//   const cartQuantity = calculateCartQuantity();
//   document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

//   return cartQuantity;
// }
