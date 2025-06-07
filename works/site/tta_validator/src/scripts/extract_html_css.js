const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const config = JSON.parse(fs.readFileSync('config/pages.json'));
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (let route of config.pages) {
        let url = config.base_url + route;
        await page.goto(url);
        let html = await page.content();
        let css = await page.evaluate(() => {
            return [...document.styleSheets].map(sheet => [...sheet.cssRules].map(rule => rule.cssText).join('\n')).join('\n');
        });

        fs.writeFileSync(`results/${route.replace(/\//g, '_')}.html`, html);
        fs.writeFileSync(`results/${route.replace(/\//g, '_')}.css`, css);
    }

    await browser.close();
})();
