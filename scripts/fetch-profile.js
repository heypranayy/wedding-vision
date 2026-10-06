import fs from 'fs';

async function searchMaps() {
  const url = 'https://www.google.com/search?kgmid=/g/11swrzcjs5&hl=en-IN&q=Wedding&shem=epsd1,esd2e,ltae,rimspwouoe,sdpie&shndl=30&source=sh/x/loc/osrp/m5/1&kgs=3c332274cd4f9b26';
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'en-IN,en;q=0.9'
    }
  });
  const html = await res.text();
  fs.writeFileSync('scripts/google-page.html', html);
  console.log('Saved to scripts/google-page.html');
}
searchMaps();
