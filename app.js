const fs = require('fs');
const clc = require("cli-color");
const prompt = require("prompt-sync")({
    sigint: true
});

var packageJSON = require('./package.json');
const {
    modifyFileNames
} = require('./functions/changeFileNames');
const settings = require('./settings').run();

const logger = require('./functions/winstonLogger').logger();

function getCustomer() {
    logger.log({
        level: 'info',
        message: `${settings.softwareName} (${packageJSON.version}) - © Gilles HEINESCH`
      });
    const nameOfCustomer = prompt(clc.bold("Nom du dossier: "));
    const variable_customerFolder = settings.customerFolder.replace('%client', nameOfCustomer)
    fs.readdir(variable_customerFolder, (err, files) => {
        if (err) {
            return logger.log({
                level: 'error',
                message: 'Le dossier n\'a pas pu être trouvé!'
              });
        }

        logger.log({
            level: 'info',
            message: `Dossier "${nameOfCustomer}" trouvé avec succès! \n`
          });

        let nameWithoutID = nameOfCustomer.split(' ')
        nameWithoutID.pop();
        nameWithoutID = nameWithoutID.join(' ')

        const nameOfCustomerWithId = nameOfCustomer

        executeScript(variable_customerFolder, nameWithoutID, nameOfCustomerWithId);
    });
}

async function executeScript(pathOfCustomer, nameOfCustomer, nameOfCustomerWithId) {
    const yearsFolders = await getYears(pathOfCustomer)
    modifyFiles(pathOfCustomer, nameOfCustomer, yearsFolders, nameOfCustomerWithId)
}

async function getYears(pathOfCustomer) {
    const years = [];
    await fs.readdirSync(pathOfCustomer).filter(function (file) {
        if (file.length === 4 && !isNaN(file)) {
            years.push(file)
        }
    })
    logger.log({
        level: 'info',
        message: `Année(s) concernée(s): ${years.join(", ")} \n`
      });
    return years;
}

async function modifyFiles(pathOfCustomer, nameOfCustomer, yearsFolders, nameOfCustomerWithId) {
    await yearsFolders.forEach(async year => {
        await modifyFileNames(pathOfCustomer, nameOfCustomer, year, settings, nameOfCustomerWithId)
    });
}

getCustomer();