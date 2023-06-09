const axios = require('axios');
const cheerio = require('cheerio');

const keyword = 'Air Canada'

async function scrapeText(url) {
  try {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

    const response = await axios.get(url, {
      headers: {
        'User-Agent': userAgent
      }
    });

    const $ = cheerio.load(response.data);

    const elements = $('body').find('*').filter(function () {
      return $(this).text().includes(keyword);
    });

    let extractedText = '';

    elements.each(function () {
      const text = $(this).clone()    // Clone the element to avoid modifying the original HTML
        .children()                   // Get only the child elements
        .remove()                     // Remove child elements (e.g., scripts, styles)
        .end()                        // Return to the original element
        .text()                       // Get the remaining text
        .trim();                      // Trim any leading/trailing whitespace

      extractedText += text + '\n';   // Append the extracted text to the result, separated by a newline
    });

    console.log(extractedText);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Usage example:
const url = 'https://ca.finance.yahoo.com/news/air-canada-rejects-passenger-compensation-150639707.html'; // Replace with the URL you want to scrape
scrapeText(url);
