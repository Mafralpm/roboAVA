const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');

require('dotenv').config();

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  const data = readlineSync.question('Informe a data da aula ')
  const link = readlineSync.question('Informe o link da gravacao da aula ')
  await page.goto('https://ead.unifor.br/login/index.php');

  await page.type('#username', process.env.MATRICULA)
  await page.type('#password', process.env.SENHA)

  await page.click('#loginbtn')

  await page.waitForNavigation(timeout=100)

  await page.goto('https://ead.unifor.br/course/modedit.php?update=454172&return=0&sr=4')

  await page.waitForTimeout(2000)

  await page.click('#id_introeditoreditable')

  await page.evaluate( (data, link) =>{
    console.log(link);
    const tagA = document.createElement('a');
    tagA.href = link;
    tagA.target = "_blank"
    const textoLink = document.createTextNode(`${link}`);
    tagA.appendChild(textoLink); 
    console.log(tagA);

    const tagP = document.createElement('p')
    const texto = document.createTextNode(`${data} - `)
    tagP.appendChild(texto)
    tagP.append(tagA)
    console.log(tagP);

    let caixaDeTexto = document.getElementById("id_introeditoreditable")
    caixaDeTexto.appendChild(tagP)
  }, data, link);

  await page.click('#id_submitbutton2')

  await browser.close();
})();

