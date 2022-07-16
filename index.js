const http = require('http');
const fs = require('fs');
const url = require("url");
const { replaceTemplate, readTemplateFileSync } = require('./utils')

const tempOverview = readTemplateFileSync('overview');
const tempCard = readTemplateFileSync('card');
const tempProduct = readTemplateFileSync('product');

const productData = fs.readFileSync(`${ __dirname }/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(productData);

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el));
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);

    } else if (pathname === '/product') {
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end(output);

    } else if (pathname === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(productData);

    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>')
    }
})

server.listen(8080, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000!');
})
