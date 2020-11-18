const {When, Then, Given, Before, AfterAll} = require("cucumber")
const puppeteer = require("puppeteer")
var {setDefaultTimeout} = require('cucumber');
const { expect } = require("chai");

setDefaultTimeout(60 * 1000);
let browser,page;
Before(async function() {
    browser = await puppeteer.launch({
         headless: false, 
         defaultViewport: null,
         slowMo: 10,
         devtools: false,
         args: ['--start-maximized', '--window-size=1920,1080']
    });
    page = await browser.newPage();
  })
Given("User visits daraz website", async function(){
    await page.goto("https://www.daraz.com.bd")
})

When('User search by product name',async function () {
    let inputSelector='[type=search]'
    await page.waitForSelector(inputSelector);
    let input=await page.$(inputSelector);
    await input.type('Mobile');
    await page.keyboard.press('Enter');
    await page.waitForNavigation();

});

Then('Count the results', async function () {
    let resultXPath="//span[contains(text(),'items found for')]";
    await page.waitForXPath(resultXPath);
    let [resultElement]=await page.$x(resultXPath);
    let result=await page.evaluate(e=>e.textContent, resultElement);
    console.log(result);
    expect(result).includes('items found for')

});

When('User clears first search from input',async function () {
    let inputSelector='[type=search]'
    await page.waitForSelector(inputSelector);
    let input=await page.$(inputSelector);
    await input.click({clickCount:3});
    await input.type('Watch');
    await page.keyboard.press('Enter');
    await page.waitForNavigation();

});
Then('Count the result again', async function () {
    let resultXPath="//span[contains(text(),'items found for')]";
    await page.waitForXPath(resultXPath);
    let [resultElement]=await page.$x(resultXPath);
    let result=await page.evaluate(e=>e.textContent, resultElement);
    console.log(result);
    expect(result).includes('items found for')

});
AfterAll(async () => {
    await browser.close();
});