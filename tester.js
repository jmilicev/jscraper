// Usage example:

const scraper = require('./jscraper.js');

(async () => {
    const { usedURLS, foundText } = await scraper.scrape('best begginer motorcycles', ['cb500'], 100, 10);
    console.log("TEXT:", foundText);
    console.log("SOURCES:", usedURLS);
  })();