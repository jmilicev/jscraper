const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeText(url, keyword, depth) {
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
          extractedText += '' + (text) + '' + '\n';
        }


    });

    console.log(extractedText);
  } catch (error) {
    console.error('Error:', error);
  }
}

function lineValid(text, depth){
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

// Usage example:
const url =
  'https://en.wikipedia.org/wiki/Bosnia_and_Herzegovina'; // Replace with the URL you want to scrape
const keyword = '';

scrapeText(url, keyword, 100);
