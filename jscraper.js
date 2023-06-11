const axios = require('axios');
const cheerio = require('cheerio');

function generateFakeUserAgent() {
  const os = getRandomOS();
  const browser = getRandomBrowser();
  const version = getRandomVersion();

  return `Mozilla/5.0 (${os}) AppleWebKit/537.36 (KHTML, like Gecko) ${browser}/${version} Safari/537.36`;
}

function getRandomOS() {
  const operatingSystems = [
    'Windows NT 10.0',
    'Windows NT 6.3',
    'Windows NT 6.2',
    'Windows NT 6.1',
    'Windows NT 6.0',
    'Windows NT 5.1',
    'Windows NT 5.0',
    'Macintosh; Intel Mac OS X 10_15_7',
    'Macintosh; Intel Mac OS X 10_14_6',
    'Macintosh; Intel Mac OS X 10_13_6',
    'Macintosh; Intel Mac OS X 10_12_6',
    'Macintosh; Intel Mac OS X 10_11_6',
    'Macintosh; Intel Mac OS X 10_10_5',
    'Macintosh; Intel Mac OS X 10_9_5',
    'X11; Linux x86_64',
    'X11; Linux i686',
    'X11; FreeBSD amd64',
    'X11; FreeBSD i386',
    'X11; OpenBSD amd64',
    'X11; OpenBSD i386',
  ];

  return operatingSystems[Math.floor(Math.random() * operatingSystems.length)];
}

function getRandomBrowser() {
  const browsers = [
    'Chrome',
    'Firefox',
    'Safari',
    'Edge',
    'Opera',
    'Internet Explorer',
    'Samsung Internet',
    'UC Browser',
    'Mozilla',
    'Netscape',
  ];

  return browsers[Math.floor(Math.random() * browsers.length)];
}

function getRandomVersion() {
  // Generate a random version number between 70 and 99
  const minVersion = 70;
  const maxVersion = 99;
  return Math.floor(Math.random() * (maxVersion - minVersion + 1)) + minVersion;
}

async function findText(url, keywords, depth) {
  let significantText = [];
  try {
    const userAgent = generateFakeUserAgent();

    const response = await axios.get(url, {
      headers: {
        'User-Agent': userAgent,
      },
    });

    const $ = cheerio.load(response.data);
    const elements = $('body')
      .find('*')
      .filter(function () {
        const elementText = $(this).text().toLowerCase();
        return (
          keywords.every((keyword) => elementText.includes(keyword.toLowerCase())) &&
          !$(this).is('script')
        );
      });

    elements.each(function () {
      const text = $(this)
        .clone()
        .children()
        .remove()
        .end()
        .text()
        .trim();

      if (lineValid(text, depth)) {
        significantText.push(text);
      }
    });
    return significantText;
  } catch (error) {
    console.error('HTTP ERROR, SCRAPER DENIED | WEBSITE AVOIDED');
    return [];
  }
}

function lineValid(text, depth) {
  // Criteria for ignoring the content of a string
  if (
    text.includes('<') ||
    text.includes('>') ||
    text.includes('{') ||
    text.includes('}') ||
    text.length < depth
  ) {
    return false;
  } else {
    return true;
  }
}

async function findURLs(searchKey, engine) {
  let foundURLs = [];

  if (engine === 'bing') {
    url = `https://www.bing.com/search?q=${encodeURIComponent(searchKey)}`;
  } else if (engine === 'merge') {
    let url1 = await findURLs(searchKey, 'google');
    let url2 = await findURLs(searchKey, 'bing');

    foundURLs = Array.from(new Set(url1.concat(url2)));
    return foundURLs;
  } else {
    // Default to Google
    url = `https://www.google.com/search?q=${encodeURIComponent(searchKey)}`;
  }

  if (engine !== 'merge') {
    try {
      const userAgent = generateFakeUserAgent();

      const response = await axios.get(url, {
        headers: {
          'User-Agent': userAgent,
        },
      });

      const $ = cheerio.load(response.data);
      const elements = $('body')
        .find('*')
        .filter(function () {
          return !$(this).is('script');
        });

      elements.each(function () {
        const text = $(this).prop('outerHTML');

        if (
          text.length > 0 &&
          text.includes('href="https') &&
          !text.includes('google.com') &&
          !text.includes('bing.com') &&
          !text.includes('go.microsoft.com') &&
          !text.includes('support.microsoft.com')
        ) {
          const regex = /href="(https?[^"]*)"/;
          const match = text.match(regex);
          const link = match ? match[1] : null;

          if (link && !foundURLs.includes(link)) {
            foundURLs.push(link);
          }
        }
      });

      return foundURLs;
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

async function scrape(searchKey, engine, filters, depth, maxURLcount) {
  let foundURLs = await findURLs(searchKey, engine);
  let significantText = [];
  let foundText = [];
  let usedURLs = [];
  let usedCounter = 0;

  for (let i = 0; i < foundURLs.length && usedCounter < maxURLcount; i++) {
    let currentURL = foundURLs[i];
    significantText = await findText(currentURL, filters, depth);
    if (significantText.length > 0) {
      foundText.push(significantText);
      usedURLs.push(currentURL);
      usedCounter++;
    }
  }
  console.log(usedURLs);
  return { usedURLs, foundText };
}

module.exports = {
  findText,
  findURLs,
  scrape,
};
