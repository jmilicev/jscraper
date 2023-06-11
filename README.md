# jscraper.js

jscraper is a JavaScript module that allows you to scrape significant text from web pages based on specific keywords. It utilizes the axios library to make HTTP requests and the cheerio library for web scraping.

## Installation

To use the jscraper module, you need to have Node.js installed on your machine. You can install the module using npm:

```shell
npm install axios cheerio
```

## Usage

Here's an example of how to use the jscraper module:

```javascript
const scraper = require('./jscraper.js');

(async () => {
  const { usedURLS, foundText } = await scraper.scrape('best beginner motorcycles', ['cb500'], 100, 10);
  console.log("TEXT:", foundText);
  console.log("SOURCES:", usedURLS);
})();
```

The `scrape` function accepts four parameters:

- `searchKey` (string): The search query used to find relevant web pages.
- `filters` (array of strings): An array of keywords that all must be present in the significant text.
- `depth` (number): The minimum length of the significant text to consider.
- `maxURLcount` (number): The maximum number of URLs to consider from the 1st page of google. A value of infinity would consider all links served on the 1st page. A value of 2 would only consider the first 2 links.

The `scrape` function initiates the scraping process by performing a Google search with the provided `searchKey`. It retrieves a list of URLs from the search results and proceeds to scrape significant text from those pages. The text is filtered based on the `filters`, `depth`, and other criteria specified in the code.

The `scrape` function returns an object containing two properties:

- `usedURLS` (array of strings): The URLs that were used for scraping.
- `foundText` (array of arrays of strings): The significant text found on the web pages.

## Additional Functions

The jscraper module also provides two additional functions:

### `findText(url, keywords, depth)`

The `findText` function retrieves significant text from a specific URL based on provided `keywords` and `depth` criteria. It returns an array of strings representing the significant text found on the web page.

- `url` (string): The URL of the web page to scrape.
- `keywords` (array of strings): An array of keywords that all must be present in the significant text.
- `depth` (number): The minimum length of the significant text to consider.

### `findURLS(url)`

The `findURLS` function retrieves a list of URLs from a specific URL based on certain criteria. It returns an array of strings representing the URLs found on the web page.

- `searchKey` (string): The keyword to find URLs for.

## Disclaimer

Please be mindful of the legal and ethical considerations when scraping web pages. Ensure that you have the necessary permissions and follow the terms of service of the websites you scrape.
