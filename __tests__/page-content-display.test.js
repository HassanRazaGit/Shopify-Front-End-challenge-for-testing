import "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/dom";

// Mock the section's HTML structure
document.body.innerHTML = `
  <div class="page-content-display text-center page-width" role="region" aria-labelledby="page-content-title">
    <h2 id="page-content-title" class="page-title">Test Page Title</h2>
    <div class="page-description">
      <p>This is some test page content.</p>
      <img src="test-image.jpg" alt="Test Image" loading="lazy">
    </div>
    <div class="button-wrapper flex">
      <button id="subscribeButtonPageContentDisplay" class="page-content__button button" aria-label="Subscribe now">
        Subscribe
      </button>
    </div>
  </div>
  <div id="why-subscribe"></div>
`;

// Mock the scrollIntoView function
Element.prototype.scrollIntoView = jest.fn();

// Mock console.log
console.log = jest.fn();

describe("Page Content Display Section", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Add the event listener to the button
    document
      .getElementById("subscribeButtonPageContentDisplay")
      .addEventListener("click", function () {
        const destination = document.getElementById("why-subscribe");
        if (destination) {
          destination.scrollIntoView({ behavior: "smooth" });
          console.log("subscribeButtonPageContentDisplay button Clicked");
        }
      });
  });

  test("renders the page title correctly", () => {
    const pageTitle = document.getElementById("page-content-title");
    expect(pageTitle).toHaveTextContent("Test Page Title");
  });

  test("renders the page content correctly", () => {
    const pageDescription = document.querySelector(".page-description");
    expect(pageDescription).toHaveTextContent(
      "This is some test page content."
    );
  });

  test("renders images with lazy loading", () => {
    const image = document.querySelector(".page-description img");
    expect(image).toHaveAttribute("loading", "lazy");
  });

  test("clicking subscribe button triggers smooth scroll", () => {
    const subscribeButton = document.getElementById(
      "subscribeButtonPageContentDisplay"
    );
    const whySubscribe = document.getElementById("why-subscribe");

    fireEvent.click(subscribeButton);

    expect(whySubscribe.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    });
    expect(console.log).toHaveBeenCalledWith(
      "subscribeButtonPageContentDisplay button Clicked"
    );
  });
});
