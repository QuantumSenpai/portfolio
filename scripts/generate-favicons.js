const sharp = require('sharp');
const fs = require('fs');

const svgNavy = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <rect width="100" height="100" rx="24" fill="#0e1b33"/>
  <path d="M26 22C26 19.79 27.79 18 30 18H36C38.21 18 40 19.79 40 22V78C40 80.21 38.21 82 36 82H30C27.79 82 26 80.21 26 78V22Z" fill="#8dc2ff" />
  <path d="M47.5 45.2L70.8 21.9C72.8 19.9 76 21.3 76 24.1V36C76 37.6 75.2 39.1 73.9 40L60 50L73.9 60C75.2 60.9 76 62.4 76 64V75.9C76 78.7 72.8 80.1 70.8 78.1L47.5 54.8C44.8 52.1 44.8 47.9 47.5 45.2Z" fill="#ffffff" />
</svg>`);

async function gen() {
  await sharp(svgNavy).resize(16, 16).png().toFile('public/favicon-16x16.png');
  await sharp(svgNavy).resize(32, 32).png().toFile('public/favicon-32x32.png');
  await sharp(svgNavy).resize(180, 180).png().toFile('public/apple-touch-icon.png');
  await sharp(svgNavy).resize(192, 192).png().toFile('public/icon-192.png');
  await sharp(svgNavy).resize(512, 512).png().toFile('public/icon-512.png');
  await sharp(svgNavy).resize(32, 32).png().toFile('public/favicon.ico');
  console.log('Favicons generated successfully');
}

gen().catch(console.error);
