class CartItem {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.quantity = 1;
  }
}

class LocalCart {
  static key = "cartItems";
  static getLocalCartItems() {
    let cartMap = new Map();
    const cart = localStorage.getItem(LocalCart.key);
    if (cart === null || cart.length === 0) {
      return cartMap;
    }
    return new Map(Object.entries(JSON.parse(cart)));
  }
  static addItemToLocalCart(id, item) {
    let cart = LocalCart.getLocalCartItems();
    if (cart.has(id)) {
      let mapItem = cart.get(id);
      mapItem.quantity += 1;
      cart.set(id, mapItem);
    } else {
      cart.set(id, item);
    }
    localStorage.setItem(
      LocalCart.key,
      JSON.stringify(Object.fromEntries(cart))
    );
    updateCartUI();
  }
  static removeItemFromCart(id) {
    let cart = LocalCart.getLocalCartItems();
    if (cart.has(id)) {
      let mapItem = cart.get(id);
      if (mapItem.quantity > 1) {
        mapItem.quantity -= 1;
        cart.set(id, mapItem);
      } else {
        mapItem.quantity -= 1;
        cart.set(id, mapItem);
        decreaseProductQuantitytoZero(id);
        cart.delete(id);
      }
    }
    if (cart.length === 0) {
      localStorage.clear();
    } else
      localStorage.setItem(
        LocalCart.key,
        JSON.stringify(Object.fromEntries(cart))
      );
    updateCartUI();
    decreaseProductQuantity(id);
  }
}

const cartIcon = document.querySelector(".fa-cart-shopping");
const dropdownWindow = document.querySelector(".dropdown-window");
dropdownWindow.inWindow = 0;
const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", addItemFunction);
  btn.addEventListener("click", increaseProductQuantity);
});

function addItemFunction(e) {
  const id = e.target.parentElement.parentElement.getAttribute("data-id");
  const name = e.target.parentElement.children[0].textContent;
  var price = e.target.parentElement.children[3].textContent;
  var itemQuantity = e.target.parentElement.children[2].textContent;
  price = price.replace("Price: $", " ");
  const item = new CartItem(name, price);
  LocalCart.addItemToLocalCart(id, item);
  console.log(price);
}

cartIcon.addEventListener("mouseover", () => {
  if (dropdownWindow.classList.contains("hide"))
    dropdownWindow.classList.remove("hide");
});
cartIcon.addEventListener("mouseleave", () => {
  setTimeout(() => {
    if (dropdownWindow.inWindow === 0) {
      dropdownWindow.classList.add("hide");
    }
  }, 800);
});

dropdownWindow.addEventListener("mouseover", () => {
  dropdownWindow.inWindow = 1;
});

dropdownWindow.addEventListener("mouseleave", () => {
  dropdownWindow.inWindow = 0;
  dropdownWindow.classList.add("hide");
});

function updateCartUI() {
  const cartWrapper = document.querySelector(".cart-elements");
  cartWrapper.innerHTML = "";
  const items = LocalCart.getLocalCartItems();
  if (items === null) {
    return;
  }
  let count = 0;
  let total = 0;
  for (const [key, value] of items.entries()) {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    let price = value.quantity * value.price;
    price = Math.round(price * 100) / 100;
    count += value.quantity;
    total += price;
    total = Math.round(total * 100) / 100;
    cartItem.innerHTML = `
     <div class="product-details">
     <div class="item-name">${value.name}</div>
     <div class="item-quantity">Quantity: ${value.quantity}</div>
     <div class="item-price">Price: $${price}</div>
     </div>
     <div class="cancel"><i class="fa-solid fa-xmark"></i></div>
     `;

    cartItem.lastElementChild.addEventListener("click", () => {
      LocalCart.removeItemFromCart(key);
    });
    cartWrapper.append(cartItem);
  }

  if (count > 0) {
    cartIcon.classList.add("non-empty");
    let root = document.querySelector(":root");
    root.style.setProperty("--after-content", `"${count}"`);
    const subtotal = document.querySelector(".subtotal");
    subtotal.innerHTML = `Subtotal: $${total}`;
  } else {
    cartIcon.classList.remove("non-empty");
    const subtotal = document.querySelector(".subtotal");
    subtotal.innerHTML = `Subtotal: $0`;
  }
}

