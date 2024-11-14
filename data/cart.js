export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

const addedMessageTimeouts = {};

export function addToCart(productId) {
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
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
}

export function addToCartMessage(productId) {
  // Show the "Added to Cart" message
  const addedMessage = document.querySelector(`.js-added-message-${productId}`);
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
