# Absolute Collagen Shopify Theme

## Project Overview

This repository contains a custom Shopify theme for Absolute Collagen. The theme includes several custom sections and components, optimized for performance and user experience.

## Theme Sections

1. **Featured Product**: Displays a featured product with add-to-cart functionality.
2. **Why Subscribe**: Showcases subscription benefits.
3. **Page Content Display**: Renders content from selected Shopify pages.
4. **Key Benefits**: Highlights key product benefits.

## Project Structure

```
Absolute Collagen Final Theme/
├── assets/
│   ├── component-*.css
│   ├── global.js
│   └── style.css
├── config/
│   └── settings_schema.json
├── layout/
│   └── theme.liquid
├── sections/
│   ├── featured-product.liquid
│   ├── header.liquid
│   ├── key-benefits.liquid
│   ├── page-content-display.liquid
│   └── why-subscribe.liquid
├── snippets/
│   ├── icon-left.liquid
│   └── icon-right.liquid
├── templates/
│   └── page.liquid
├── __tests__/
│   ├── featured-product.test.js
│   ├── page-content-display.test.js
│   └── why-subscribe.test.js
├── .gitignore
├── package.json
└── package-lock.json
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone [https://github.com/HassanRazaGit/Shopify-Front-End-challenge-for-testing.git]
   ```
2. Install dependencies:
   ```
   npm install
   ```

## Testing

This project uses Jest for unit testing. To run the tests:

```
npm test
```

Key test files:
- `__tests__/featured-product.test.js`
- `__tests__/page-content-display.test.js`
- `__tests__/why-subscribe.test.js`

## Development Workflow

1. Make changes to the theme files.
2. Run tests to ensure functionality:
   ```
   npm test
   ```
3. If using Shopify CLI, preview changes locally:
   ```
   shopify theme serve
   ```

## Deployment

To deploy this theme to a Shopify store:

I Uploaded a complete ready to use theme in a sperate directory you just need to download and upload to shopify it directly from that repository
Here is the URL of that Repository. [https://github.com/HassanRazaGit/shopify-frontend-developer-challenge.git] (Note: That Repository does include testing files and node module)

OR

1. Compress the theme files (excluding `node_modules` and `__tests__`).
2. Upload the zip file via the Shopify admin panel.

## Code Review Notes

- Pay special attention to the JavaScript in `assets/global.js` and within each section file.
- Check for Shopify liquid syntax best practices in `.liquid` files.
- Ensure CSS follows the structure defined in `assets/style.css` and component-specific CSS files.
- Verify that all sections are properly configured in their respective `.liquid` files.

## Performance Considerations

- CSS is modularized for each component to allow for efficient loading.
- JavaScript is kept minimal and specific to each section where possible.

## Known Issues or TODOs

- [List any known issues or upcoming tasks]

## Contributing

[Specify any guidelines for contributing to the project]

## License

[Specify the license under which this theme is released]

---

For any questions or concerns, please contact [Your Contact Information].
