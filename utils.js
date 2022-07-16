const fs = require("fs");
const replaceTemplate = (temp, product) => {
    const namesForParsing = ['productName', 'image', 'price', 'from', 'nutrients', 'quantity', 'description', 'id'];
    let output = temp;
    for (let i = 0; i < namesForParsing.length; i++) {
        const regex = new RegExp(`{%${namesForParsing[i].toUpperCase()}%}`, 'g');
        output = output.replace(regex, product[namesForParsing[i]]);
    }
    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
};

const readTemplateFileSync = (templateType) => fs.readFileSync(`${ __dirname }/templates/template-${ templateType }.html`, 'utf-8');


module.exports = {
    replaceTemplate,
    readTemplateFileSync
}
