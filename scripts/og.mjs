import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { createServer } from 'vite';

const root = fileURLToPath(new URL('..', import.meta.url));
const out = fileURLToPath(new URL('../public/og.png', import.meta.url));
const size = { width: 1200, height: 630 };

const card = `
  .nav, .hero-ctas, main::after { display: none; }
  .hero-inner { padding: 72px 80px; }
  .hero-main { margin: auto 0 0; padding: 0; }
  .hero-eyebrow { font-size: 28px; line-height: 36px; gap: 20px; margin: 0 0 36px; }
  .hero-eyebrow::before { width: 56px; height: 2px; }
  .hero-name { font-size: 176px; margin: 0; }
  .og-brand { display: flex; align-items: center; gap: 16px; font-family: var(--mono); font-size: 26px; line-height: 1; color: var(--fg); }
  .og-brand svg { width: 40px; height: 40px; }
`;

// Bind to 127.0.0.1 so Vite skips ports held by other dev servers; on "localhost" it can share a port with one over IPv4/IPv6.
const server = await createServer({ root, logLevel: 'warn', server: { host: '127.0.0.1' } });
await server.listen();
// GPU raster flips a few anti-aliased pixels between runs; software raster keeps og.png byte-identical.
const browser = await chromium.launch({ channel: 'chrome', args: ['--disable-gpu'] });
try {
  const page = await browser.newPage({ viewport: size, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await page.addInitScript(() => localStorage.setItem('theme', 'light'));
  await page.goto(server.resolvedUrls.local[0]);
  await page.locator('.hero-name').waitFor();
  await page.addStyleTag({ content: card });
  await page.evaluate(() => {
    const brand = document.createElement('div');
    brand.className = 'og-brand';
    brand.append(document.querySelector('.nav-brand svg').cloneNode(true), 'kurtjallorina.me');
    document.querySelector('.hero-inner').prepend(brand);
  });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: out, clip: { x: 0, y: 0, ...size } });
  console.log(`wrote ${out}`);
} finally {
  await browser.close();
  await server.close();
}
