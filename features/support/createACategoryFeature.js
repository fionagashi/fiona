const { When, Then, Given, Before, AfterAll } = require("@cucumber/cucumber")
const puppeteer = require("puppeteer")
var { setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require("chai");
setDefaultTimeout(60 * 1000);
let browser, page;
Before( async function () {
    browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        slowMo: 10,
        devtools: false,
        args:
            [
                '--start-maximized',
                '--window-size=1920,1080'
            ]
    });
    page = await browser.newPage();
})
Given("User get in the application", async function () {
    await page.goto("http://localhost:8080/")
});

When('User open the Categories form and creates a new Category with UpperCase', async function () {
    let addButtonSelector = ['.ant-btn-primary:not([disabled])'];
    await page.waitForSelector(addButtonSelector);
    let addButton = await page.$(addButtonSelector);
    await addButton.click();
    let textFieldSelector = ['[type=text]'];
    await page.waitForSelector(textFieldSelector);
    let input = await page.$(textFieldSelector);
    await input.type('Testingtask');
    let categorySelector = ['.ant-select-selection-placeholder'];
    await page.waitForSelector(categorySelector);
    let addCategoryButton = await page.$(categorySelector);
    await page.waitForTimeout(2000);
    await addCategoryButton.click();
    let newCategorySelector = ['._2H2YqD-jd9Oo7tVupLsVc0'];
    await page.waitForSelector(newCategorySelector);
    let addNewCategory = await page.$(newCategorySelector);
    await page.waitForTimeout(2000);
    await addNewCategory.click();
    await page.waitForTimeout(2000);
    await addNewCategory.type('New');
    let addNewCategorySelector = ['._2GqGkZTqItQuEATgd8rw--'];
    await page.waitForSelector(addNewCategorySelector);
    let addNewCategoryButton = await page.$(addNewCategorySelector);
    await page.waitForTimeout(2000);
    await addNewCategoryButton.click();
    await page.waitForTimeout(2000);
});

Then('This Category appears in the Category list', async function () {
    let listSelector = ['.rc-virtual-list-holder-inner'];
    await page.waitForSelector(listSelector);
    let list = await page.$(listSelector);
    let listItemSelector = ['.rc-virtual-list-holder-inner>div'];
    let listItems = await list.$$(listItemSelector);
    expect(listItems.length).to.equal(5);
});
AfterAll(async () => {
    await page.waitForTimeout(4000);
    await browser.close();
});