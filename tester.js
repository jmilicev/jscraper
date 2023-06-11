// Usage example:

const scraper = require('./jscraper.js');

(async () => {
    const { usedURLS, foundText } = await scraper.scrape('best begginer motorcycles',
     'merge',
     [''], 
     20, 
     100);



    console.log("TEXT:", foundText);
    console.log("SOURCES:", usedURLS);
  })();