// Captures app screenshots via the Chrome DevTools Protocol (no deps, Node 24)
// usage: node shots.mjs <appUrl> <outDir>
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const [APP = 'http://localhost:3123', OUT = './screenshots'] = process.argv.slice(2);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9333;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

mkdirSync(OUT, { recursive: true });
const profile = join(process.env.SCRATCH || tmpdir(), `shots-profile-${Date.now()}`);
const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, 'about:blank',
], { stdio: 'ignore' });

let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  try {
    target = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find((t) => t.type === 'page');
  } catch {}
}

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let id = 0;
const pending = new Map();
const errors = [];
ws.addEventListener('message', ({ data }) => {
  const msg = JSON.parse(data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  } else if (msg.method === 'Runtime.exceptionThrown') {
    errors.push(msg.params.exceptionDetails?.exception?.description?.split('\n')[0]);
  }
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const n = ++id;
    pending.set(n, (m) => (m.error ? reject(new Error(`${method}: ${m.error.message}`)) : resolve(m.result)));
    ws.send(JSON.stringify({ id: n, method, params }));
  });
const evaluate = async (expression) =>
  (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result?.value;

await send('Page.enable');
await send('Runtime.enable');

const setViewport = (width, height, mobile = false) =>
  send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: mobile ? 3 : 2, mobile });

const goto = async (path, { theme = 'lightTheme', wait = 7000 } = {}) => {
  // Theme is persisted in localStorage, so set it on the origin first
  await send('Page.navigate', { url: `${APP}/` });
  await sleep(500);
  await evaluate(`localStorage.setItem('theme', '${theme}')`);
  await send('Page.navigate', { url: `${APP}${path}` });
  await sleep(wait);
};

// Clicks the first element of `selector` whose text matches exactly
const clickText = async (text, selector = 'button') => {
  const ok = await evaluate(`(() => {
    const el = [...document.querySelectorAll(${JSON.stringify(selector)})]
      .find((e) => e.textContent.trim() === ${JSON.stringify(text)});
    if (!el) return false;
    el.scrollIntoView({ block: 'center' });
    el.click();
    return true;
  })()`);
  if (!ok) console.warn(`  ⚠️  could not find "${text}" (${selector})`);
  await sleep(2500);
  return ok;
};

const shot = async (name, { fullPage = false } = {}) => {
  // Hides the CRA dev-server error overlay (benign ResizeObserver warnings)
  await evaluate(`document.querySelectorAll('#webpack-dev-server-client-overlay, body > iframe').forEach((e) => e.remove())`);
  await evaluate('window.scrollTo(0, 0)');
  await sleep(300);
  const params = { format: 'png' };
  if (fullPage) {
    const { cssContentSize } = await send('Page.getLayoutMetrics');
    params.captureBeyondViewport = true;
    params.clip = { x: 0, y: 0, width: cssContentSize.width, height: Math.min(cssContentSize.height, 6000), scale: 1 };
  }
  const { data } = await send('Page.captureScreenshot', params);
  writeFileSync(join(OUT, `${name}.png`), Buffer.from(data, 'base64'));
  console.log(`📸 ${name}.png`);
};

try {
  // Desktop
  await setViewport(1440, 900);
  await goto('/');
  await shot('01-collection-items');
  await shot('02-collection-items-full-page', { fullPage: true });

  await clickText('Buy Now');
  await shot('03-filter-status-buy-now');

  await goto('/');
  await clickText('Base');
  await clickText('Gold', 'label, span, p, div');
  await shot('04-filter-trait-base-gold');

  await goto('/activity');
  await shot('05-activity');

  await goto('/nft/377');
  await shot('06-nft-detail', { fullPage: true });

  // Dark theme
  await goto('/', { theme: 'darkTheme' });
  await shot('07-collection-items-dark');
  await goto('/nft/377', { theme: 'darkTheme' });
  await shot('08-nft-detail-dark', { fullPage: true });

  // Mobile
  await setViewport(390, 844, true);
  await goto('/');
  await shot('09-mobile-collection-items');
  await goto('/nft/377');
  await shot('10-mobile-nft-detail', { fullPage: true });
} finally {
  if (errors.length) console.log('Page exceptions:', [...new Set(errors)].slice(0, 10));
  ws.close();
  chrome.kill();
  await sleep(500);
  rmSync(profile, { recursive: true, force: true });
}
