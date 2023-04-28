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
  await page.type('#username', 'ocristianandres_0495@hotmail.com', { delay: 100 });
  await page.type('#password', 'CRFR100*', { delay: 100 });
  await page.click('button[type="submit"]');
  await page.waitForSelector('text/Crist');
  console.log("Logged in succesfully");

  

  const topics = [
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/fiebre-de-origen-desconocido/topic/definicion-fisiopatologia-y-enfoque-diagnostico/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/fiebre-de-origen-desconocido/topic/enfoque-diagnostico-parte-2/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/osteoporosis/topic/fisiopatologia-clasificacion-y-factores-de-riesgo/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/osteoporosis/topic/criterios-diagnosticos-y-tratamiento/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/epoc-exacerbada/topic/definicion-factores-de-riesgo-y-clasificacion/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/epoc-exacerbada/topic/enfoque-terapeutico-2/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/epoc-exacerbada/topic/epoc/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/epoc-exacerbada/topic/epoc-parte-2/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/enfermedades-tropicales/topic/malaria/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/enfermedades-tropicales/topic/dengue-chikungunya-y-zika/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/hipotiroidismo/topic/definicion-epidemiologia-y-ayudas-diagnosticas/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/hipotiroidismo/topic/tratamiento-y-seguimiento-2/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/reumatologia/topic/interpretacion-de-pruebas-en-reumatologia/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/reumatologia/topic/enfoque-del-paciente-con-vasculitis-sistemicas/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/reumatologia/topic/lupus-eritematoso-sistemico/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/reumatologia/topic/artritis-reumatoide/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/reumatologia/topic/gota/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/enfoque-del-paciente-con-miopatia/topic/definicion-etiologia-y-caracteristicas-generales/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/enfoque-del-paciente-con-miopatia/topic/caracteristicas-especificas-y-enfoque-diagnostico/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/enfermedad-renal-cronica/topic/definicion-marcadores-de-dano-renal-y-fisiopatologia/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/enfermedad-renal-cronica/topic/etiologia-factores-de-riesgo-y-aproximacion-diagnostica/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/enfermedad-renal-cronica/topic/enfoque-terapeutico-de-la-erc/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/insuficiencia-venosa-cronica/topic/insuficiencia-venosa-cronica/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/neoplasia-hematologica/topic/enfoque-del-paciente-con-neoplasia-hematologia/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/cirrosis-hepatica/topic/complicaciones-de-la-cirrosis-hepatica/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/enfermedad-arterial-periferica/topic/enfermedad-arterial-periferica/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/diabetes-mellitus/topic/diabetes-mellitus-en-el-adulto/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/diabetes-mellitus/topic/diabetes-mellitus-en-el-adulto-parte-2/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/diabetes-mellitus/topic/diabetes-mellitus-en-el-adulto-parte-3/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/nodulo-pulmonar/topic/nodulo-pulmonar/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/sindrome-cardiorenal/topic/sindrome-cardiorenal/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/trombosis-venosa-profunda/topic/trombosis-venosa-profunda-2/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/trombosis-venosa-profunda/topic/trombosis-venosa-profunda-parte-2/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/guia-de-riesgo-cardiovascular/topic/guia-de-riesgo-cardiovascular/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/guia-de-riesgo-cardiovascular/topic/guia-de-riesgo-cardiovascular-parte-2/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/enfermedad-diarreica-aguda/topic/enfermedad-diarreica-aguda-2/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/espondilodiscitis/topic/espondilodiscitis/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/enfoque-de-la-enfermedad-pulmonar-difusa/topic/enfoque-de-la-enfermedad-pulmonar-difusa/',
    'https://app.cursofuturosresidentes.com/courses/medicina-interna/lessons/enfermedad-de-reflujo-gastroesofagico/topic/enfermedad-de-reflujo-gastroesofagico/',
  ]

  const videos = [];
  for (const topic of topics) {
    try {
      await page.goto(topic);
      const html = await page.content();
      const regex = /https:\/\/player\.vimeo\.com\/video\/\w{9}/;
      const match = html.match(regex);
      videos.push(match[0]);
    } catch (e) {
      console.log('There is a topic without extracted links')
    }
    
  };
  console.log('videos extracted');
  await browser.close();

  fs.writeFile('videos.txt', videos.join('\n'), (err) => {
    if (err) throw err;
    console.log('Videos saved to file!');
  });
})();
