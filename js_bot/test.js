const puppeteer = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

fs.readFile('subespecialidades.txt', 'utf8', function(err, data) {
  if (err) throw err;
  const lines = data.trim().split('\n');
  const subespecialidades = lines.map((line) => line.trim());
  console.log(subespecialidades);
});

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
  // console.log("Logged in succesfully");

  await page.goto('https://app.cursofuturosresidentes.com/courses/cirugia-general/');
  await page.waitForSelector('text/Expandir todo')
  await page.click('text/Expandir todo')
  // console.log("Especiality expanded")

  const topics = await page.$$eval('#main-content a:not([href*=quizzes]', (anchors) =>
    anchors
      .filter((anchor) => anchor.href.includes('topic')) 
      .map((anchor) => anchor.href)
  );
  // console.log(topics);
  
  const videos = [];
  for (let topic in topics){
    await page.goto(topic)
    await page.waitForNavigation();
    const html = await page.content();
    const lines = html.split('\n');
    let filteredLines = lines.filter((line) => line.includes(':720'));
    videos.push(filteredLines);
  };
  
  if (videos.length) {
    console.log(videos);
  } else {
    console.log("No videos found.");
  }
  
  await browser.close();
})();