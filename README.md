# JScraper

JScraper is a lightweight Node.js library that allows you to scrape web pages and extract relevant text based on provided keywords. It supports searching for URLs using popular search engines like Google and Bing and then scraping the content from those URLs.

## Installation

To use JScraper in your Node.js project, you can install it via npm:

```shell
npm install jscraper
```

## Usage

Here's an example of how to use JScraper:

```javascript
const scraper = require('jscraper');

(async () => {
  const { usedURLS, foundText } = await scraper.scrape(
    'best beginner motorcycles',
    'merge',
    ['bmw'],
    100,
    100
  );

  console.log("TEXT:", foundText);
  console.log("SOURCES:", usedURLS);
})();
```

In the example above, we import the `scraper` module from JScraper and use the `scrape` function to perform the scraping. We pass the following parameters to the `scrape` function:

- `searchKey`: The search query used to find relevant URLs.
- `engine`: The search engine to use (`'google'`, `'bing'`, or `'merge'` for both).
- `filters`: An array of keywords used to filter the extracted text.
- `depth`: The minimum length of the extracted text to consider it significant.
- `maxURLcount`: The maximum number of URLs to scrape.

The `scrape` function returns an object containing two arrays:
- `usedURLS`: An array of URLs that were used for scraping.
- `foundText`: An array of significant text extracted from the web pages.

## API

### findText(url, keywords, depth)

The `findText` function allows you to scrape a specific URL and extract significant text based on provided keywords and a depth threshold.

- `url`: The URL of the web page to scrape.
- `keywords`: An array of keywords used to filter the extracted text.
- `depth`: The minimum length of the extracted text to consider it significant.

### findURLS(searchKey, engine)

The `findURLS` function allows you to search for URLs using a specified search engine.

- `searchKey`: The search query used to find relevant URLs.
- `engine`: The search engine to use (`'google'`, `'bing'`, or `'merge'` for both).

### scrape(searchKey, engine, filters, depth, maxURLcount)

The `scrape` function combines the functionality of `findURLS` and `findText` to perform a complete scraping operation.

- `searchKey`: The search query used to find relevant URLs.
- `engine`: The search engine to use (`'google'`, `'bing'`, or `'merge'` for both).
- `filters`: An array of keywords used to filter the extracted text.
- `depth`: The minimum length of the extracted text to consider it significant.
- `maxURLcount`: The maximum number of URLs to scrape.

## Contributing

Contributions are welcome! If you have any bug fixes, enhancements, or new features, please open an issue or submit a pull request on the [GitHub repository](https://github.com/jmilicev).

## Support

If you have any questions, suggestions, or need assistance, feel free to contact me or open an issue on the [GitHub repository](https://github.com/jmilicev).

## Disclaimer

JScraper is a tool designed for legal and ethical web scraping. However, it's your responsibility to ensure that you use it in compliance with the target website's terms of service, as well as local, national, and international laws and regulations. The authors of JScraper are not liable for any misuse or legal consequences caused by the usage of this library.
