const {By, Builder, Browser} = require('selenium-webdriver');
const assert = require("assert");

(async function firstTest() {
  let driver;
  
  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get('https://cn.bing.com/');
  
    // let title = await driver.getTitle();
    // assert.equal("Web form", title);
    
    await driver.manage().setTimeouts({implicit: 500});
    
    let input = await driver.findElement(By.className("sb_form_q"));
    await input.sendKeys("iOS");
    let sb_form = await driver.findElement(By.className('sb_form'));
    await sb_form.submit();
  
    let message = await driver.findElement(By.id('message'));
    let value = await message.getText();
    await driver.manage().setTimeouts({implicit: 5000});
    assert.equal("Received!", value);
    assert.equal("Received!", value);
  } catch (e) {
    console.log(e)
  } finally {
    await driver.quit();
  }
}())