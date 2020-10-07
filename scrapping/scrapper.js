const puppeteer = require('puppeteer');
//const async = require('async');

async function scrape(url){
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto(url);
const [p] = await page.$x('//*[@id="main"]/div[2]/div/table/tbody/tr[2]/td[4]/div/table/tbody/tr[3]/td/div[2]/div/table/tbody/tr[2]/td[2]/p[1]');
 console.log(p);
 browser.close();
};

scrape('https://www.iitk.ac.in/new/iitk-faculty');