function increaseProductQuantity(e) {
  const items = LocalCart.getLocalCartItems();
  const id = e.target.parentElement.parentElement.getAttribute("data-id");
  if (items === null) {
    return;
  }
  for (const [key, value] of items.entries()) {
    if (id === "1" && key === "1") {
      const PdtItem1QuantValue = document.querySelector(
        ".product-item1-quantity-value"
      );
      PdtItem1QuantValue.innerHTML = `${value.quantity}`;
    }
    if (id === "2" && key === "2") {
      const PdtItem2QuantValue = document.querySelector(
        ".product-item2-quantity-value"
      );
      PdtItem2QuantValue.innerHTML = `${value.quantity}`;
    }
    if (id === "3" && key === "3") {
      const PdtItem3QuantValue = document.querySelector(
        ".product-item3-quantity-value"
      );
      PdtItem3QuantValue.innerHTML = `${value.quantity}`;
    }
    if (id === "4" && key === "4") {
      const PdtItem4QuantValue = document.querySelector(
        ".product-item4-quantity-value"
      );
      PdtItem4QuantValue.innerHTML = `${value.quantity}`;
    }
    if (id === "5" && key === "5") {
      const PdtItem5QuantValue = document.querySelector(
        ".product-item5-quantity-value"
      );
      PdtItem5QuantValue.innerHTML = `${value.quantity}`;
    }
    if (id === "6" && key === "6") {
      const PdtItem6QuantValue = document.querySelector(
        ".product-item6-quantity-value"
      );
      PdtItem6QuantValue.innerHTML = `${value.quantity}`;
    }
  }
}

function decreaseProductQuantity(id) {
  const items = LocalCart.getLocalCartItems();
  if (items === null) {
    return;
  }
  for (const [key, value] of items.entries()) {
    if (id === "1" && key === "1") {
      const PdtItem1QuantValue = document.querySelector(
        ".product-item1-quantity-value"
      );
      PdtItem1QuantValue.innerHTML = `${value.quantity}`;
    }
    if (id === "2" && key === "2") {
      const PdtItem2QuantValue = document.querySelector(
        ".product-item2-quantity-value"
      );
      PdtItem2QuantValue.innerHTML = `${value.quantity}`;
    }
    if (id === "3" && key === "3") {
      const PdtItem3QuantValue = document.querySelector(
        ".product-item3-quantity-value"
      );
      PdtItem3QuantValue.innerHTML = `${value.quantity}`;
    }
    if (id === "4" && key === "4") {
      const PdtItem4QuantValue = document.querySelector(
        ".product-item4-quantity-value"
      );
      PdtItem4QuantValue.innerHTML = `${value.quantity}`;
    }
    if (id === "5" && key === "5") {
      const PdtItem5QuantValue = document.querySelector(
        ".product-item5-quantity-value"
      );
      PdtItem5QuantValue.innerHTML = `${value.quantity}`;
    }
    if (id === "6" && key === "6") {
      const PdtItem6QuantValue = document.querySelector(
        ".product-item6-quantity-value"
      );
      PdtItem6QuantValue.innerHTML = `${value.quantity}`;
    }
  }
}

function decreaseProductQuantitytoZero(id) {
  const items = LocalCart.getLocalCartItems();
  if (items === null) {
    return;
  }
  for (const [key, value] of items.entries()) {
    if (id === "1" && key === "1") {
      const PdtItem1QuantValue = document.querySelector(
        ".product-item1-quantity-value"
      );
      PdtItem1QuantValue.innerHTML = `0`;
    }
    if (id === "2" && key === "2") {
      const PdtItem2QuantValue = document.querySelector(
        ".product-item2-quantity-value"
      );
      PdtItem2QuantValue.innerHTML = `0`;
    }
    if (id === "3" && key === "3") {
      const PdtItem3QuantValue = document.querySelector(
        ".product-item3-quantity-value"
      );
      PdtItem3QuantValue.innerHTML = `0`;
    }
    if (id === "4" && key === "4") {
      const PdtItem4QuantValue = document.querySelector(
        ".product-item4-quantity-value"
      );
      PdtItem4QuantValue.innerHTML = `0`;
    }
    if (id === "5" && key === "5") {
      const PdtItem5QuantValue = document.querySelector(
        ".product-item5-quantity-value"
      );
      PdtItem5QuantValue.innerHTML = `0`;
    }
    if (id === "6" && key === "6") {
      const PdtItem6QuantValue = document.querySelector(
        ".product-item6-quantity-value"
      );
      PdtItem6QuantValue.innerHTML = `0`;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartUI;
});
