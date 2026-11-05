const { spawn } = require('child_process');
const path = require('path');
const { chromium } = require('/usr/share/code/resources/app/node_modules/playwright-core');

const prefix = process.argv[2] || 'item1';
const scrollTarget = process.argv[3] || '';
const port = process.argv[4] || '5182';

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
    console.log(`Vite started on port ${port}. Launching browser for prefix ${prefix}...`);
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
        await page.waitForTimeout(2500); // Allow preloader and 3D scenes to settle

        if (scrollTarget) {
          const el = await page.$(scrollTarget);
          if (el) {
            await el.scrollIntoViewIfNeeded();
            await page.waitForTimeout(1000);
          }
        }

        const outPath = path.join(artifactDir, `${prefix}_${vp.suffix}.png`);
        await page.screenshot({ path: outPath, fullPage: false });
        console.log(`Captured: ${outPath}`);
        await page.close();
      }

      await browser.close();
      vite.kill();
      process.exit(0);
    } catch (err) {
      console.error('Error during capture:', err);
      vite.kill();
      process.exit(1);
    }
  }
});

vite.stderr.on('data', (d) => {
  const errStr = d.toString();
  if (errStr.includes('Error:')) {
    console.error('Vite stderr:', errStr);
  }
});

setTimeout(() => {
  if (!started) {
    console.error('Timeout waiting for Vite to start');
    vite.kill();
    process.exit(1);
  }
}, 25000);
