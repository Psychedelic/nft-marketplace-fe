#!/usr/bin/env node

// Mock Kyasshu API
// The Kyasshu service (kyasshu.fleek.co) and the Crowns asset canister
// are no longer available, so this serves deterministic Crowns-like
// data, with the same response shapes, for local development.
// No dependencies, run with: node .scripts/kyasshu-mock/server.js

const http = require('http');
const { URL } = require('url');

const PORT = Number(process.env.KYASSHU_MOCK_PORT || 4000);
// Note: keep "localhost" (not an IP), the app derives the thumbnail
// url with a regex that would also match "/127.0"
const BASE_URL = `http://localhost:${PORT}`;
const TOTAL_TOKENS = Number(process.env.KYASSHU_MOCK_TOKENS || 500);
const E8S = 100000000;

// Deterministic PRNG, so data is stable across restarts
const mulberry32 = (seed) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const random = mulberry32(2022);
const pick = (list) => list[Math.floor(random() * list.length)];

const TRAITS = {
  base: ['Bronze', 'Silver', 'Gold', 'Rose Gold', 'Platinum'],
  biggem: ['Ruby', 'Sapphire', 'Emerald', 'Diamond', 'Amethyst', 'Onyx'],
  rim: ['Bronze', 'Silver', 'Gold', 'Platinum'],
  smallgem: ['Ruby', 'Sapphire', 'Emerald', 'Diamond', 'Topaz'],
};

const COLORS = {
  Bronze: '#cd7f32',
  Silver: '#c0c0c0',
  Gold: '#ffd700',
  'Rose Gold': '#e0a899',
  Platinum: '#e5e4e2',
  Ruby: '#e0115f',
  Sapphire: '#0f52ba',
  Emerald: '#50c878',
  Diamond: '#b9f2ff',
  Amethyst: '#9966cc',
  Onyx: '#353839',
  Topaz: '#ffc87c',
};

// Principal text encoding (crc32 + base32), see the IC interface spec
const crc32 = (bytes) => {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let k = 0; k < 8; k += 1) {
      crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
};

const base32 = (bytes) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz234567';
  let bits = 0;
  let value = 0;
  let output = '';
  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      output += alphabet[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) output += alphabet[(value << (5 - bits)) & 31];
  return output;
};

const principalToText = (bytes) => {
  const checksum = crc32(bytes);
  const withChecksum = [
    (checksum >>> 24) & 0xff,
    (checksum >>> 16) & 0xff,
    (checksum >>> 8) & 0xff,
    checksum & 0xff,
    ...bytes,
  ];
  return base32(withChecksum).match(/.{1,5}/g).join('-');
};

const createPrincipal = () => {
  // Self-authenticating principals are 29 bytes, ending with 0x02
  const bytes = Array.from({ length: 28 }, () =>
    Math.floor(random() * 256),
  );
  bytes.push(0x02);
  return { bytes, text: principalToText(bytes) };
};

// The principal of a connected Plug wallet can be added as an owner
// to test "My NFTs", e.g. KYASSHU_MOCK_OWNER=xxxxx-...-xxx
const owners = Array.from({ length: 40 }, createPrincipal);
const extraOwner = process.env.KYASSHU_MOCK_OWNER;
const marketplacePrincipal = createPrincipal();

const pad = (index) => String(index).padStart(4, '0');
const textContent = (value) => ({ value: { TextContent: value } });
const toE8S = (amount) => String(Math.round(amount * E8S));

const now = Date.now();
const DAY = 24 * 60 * 60 * 1000;

const tokens = Array.from({ length: TOTAL_TOKENS }, (_, index) => {
  const traits = Object.fromEntries(
    Object.entries(TRAITS).map(([name, values]) => [name, pick(values)]),
  );
  const owner = pick(owners);
  const roll = random();
  const isForSale = roll < 0.35;
  const hasOffer = roll > 0.25 && roll < 0.6;
  const wasSold = random() < 0.4;
  const lastModified = now - Math.floor(random() * 90 * DAY);
  const lastSale = wasSold
    ? random() < 0.5
      ? lastModified
      : lastModified - Math.floor(random() * 30 * DAY)
    : undefined;
  const currentPrice = isForSale ? 1 + random() * 49 : undefined;
  const lastOfferPrice = hasOffer ? 0.5 + random() * 30 : undefined;
  const lastSalePrice = wasSold ? 1 + random() * 40 : undefined;

  let status = '';
  if (isForSale) status = 'forSale';
  else if (hasOffer) status = 'forOffer';

  return {
    index: String(index),
    url: `${BASE_URL}/assets/${pad(index)}.mp4`,
    owner:
      extraOwner && index % 10 === 0 ? extraOwner : owner.text,
    ownerBytes: owner.bytes,
    operator: isForSale ? marketplacePrincipal.text : undefined,
    status,
    currentPrice: currentPrice && toE8S(currentPrice),
    lastOfferPrice: lastOfferPrice && toE8S(lastOfferPrice),
    lastSalePrice: lastSalePrice && toE8S(lastSalePrice),
    lastSale: lastSale && String(lastSale),
    lastModified: String(lastModified),
    metadata: {
      ...Object.fromEntries(
        Object.entries(traits).map(([name, value]) => [
          name,
          textContent(value),
        ]),
      ),
      thumbnail: textContent(
        `${BASE_URL}/assets/thumbnails/${pad(index)}.png`,
      ),
      location: textContent(`${BASE_URL}/assets/${pad(index)}.mp4`),
    },
  };
});

