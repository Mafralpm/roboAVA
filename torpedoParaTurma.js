const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');

require('dotenv').config();

async function torpedoParaTodaTurma() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport:{width:1200, height:800}
  });
  const page = await browser.newPage();

  await page.goto('https://uol.unifor.br/acesso/app/autenticacao')

  await page.waitForTimeout('1000')

  await page.type('#matricula', process.env.MATRICULA)
  await page.type('#senha', process.env.SENHA)

  await page.waitForSelector("input")

  await page.evaluate(() => document.querySelector('input[type="submit"]').click());

  await page.waitForNavigation()

  await page.goto('https://uol.unifor.br/oul/TorpedoInserir.do?method=auxiliar&contatoNome=Algoritmos%20prog%20computadores&disciplinaCodigo=N616@7@21')

  await page.waitForNavigation()

  // await page.type('[name="nome"]', "teste")

  // await page.type('[name="descricao"]', "teste")


  // await page.evaluate(() => document.querySelector('[href="#tabs-1"]').click());
  
  // await page.evaluate(() => document.querySelector('[title="Torpedo"]').click());
  
  

  // await browser.close();
}

torpedoParaTodaTurma();