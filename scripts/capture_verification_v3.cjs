const { spawn } = require('child_process');
const path = require('path');
const { chromium } = require('/usr/share/code/resources/app/node_modules/playwright-core');

const port = '5192';
const artifactDir = '/home/abaid-awan/.gemini/antigravity/brain/17235f0d-54ac-4371-8fa5-6df73844e70a';

const vite = spawn('npx', ['vite', '--port', port], {
  cwd: '/home/abaid-awan/.gemini/antigravity/scratch/dayim-developers',
  env: { ...process.env, BROWSER: 'none' },
});

let started = false;

vite.stdout.on('data', async (d) => {
  const str = d.toString();
  if (!started && (str.includes('ready in') || str.includes('Local:'))) {
    started = true;
    console.log(`Vite started on port ${port}. Running verification capture...`);
    try {
      const browser = await chromium.launch({
        executablePath: '/home/abaid-awan/.cache/ms-playwright/chromium_headless_shell-1217/chrome-headless-shell-linux64/chrome-headless-shell',
        args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
      });

      const viewports = [
        { width: 1440, height: 900, suffix: '1440' },
        { width: 390, height: 844, suffix: '390' },
      ];

      for (const vp of viewports) {
        const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
        await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(2200); // Wait for preloader to dismiss

        // 1. Hero Section
        const heroPath = path.join(artifactDir, `verified_hero_${vp.suffix}.png`);
        await page.screenshot({ path: heroPath, fullPage: false });
        console.log(`Captured: ${heroPath}`);

        // 2. Corridors & 3D Globe with Turkey tab and non-overlapping labels
        const globeSection = await page.$('#destinations-section');
        if (globeSection) {
          await globeSection.scrollIntoViewIfNeeded();
          await page.waitForTimeout(1600);
          const globePath = path.join(artifactDir, `verified_globe_${vp.suffix}.png`);
          await page.screenshot({ path: globePath, fullPage: false });
          console.log(`Captured: ${globePath}`);
        }

        // 3. Boarding Pass Process Section (4-step stage cards, title clearance, deliverables)
        const processSection = await page.$('#process-section');
        if (processSection) {
          await processSection.scrollIntoViewIfNeeded();
          await page.waitForTimeout(1200);
          const processPath = path.join(artifactDir, `verified_boarding_${vp.suffix}.png`);
          await page.screenshot({ path: processPath, fullPage: false });
          console.log(`Captured: ${processPath}`);
        }

        await page.close();
      }

      await browser.close();
      console.log('ALL VERIFICATION SCREENSHOTS CAPTURED SUCCESSFULLY!');
    } catch (err) {
      console.error('Error during capture:', err);
    } finally {
      vite.kill();
      process.exit(0);
    }
  }
});

vite.stderr.on('data', (d) => {
  console.error(d.toString());
});
