// Usage example:

const scraper = require('./jscraper.js');

(async () => {
    const { usedURLS, foundText } = await scraper.scrape('best begginer motorcycles',
     'merge',
     ['bmw'], 
     100, 
     100);



    console.log("TEXT:", foundText);
    console.log("SOURCES:", usedURLS);
  })();