const traitValue = (token, name) =>
  token.metadata?.[name]?.value?.TextContent;

const collectionTraits = Object.entries(TRAITS).map(([name, values]) => [
  name,
  values.map((value) => {
    const occurance = tokens.filter(
      (token) => traitValue(token, name) === value,
    ).length;
    return {
      value,
      occurance,
      rarity: Number(((occurance / tokens.length) * 100).toFixed(2)),
    };
  }),
]);

// CAP transaction history, derived from the token states
const capEvents = tokens
  .flatMap((token) => {
    const seller = { Principal: { _arr: token.ownerBytes } };
    const buyer = {
      Principal: { _arr: pick(owners).bytes },
    };
    const tokenId = { U64: token.index };
    const events = [];

    if (token.lastSalePrice) {
      events.push({
        operation: 'directBuy',
        time: Number(token.lastSale),
        details: [
          ['token_id', tokenId],
          ['seller', seller],
          ['buyer', buyer],
          ['price', { U64: token.lastSalePrice }],
        ],
      });
    }

    if (token.lastOfferPrice) {
      events.push({
        operation: 'makeOffer',
        time: Number(token.lastModified) - DAY,
        details: [
          ['token_id', tokenId],
          ['seller', seller],
          ['buyer', buyer],
          ['price', { U64: token.lastOfferPrice }],
        ],
      });
    }

    if (token.currentPrice) {
      events.push({
        operation: 'makeListing',
        time: Number(token.lastModified),
        details: [
          ['token_id', tokenId],
          ['seller', seller],
          ['list_price', { U64: token.currentPrice }],
          ['price', { U64: token.currentPrice }],
        ],
      });
    }

    return events;
  })
  .sort((a, b) => a.time - b.time);

const CAP_PAGE_SIZE = 64;
const capPages = Math.max(1, Math.ceil(capEvents.length / CAP_PAGE_SIZE));

const toCapItem = (event, page) => ({
  page: String(page),
  event: { ...event, caller: { _arr: marketplacePrincipal.bytes } },
});

// Strips mock-only fields from the token response
const serialize = ({ ownerBytes, ...token }) => token;

const filterTokens = (payload = {}) =>
  tokens.filter((token) => {
    if (payload.principal && token.owner !== payload.principal) {
      return false;
    }

    if (payload.status && token.status !== payload.status) return false;

    if (payload.search && !token.index.includes(String(payload.search))) {
      return false;
    }

    if (payload.price) {
      const field = payload.price.type || 'currentPrice';
      const value = Number(token[field]);
      if (!token[field]) return false;
      if (payload.price.min && value < payload.price.min) return false;
      if (payload.price.max && value > payload.price.max) return false;
    }

    if (Array.isArray(payload.traits)) {
      const matchesTraits = payload.traits.every(
        ({ name, values }) =>
          !values?.length || values.includes(traitValue(token, name)),
      );
      if (!matchesTraits) return false;
    }

    return true;
  });

const sortTokens = (list, sort, order) => {
  const direction = order === 'a' ? 1 : -1;
  return [...list].sort((a, b) => {
    // Tokens without the sort field go last
    if (!a[sort] && !b[sort]) return Number(a.index) - Number(b.index);
    if (!a[sort]) return 1;
    if (!b[sort]) return -1;
    return (Number(a[sort]) - Number(b[sort])) * direction;
  });
};

