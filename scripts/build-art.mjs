/**
 * Draws the illustrated stand-ins used across the site and exports them as
 * transparent WebP files.
 *
 *   node scripts/build-art.mjs
 *
 *   public/art/<name>.webp    cut-outs for the breakfast-table collage
 *   public/jars/<id>.webp     one jar per product
 *   public/paper.webp         tiling butter-paper texture
 *
 * To use real photography, replace a file with a transparent WebP of the same
 * name and similar proportions. No code changes needed. Re-running this script
 * overwrites everything, so stop using it once photos are in place.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const ART = path.join(root, "public/art");
const JARS = path.join(root, "public/jars");
fs.mkdirSync(ART, { recursive: true });
fs.mkdirSync(JARS, { recursive: true });

const C = {
  ink: "#12332A",
  green: "#07745B",
  green2: "#418764",
  teal: "#04AE97",
  pink: "#F283AE",
  pinkD: "#D85887",
  aqua: "#87D1CC",
  lime: "#BDD39E",
  card: "#FFFBEC",
  butter: "#FFE28A",
  butterD: "#EFC456",
  crust: "#A8622E",
};

/* ---------- helpers ---------- */
const rng = (seed) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};
const lin = (id, stops, x2 = 1, y2 = 0) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops
    .map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`)
    .join("")}</linearGradient>`;
const rad = (id, stops, cx = 0.35, cy = 0.3, r = 0.8) =>
  `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops
    .map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`)
    .join("")}</radialGradient>`;

const filters = ({ rough = 3, border = 0, grain = 0.22, seed = 4 }) => `
  <filter id="rough" x="-10%" y="-10%" width="120%" height="120%">
    <feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves="2" seed="${seed}" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="${rough}" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="grain" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" seed="${seed + 9}" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.07  0 0 0 0 0.16  0 0 0 0 0.12  0 0 0 -2.6 1.45" result="d"/>
    <feComposite in="d" in2="SourceAlpha" operator="in" result="dm"/>
    <feComponentTransfer in="dm" result="dk"><feFuncA type="linear" slope="${grain}"/></feComponentTransfer>
    <feTurbulence type="fractalNoise" baseFrequency="0.06 0.12" numOctaves="3" seed="${seed + 21}" result="n2"/>
    <feColorMatrix in="n2" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 0.94  0 0 0 3 -1.45" result="l"/>
    <feComposite in="l" in2="SourceAlpha" operator="in" result="lm"/>
    <feComponentTransfer in="lm" result="lt"><feFuncA type="linear" slope="${grain * 0.8}"/></feComponentTransfer>
    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="lt"/><feMergeNode in="dk"/></feMerge>
  </filter>
  <filter id="cut" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB">
    <feGaussianBlur in="SourceAlpha" stdDeviation="${border || 0.01}" result="b"/>
    <feComponentTransfer in="b" result="o"><feFuncA type="linear" slope="16" intercept="-0.9"/></feComponentTransfer>
    <feFlood flood-color="#FFFDF4"/><feComposite in2="o" operator="in" result="edge"/>
    <feMerge><feMergeNode in="edge"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
    <feGaussianBlur in="SourceAlpha" stdDeviation="7" result="b"/>
    <feOffset in="b" dx="4" dy="9" result="o"/>
    <feColorMatrix in="o" type="matrix" values="0 0 0 0 0.16  0 0 0 0 0.13  0 0 0 0 0.04  0 0 0 0.34 0" result="s1"/>
    <feGaussianBlur in="SourceAlpha" stdDeviation="1.6" result="b2"/>
    <feOffset in="b2" dx="1" dy="2" result="o2"/>
    <feColorMatrix in="o2" type="matrix" values="0 0 0 0 0.16  0 0 0 0 0.13  0 0 0 0 0.04  0 0 0 0.3 0" result="s2"/>
    <feMerge><feMergeNode in="s1"/><feMergeNode in="s2"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>`;

const PAD = 34;
async function render(file, w, h, defs, body, opts = {}) {
  const { scale = 1.6, border = 4.5, rough = 3, grain = 0.22, seed = 4 } = opts;
  const W = w + PAD * 2;
  const H = h + PAD * 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="${-PAD} ${-PAD} ${W} ${H}" width="${Math.round(W * scale)}" height="${Math.round(H * scale)}">
  <defs>${filters({ rough, border, grain, seed })}${defs}</defs>
  <g filter="url(#shadow)"><g ${border ? 'filter="url(#cut)"' : ""}><g filter="url(#grain)"><g filter="url(#rough)">${body}</g></g></g></g></svg>`;
  await sharp(Buffer.from(svg)).trim({ threshold: 1 }).webp({ quality: 86, alphaQuality: 92 }).toFile(file);
}
const art = (name, ...rest) => render(path.join(ART, `${name}.webp`), ...rest);

const HAND = "font-family=\"Ink Free, Segoe Print, cursive\" font-weight=\"700\"";
const TYPE = "font-family=\"Courier New, monospace\" font-weight=\"700\"";
const SERIF = "font-family=\"Georgia, serif\"";

