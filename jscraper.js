const axios = require('axios');
const cheerio = require('cheerio');

const keyword = '';

async function scrapeText(url) {
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
        return $(this).text().includes(keyword);
      })
      .not('script, style') // Exclude script and style elements
      .not('[aria-hidden="true"]') // Exclude elements with aria-hidden="true"
      .not(function () {
        // Exclude elements with specific classes or IDs
        return (
          $(this).hasClass('ad') || $(this).hasClass('advertisement') || $(this).attr('id') === 'ad-container'
        );
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

      extractedText += text + '\n';
    });

    console.log(extractedText);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Usage example:
const url = 'https://ca.finance.yahoo.com/news/air-canada-rejects-passenger-compensation-150639707.html';
scrapeText(url);
