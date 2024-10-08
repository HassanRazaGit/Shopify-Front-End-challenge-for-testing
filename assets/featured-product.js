export default () => {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Content Loaded");
    const form = document.getElementById("add-to-cart-form");
    const addButton = document.getElementById("add-to-cart-button");
    const variantRadios = document.querySelectorAll('input[name="id"]');
    const cartPopup = document.getElementById("cart-popup");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const continueShopping = document.getElementById("continue-shopping");
    const loader = document.getElementById("loader");

    // Function to update the 'checked' class and button text
    const updateVariantSelection = () => {
      document.querySelectorAll(".variant-radio").forEach((label) => {
        label.classList.remove("checked");
      });

      variantRadios.forEach((radio) => {
        if (radio.checked) {
          const variantRadio = radio.closest(".variant-radio");
          if (variantRadio) {
            variantRadio.classList.add("checked");
            const variantPrice = variantRadio
              .querySelector(".variant-radio__label:last-child")
              ?.textContent.trim();
            if (addButton) {
              addButton.textContent = `Add to Cart - ${variantPrice || ""}`;
            }
          }
        }
      });
    };

    // Run on page load to apply the class to the initially checked input
    updateVariantSelection();

    // Add event listeners to update the class when an input is changed
    variantRadios.forEach((radio) => {
      radio.addEventListener("change", updateVariantSelection);
    });

    // Handle form submission
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("Form submitted");

        const formData = new FormData(form);

        // Show loader
        if (loader) loader.style.display = "flex";

        fetch("/cart/add.js", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((item) => {
            console.log("Item added to cart:", item);
            return fetch("/cart.js");
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((cart) => {
            console.log("Cart updated:", cart);
            displayCartPopup(cart);
          })
          .catch((error) => {
            console.error("Error:", error);
            // Show an error message to the user
          })
          .finally(() => {
            // Hide loader
            if (loader) loader.style.display = "none";
          });
      });
    }

    const displayCartPopup = (cart) => {
      console.log("Displaying cart popup with cart:", cart);
      if (!cartItems || !cartPopup || !cartTotal) {
        console.error("One or more required elements are missing");
        return;
      }

      cartItems.innerHTML = "";
      const checkoutButton = document.querySelector(
        '.cart-popup__buttons a[href="/checkout"]'
      );

      if (cart.items.length === 0) {
        console.log("Cart is empty");
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "";
        if (checkoutButton) {
          checkoutButton.style.display = "none";
        }
      } else {
        console.log("Adding items to cart popup");
        cart.items.forEach((item) => {
          const cartItem = document.createElement("div");
          cartItem.classList.add("cart-item");
          cartItem.innerHTML = `
              <img class="cart-item__image" src="${item.image}" alt="${
            item.title
          }" loading="lazy">
              <div class="cart-item__details">
                <p>${item.product_title}</p>
                <p>${item.variant_title}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: ${formatMoney(item.price, cart.currency)}</p>
              </div>
              <button class="cart-item__remove" data-variant-id="${
                item.variant_id
              }">Remove</button>
            `;
          cartItems.appendChild(cartItem);
        });
        cartTotal.textContent = `Total: ${formatMoney(
          cart.total_price,
          cart.currency
        )}`;
        if (checkoutButton) {
          checkoutButton.style.display = "inline-block";
        }
      }

      cartPopup.style.display = "flex";
      console.log("Cart popup display set to flex");
      console.log("Final cart items content:", cartItems.innerHTML);
    };

    if (continueShopping) {
      continueShopping.addEventListener("click", () => {
        if (cartPopup) cartPopup.style.display = "none";
      });
    }

    const formatMoney = (cents, currency) => {
      const formatter = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: currency || "GBP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return formatter.format(cents / 100);
    };
  });
};
