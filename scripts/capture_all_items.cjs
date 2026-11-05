const { spawn } = require('child_process');
const path = require('path');
const { chromium } = require('/usr/share/code/resources/app/node_modules/playwright-core');

const port = '5188';
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
    console.log(`Vite started on port ${port}. Capturing screenshots...`);
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
        await page.waitForTimeout(2500); // Wait for preloader to dismiss

        // 1. Hero (Item 5)
        const heroPath = path.join(artifactDir, `item5_hero_${vp.suffix}.png`);
        await page.screenshot({ path: heroPath, fullPage: false });
        console.log(`Captured: ${heroPath}`);

        // 2. Corridors & 3D Globe with Country Labels (Item 6)
        const globeSection = await page.$('#destinations-section');
        if (globeSection) {
          await globeSection.scrollIntoViewIfNeeded();
          await page.waitForTimeout(1500);
          const globePath = path.join(artifactDir, `item6_globe_${vp.suffix}.png`);
          await page.screenshot({ path: globePath, fullPage: false });
          console.log(`Captured: ${globePath}`);
        }

        // 3. Services List in Dawn Gradient (Item 3 & Item 7)
        const servicesSection = await page.$('#services-section');
        if (servicesSection) {
          await servicesSection.scrollIntoViewIfNeeded();
          await page.waitForTimeout(1000);
          const servicesPath = path.join(artifactDir, `item3_rebalance_${vp.suffix}.png`);
          await page.screenshot({ path: servicesPath, fullPage: false });
          console.log(`Captured: ${servicesPath}`);
        }

        // 4. Boarding Pass Process in Pearl/Aqua Mist (Item 4)
        const processSection = await page.$('#process-section');
        if (processSection) {
          await processSection.scrollIntoViewIfNeeded();
          await page.waitForTimeout(1000);
          const processPath = path.join(artifactDir, `item4_typography_${vp.suffix}.png`);
          await page.screenshot({ path: processPath, fullPage: false });
          console.log(`Captured: ${processPath}`);
        }

        // 5. 3D Passport & Consultation Form in Dawn (Item 1 & Item 7)
        const contactSection = await page.$('#contact-section');
        if (contactSection) {
          await contactSection.scrollIntoViewIfNeeded();
          await page.waitForTimeout(1500);
          const passportPath = path.join(artifactDir, `item1_passport_${vp.suffix}.png`);
          await page.screenshot({ path: passportPath, fullPage: false });
          console.log(`Captured: ${passportPath}`);
        }

        // 6. Service Detail Page (/services/visa-consultancy) (Item 7)
        await page.goto(`http://127.0.0.1:${port}/services/visa-consultancy`, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1500);
        const serviceDetailPath = path.join(artifactDir, `item7_service_page_${vp.suffix}.png`);
        await page.screenshot({ path: serviceDetailPath, fullPage: false });
        console.log(`Captured: ${serviceDetailPath}`);

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
