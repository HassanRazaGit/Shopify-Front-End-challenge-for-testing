import "@testing-library/jest-dom";
import { fireEvent, waitFor } from "@testing-library/dom";

// Mock the DOM structure
document.body.innerHTML = `
  <form id="add-to-cart-form">
    <label class="variant-radio">
      <input type="radio" name="id" class="variant_custom-input" value="1" checked>
      <span class="variant-radio__label">Variant 1</span>
      <span class="variant-radio__label">£10.00</span>
    </label>
    <label class="variant-radio">
      <input type="radio" name="id" class="variant_custom-input" value="2">
      <span class="variant-radio__label">Variant 2</span>
      <span class="variant-radio__label">£20.00</span>
    </label>
    <button id="add-to-cart-button">Add to Cart</button>
  </form>
  <div id="cart-popup" style="display: none;">
    <div id="cart-items"></div>
    <p id="cart-total"></p>
    <div class="cart-popup__buttons">
      <button id="continue-shopping">Continue Shopping</button>
      <a href="/checkout">Proceed to Checkout</a>
    </div>
  </div>
  <div id="loader" style="display: none;"></div>
`;

// Import the JavaScript code from your section
import initFeaturedProduct from "../assets/featured-product.js";

// Mock fetch globally
global.fetch = jest.fn();

describe("Featured Product Section", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    initFeaturedProduct();
    // Trigger DOMContentLoaded event
    document.dispatchEvent(new Event("DOMContentLoaded"));
  });

  test("updates button text when variant is selected", () => {
    const radios = document.querySelectorAll(".variant_custom-input");
    const addButton = document.getElementById("add-to-cart-button");

    // Check initial state
    expect(addButton.textContent).toBe("Add to Cart - £10.00");

    fireEvent.click(radios[1]);
    expect(addButton.textContent).toBe("Add to Cart - £20.00");
  });

  test("submits form and updates cart on add to cart", async () => {
    console.log("Starting add to cart test");
    const form = document.getElementById("add-to-cart-form");
    const cartPopup = document.getElementById("cart-popup");

    // Mock successful responses
    global.fetch.mockImplementation((url) => {
      console.log(`Mocked fetch called with URL: ${url}`);
      if (url === "/cart/add.js") {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ id: 1, quantity: 1 }),
        });
      } else if (url === "/cart.js") {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              items: [
                {
                  id: 1,
                  quantity: 1,
                  product_title: "Test Product",
                  variant_title: "Test Variant",
                  price: 1000,
                  image: "test.jpg",
                },
              ],
              total_price: 1000,
              currency: "GBP",
            }),
        });
      }
    });

    console.log("Submitting form");
    fireEvent.submit(form);

    console.log("Waiting for fetch to be called");
    await waitFor(() => expect(global.fetch).toHaveBeenCalled(), {
      timeout: 5000,
    });

    console.log("Fetch called, waiting for cart popup");
    await waitFor(
      () => {
        console.log("Current cart popup display:", cartPopup.style.display);
        return cartPopup.style.display === "flex";
      },
      { timeout: 5000 }
    );

    console.log("Cart popup display style:", cartPopup.style.display);

    // Add a small delay to allow for DOM updates
    await new Promise((resolve) => setTimeout(resolve, 100));

    console.log("Checking cart contents");
    console.log(
      "Cart items content:",
      document.getElementById("cart-items").innerHTML
    );
    expect(document.getElementById("cart-items")).toHaveTextContent(
      "Test Product"
    );
    expect(document.getElementById("cart-total")).toHaveTextContent(
      "Total: £10.00"
    );

    console.log("Final DOM state:", document.body.innerHTML);

    // Log the number of fetch calls
    console.log("Number of fetch calls:", global.fetch.mock.calls.length);
    console.log(
      "Fetch call URLs:",
      global.fetch.mock.calls.map((call) => call[0])
    );
  }, 15000); // Increase timeout to 15 seconds
});
