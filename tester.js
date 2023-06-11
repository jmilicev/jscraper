// Usage example:

const scraper = require('./jscraper.js');

(async () => {

    
    //const URLS = await scraper.findURLS("types of crocodiles")
    //console.log(URLS)

    /*
    const text = await scraper.findText(
    'https://a-z-animals.com/blog/discover-all-types-of-crocodiles-found-across-the-world/',
     ['caiman'], 100, 100)
    console.log(text)
    */

    const { usedURLs, foundText } = await scraper.scrape('largest buildings in the world',
    'merge',
    ['khalifa'],
    300,
    15);
  
  console.log("TEXT:", foundText);
  console.log("SOURCES:", usedURLs);
  
    
  })();