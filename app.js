const fs = require('fs');
const clc = require("cli-color");
const prompt = require("prompt-sync")({
    sigint: true
});
var path = require('path')
const moment = require('moment')

function getCustomer() {
    const nameOfCustomer = prompt("Nom du client: ");
    fs.readdir(`./test/${nameOfCustomer}`, (err, files) => {
        if (err) return console.log(clc.red('Le client n\'a pas pu être trouvé!'))
        console.log(clc.green(`Client "${nameOfCustomer}" trouvé avec succès! \n`))
        executeScript(`./test/${nameOfCustomer}`, nameOfCustomer);
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
    });
    // return console.log(clc.green('Renaming finished!'));
}

function modifyFiles_ACD(pathOfCustomer, nameOfCustomer, year) {
    fs.readdir(`${pathOfCustomer}/${year}/ACD`, (err, files) => {
        files.forEach(async fileName => {
            const fileNameWithoutextname = fileName.replace(/\.[^/.]+$/, "");
            const splitFileName = fileNameWithoutextname.split(" ");

            // Rename avances
            const avances_conditions = ['avance', 'avances', 'advance', 'd\'avance', 'd\'avances'];
            if (avances_conditions.some(condition => fileName.toLowerCase().includes(condition))) {
                const pathext = await path.extname(`${pathOfCustomer}/${year}/ACD/${fileName}`);

                if (fileName !== `${nameOfCustomer} - ACD Avances ${year}${pathext}`) {
                    const oldFilePath = `${pathOfCustomer}/${year}/ACD/${fileName}`
                    const newFilePath = `${pathOfCustomer}/${year}/ACD/${nameOfCustomer} - ACD Avances ${year}${pathext}`
                    const oldFileName = `${nameOfCustomer}/${year}/ACD/${fileName}`
                    const newFileName = `${nameOfCustomer}/${year}/ACD/${nameOfCustomer} - ACD Avances ${year}${pathext}`

                    
                    await fs.rename(oldFilePath, newFilePath, async function (err) {
                        if (err) console.log('ERROR: ' + err);
                        console.log(clc.red(oldFileName) + " --> " + clc.green(newFileName));
                    });
                } else {
                    console.log(`Renommage ignoré (Modèle déjà appliqué) - ${fileName}`)
                }
            }

            // Rename EDC
            const edc_conditions = ['edc', 'extrait', 'ext'];
            if (edc_conditions.some(condition => fileName.toLowerCase().includes(condition))) {
                let correctDate;
                await splitFileName.forEach(index => {
                    if (moment(index, ['YYYY.MM.DD', 'DD.MM.YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY'], true)) {
                        correctDate = moment(index, ['YYYY.MM.DD', 'DD.MM.YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY'], true).format('YYYY.MM.DD')
                    }
                })
                if (correctDate) {
                const pathext = await path.extname(`${pathOfCustomer}/${year}/ACD/${fileName}`);
                if (fileName !== `${nameOfCustomer} - ACD EDC - ${correctDate}${pathext}`) {
                    const oldFilePath = `${pathOfCustomer}/${year}/ACD/${fileName}`
                    const newFilePath = `${pathOfCustomer}/${year}/ACD/${nameOfCustomer} - ACD EDC - ${correctDate}${pathext}`
                    const oldFileName = `${nameOfCustomer}/${year}/ACD/${fileName}`
                    const newFileName = `${nameOfCustomer}/${year}/ACD/${nameOfCustomer} - ACD EDC - ${correctDate}${pathext}`

                    
                    await fs.rename(oldFilePath, newFilePath, async function (err) {
                        if (err) console.log('ERROR: ' + err);
                        console.log(clc.red(oldFileName) + " --> " + clc.green(newFileName));
                    });
                } else {
                    console.log(`Renommage ignoré (Modèle déjà appliqué) - ${fileName}`)
                }
            } else {
                console.log(clc.red(`Renommage ignoré car pas de date inclus (Formats testés: 'YYYY.MM.DD', 'DD.MM.YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY') - ${fileName}`));
            }
            }

            // Rename decompte
            const decompte_conditions = ['décompte', 'decompte'];
            if (decompte_conditions.some(condition => fileName.toLowerCase().includes(condition))) {
                let correctDate;
                await splitFileName.forEach(index => {
                    if (moment(index, ['YYYY.MM.DD', 'DD.MM.YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY'])) {
                        correctDate = moment(index, ['YYYY.MM.DD', 'DD.MM.YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY']).format('YYYY.MM.DD')
                    }
                })
                if (correctDate) {
                const pathext = await path.extname(`${pathOfCustomer}/${year}/ACD/${fileName}`);
                if (fileName !== `${nameOfCustomer} - ACD décompte - ${correctDate}${pathext}`) {
                    const oldFilePath = `${pathOfCustomer}/${year}/ACD/${fileName}`
                    const newFilePath = `${pathOfCustomer}/${year}/ACD/${nameOfCustomer} - ACD décompte - ${correctDate}${pathext}`
                    const oldFileName = `${nameOfCustomer}/${year}/ACD/${fileName}`
                    const newFileName = `${nameOfCustomer}/${year}/ACD/${nameOfCustomer} - ACD décompte - ${correctDate}${pathext}`

                    
                    await fs.rename(oldFilePath, newFilePath, async function (err) {
                        if (err) console.log('ERROR: ' + err);
                        console.log(clc.red(oldFileName) + " --> " + clc.green(newFileName));
                    });
                } else {
                    console.log(`Renommage ignoré (Modèle déjà appliqué) - ${fileName}`)
                }
            } else {
                console.log(clc.red(`Renommage ignoré car pas de date inclus (Formats testés: 'YYYY.MM.DD', 'DD.MM.YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY') - ${fileName}`));
            }
            }
        });
    });
}

getCustomer();