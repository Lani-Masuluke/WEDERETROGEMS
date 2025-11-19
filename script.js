document.addEventListener("DOMContentLoaded", function () {
  let cart = [];

  // Handle increase, decrease, reset, and add to cart for each product
  const products = document.querySelectorAll(".product.card");

  products.forEach((product) => {
    const increaseBtn = product.querySelector(".increaseBtn");
    const decreaseBtn = product.querySelector(".decreaseBtn");
    const resetBtn = product.querySelector(".resetBtn");
    const addToCartBtn = product.querySelector(".addToCartBtn");
    const countLabel = product.querySelector(".countLabel");
    const price = parseFloat(product.querySelector("p").textContent.replace("R", ""));
    const productName = product.querySelector("h3").textContent;

    let quantity = 0;

    // Increase quantity
    increaseBtn.addEventListener("click", () => {
      quantity++;
      countLabel.textContent = quantity;
    });

    // Decrease quantity
    decreaseBtn.addEventListener("click", () => {
      if (quantity > 0) {
        quantity--;
        countLabel.textContent = quantity;
      }
    });

    // Reset quantity
    resetBtn.addEventListener("click", () => {
      quantity = 0;
      countLabel.textContent = quantity;
    });

    // Add to Cart
    addToCartBtn.addEventListener("click", () => {
      if (quantity > 0) {
        const existingProduct = cart.find((item) => item.productName === productName);
        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          cart.push({ productName, price, quantity });
        }
        updateCartModal();
        alert(`${productName} added to cart!`);
        quantity = 0;
        countLabel.textContent = quantity;
      } else {
        alert("Please select a quantity before adding to cart.");
      }
    });
  });

  // Cart modal
  const viewCartBtn = document.getElementById("viewcartBtn");
  const cartModal = document.getElementById("cart-modal");
  const closeCartBtn = document.getElementById("closecart");
  const cartItemsList = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const totalItemsElement = document.getElementById("total-items");
  const checkoutBtn = document.getElementById("checkoutBtn");

  viewCartBtn.addEventListener("click", () => {
    cartModal.style.display = "block";
    updateCartModal();
  });

  closeCartBtn.addEventListener("click", () => {
    cartModal.style.display = "none";
  });

  function updateCartModal() {
    // Clear previous items
    cartItemsList.innerHTML = "";

    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach((item) => {
      const cartItem = document.createElement("li");
      cartItem.textContent = `${item.productName} (x${item.quantity}) - R${(item.price * item.quantity).toFixed(2)}`;
      cartItemsList.appendChild(cartItem);

      totalPrice += item.price * item.quantity;
      totalItems += item.quantity;
    });

    totalPriceElement.textContent = `Total: R${totalPrice.toFixed(2)}`;
    totalItemsElement.textContent = `Total Items: ${totalItems}`;

    checkoutBtn.style.display = cart.length > 0 ? "inline-block" : "none";
  }

  // Payment form modal
  const paymentFormModal = document.getElementById("paymentFormModal");
  const paymentForm = document.getElementById("paymentForm");

  checkoutBtn.addEventListener("click", () => {
    paymentFormModal.style.display = "block";
  });

  paymentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Payment submitted successfully!");
    cart = [];
    updateCartModal();
    paymentFormModal.style.display = "none";
  });

  // Close payment modal
  const closePaymentBtn = paymentFormModal.querySelector("button[onclick]");
  closePaymentBtn.addEventListener("click", () => {
    paymentFormModal.style.display = "none";
  });
});
