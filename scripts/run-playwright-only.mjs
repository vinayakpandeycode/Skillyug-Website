import playwright from 'playwright';

async function waitForUp(url, timeout = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch (e) {}
    await new Promise(r => setTimeout(r, 500));
  }
  throw new Error('Server not responding in time');
}

async function run() {
  const port = process.env.TEST_PORT || 3001;
  const base = `http://127.0.0.1:${port}`;
  console.log('Waiting for server at', base);
  await waitForUp(base);

  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('1) Visit preview route and expect modal to appear');
    await page.goto(`${base}/preview-independence`, { waitUntil: 'networkidle' });
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
    await page.goto(`${base}/`, { waitUntil: 'networkidle' });
    const homeDialog = await page.$('div[role="dialog"]');
    if (!homeDialog) throw new Error('Expected modal to appear on home page on 15 Aug 2026');
    console.log('  ✓ Modal appeared on home page (expected for 15 Aug 2026)');

    console.log('5) Verify Contact Us phone and email links');
    await page.goto(`${base}/contact`, { waitUntil: 'networkidle' });
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
    process.exit(1);
  }

  await browser.close();
  process.exit(0);
}

run();
