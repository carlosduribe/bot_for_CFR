const puppeteer = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs')
puppeteer.use(stealthPlugin());

(async () => {
  const browser = await puppeteer.launch({ headless: false }); 
  const page = await browser.newPage();

  await page.goto('https://app.cursofuturosresidentes.com/');
  await page.waitForNavigation();
  await page.waitForSelector('#username')
  await page.type('#username', 'carlosduribe@hotmail.com', { delay: 100 });
  await page.type('#password', 'CRFR100*', { delay: 100 });
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
  console.log("Logged in succesfully");

  const subespecialidad = 'https://app.cursofuturosresidentes.com/courses/cirugia-general/'
  await page.goto(subespecialidad);
  await page.waitForSelector('text/Expandir todo')
  await page.click('text/Expandir todo')
  console.log("Especiality expanded")

  const topics = await page.$$eval('#main-content a:not([href*=quizzes]', (anchors) =>
    anchors
      .filter((anchor) => anchor.href.includes('topic')) 
      .map((anchor) => anchor.href)
  );
  console.log("topics extracted");
  fs.writeFile('cirugía_clases.txt', topics.join('\n'), (err) => {
    if (err) throw err;
    console.log('Videos saved to file!');
  });

  const videos = [];
  for (const topic of topics) {
    await page.goto(topic);
    const html = await page.content();
    const regex = /https:\/\/player\.vimeo\.com\/video\/\w{9}/;
    const match = html.match(regex)
    
    videos.push(match[0]);
    
  };
  console.log(videos);
  await browser.close();

  fs.writeFile('cirugía.txt', videos.join('\n'), (err) => {
    if (err) throw err;
    console.log('Videos saved to file!');
  });
})();
