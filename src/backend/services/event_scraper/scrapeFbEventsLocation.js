// scripts/scrapeFbEventsByLocationNoLogin.js
require('dotenv').config();
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fetch = require('node-fetch');
const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid');

puppeteer.use(StealthPlugin());

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

async function geocode(address) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json`
            + `?address=${encodeURIComponent(address)}`
            + `&key=${GOOGLE_API_KEY}`;
  const res = await fetch(url);
  const { results } = await res.json();
  if (!results || !results.length) throw new Error('No geocode result for ' + address);
  const loc = results[0].geometry.location;
  return { latitude: loc.lat, longitude: loc.lng, formattedAddress: results[0].formatted_address };
}

// go to Events discovery and search by city
async function searchByLocation(page, city) {
  await page.goto('https://www.facebook.com/events', { waitUntil: 'networkidle2' });
  // wait for the search box
  const sel = 'input[placeholder="Search events"]';
  await page.waitForSelector(sel, { timeout: 10000 });
  await page.click(sel);
  await page.type(sel, city, { delay: 100 });
  await page.keyboard.press('Enter');
  await page.waitForSelector('div[role="feed"]', { timeout: 15000 });
}

// scroll to load more
async function autoScroll(page) {
  await page.evaluate(async () => {
    const distance = 1000;
    for (let i = 0; i < 8; i++) {
      window.scrollBy(0, distance);
      await new Promise(r => setTimeout(r, 800));
    }
  });
}

// grab unique event URLs
async function extractEventLinks(page) {
  return page.$$eval('div[role="feed"] a[href*="/events/"]', as =>
    [...new Set(as.map(a => a.href))]
  );
}

// scrape each event page
async function scrapeEvent(page, url) {
  await page.goto(url, { waitUntil: 'networkidle2' });
  return page.evaluate(() => {
    const title = document.querySelector('h1')?.innerText?.trim() || null;
    const desc  = document.querySelector('[data-testid="event-permalink-details"]')?.innerText?.trim() || '';
    const datetime = document.querySelector('div[data-testid="event-permalink-event-date"]')?.innerText || '';
    const place = document.querySelector('a[role="link"][href*="place"]')?.innerText || '';
    const img   = document.querySelector('image')?.getAttribute('xlink:href') || null;
    return { title, desc, datetime, place, img, url };
  });
}

// simple datetime parser (adjust if needed)
function parseDateTime(fbDateStr) {
  const dt = new Date(fbDateStr.replace(' at ', ', '));
  return { startTime: dt, endTime: new Date(dt.getTime() + 2*60*60*1000) };
}

// upsert into Prisma + location
async function saveEvent(scraped, geo) {
  const { title, desc, img, datetime, place, url } = scraped;
  const { startTime, endTime } = parseDateTime(datetime);
  const ev = await prisma.event.upsert({
    where: { externalId: url },
    create: {
      externalId: url,
      userId:,
      title,
      textDescription: desc,
      startTime,
      endTime,
      images: img ? [img] : [],
    },
    update: {
      title, textDescription: desc, startTime, endTime,
      images: img ? [img] : [],
    },
  });
  const locId = uuidv4();
  const point = `POINT(${geo.longitude} ${geo.latitude})`;
  await prisma.$executeRawUnsafe(
    `INSERT INTO "event_locations" ("id","eventId","streetAddress","location")
     VALUES ($1::uuid,$2::uuid,$3,ST_GeomFromText($4,4326))
     ON CONFLICT DO NOTHING`,
    locId, ev.id, geo.formattedAddress, point
  );
}

(async () => {
  const CITY = process.argv[2];
  if (!CITY) {
    console.error('Usage: node scrapeFbEventsByLocationNoLogin.js "Austin, TX"');
    process.exit(1);
  }

  const browser = await puppeteer.launch({ headless: true });
  const page    = await browser.newPage();

  await searchByLocation(page, CITY);
  await autoScroll(page);

  const links = await extractEventLinks(page);
  console.log(`Found ${links.length} events…`);

  for (let url of links) {
    try {
      const data = await scrapeEvent(page, url);
      const geo  = await geocode(data.place || CITY);
      await saveEvent(data, geo);
      console.log(`✓ Saved: ${data.title}`);
    } catch (e) {
      console.warn(`✗ ${e.message} on ${url}`);
    }
  }

  await browser.close();
  console.log('Done.');
  process.exit(0);
})();
