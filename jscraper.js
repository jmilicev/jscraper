const axios = require('axios');
const cheerio = require('cheerio');

async function findText(url, keyword, depth) {

  let significantText = [];
  try {
    const userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

    const response = await axios.get(url, {
      headers: {
        'User-Agent': userAgent,
      },
    });

    const $ = cheerio.load(response.data);
    const elements = $('body')
      .find('*')
      .filter(function () {
        return $(this).text().includes(keyword) && !$(this).is('script');
      });

    let extractedText = '';

    elements.each(function () {
      const text = $(this)
        .clone()
        .children()
        .remove()
        .end()
        .text()
        .trim();

        if (lineValid(text, depth)) {
          significantText.push(text)
        }


    });
    return significantText;
  } catch (error) {
    console.error('Error:', error);
  }
}

function lineValid(text, depth){
    //criteria for ignoring the content of a string
    if (
    text.includes("<") || 
    text.includes(">") || 
    text.includes("{") || 
    text.includes("}") || 
    text.length < depth) {
        return false;
    }
     else {
        return true;
    }

}

//URL PORTION
async function findURLS(url, keyword) {
  let foundURLS = [];
  try {
    const userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

    const response = await axios.get(url, {
      headers: {
        'User-Agent': userAgent,
      },
    });

    const $ = cheerio.load(response.data);
    const elements = $('body')
      .find('*')
      .filter(function () {
        return $(this).text().includes(keyword) && !$(this).is('script');
      });

    let extractedText = '';

    elements.each(function () {
      const text = $(this)
        .clone()
        .children()
        .remove()
        .end()
        .prop('outerHTML');
        
        if(
          text.length > 0 &&
          text.includes("<a href=\"http") &&
          !text.includes("google.com")
          ) {
            const regex = /href="([^"]*)"/;
            const match = text.match(regex);
            const link = match ? match[1] : null;
            foundURLS.push(link)
          }
    });

    return foundURLS;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function scrape(searchKey, filter, depth, maxURLcount) {
  const googleScrape = `https://www.google.com/search?q=${encodeURIComponent(searchKey)}`;
  let foundURLS = await findURLS(googleScrape, '');

  let significantText = [];
  let foundText = [];
  let usedURLS = [];

  let usedCounter = 0;

  for (let i = 0; i < foundURLS.length && usedCounter < maxURLcount; i++) {
    let currentURL = foundURLS[i];
    significantText = await findText(currentURL, filter, depth);
    if (significantText.length > 0) {
      foundText.push(significantText);
      usedURLS.push(currentURL);
      usedCounter++;
    }
  }

  return { usedURLS, foundText };
}


// Usage example:

(async () => {
  const { usedURLS, foundText } = await scrape('what is the fastest motorcycle in 2023', '', 500, 4);
  console.log("TEXT:", foundText);
  console.log("SOURCES:", usedURLS);
})();
