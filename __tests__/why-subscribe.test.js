import "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/dom";

// Mock the section's HTML structure
document.body.innerHTML = `
  <section id="why-subscribe" class="why-subscribe page-width" data-section-id="123" data-section-type="why-subscribe">
    <h2 class="why-subscribe__heading">Why Subscribe?</h2>
    <div class="why-subscribe__benefits">
      <article class="why-subscribe__benefit" aria-labelledby="benefit-1">
        <h1 id="benefit-1">1</h1>
        <p>First benefit description</p>
      </article>
      <article class="why-subscribe__benefit" aria-labelledby="benefit-2">
        <h1 id="benefit-2">2</h1>
        <p>Second benefit description</p>
      </article>
      <article class="why-subscribe__benefit" aria-labelledby="benefit-3">
        <h1 id="benefit-3">3</h1>
        <p>Third benefit description</p>
      </article>
    </div>
    <div class="button-wrapper flex">
      <button id="subscribeWhySubscribe" class="why-subscribe-button button" aria-label="Subscribe now">
        Subscribe
      </button>
    </div>
  </section>
  <section id="featured-product"></section>
`;

// Mock the scrollIntoView function
Element.prototype.scrollIntoView = jest.fn();

// Mock console.log
console.log = jest.fn();

describe("Why Subscribe Section", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Add the event listener to the button
    document
      .getElementById("subscribeWhySubscribe")
      .addEventListener("click", function () {
        const destination = document.getElementById("featured-product");
        if (destination) {
          destination.scrollIntoView({ behavior: "smooth" });
          console.log("subscribeWhySubscribe button Clicked");
        }
      });
  });

  test("renders the correct number of benefits", () => {
    const benefits = document.querySelectorAll(".why-subscribe__benefit");
    expect(benefits.length).toBe(3);
  });

  test("benefits have correct content", () => {
    const benefits = document.querySelectorAll(".why-subscribe__benefit");
    expect(benefits[0]).toHaveTextContent("1");
    expect(benefits[0]).toHaveTextContent("First benefit description");
    expect(benefits[1]).toHaveTextContent("2");
    expect(benefits[1]).toHaveTextContent("Second benefit description");
    expect(benefits[2]).toHaveTextContent("3");
    expect(benefits[2]).toHaveTextContent("Third benefit description");
  });

  test("clicking subscribe button triggers smooth scroll", () => {
    const subscribeButton = document.getElementById("subscribeWhySubscribe");
    const featuredProduct = document.getElementById("featured-product");

    fireEvent.click(subscribeButton);

    expect(featuredProduct.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    });
    expect(console.log).toHaveBeenCalledWith(
      "subscribeWhySubscribe button Clicked"
    );
  });
});
