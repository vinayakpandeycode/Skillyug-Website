import { spawn } from "child_process";
import path from "path";
import fs from "fs";

async function run() {
  const root = process.cwd();

  // ensure build exists
  console.log("Building app (npx next build)...");
  await runCmd("npx", ["next", "build"], { cwd: root });

  // start next start on a configurable port (use TEST_PORT env var to override)
  const port = process.env.TEST_PORT ? Number(process.env.TEST_PORT) : 3001;
  console.log(`Starting production server on http://localhost:${port}...`);
  const server = spawn('npx', ["next", "start", "-p", String(port)], { cwd: root, env: { ...process.env }, stdio: ["ignore", "pipe", "pipe"], shell: true });

  server.stdout.on("data", d => process.stdout.write(d));
  server.stderr.on("data", d => process.stderr.write(d));

  // wait for server ready by polling
  await waitForServer(port, 120000);

  // dynamic import playwright
  let playwright;
  try {
    playwright = await import('playwright');
  } catch (e) {
    console.error('Playwright is not installed. Please run `npm install -D playwright` and retry.');
    server.kill();
    process.exit(2);
  }

  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('1) Visit preview route and expect modal to appear');
    await page.goto(`http://localhost:${port}/preview-independence`, { waitUntil: 'networkidle' });
    await page.waitForSelector('div[role="dialog"]', { timeout: 5000 });
    console.log('  ✓ Modal appeared on preview route');

    console.log('2) Click Continue to Website and verify it hides and sessionStorage is set');
    await page.click('text=Continue to Website');
    await page.waitForSelector('div[role="dialog"]', { state: 'detached', timeout: 5000 });
    const stored = await page.evaluate(() => sessionStorage.getItem('skillyug_independence_popup_closed_2026-08-15'));
    if (!stored) throw new Error('sessionStorage key not set after closing');
    console.log('  ✓ Modal closed and sessionStorage set');

    console.log('3) Refresh preview page and ensure modal does not reappear this session');
    await page.reload({ waitUntil: 'networkidle' });
    const presentAfterReload = await page.$('div[role="dialog"]');
    if (presentAfterReload) throw new Error('Modal reappeared after closing in same session');
    console.log('  ✓ Modal did not reappear after refresh');

    console.log('4) Verify modal behavior on home page (date-aware)');
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });
    const homeDialog = await page.$('div[role="dialog"]');
    if (!homeDialog) throw new Error('Expected modal to appear on home page on 15 Aug 2026');
    console.log('  ✓ Modal appeared on home page (expected for 15 Aug 2026)');

    console.log('5) Verify Contact Us phone and email links');
    await page.goto(`http://localhost:${port}/contact`, { waitUntil: 'networkidle' });
    const mail = await page.$('a[href^="mailto:"]');
    const tel = await page.$('a[href^="tel:"]');
    if (!mail) throw new Error('mailto link not found on Contact page');
    if (!tel) throw new Error('tel link not found on Contact page');
    const mailHref = await mail.getAttribute('href');
    const telHref = await tel.getAttribute('href');
    console.log(`  ✓ mailto found: ${mailHref}`);
    console.log(`  ✓ tel found: ${telHref}`);

    console.log('\nAll checks passed.');
  } catch (err) {
    console.error('Test failed:', err && err.message ? err.message : err);
    await browser.close();
    server.kill();
    process.exit(1);
  }

  await browser.close();
  server.kill();
  process.exit(0);
}

function runCmd(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: 'inherit', shell: true, ...opts });
    p.on('exit', (code) => {
      if (code === 0) resolve(); else reject(new Error(`${cmd} exited ${code}`));
    });
    p.on('error', reject);
  });
}

function waitForServer(port, timeout = 60000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    (async function check() {
      try {
        const res = await fetch(`http://127.0.0.1:${port}/`, { method: 'GET' });
        if (res) return resolve();
      } catch (e) {
        if (Date.now() - start > timeout) return reject(new Error('Server did not start in time'));
        setTimeout(check, 500);
      }
    })();
  });
}

run();
