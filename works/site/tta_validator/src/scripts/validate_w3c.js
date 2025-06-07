const fetch = require('node-fetch');
const fs = require('fs');

(async () => {
    const config = JSON.parse(fs.readFileSync('config/pages.json'));

    for (let route of config.pages) {
        let htmlFile = `results/${route.replace(/\//g, '_')}.html`;
        let cssFile = `results/${route.replace(/\//g, '_')}.css`;

        let htmlData = fs.readFileSync(htmlFile, 'utf-8');
        let cssData = fs.readFileSync(cssFile, 'utf-8');

        let validateHTML = await fetch('https://validator.w3.org/nu/', {
            method: 'POST',
            body: `out=json&content=${encodeURIComponent(htmlData)}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        let validateCSS = await fetch('https://jigsaw.w3.org/css-validator/validator', {
            method: 'POST',
            body: `text=${encodeURIComponent(cssData)}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        let htmlResults = await validateHTML.json();
        let cssResults = await validateCSS.json();

        fs.writeFileSync(`results/${route.replace(/\//g, '_')}_validation.json`, JSON.stringify({ html: htmlResults, css: cssResults }, null, 2));
    }
})();
