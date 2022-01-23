const fs = require('fs');
const clc = require("cli-color");
const prompt = require("prompt-sync")({
    sigint: true
});
var path = require('path')
const moment = require('moment')

var packageJSON = require('./package.json');
const  { modifyFiles_AED } = require('./functions/wip/book_keeping_records/aed');
const  { modifyFiles_ACD } = require('./functions/wip/book_keeping_records/acd');

function getCustomer() {
    console.log(clc.green.bold(`GTF - Lancement du logiciel de renommage (${packageJSON.version}) - © Gilles HEINESCH`))
    const nameOfCustomer = prompt(clc.bold("Nom du client: "));
    fs.readdir(`./test/${nameOfCustomer}`, (err, files) => {
        if (err) return console.log(clc.red.bold('Le client n\'a pas pu être trouvé!'));
        console.log(clc.green(`Client "${nameOfCustomer}" trouvé avec succès! \n`));

        let nameWithoutID = nameOfCustomer.split(' ')
        nameWithoutID.pop();
        nameWithoutID = nameWithoutID.join(' ')
        executeScript(`./test/${nameOfCustomer}`, nameWithoutID);
    });
}

async function executeScript(pathOfCustomer, nameOfCustomer) {
    const yearsFolders = await getYears(pathOfCustomer)
    modifyFiles(pathOfCustomer, nameOfCustomer, yearsFolders)
}

async function getYears(pathOfCustomer) {
    const years = [];
    await fs.readdirSync(pathOfCustomer).filter(function (file) {
        if (file.length === 4 && !isNaN(file)) {
            years.push(file)
        }
    })
    console.log(clc.green(`Année(s) concernée(s): ${years.join(", ")} \n`));
    return years;
}

async function modifyFiles(pathOfCustomer, nameOfCustomer, yearsFolders) {
    await yearsFolders.forEach(async year => {
        await modifyFiles_ACD(pathOfCustomer, nameOfCustomer, year)
        await modifyFiles_AED(pathOfCustomer, nameOfCustomer, year)
    });
}

getCustomer();