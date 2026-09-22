import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const routes = ['/', '/about/', '/products/', '/services/', '/impact/', '/stories/', '/press/', '/faq/', '/contact/'];
const origin = new URL(process.env.SITE_URL || 'https://a-chang-website.pages.dev').origin;
const titles = new Set();
const descriptions = new Set();
for (const route of [...routes, '/404.html']) {
  const html = fs.readFileSync(path.join('dist', route === '/404.html' ? route : route + 'index.html'), 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/)[1];
  const description = html.match(/<meta name="description" content="(.*?)">/)[1];
  assert(!titles.has(title), `duplicate title: ${route}`); titles.add(title);
  assert(!descriptions.has(description), `duplicate description: ${route}`); descriptions.add(description);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `one H1: ${route}`);
  assert(html.includes(`rel="canonical" href="${origin}${route}"`), `canonical: ${route}`);
  assert(html.includes('og:image:width" content="1200"'), 'OG width');
  assert(html.includes('og:image:height" content="630"'), 'OG height');
  assert(html.includes('twitter:image"'), 'Twitter image');
  assert(!html.includes('href="#"'), `placeholder link: ${route}`);
  for (const [, tag] of html.matchAll(/<(img\b[^>]+)>/g)) {
    assert.equal((tag.match(/\bloading=/g)||[]).length, 1, `one loading attribute: ${route}`);
    assert(/\balt="[^"]+"/.test(tag), `image alt: ${route}`);
    assert(/\bwidth="\d+"/.test(tag) && /\bheight="\d+"/.test(tag), `image dimensions: ${route}`);
  }
  for (const [, link] of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    const file = path.join('dist', link.endsWith('/') ? link + 'index.html' : link);
    assert(fs.existsSync(file), `missing local target ${link} on ${route}`);
  }
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert(graph.some(x => ['WebPage','AboutPage','ContactPage','CollectionPage'].includes(x['@type'])), 'page entity');
  if (route === '/faq/') {
    const faq = graph.find(x => x['@type'] === 'FAQPage');
    assert.equal(faq.mainEntity.length, (html.match(/<details>/g)||[]).length);
    for (const q of faq.mainEntity) assert(html.includes(q.name) && html.includes(q.acceptedAnswer.text), 'visible FAQ matches schema');
  }
  if (route === '/products/') {
    assert.equal((html.match(/class="product-card"/g)||[]).length, 6);
    assert.equal(graph.find(x=>x['@type']==='ItemList').itemListElement.length, 6);
  }
  if (route === '/stories/') assert.equal((html.match(/class="story-card"/g)||[]).length, 22);
  if (route === '/') assert(/fetchpriority="high" loading="eager"/.test(html), 'eager hero');
  if (route === '/404.html') assert(html.includes('noindex,follow'), '404 noindex');
}
const sitemap = fs.readFileSync('dist/sitemap.xml','utf8');
assert.equal((sitemap.match(/<loc>/g)||[]).length, routes.length);
for (const route of routes) assert(sitemap.includes(`<loc>${origin}${route}</loc>`));
assert(!sitemap.includes('404.html'));
assert(fs.readFileSync('dist/robots.txt','utf8').includes(`${origin}/sitemap.xml`));
console.log(`Validated ${routes.length} pages + 404: metadata, schema, FAQ, products, stories, image attributes and local links.`);
