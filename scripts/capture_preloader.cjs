const { spawn } = require('child_process');
const path = require('path');
const { chromium } = require('/usr/share/code/resources/app/node_modules/playwright-core');

const prefix = 'item2_preloader';
const port = '5184';
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
    console.log(`Vite started on port ${port}. Capturing preloader...`);
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
        // Fresh context so sessionStorage is empty
        const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
        const page = await context.newPage();
        await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'commit' });
        // Capture while preloader is active (at 400ms)
        await page.waitForTimeout(400);

        const outPath = path.join(artifactDir, `${prefix}_${vp.suffix}.png`);
        await page.screenshot({ path: outPath, fullPage: false });
        console.log(`Captured preloader during animation: ${outPath}`);

        // Wait 2500ms to verify that preloader closes completely
        await page.waitForTimeout(2500);
        const preloaderEl = await page.$('.fixed.inset-0.z-\\[99999\\]');
        console.log(`Preloader dismissed check for ${vp.suffix}: ${preloaderEl === null ? 'SUCCESS (DISMISSED)' : 'STILL PRESENT'}`);

        await page.close();
        await context.close();
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
