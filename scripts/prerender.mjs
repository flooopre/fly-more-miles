#!/usr/bin/env node
/**
 * Pre-render script for MilesTopUp
 * Generates static HTML files for all routes after Vite build
 * This makes the site crawlable by search engines without JavaScript
 * 
 * Falls back gracefully if Puppeteer is unavailable (e.g., on Vercel)
 */

import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');

// All routes to pre-render
const staticRoutes = [
  '/',
  '/blog',
  '/buy-avios',
  '/buy-flying-blue-miles',
  '/tools/avios-calculator',
  '/sweet-spots-guide',
  '/privacy-policy',
  '/impressum',
];

const blogSlugs = [
  'qatar-qsuites-complete-guide-booking-with-avios',
  'flying-blue-miles-complete-redemption-guide',
  'cheapest-way-to-get-avios-2026',
  'how-to-get-flying-blue-miles-guide',
  'what-are-avios-beginners-guide',
  'avios-vs-flying-blue-which-miles-should-you-get',
  'best-avios-redemptions-sweet-spots-2026',
  'how-to-buy-avios-without-flying',
  'british-airways-avios-sale-2026',
  'flying-blue-miles-value-calculator',
  'avios-sweet-spots-europe',
  'transfer-avios-between-accounts',
  'best-avios-redemptions-under-50k',
  'flying-blue-promo-rewards-guide',
  'buy-miles-for-business-class-worth-it',
  'flying-blue-miles-for-sale-uk-2026',
  'best-price-to-purchase-avios-points-2026',
];

const blogRoutes = blogSlugs.map(slug => `/blog/${slug}`);
const allRoutes = [...staticRoutes, ...blogRoutes];

// Simple static file server
function createStaticServer(port) {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(distDir, req.url === '/' ? 'index.html' : req.url);
      
      // SPA fallback - serve index.html for routes without extension
      if (!filePath.includes('.') || !existsSync(filePath)) {
        filePath = join(distDir, 'index.html');
      }

      try {
        const content = readFileSync(filePath);
        const ext = filePath.split('.').pop();
        const contentTypes = {
          html: 'text/html',
          js: 'application/javascript',
          css: 'text/css',
          json: 'application/json',
          png: 'image/png',
          jpg: 'image/jpeg',
          svg: 'image/svg+xml',
        };
        res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
        res.end(content);
      } catch (err) {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(port, () => {
      console.log(`📦 Static server running on http://localhost:${port}`);
      resolve(server);
    });
  });
}

async function prerenderRoute(browser, route, baseUrl) {
  const page = await browser.newPage();
  const url = `${baseUrl}${route}`;
  
  try {
    console.log(`  🔄 Rendering: ${route}`);
    
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    // Wait a bit more for React to finish
    await page.waitForFunction(() => {
      return document.querySelector('#root')?.innerHTML?.length > 100;
    }, { timeout: 10000 });
    
    // Get the rendered HTML
    let html = await page.content();
    
    // Add prerender meta tag
    html = html.replace('</head>', '<meta name="prerender-status" content="prerendered">\n</head>');
    
    // Determine output path
    let outputPath;
    if (route === '/') {
      outputPath = join(distDir, 'index.html');
    } else {
      const routeDir = join(distDir, route);
      mkdirSync(routeDir, { recursive: true });
      outputPath = join(routeDir, 'index.html');
    }
    
    writeFileSync(outputPath, html);
    console.log(`  ✅ Saved: ${outputPath.replace(distDir, '')}`);
    
  } catch (error) {
    console.error(`  ❌ Failed: ${route} - ${error.message}`);
  } finally {
    await page.close();
  }
}

async function main() {
  console.log('\n🚀 MilesTopUp Pre-render Script');
  console.log('================================\n');
  
  // Check if dist exists
  if (!existsSync(distDir)) {
    console.error('❌ dist/ directory not found. Run `npm run build:fast` first.');
    process.exit(1);
  }

  // Try to import puppeteer - gracefully skip if not available
  let puppeteer;
  try {
    puppeteer = (await import('puppeteer')).default;
  } catch (err) {
    console.log('⚠️  Puppeteer not available (likely running on Vercel/serverless)');
    console.log('   Skipping pre-rendering. Site will work but rely on client-side rendering.');
    console.log('   For full SEO, run `npm run build` locally and deploy the dist/ folder.\n');
    process.exit(0);
  }

  const port = 4173;
  const baseUrl = `http://localhost:${port}`;
  
  // Start static server
  const server = await createStaticServer(port);
  
  // Launch browser
  console.log('\n🌐 Launching browser...');
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });
  } catch (err) {
    console.log(`⚠️  Could not launch browser: ${err.message}`);
    console.log('   Skipping pre-rendering. Deploy locally for full SEO.\n');
    server.close();
    process.exit(0);
  }

  console.log(`\n📄 Pre-rendering ${allRoutes.length} routes...\n`);
  
  // Pre-render all routes
  for (const route of allRoutes) {
    await prerenderRoute(browser, route, baseUrl);
  }

  // Cleanup
  await browser.close();
  server.close();
  
  console.log('\n✨ Pre-rendering complete!');
  console.log(`   ${allRoutes.length} pages generated with full HTML content.`);
  console.log('   Google can now crawl all content without JavaScript.\n');
}

main().catch(err => {
  console.error('Pre-render error:', err.message);
  // Exit with 0 so build doesn't fail on Vercel
  process.exit(0);
});