const thumbnailSvg = (token) => {
  const base = COLORS[traitValue(token, 'base')] || '#888';
  const rim = COLORS[traitValue(token, 'rim')] || '#ccc';
  const big = COLORS[traitValue(token, 'biggem')] || '#f00';
  const small = COLORS[traitValue(token, 'smallgem')] || '#00f';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <radialGradient id="bg" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#2a2a3a"/>
      <stop offset="100%" stop-color="#0d0d14"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" fill="url(#bg)"/>
  <path d="M106 340 L86 170 L176 240 L256 130 L336 240 L426 170 L406 340 Z" fill="${base}" stroke="${rim}" stroke-width="10" stroke-linejoin="round"/>
  <rect x="106" y="340" width="300" height="46" rx="8" fill="${rim}"/>
  <circle cx="256" cy="270" r="30" fill="${big}" stroke="#fff" stroke-opacity="0.6" stroke-width="4"/>
  <circle cx="166" cy="290" r="14" fill="${small}"/>
  <circle cx="346" cy="290" r="14" fill="${small}"/>
  <circle cx="86" cy="170" r="12" fill="${small}"/>
  <circle cx="256" cy="130" r="12" fill="${small}"/>
  <circle cx="426" cy="170" r="12" fill="${small}"/>
  <text x="256" y="460" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="36" font-weight="bold" fill="#fff">#${token.index}</text>
</svg>`;
};

const send = (res, status, body, contentType = 'application/json') => {
  res.writeHead(status, {
    'Content-Type': contentType,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': '*',
  });
  res.end(contentType === 'application/json' ? JSON.stringify(body) : body);
};

const readBody = (req) =>
  new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
  });

const routes = [
  // POST /marketplace/:collectionId/nfts/:sort/:order/:page?count=
  {
    method: 'POST',
    pattern: /^\/marketplace\/[^/]+\/nfts\/([^/]+)\/([^/]+)\/(\d+)\/?$/,
    handler: async (req, res, [sort, order, page], url) => {
      const payload = await readBody(req);
      const count = Number(url.searchParams.get('count') || 25);
      const list = sortTokens(filterTokens(payload), sort, order);
      const start = Number(page) * count;

      send(res, 200, {
        data: list.slice(start, start + count).map(serialize),
        pages: String(Math.ceil(list.length / count)),
        items: String(list.length),
      });
    },
  },
  // GET /marketplace/:collectionId/nft/:id
  {
    method: 'GET',
    pattern: /^\/marketplace\/[^/]+\/nft\/(\d+)\/?$/,
    handler: (req, res, [id]) => {
      const token = tokens[Number(id)];
      if (!token) return send(res, 404, { message: 'Not found' });
      send(res, 200, serialize(token));
    },
  },
  // GET /marketplace/:collectionId/data
  {
    method: 'GET',
    pattern: /^\/marketplace\/[^/]+\/data\/?$/,
    handler: (req, res) => {
      send(res, 200, {
        items: tokens.length,
        owners: new Set(tokens.map((token) => token.owner)).size,
        traits: collectionTraits,
      });
    },
  },
  // GET /cap/txns/:bucketId/?page=(last|n)
  {
    method: 'GET',
    pattern: /^\/cap\/txns\/[^/]+\/?$/,
    handler: (req, res, _, url) => {
      const pageParam = url.searchParams.get('page');
      const page =
        pageParam === 'last' || pageParam === null
          ? capPages - 1
          : Number(pageParam);
      const items = capEvents
        .slice(page * CAP_PAGE_SIZE, (page + 1) * CAP_PAGE_SIZE)
        .reverse()
        .map((event) => toCapItem(event, page));

      send(res, 200, { Items: items, Count: items.length });
    },
  },
  // GET /cap/token/txns/:marketplaceId/:tokenId
  {
    method: 'GET',
    pattern: /^\/cap\/token\/txns\/[^/]+\/(\d+)\/?$/,
    handler: (req, res, [tokenId]) => {
      const items = capEvents
        .filter((event) =>
          event.details.some(
            ([key, value]) => key === 'token_id' && value.U64 === tokenId,
          ),
        )
        .map((event) => toCapItem(event, 0));

      send(res, 200, { Items: items, Count: items.length });
    },
  },
  // GET /cap/capJellySync
  {
    method: 'GET',
    pattern: /^\/cap\/capJellySync\/?$/,
    handler: (req, res) => send(res, 200, { ok: true }),
  },
  // GET /assets/thumbnails/:id.png (served as svg)
  {
    method: 'GET',
    pattern: /^\/assets\/thumbnails\/(\d+)\.\w+$/,
    handler: (req, res, [id]) => {
      const token = tokens[Number(id)];
      if (!token) return send(res, 404, { message: 'Not found' });
      send(res, 200, thumbnailSvg(token), 'image/svg+xml');
    },
  },
];

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, '', 'text/plain');

  const url = new URL(req.url, BASE_URL);
  const route = routes.find(
    ({ method, pattern }) =>
      method === req.method && pattern.test(url.pathname),
  );

  if (!route) {
    // e.g. the video assets, the app falls back to the poster image
    return send(res, 404, { message: 'Not found' });
  }

  try {
    const params = url.pathname.match(route.pattern).slice(1);
    await route.handler(req, res, params, url);
  } catch (error) {
    console.error(error);
    send(res, 500, { message: error.message });
  }
});

server.listen(PORT, () => {
  console.log(
    `🤖 Mock Kyasshu API at ${BASE_URL} (${tokens.length} tokens, ${capEvents.length} CAP events)`,
  );
});