/* ---------- food ---------- */
async function food() {
  // toast
  {
    const r = rng(11);
    const bread =
      "M62 132 C18 112 22 42 92 42 C134 18 246 18 288 42 C358 42 362 112 318 132 L326 288 C327 316 312 326 290 326 L90 326 C68 326 53 316 54 288 Z";
    let pores = "";
    for (let i = 0; i < 90; i++) {
      const x = 84 + r() * 212, y = 66 + r() * 238;
      pores += `<ellipse cx="${x}" cy="${y}" rx="${1.5 + r() * 4}" ry="${1 + r() * 2.6}" fill="#C98944" opacity="${0.25 + r() * 0.4}" transform="rotate(${r() * 90} ${x} ${y})"/>`;
    }
    await art("toast", 380, 350,
      lin("cr", [[0, "#8F4F22"], [0.5, "#B87238"], [1, "#8A4A1F"]]) +
        rad("in", [[0, "#F9DDA2"], [0.65, "#EDC27C"], [1, "#C98A48"]], 0.5, 0.5, 0.62) +
        lin("bt", [[0, "#FFF3B8"], [0.6, "#FFDD76"], [1, "#EDBE4C"]], 0.4, 1),
      `<path d="${bread}" fill="url(#cr)"/>
       <g transform="translate(19 18) scale(.9)"><path d="${bread}" fill="url(#in)"/></g>${pores}
       <path d="M92 214 C80 160 128 112 180 128 C216 140 224 100 262 112 C300 126 292 190 262 204 C236 216 244 250 208 256 C176 262 170 236 146 246 C118 256 98 244 92 214 Z" fill="#E7B64A" opacity=".55" transform="translate(5 8)"/>
       <path d="M92 214 C80 160 128 112 180 128 C216 140 224 100 262 112 C300 126 292 190 262 204 C236 216 244 250 208 256 C176 262 170 236 146 246 C118 256 98 244 92 214 Z" fill="url(#bt)"/>
       <path d="M112 200 C112 164 144 142 176 150 C208 158 226 130 252 134" stroke="#FFFBE0" stroke-width="9" stroke-linecap="round" fill="none" opacity=".9"/>
       <path d="M136 222 C156 208 180 226 200 216 C220 206 220 190 244 180" stroke="#E9BD52" stroke-width="5" stroke-linecap="round" fill="none" opacity=".8"/>`,
      { seed: 2 });
  }
  // butter block with wrapper
  await art("butter", 400, 220,
    lin("fr", [[0, "#FFE48E"], [1, "#F2C95F"]], 0, 1) + lin("tp", [[0, "#FFF4BE"], [1, "#FFE89A"]]) + lin("sd", [[0, "#E5B64A"], [1, "#D9A63C"]], 0, 1),
    `<path d="M28 116 L56 84 L78 84 L50 116 Z" fill="url(#tp)"/><path d="M28 116 L50 116 L50 196 L28 196 Z" fill="url(#fr)"/><path d="M50 116 L78 84 L78 164 L50 196 Z" fill="url(#sd)"/>
     <path d="M96 106 L146 56 L366 56 L316 106 Z" fill="url(#tp)"/><path d="M96 106 L316 106 L316 190 L96 190 Z" fill="url(#fr)"/><path d="M316 106 L366 56 L366 140 L316 190 Z" fill="url(#sd)"/>
     <path d="M196 106 L210 92 L206 84 L222 78 L222 66 L238 62 L240 56 L366 56 L366 140 L316 190 L190 190 L202 178 L188 166 L204 152 L188 138 L204 124 Z" fill="${C.card}"/>
     <path d="M316 106 L366 56 L366 140 L316 190 Z" fill="#E6DCC0"/>
     <path d="M196 106 L210 92 L206 84 L222 78 L222 66 L238 62 L240 56 L366 56 L316 106 Z" fill="#FFFEF6"/>
     <path d="M200 124 L316 124 L316 138 L192 138 Z M196 160 L316 160 L316 172 L196 172 Z" fill="${C.green}"/>
     <path d="M316 124 L366 74 L366 88 L316 138 Z M316 160 L366 110 L366 122 L316 172 Z" fill="#055A47"/>
     <text x="258" y="156" ${TYPE} font-size="17" text-anchor="middle" letter-spacing="3" fill="${C.pinkD}">BUTTER</text>
     <path d="M112 118 L112 178" stroke="#FFF6C9" stroke-width="5" stroke-linecap="round"/>`,
    { seed: 6, rough: 2 });
  // knife
  await art("knife", 530, 92,
    lin("bl", [[0, "#F3F6F3"], [0.45, "#C9D3D0"], [0.55, "#F8FAF8"], [1, "#A5B3B0"]], 0, 1) + lin("hd", [[0, "#0E9474"], [0.5, C.green], [1, "#044A3A"]], 0, 1),
    `<path d="M14 46 C12 24 34 20 58 22 L196 32 L196 60 L58 70 C34 72 14 68 14 46 Z" fill="url(#hd)"/>
     <circle cx="70" cy="46" r="6" fill="#F0E6B8"/><circle cx="150" cy="46" r="6" fill="#F0E6B8"/>
     <rect x="192" y="28" width="20" height="36" rx="5" fill="#B8C4C0"/>
     <path d="M210 32 L430 20 C486 16 516 36 516 52 C516 70 474 76 430 70 L210 60 Z" fill="url(#bl)"/>
     <path d="M400 18 C440 2 506 14 520 44 C528 66 500 82 470 72 C450 66 452 48 428 48 C406 48 392 30 400 18 Z" fill="${C.butter}"/>
     <path d="M416 24 C446 12 488 20 504 42" stroke="#FFF8D2" stroke-width="7" stroke-linecap="round" fill="none"/>
     <path d="M470 70 C486 76 506 72 516 58" stroke="${C.butterD}" stroke-width="5" stroke-linecap="round" fill="none"/>`,
    { seed: 3, rough: 2 });
  // whisk
  {
    const loops = [62, 46, 30, 14].map((rx) => `<path d="M76 176 C${76 - rx * 1.45} 110 ${76 - rx * 1.2} 14 76 10 C${76 + rx * 1.2} 14 ${76 + rx * 1.45} 110 76 176" fill="none" stroke="#8E9C98" stroke-width="5.5"/><path d="M76 176 C${76 - rx * 1.45} 110 ${76 - rx * 1.2} 14 76 10 C${76 + rx * 1.2} 14 ${76 + rx * 1.45} 110 76 176" fill="none" stroke="#E6ECEA" stroke-width="2" transform="translate(-1 -1)"/>`).join("");
    await art("whisk", 152, 470, lin("wh", [[0, "#F6A8C6"], [0.5, C.pink], [1, "#B8406F"]]),
      `${loops}<path d="M30 92 C34 40 60 14 76 12 C96 16 116 44 120 88 C112 116 96 96 86 112 C74 128 64 102 52 112 C42 118 32 112 30 92 Z" fill="#FFF1B4" opacity=".96"/><path d="M44 76 C50 44 64 30 78 26" stroke="#FFFDEB" stroke-width="7" stroke-linecap="round" fill="none"/>
       <rect x="62" y="168" width="28" height="34" rx="6" fill="#B8C4C0"/><path d="M60 198 C56 260 54 330 56 432 C56 462 96 462 96 432 C98 330 96 260 92 198 Z" fill="url(#wh)"/><circle cx="76" cy="436" r="7" fill="#FFFBEC"/>`,
      { seed: 8, rough: 2, border: 5 });
  }
  // honey dipper
  await art("dipper", 170, 440, lin("wd", [[0, "#E2AC6B"], [0.5, "#C78A48"], [1, "#935E2A"]]) + lin("hn", [[0, "#FFD766"], [0.5, "#F5AE26"], [1, "#C97A0C"]]),
    `<rect x="74" y="14" width="22" height="260" rx="11" fill="url(#wd)"/>
     ${[[262, 30], [284, 46], [308, 54], [332, 54], [356, 46], [378, 30]].map(([y, rx]) => `<ellipse cx="85" cy="${y}" rx="${rx}" ry="12" fill="url(#wd)"/><ellipse cx="85" cy="${y - 4}" rx="${rx - 5}" ry="5" fill="#EBC08A" opacity=".6"/>`).join("")}
     <path d="M32 318 C36 300 60 292 86 296 C118 292 140 306 140 330 C140 352 126 362 122 384 C118 408 110 432 102 432 C92 432 96 400 88 392 C78 384 70 412 60 410 C50 406 54 372 44 356 C36 344 30 334 32 318 Z" fill="url(#hn)" opacity=".92"/>
     <path d="M48 320 C58 308 78 306 92 310" stroke="#FFF2BE" stroke-width="7" stroke-linecap="round" fill="none"/>`, { seed: 12 });
  // karak chai
  await art("chai", 240, 280, lin("ch", [[0, "#8E5426"], [0.4, "#C2834A"], [1, "#844A1E"]]) + lin("gl", [[0, "#FFFFFF", 0.75], [0.3, "#FFFFFF", 0.1], [1, "#FFFFFF", 0.35]]),
    `<ellipse cx="112" cy="250" rx="100" ry="24" fill="${C.aqua}"/><ellipse cx="112" cy="244" rx="84" ry="17" fill="#A8E2DD"/>
     <path d="M44 34 C50 90 62 120 66 150 C70 186 60 216 78 240 L146 240 C164 216 154 186 158 150 C162 120 174 90 180 34 Z" fill="#DDEDE9"/>
     <path d="M50 62 C56 100 66 124 70 152 C74 186 66 212 82 232 L142 232 C158 212 150 186 154 152 C158 124 168 100 174 62 Z" fill="url(#ch)"/>
     <ellipse cx="112" cy="62" rx="62" ry="13" fill="#E3B27C"/><ellipse cx="104" cy="60" rx="34" ry="6" fill="#F2D2A6"/>
     <ellipse cx="112" cy="34" rx="68" ry="13" fill="none" stroke="#C9DEDA" stroke-width="4"/>
     <path d="M44 34 C50 90 62 120 66 150 C70 186 60 216 78 240 L146 240 C164 216 154 186 158 150 C162 120 174 90 180 34 Z" fill="url(#gl)"/>
     <path d="M66 82 C72 112 80 130 82 156" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none" opacity=".75"/>
     <ellipse cx="206" cy="236" rx="19" ry="10" fill="#9DB36C" transform="rotate(-24 206 236)"/><path d="M190 242 L222 230" stroke="#6F8744" stroke-width="2.5"/>`, { seed: 5, rough: 2 });
  // garlic
  await art("garlic", 270, 260, rad("ga", [[0, "#FFFFFA"], [0.6, "#F3EBD8"], [1, "#CDB9A6"]]) + rad("cl", [[0, "#FFF9EA"], [1, "#DCC5A6"]]),
    `<path d="M114 14 C110 56 106 80 92 96 C46 112 18 150 26 194 C34 236 76 246 114 246 C152 246 194 236 202 194 C210 150 182 112 138 96 C126 80 126 56 130 12 Z" fill="url(#ga)"/>
     <path d="M112 96 C74 128 66 200 98 244 M120 92 C122 150 122 200 116 246 M128 96 C164 130 168 200 138 244" stroke="#C7A7B4" stroke-width="4" fill="none" opacity=".75"/>
     <path d="M56 146 C46 170 46 196 58 218" stroke="#fff" stroke-width="9" stroke-linecap="round" fill="none"/>
     <path d="M30 190 C36 220 60 236 90 242" stroke="#B88BA6" stroke-width="6" fill="none" opacity=".35"/>
     <path d="M210 232 C186 214 190 176 214 150 C244 172 258 212 240 236 C232 244 218 242 210 232 Z" fill="url(#cl)"/><path d="M214 156 C206 186 210 214 222 238" stroke="#C49A86" stroke-width="3" fill="none"/>`, { seed: 7 });
  // chilli
  await art("chilli", 330, 170, lin("cl", [[0, "#F0533A"], [0.5, "#D22B22"], [1, "#8E1418"]], 0.2, 1) + lin("st", [[0, "#8BB35A"], [1, "#4B7A32"]]),
    `<path d="M62 46 C110 22 186 40 236 82 C268 110 296 120 316 112 C300 152 222 160 154 128 C112 108 74 116 54 92 C42 78 46 56 62 46 Z" fill="url(#cl)"/>
     <path d="M88 56 C134 46 184 66 222 98" stroke="#FFB49A" stroke-width="9" stroke-linecap="round" fill="none" opacity=".9"/>
     <path d="M78 38 C58 36 42 52 44 76 C46 98 62 108 78 104 C70 92 80 84 72 74 C80 64 70 52 78 38 Z" fill="url(#st)"/>
     <path d="M48 70 C30 66 20 48 10 34" stroke="#5C8A3A" stroke-width="11" stroke-linecap="round" fill="none"/>`, { seed: 9 });
  // lime
  {
    let seg = "";
    for (let i = 0; i < 9; i++) {
      const a = (i * 40 * Math.PI) / 180, b = ((i * 40 + 34) * Math.PI) / 180, m = ((i * 40 + 17) * Math.PI) / 180;
      const p = (t, R) => `${100 + Math.cos(t) * R} ${100 + Math.sin(t) * R}`;
      seg += `<path d="M${p(m, 12)} L${p(a, 66)} Q${p(m, 80)} ${p(b, 66)} Z" fill="url(#sg)" stroke="#D8EAA4" stroke-width="3" stroke-linejoin="round"/>`;
    }
    await art("lime", 200, 200, rad("sg", [[0, "#E4F0A6"], [1, "#A9CC4E"]], 0.5, 0.5, 0.7),
      `<circle cx="100" cy="100" r="92" fill="#6EA032"/><circle cx="100" cy="100" r="84" fill="#F4F8DA"/>${seg}<path d="M44 60 A70 70 0 0 1 84 32" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity=".8"/>`, { seed: 10 });
  }
  // raspberries
  {
    const berry = (cx, cy, s, rot, seed) => {
      const r = rng(seed);
      let d = "";
      for (let row = 0; row < 6; row++) {
        const n = [5, 6, 6, 5, 4, 2][row];
        for (let i = 0; i < n; i++) {
          const x = (i - (n - 1) / 2) * 21 + (row % 2 ? 3 : -3) + r() * 4, y = -44 + row * 22;
          d += `<circle cx="${x}" cy="${y}" r="15" fill="url(#rb)"/><circle cx="${x - 4}" cy="${y - 5}" r="3.6" fill="#FFD3E0" opacity=".85"/>`;
        }
      }
      return `<g transform="translate(${cx} ${cy}) rotate(${rot}) scale(${s})">${d}<path d="M0 -58 C-30 -86 -54 -70 -62 -52 C-40 -52 -26 -40 -16 -48 C-10 -36 10 -36 16 -48 C28 -40 44 -52 62 -52 C52 -74 28 -84 0 -58 Z" fill="#5E9147"/><path d="M0 -60 C2 -78 0 -88 -8 -98" stroke="#5E9147" stroke-width="8" stroke-linecap="round" fill="none"/></g>`;
    };
    await art("raspberry", 290, 250, rad("rb", [[0, "#F46C96"], [0.6, "#D22C62"], [1, "#8E1140"]]),
      berry(96, 142, 1.05, -14, 3) + berry(212, 164, 0.8, 24, 8), { seed: 14, rough: 2 });
  }
  // saffron crocus
  await art("crocus", 250, 380, lin("pt", [[0, "#8E5FC0"], [0.6, "#B78BDD"], [1, "#E2CBF2"]], 0, 1) + lin("pt2", [[0, "#A377D2"], [1, "#D5B4EC"]], 0, 1),
    `<path d="M124 208 C126 270 118 320 108 372" stroke="#7FA65A" stroke-width="14" stroke-linecap="round" fill="none"/>
     <path d="M112 360 C70 320 50 250 42 190 C74 240 104 300 118 360 Z" fill="#5C8A45"/><path d="M116 362 C150 320 186 280 214 226 C200 290 160 340 122 370 Z" fill="#6E9C50"/>
     <path d="M124 220 C60 200 14 130 36 62 C84 84 118 140 126 216 Z" fill="url(#pt)"/><path d="M126 220 C190 200 238 130 214 60 C166 84 132 140 124 216 Z" fill="url(#pt)"/>
     <path d="M124 222 C84 160 82 66 124 14 C168 66 166 160 126 222 Z" fill="url(#pt2)"/>
     <path d="M124 222 C96 196 56 178 46 134 C88 132 120 168 126 218 Z" fill="#C6A2E4"/><path d="M126 222 C154 196 194 178 204 134 C162 132 130 168 124 218 Z" fill="#BC94DE"/>
     <path d="M124 200 C120 160 108 136 92 116 M126 200 C126 150 128 126 126 92 M128 200 C134 160 146 138 162 118" stroke="#E2531B" stroke-width="7" stroke-linecap="round" fill="none"/>
     <path d="M120 150 C112 100 116 60 124 34" stroke="#7B4DB0" stroke-width="2.5" fill="none" opacity=".5"/>`, { seed: 16 });
  // hazelnuts
  await art("hazelnut", 240, 170, rad("hz", [[0, "#D79A5A"], [0.6, "#A7652E"], [1, "#6A3A16"]]),
    `<path d="M20 96 C18 46 60 14 92 20 C128 24 148 62 140 104 C134 142 106 156 78 156 C46 156 22 138 20 96 Z" fill="url(#hz)"/><path d="M36 112 C54 132 108 134 128 112 C122 146 100 156 78 156 C54 156 40 140 36 112 Z" fill="#E2C095"/><path d="M50 50 C60 36 78 32 90 36" stroke="#F3CE9A" stroke-width="8" stroke-linecap="round" fill="none"/>
     <path d="M148 108 C150 76 176 60 200 70 C226 80 232 112 218 136 C204 158 172 160 158 144 C150 134 146 122 148 108 Z" fill="url(#hz)"/><path d="M152 126 C170 140 206 140 222 126 C214 152 194 160 178 156 C164 152 156 144 152 126 Z" fill="#E2C095"/><path d="M172 88 C180 80 190 80 198 84" stroke="#F3CE9A" stroke-width="6" stroke-linecap="round" fill="none"/>`, { seed: 18 });
  // peanuts
  {
    let net = "";
    for (let i = 0; i < 9; i++) net += `<path d="M${30 + i * 24} 24 C${40 + i * 22} 70 ${24 + i * 24} 100 ${36 + i * 22} 150" stroke="#A9783A" stroke-width="3" fill="none" opacity=".55"/>`;
    for (let i = 0; i < 5; i++) net += `<path d="M10 ${44 + i * 20} C80 ${34 + i * 22} 160 ${56 + i * 18} 250 ${42 + i * 20}" stroke="#A9783A" stroke-width="2.5" fill="none" opacity=".45"/>`;
    const sh = "M22 94 C16 44 70 22 104 46 C122 58 132 56 150 46 C190 24 240 50 234 94 C230 142 178 150 148 130 C132 120 120 122 104 132 C68 152 26 138 22 94 Z";
    await art("peanut", 256, 172, rad("pn", [[0, "#F2D59A"], [0.65, "#D9AE67"], [1, "#A67A38"]], 0.4, 0.25, 0.9) + `<clipPath id="pc"><path d="${sh}"/></clipPath>`,
      `<path d="${sh}" fill="url(#pn)"/><g clip-path="url(#pc)">${net}</g><path d="M48 72 C58 56 76 52 90 58" stroke="#FFF0CC" stroke-width="8" stroke-linecap="round" fill="none"/>`, { seed: 20 });
  }
  // dates
  await art("date", 250, 180, lin("dt", [[0, "#8E4A22"], [0.45, "#5E2A12"], [1, "#321308"]], 0.2, 1),
    `<g transform="rotate(-18 110 70)"><rect x="20" y="30" width="176" height="78" rx="39" fill="url(#dt)"/><path d="M48 50 C90 40 130 42 168 50" stroke="#C98756" stroke-width="8" stroke-linecap="round" fill="none" opacity=".8"/><path d="M40 78 C90 70 140 82 180 74 M60 94 C100 88 130 98 160 92" stroke="#2A0F06" stroke-width="3" fill="none" opacity=".6"/><rect x="10" y="58" width="18" height="20" rx="7" fill="#C9A36A"/></g>
     <g transform="rotate(14 160 130)"><rect x="76" y="96" width="156" height="68" rx="34" fill="url(#dt)"/><path d="M100 114 C136 106 176 106 206 114" stroke="#C98756" stroke-width="7" stroke-linecap="round" fill="none" opacity=".75"/><path d="M96 138 C140 130 180 142 214 136" stroke="#2A0F06" stroke-width="3" fill="none" opacity=".6"/></g>`, { seed: 22 });
  // curry leaf sprig
  {
    let lv = "";
    for (let i = 0; i < 6; i++) {
      const y = 60 + i * 46, s = 0.72 + i * 0.07;
      for (const d of [-1, 1])
        lv += `<g transform="translate(${118 + (i - 3) * 3} ${y}) scale(${d * s} ${s}) rotate(-28)"><path d="M0 0 C26 -30 74 -34 108 0 C74 22 28 24 0 0 Z" fill="${(i + (d > 0 ? 1 : 0)) % 2 ? "#4F8A4B" : "#2F6B43"}"/><path d="M4 0 C40 -8 70 -8 102 0" stroke="#A9CB8C" stroke-width="3" fill="none"/></g>`;
    }
    await art("curryleaf", 250, 370, "", `<path d="M124 20 C116 120 106 220 112 360" stroke="#6E8F48" stroke-width="7" stroke-linecap="round" fill="none"/>${lv}<path d="M124 46 C104 30 106 8 126 0 C142 12 142 34 124 46 Z" fill="#4F8A4B"/>`, { seed: 24 });
  }
  // basil
  await art("basil", 260, 250, lin("bs", [[0, "#6DB05A"], [1, "#2F7A3E"]], 0.6, 1) + lin("bs2", [[0, "#8CC873"], [1, "#3F8C48"]], 0.4, 1),
    `<path d="M130 120 C132 170 128 210 120 244" stroke="#5C8A45" stroke-width="9" stroke-linecap="round" fill="none"/>
     <path d="M128 132 C70 150 22 120 12 70 C62 46 116 80 128 132 Z" fill="url(#bs)"/><path d="M132 132 C190 152 240 120 248 70 C198 46 144 80 132 132 Z" fill="url(#bs)"/>
     <path d="M130 136 C84 100 92 34 132 8 C172 36 176 102 130 136 Z" fill="url(#bs2)"/>
     <path d="M126 186 C92 206 58 198 42 172 C72 150 110 158 126 186 Z" fill="url(#bs2)"/>
     <path d="M130 128 C126 90 128 50 132 20 M122 128 C90 106 56 86 24 76 M138 128 C170 106 206 86 236 76 M120 186 C98 178 74 174 52 174" stroke="#CFE8B0" stroke-width="3.5" fill="none" opacity=".85"/>`, { seed: 26 });
  // sundried tomato
  await art("tomato", 230, 210, rad("tm", [[0, "#E4593A"], [0.7, "#B92E22"], [1, "#7A1714"]], 0.45, 0.4, 0.7),
    `<path d="M22 108 C10 60 52 20 98 26 C134 8 198 30 208 82 C222 130 184 186 128 188 C76 200 30 164 22 108 Z" fill="url(#tm)"/>
     ${[0, 1, 2, 3, 4, 5].map((k) => `<g transform="rotate(${k * 60 + 12} 114 108)"><path d="M102 92 C94 70 98 46 114 40 C130 46 134 70 126 92 C120 98 108 98 102 92 Z" fill="#8C1C18"/><ellipse cx="108" cy="66" rx="4" ry="6.5" fill="#F3CE86"/><ellipse cx="120" cy="72" rx="4" ry="6.5" fill="#F3CE86"/><ellipse cx="114" cy="84" rx="3.5" ry="5.5" fill="#F3CE86"/></g>`).join("")}
     <path d="M40 74 C52 48 78 38 98 42" stroke="#FFA98E" stroke-width="7" stroke-linecap="round" fill="none" opacity=".85"/>`, { seed: 28, rough: 7 });
  // olive branch
  await art("olive", 260, 250, rad("ol", [[0, "#C6CF6E"], [0.6, "#87993A"], [1, "#4D5E1E"]]),
    `<path d="M20 30 C80 60 150 110 226 222" stroke="#7B7A45" stroke-width="8" stroke-linecap="round" fill="none"/>
     ${[[60, 50, -60], [110, 84, -50], [160, 130, -42], [86, 66, 92], [140, 108, 104], [196, 180, 100]].map(([x, y, r], i) => `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M0 0 C24 -16 62 -16 88 0 C62 14 26 14 0 0 Z" fill="${i % 2 ? "#8FA878" : "#5F7F5A"}"/><path d="M4 0 L80 0" stroke="#D3DFB8" stroke-width="2.5"/></g>`).join("")}
     <ellipse cx="92" cy="122" rx="26" ry="33" fill="url(#ol)" transform="rotate(20 92 122)"/><ellipse cx="150" cy="182" rx="26" ry="33" fill="url(#ol)" transform="rotate(-8 150 182)"/><ellipse cx="180" cy="96" rx="23" ry="29" fill="url(#ol)"/>
     <path d="M82 106 C86 100 92 98 96 100 M140 166 C144 160 150 158 154 160" stroke="#F4F6C0" stroke-width="6" stroke-linecap="round"/>`, { seed: 30 });
  // croissant
  await art("croissant", 370, 230, lin("cs", [[0, "#F5C777"], [0.5, "#D9923F"], [1, "#9C5A1E"]], 0.15, 1) + lin("cs2", [[0, "#FAD692"], [0.5, "#E2A24E"], [1, "#A8652A"]], 0.1, 1),
    `<path d="M16 178 C10 136 34 104 70 96 C96 108 108 146 96 180 C72 208 30 208 16 178 Z" fill="url(#cs)"/><path d="M354 178 C360 136 336 104 300 96 C274 108 262 146 274 180 C298 208 340 208 354 178 Z" fill="url(#cs)"/>
     <path d="M56 160 C50 108 78 62 122 54 C152 76 160 130 140 176 C112 200 70 192 56 160 Z" fill="url(#cs2)"/><path d="M314 160 C320 108 292 62 248 54 C218 76 210 130 230 176 C258 200 300 192 314 160 Z" fill="url(#cs2)"/>
     <path d="M114 156 C104 86 138 26 186 22 C234 26 266 86 256 156 C234 188 136 188 114 156 Z" fill="url(#cs)"/>
     <path d="M140 76 C154 48 176 38 198 40 M84 106 C92 86 106 76 120 74 M250 78 C266 78 280 92 286 112" stroke="#FFEFC4" stroke-width="8" stroke-linecap="round" fill="none" opacity=".85"/>
     <path d="M140 152 C170 166 204 166 232 152 M120 116 C122 138 130 152 140 160 M250 116 C248 138 240 152 230 160" stroke="#8A4A16" stroke-width="3.5" fill="none" opacity=".45"/>`, { seed: 34 });
}

/* ---------- paper goods ---------- */
async function paper() {
  const tape = (x, y, r, c = "#F7D3E0") => `<rect x="${x}" y="${y}" width="96" height="30" fill="${c}" opacity=".86" transform="rotate(${r} ${x + 48} ${y + 15})"/>`;
  const torn = (w, h, seed, amp = 5) => {
    const r = rng(seed);
    let d = `M6 6 L${w - 6} 6 L${w - 6} ${h - 10}`;
    for (let x = w - 6; x > 6; x -= 14) d += ` L${x - 7} ${h - 10 + (r() - 0.3) * amp * 2.4}`;
    return d + " Z";
  };
  // gingham napkin
  {
    let g = "";
    for (let i = 0; i < 12; i++) g += `<rect x="${20 + i * 48}" y="20" width="24" height="540" fill="${C.pink}" opacity=".42"/><rect x="20" y="${20 + i * 46}" width="572" height="23" fill="${C.pink}" opacity=".42"/>`;
    const cloth = "M24 30 C180 12 420 40 586 24 C600 190 572 380 592 552 C420 570 200 540 22 560 C36 380 8 200 24 30 Z";
    await art("napkin", 616, 586, `<clipPath id="nc"><path d="${cloth}"/></clipPath>` + lin("fold", [[0, "#000", 0.1], [0.04, "#fff", 0.35], [0.1, "#fff", 0], [0.48, "#000", 0], [0.5, "#000", 0.13], [0.53, "#fff", 0.3], [0.6, "#fff", 0], [1, "#000", 0.06]], 1, 0.15) + lin("fold2", [[0, "#000", 0], [0.46, "#000", 0], [0.49, "#000", 0.11], [0.52, "#fff", 0.28], [0.6, "#fff", 0]], 0.1, 1),
      `<g clip-path="url(#nc)"><rect width="620" height="600" fill="#FFF8F1"/>${g}<rect width="620" height="600" fill="url(#fold)"/><rect width="620" height="600" fill="url(#fold2)"/></g>`, { border: 0, seed: 41, rough: 6, scale: 1.3, grain: 0.3 });
  }
  // recipe card
  {
    let ln = "";
    for (let i = 0; i < 8; i++) ln += `<path d="M14 ${98 + i * 34} L486 ${98 + i * 34}" stroke="${C.aqua}" stroke-width="2"/>`;
    const t = ["1 slice of sourdough, thick", "toast until properly golden", "Saffron Honey, generously", "pinch of flaky salt", "eat standing up"];
    await art("recipe", 500, 350, "", `<rect x="6" y="6" width="488" height="338" rx="5" fill="#FFFDF3"/><path d="M14 66 L486 66" stroke="${C.pinkD}" stroke-width="3"/>${ln}<text x="26" y="50" ${TYPE} font-size="25" letter-spacing="1" fill="${C.ink}">THE FIVE-MINUTE BREAKFAST</text>${t.map((s, i) => `<text x="30" y="${126 + i * 34}" ${HAND} font-size="28" fill="${C.green}">${i + 1}. ${s}</text>`).join("")}${tape(200, -8, -3)}`, { border: 0, seed: 43, rough: 2, grain: 0.16 });
  }
  // belief note
  await art("belief", 300, 290, lin("nt", [[0, "#FFF4A8"], [1, "#FBE27A"]], 0.4, 1),
    `<path d="M10 14 L288 8 L292 262 C260 282 200 274 12 282 Z" fill="url(#nt)"/><text ${HAND} font-size="36" fill="${C.ink}" text-anchor="middle"><tspan x="150" y="84">We believe</tspan><tspan x="150" y="130" fill="${C.green}" font-size="46">butter</tspan><tspan x="150" y="176">makes everything</tspan><tspan x="150" y="222">better.</tspan></text><path d="M98 234 C128 242 174 242 206 232" stroke="${C.pinkD}" stroke-width="5" stroke-linecap="round" fill="none"/>${tape(102, 0, 3, "#BDE6E2")}`, { border: 0, seed: 45, rough: 2, grain: 0.14 });
  // postcard
  {
    const r = rng(5);
    let b = "";
    for (let i = 0; i < 17; i++) {
      const x = 26 + i * 27, h = 34 + r() * 78;
      b += `<rect x="${x}" y="${250 - h}" width="${18 + r() * 12}" height="${h}" fill="${[C.green, C.green2, C.teal][i % 3]}"/>`;
    }
    await art("postcard", 520, 360, lin("sky", [[0, C.aqua], [0.6, "#CDEBDD"], [1, "#FBE3C4"]], 0, 1) + `<clipPath id="pcx"><rect x="24" y="24" width="472" height="312"/></clipPath>`,
      `<rect x="4" y="4" width="512" height="352" rx="4" fill="#FFFDF3"/><g clip-path="url(#pcx)"><rect x="24" y="24" width="472" height="312" fill="url(#sky)"/>
       <circle cx="386" cy="120" r="52" fill="${C.butter}"/><path d="M356 160 C366 186 372 158 384 170 C392 196 404 162 416 158 Z" fill="${C.butter}"/>
       ${b}<path d="M236 250 L236 150 L244 150 L244 110 L251 110 L251 72 L256 40 L261 72 L261 110 L268 110 L268 150 L276 150 L276 250 Z" fill="${C.ink}"/>
       <path d="M120 250 C112 200 124 156 168 140 C156 180 164 220 168 250 Z" fill="#FFFDF3"/><path d="M134 250 C130 210 140 176 162 156" stroke="${C.aqua}" stroke-width="4" fill="none"/>
       <path d="M24 250 C120 236 200 262 300 248 C380 238 440 258 496 246 L496 336 L24 336 Z" fill="#F0CF8E"/><path d="M24 276 C140 258 240 296 340 276 C420 262 460 282 496 274 L496 336 L24 336 Z" fill="#E6B96C"/></g>
       <text x="46" y="84" ${SERIF} font-style="italic" font-weight="700" font-size="46" fill="#FFFDF3">Hello from</text><text x="46" y="132" ${SERIF} font-style="italic" font-weight="700" font-size="54" fill="${C.pinkD}">Dubai</text>
       <text x="260" y="318" ${TYPE} font-size="19" letter-spacing="3" text-anchor="middle" fill="${C.ink}">WISH THERE WAS TOAST HERE</text>`, { border: 0, seed: 47, rough: 1.5, scale: 1.4, grain: 0.28 });
  }
  // butter post stamp
  {
    let holes = "";
    for (let i = 0; i <= 10; i++) holes += `<circle cx="${12 + i * 18}" cy="8" r="6"/><circle cx="${12 + i * 18}" cy="234" r="6"/>`;
    for (let i = 0; i <= 12; i++) holes += `<circle cx="8" cy="${12 + i * 18.2}" r="6"/><circle cx="196" cy="${12 + i * 18.2}" r="6"/>`;
    await art("stamp", 204, 242, `<mask id="pm"><rect x="8" y="8" width="188" height="226" fill="#fff"/><g fill="#000">${holes}</g></mask>`,
      `<g mask="url(#pm)"><rect x="0" y="0" width="204" height="242" fill="#FFFDF3"/><rect x="26" y="26" width="152" height="190" fill="${C.teal}"/>
       <ellipse cx="102" cy="150" rx="62" ry="13" fill="#FFFDF3"/><path d="M58 146 L58 108 L138 108 L138 146 Z" fill="#F2C95F"/><path d="M58 108 L76 90 L156 90 L138 108 Z" fill="#FFF0AE"/><path d="M138 108 L156 90 L156 128 L138 146 Z" fill="#D9A63C"/>
       <text x="102" y="60" ${TYPE} font-size="21" letter-spacing="2" text-anchor="middle" fill="#FFFDF3">BUTTER</text><text x="102" y="200" ${TYPE} font-size="21" letter-spacing="2" text-anchor="middle" fill="#FFFDF3">POST</text><path d="M112 40 A70 70 0 0 0 204 130 M126 34 A56 56 0 0 0 204 112" stroke="${C.ink}" stroke-width="3" fill="none" opacity=".4"/></g>`, { border: 0, seed: 49, rough: 1.2, scale: 1.5 });
  }
  // flower sticker
  {
    let pet = "";
    for (let i = 0; i < 9; i++) pet += `<ellipse cx="150" cy="66" rx="44" ry="58" fill="${C.pink}" transform="rotate(${i * 40} 150 150)"/>`;
    await art("flower", 300, 300, "", `${pet}<circle cx="150" cy="150" r="92" fill="${C.pink}"/><circle cx="150" cy="150" r="82" fill="none" stroke="#FFE3EE" stroke-width="3" stroke-dasharray="3 8" stroke-linecap="round"/><text ${SERIF} font-style="italic" font-weight="700" font-size="34" text-anchor="middle" fill="${C.ink}"><tspan x="150" y="128">spread a</tspan><tspan x="150" y="164">little</tspan><tspan x="150" y="200">happiness</tspan></text>`, { seed: 51, border: 6, rough: 2 });
  }
  // shopping list
  {
    const items = ["sourdough", "eggs (6)", "sweetcorn", "good salt", "noodles", "BUTTER"];
    let ln = "";
    for (let i = 0; i < 8; i++) ln += `<path d="M12 ${72 + i * 38} L248 ${72 + i * 38}" stroke="#CFE0D8" stroke-width="2"/>`;
    await art("list", 260, 400, "", `<path d="${torn(260, 396, 9, 7)}" fill="#FFFEF8"/>${ln}<path d="M44 8 L44 384" stroke="${C.pink}" stroke-width="2"/>${items.map((s, i) => `<text x="58" y="${66 + i * 52}" ${HAND} font-size="${i === 5 ? 44 : 33}" fill="${i === 5 ? C.pinkD : "#2C4A86"}">${s}</text>${i < 4 ? `<path d="M54 ${58 + i * 52} C100 ${52 + i * 52} 150 ${62 + i * 52} ${66 + s.length * 17} ${54 + i * 52}" stroke="#2C4A86" stroke-width="3" fill="none"/>` : ""}`).join("")}<path d="M58 338 C100 348 150 336 196 344" stroke="${C.pinkD}" stroke-width="4" fill="none"/>`, { border: 0, seed: 53, rough: 2, grain: 0.14 });
  }
}

/* ---------- jars ---------- */
const JAR = {
  "herb-garlic": ["#F1E7B2", ["#5E9147", "#3F7A3E"], "HERB & GARLIC"],
  "spicy-thai": ["#F2B68C", ["#D22B22", "#5E9147"], "SPICY THAI"],
  "sundried-tomatoes": ["#E8A07A", ["#9E2418", "#7A1714"], "SUNDRIED TOMATO"],
  "curry-cumin": ["#E6C878", ["#6A4A1A", "#2F6B43"], "CURRY LEAF & CUMIN"],
  raspberry: ["#EFA3BA", ["#B0174E", "#D22C62"], "RASPBERRY"],
  "chocolate-hazelnut": ["#7C4B31", ["#C08A55", "#4A2614"], "CHOC HAZELNUT"],
  "peanut-butter": ["#DDAE70", ["#A6712F", "#F0D29C"], "CLASSIC PEANUT"],
  "date-miso": ["#BE8A58", ["#5E2A12", "#E3C08C"], "DATE MISO"],
  "saffron-honey": ["#F8CB55", ["#E2531B", "#C9470F"], "SAFFRON HONEY"],
  "karak-chai": ["#CEA074", ["#6A3A16", "#8E5426"], "KARAK CHAI"],
  "vegan-butter": ["#F8EDC6", ["#FFF8E0", "#EBD79A"], "VEGAN BUTTER"],
  "vegan-garlic-butter": ["#EFE6BC", ["#FFFDF0", "#5E9147"], "VEGAN GARLIC"],
  "smoked-chilli": ["#DC6D44", ["#7A1714", "#3A1410"], "SMOKED CHILLI"],
  bourbon: ["#CE9654", ["#7A4614", "#F3CE86"], "BOURBON"],
};
async function jars() {
  const src = fs.readFileSync(path.join(root, "src/data/products.ts"), "utf8");
  const colors = Object.fromEntries([...src.matchAll(/id: "([^"]+)",\s+name: "[^"]+",[\s\S]*?color: "(#[0-9A-F]+)"/gi)].map((m) => [m[1], m[2]]));
  const logo = (await sharp(path.join(root, "public/thesp.png")).resize(520).png().toBuffer()).toString("base64");
  let k = 1;
  for (const [id, [cream, flecks, label]] of Object.entries(JAR)) {
    const c = colors[id];
    const r = rng(k++ * 97);
    let f = "";
    for (let i = 0; i < 170; i++) {
      const x = 40 + r() * 280, y = 132 + r() * 300;
      f += `<ellipse cx="${x}" cy="${y}" rx="${1.5 + r() * 4.5}" ry="${1 + r() * 2.4}" fill="${flecks[i % 2]}" opacity="${0.45 + r() * 0.5}" transform="rotate(${r() * 180} ${x} ${y})"/>`;
    }
    const body = "M66 122 C44 134 34 156 34 184 L34 388 C34 424 54 440 86 440 L274 440 C306 440 326 424 326 388 L326 184 C326 156 316 134 294 122 Z";
    await render(path.join(JARS, `${id}.webp`), 360, 460,
      `<clipPath id="jc"><path d="${body}"/></clipPath>` +
        lin("sh", [[0, "#3A2408", 0.34], [0.14, "#3A2408", 0.04], [0.3, "#fff", 0.16], [0.6, "#fff", 0], [0.88, "#3A2408", 0.1], [1, "#3A2408", 0.38]]) +
        lin("ld", [[0, "#00000066"], [0.2, "#ffffff55"], [0.45, "#ffffff00"], [0.8, "#00000022"], [1, "#00000077"]].map(([o, v]) => [o, v.slice(0, 7), parseInt(v.slice(7), 16) / 255])) +
        lin("gl", [[0, "#fff", 0.85], [1, "#fff", 0.25]], 0, 1),
      `<path d="${body}" fill="${cream}"/><g clip-path="url(#jc)">${f}<path d="M30 150 C90 132 130 166 190 148 C240 134 290 160 330 146 L330 110 L30 110 Z" fill="#fff" opacity=".28"/></g>
       <path d="${body}" fill="url(#sh)"/>
       <rect x="72" y="100" width="216" height="26" rx="8" fill="#E5EFEB"/><rect x="72" y="100" width="216" height="26" rx="8" fill="url(#sh)" opacity=".5"/>
       <rect x="56" y="26" width="248" height="82" rx="16" fill="${c}"/><g stroke="#000" stroke-opacity=".13" stroke-width="4">${Array.from({ length: 15 }, (_, i) => `<path d="M${72 + i * 15.5} 48 L${72 + i * 15.5} 100"/>`).join("")}</g><rect x="56" y="26" width="248" height="82" rx="16" fill="url(#ld)"/><path d="M78 40 L276 40" stroke="#fff" stroke-opacity=".55" stroke-width="5" stroke-linecap="round"/>
       <g clip-path="url(#jc)"><path d="M30 212 C52 200 64 224 88 212 C112 200 124 224 148 212 C172 200 184 224 208 212 C232 200 244 224 268 212 C292 200 304 224 330 212 L330 408 L30 408 Z" fill="${c}"/>
       <path d="M30 226 C52 214 64 238 88 226 C112 214 124 238 148 226 C172 214 184 238 208 226 C232 214 244 238 268 226 C292 214 304 238 330 226 L330 390 L30 390 Z" fill="#FFFCEF"/></g>
       <image href="data:image/png;base64,${logo}" x="87" y="242" width="186" height="97"/>
       <text x="180" y="371" ${TYPE} font-size="${label.length > 15 ? 18.5 : 22}" text-anchor="middle" letter-spacing=".5" fill="${C.ink}">${label.replace("&", "&amp;")}</text>
       <path d="${body}" fill="url(#sh)" opacity=".5"/>
       <path d="M58 168 C52 182 52 200 52 220 L52 372" stroke="url(#gl)" stroke-width="11" stroke-linecap="round" fill="none" opacity=".8"/><path d="M308 176 L308 260" stroke="#fff" stroke-opacity=".55" stroke-width="6" stroke-linecap="round"/>`,
      { border: 4.5, rough: 1.6, scale: 1.7, seed: k, grain: 0.15 });
  }
}

/* ---------- butter paper: creased, greaseproof, tiles seamlessly ---------- */
async function texture() {
  const N = 1400;
  const r = rng(77);
  const grid = (cells, seed) => {
    const q = rng(seed);
    const g = Float32Array.from({ length: cells * cells }, () => q());
    return (x, y) => {
      const fx = (x / N) * cells, fy = (y / N) * cells;
      const x0 = Math.floor(fx) % cells, y0 = Math.floor(fy) % cells, x1 = (x0 + 1) % cells, y1 = (y0 + 1) % cells;
      let u = fx - Math.floor(fx), v = fy - Math.floor(fy);
      u = u * u * (3 - 2 * u); v = v * v * (3 - 2 * v);
      return (g[y0 * cells + x0] * (1 - u) + g[y0 * cells + x1] * u) * (1 - v) + (g[y1 * cells + x0] * (1 - u) + g[y1 * cells + x1] * u) * v;
    };
  };
  const a = grid(5, 1), b = grid(11, 2), c = grid(28, 3), d = grid(350, 4), w1 = grid(8, 5), w2 = grid(8, 6);
  // Straight, sharp folds: triangle waves with whole-number frequencies, so it tiles.
  const folds = Array.from({ length: 13 }, () => ({ kx: Math.round((r() - 0.5) * 9), ky: Math.round((r() - 0.5) * 9), ph: r(), amp: 0.5 + r(), bend: r() * 0.35 }));
  const tri = (t) => Math.abs((t - Math.floor(t)) * 2 - 1);
  const H = new Float32Array(N * N);
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const n1 = w1(x, y), n2 = w2(x, y);
      let h = a(x, y) * 22 + b(x, y) * 9 + c(x, y) * 2.4;
      for (const f of folds) h += tri((f.kx * x + f.ky * y) / N + f.ph + (n1 - n2) * f.bend) * f.amp * 11;
      H[y * N + x] = h;
    }
  const out = Buffer.alloc(N * N * 3);
  const base = [248, 239, 207];
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const i = y * N + x;
      const gx = H[y * N + ((x + 2) % N)] - H[y * N + ((x - 2 + N) % N)];
      const gy = H[((y + 2) % N) * N + x] - H[((y - 2 + N) % N) * N + x];
      const l = Math.max(-15, Math.min(9, -(gx * 0.75 + gy) * 4.4)) + (d(x, y) - 0.5) * 6;
      out[i * 3] = Math.max(0, Math.min(255, base[0] + l));
      out[i * 3 + 1] = Math.max(0, Math.min(255, base[1] + l));
      out[i * 3 + 2] = Math.max(0, Math.min(255, base[2] + l * 1.08));
    }
  await sharp(out, { raw: { width: N, height: N, channels: 3 } }).webp({ quality: 92 }).toFile(path.join(root, "public/paper.webp"));
}

await Promise.all([food(), paper(), jars(), texture()]);

/* Record real sizes so <Image> never shifts layout. */
const sizes = {};
for (const [dir, key] of [[ART, "art"], [JARS, "jars"]])
  for (const f of fs.readdirSync(dir).filter((n) => n.endsWith(".webp")).sort()) {
    const m = await sharp(path.join(dir, f)).metadata();
    sizes[`${key}/${f.replace(".webp", "")}`] = [m.width, m.height];
  }
fs.writeFileSync(
  path.join(root, "src/data/art-sizes.ts"),
  `// Generated by scripts/build-art.mjs: [width, height] of each image in /public.\nexport const artSizes: Record<string, [number, number]> = ${JSON.stringify(sizes, null, 2)};\n`
);
console.log(Object.keys(sizes).length, "images");
