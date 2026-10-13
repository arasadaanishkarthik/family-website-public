import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const photosDir = path.join(rootDir, 'src/assets/photos');
const videosDir = path.join(rootDir, 'src/assets/videos');
const pDir = path.join(rootDir, 'src/assets/p');

[photosDir, videosDir, pDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const photoIds = [
  'photo-1534528741775-53994a69daeb',
  'photo-1517841905240-472988babdf9',
  'photo-1524504388940-b1c1722653e1',
  'photo-1507003211169-0a1dd7228f2d',
  'photo-1494790108377-be9c29b29330',
  'photo-1529626455594-4ff0802cfb7e',
  'photo-1488426862026-3ee34a7d66df',
  'photo-1508214751196-bcfd4ca60f91',
  'photo-1531746020798-e6953c6e8e04',
  'photo-1544005313-94ddf0286df2',
  'photo-1492562080023-ab3db95bfbce',
  'photo-1506794778202-cad84cf45f1d',
  'photo-1519085360753-af0119f7cbe7',
  'photo-1539571696357-5a69c17a67c6',
  'photo-1524502397800-2eeaad7c3fe5',
  'photo-1500648767791-00dcc994a43e',
  'photo-1509967419530-da38b4704bc6',
  'photo-1514315384763-ba401779410f',
  'photo-1548142813-c348350df52b',
  'photo-1521119989659-a83eee488004',
  'photo-1529139574466-a303027c1d8b',
  'photo-1531746020798-e6953c6e8e04',
  'photo-1500917293891-ef795e70e1f6',
  'photo-1526413232644-8a40f03cc03b',
  'photo-1534528741775-53994a69daeb', // 25
  'photo-1516726817505-f5ed825624d8', // 26
  'photo-1513258496099-48168024aec0', // 27
  'photo-1496440737103-cd596325d314', // 28
  'photo-1502767089025-6572583495f9', // 29
  'photo-1515886657613-9f3515b0c78f', // 30
  'photo-1509783236416-c9ad59bae472', // 31
  'photo-1517841905240-472988babdf9', // 32
  'photo-1531123897727-8f129e1688ce', // 33
  'photo-1524250502761-1ac6f2e30d43', // 34
  'photo-1492106087820-71f1a00d2b11', // 35
];

const privatePhotosList = [
  { name: 'Bright Café Selfie with Green Chairs.png', id: 'photo-1524504388940-b1c1722653e1' },
  { name: 'Close-up Selfie by a Luminous Shop.png', id: 'photo-1534528741775-53994a69daeb' },
  { name: 'Selfie Duo in Traditional Attire.png', id: 'photo-1494790108377-be9c29b29330' }
];

function downloadFile(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Failed to download ' + url + ': status ' + res.statusCode));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

async function setup() {
  console.log('Downloading 35 high-quality demo gallery photographs...');
  for (let i = 0; i < photoIds.length; i++) {
    const num = String(i + 1).padStart(2, '0');
    const dest = path.join(photosDir, 'photo' + num + '.jpg');
    const url = 'https://images.unsplash.com/' + photoIds[i] + '?auto=format&fit=crop&w=1400&q=85';
    process.stdout.write('Checking photo' + num + '.jpg... ');
    await downloadFile(url, dest);
    console.log('Done');
  }

  console.log('Downloading demo private photographs...');
  for (const item of privatePhotosList) {
    const dest = path.join(pDir, item.name);
    const url = 'https://images.unsplash.com/' + item.id + '?auto=format&fit=crop&w=1200&q=85';
    process.stdout.write('Checking ' + item.name + '... ');
    await downloadFile(url, dest);
    console.log('Done');
  }

  console.log('Downloading CC0 royalty-free demo videos...');
  const v1Dest = path.join(videosDir, 'video01.mp4');
  const v2Dest = path.join(videosDir, 'video02.mp4');
  const vpDest = path.join(pDir, 'WhatsApp Video 2026-10-03 at 13.09.02.mp4');

  process.stdout.write('Fetching video01.mp4 (MDN CC0 flower)... ');
  await downloadFile('https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', v1Dest);
  console.log('Done');

  process.stdout.write('Fetching video02.mp4 (MDN CC0 friday)... ');
  await downloadFile('https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4', v2Dest);
  console.log('Done');

  process.stdout.write('Fetching private video... ');
  fs.copyFileSync(v1Dest, vpDest);
  console.log('Done');

  console.log('All demo media downloaded successfully!');
}

setup().catch(err => {
  console.error('Download error:', err);
  process.exit(1);
});
