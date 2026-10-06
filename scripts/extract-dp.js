async function test() {
  const res = await fetch('https://www.google.com/search?kgmid=/g/11swrzcjs5&hl=en-IN&gl=in', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  const html = await res.text();
  const title = html.match(/<title>([^<]+)<\/title>/);
  console.log('Title:', title ? title[1] : 'none');
  const googleUserReviews = html.match(/https:\/\/[^"'\s]+lh3\.googleusercontent\.com[^"'\s]+/g);
  console.log('User DP links:', googleUserReviews ? googleUserReviews.slice(0, 10) : 'none');
}
test();
