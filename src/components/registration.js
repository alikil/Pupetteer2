const screenshotTake = require("./takePicture")
const puppeteer = require('puppeteer');
const logger = require("./loger")
exports.tmforum = async(targetPage,email) => {
    return new Promise(async(resolve, reject) => {
    const browser = await puppeteer.launch({headless: false, defaultViewport:{width:1280,height:800}});
    const page = await browser.newPage();
    await page.goto(targetPage);
    await page.setViewport({width: 1280, height: 800});
    await screenshotTake.screenshot("01_regPage.png",page,email)
    await logger.logger("#1 Reg Page loaded",email);
    await page.waitFor(3000);
    await page.waitForSelector('input[placeholder="Enter your first name"]',{delay: 120})
    await page.type('input[placeholder="Enter your first name"]', process.env.firstName,{delay: 120})    
    await page.type('input[placeholder="Enter your last name"]', process.env.lastName,{delay: 120})
    await page.type('input[name="input_49"]', process.env.password,{delay: 120})
    await page.type('input[placeholder="Confirm Password"]', process.env.password,{delay: 120})
    await page.type('input[placeholder="Enter your phone number"]', process.env.phoneNumber,{delay: 120})
    await page.type('input[placeholder="Enter your job"]', process.env.jobTitle,{delay: 120})
    await page.type('input[placeholder="Enter your email"]', process.env.email,{delay: 120})
    await page.select('select[name="input_23"]', 'us');
    await page.waitForSelector('select[name="input_25"]', 'New Jersey')
    await page.waitFor(3000);
    await page.select('select[name="input_25"]', 'New Jersey');
    await page.click('label[for="choice_6_51_1"]')
    await screenshotTake.screenshot("02_regPageEnvAdded.png",page,email)
    await page.waitFor(5000);
    await page.click('input[type="button"]')
    await page.waitFor(5000);
    await page.type('input[name="input_56"]', process.env.CompanyName,{delay: 120})
    await logger.logger("#2 Reg second Page loaded",email);
    await page.waitFor(3000);
    await screenshotTake.screenshot("03_regPageCompany.png",page,email)    
    await page.click('input[id="gform_next_button_6_31"]')
    await page.waitFor(3000);
    await logger.logger("#3 Reg third Page loaded",email);
    await screenshotTake.screenshot("04_regPageAdditions.png",page,email)
    await page.click('input[id="gform_submit_button_6"]')
    await page.waitFor(3000);
    await screenshotTake.screenshot("05_regPageEnd.png",page,email)
    await logger.logger("Reg Complete!",email);
    browser.close()
    resolve("ok")
    });
}
exports.tmforumActivation = async(email,activationLink) => {
    return new Promise(async(resolve, reject) => {   
        const browser = await puppeteer.launch({headless: false, defaultViewport:{width:1280,height:800}});
        const page = await browser.newPage();
        await page.goto(activationLink);
        await page.waitFor(5000);
        await screenshotTake.screenshot("06_ActivationPage.png",page,email)
        await logger.logger("Activation Complete!",email);
        await browser.close()
        resolve("ok")
    });
}
