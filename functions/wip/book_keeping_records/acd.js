const fs = require('fs');
const clc = require("cli-color");
var path = require('path')
const moment = require('moment')

function modifyFiles_ACD(pathOfCustomer, nameOfCustomer, year) {
    fs.readdir(`${pathOfCustomer}/${year}/ACD`, (err, files) => {
        files.forEach(async fileName => {
            const fileNameWithoutextname = fileName.replace(/\.[^/.]+$/, "");
            const splitFileName_edc = fileNameWithoutextname.split(" ");
            const splitFileName_decompte = fileNameWithoutextname.split(" ");

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
                        console.log(clc.red.bold(oldFileName) + " --> " + clc.green(newFileName));
                    });
                } else {
                    console.log(`Renommage ignoré (Modèle déjà appliqué) - ${fileName}`)
                }
            }

            // Rename EDC
            const edc_conditions = ['edc', 'extrait', 'ext'];
            if (edc_conditions.some(condition => fileName.toLowerCase().includes(condition))) {
                let correctDate;
                await splitFileName_edc.forEach(index => {
                    if (moment(index, ['YYYY.MM.DD', 'DD.MM.YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY'], true).isValid()) {
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
                            console.log(clc.red.bold(oldFileName) + " --> " + clc.green(newFileName));
                        });
                    } else {
                        console.log(`Renommage ignoré (Modèle déjà appliqué) - ${fileName}`)
                    }
                } else {
                    console.log(clc.red.bold(`Renommage ignoré car pas de date inclus (Formats testés: 'YYYY.MM.DD', 'DD.MM.YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY') - ${fileName}`));
                }
            }

            // Rename decompte
            const decompte_conditions = ['décompte', 'decompte'];
            if (decompte_conditions.some(condition => fileName.toLowerCase().includes(condition))) {
                let correctDate;
                await splitFileName_decompte.forEach(index => {
                    if (moment(index, ['YYYY.MM.DD', 'DD.MM.YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY'], true).isValid()) {
                        correctDate = moment(index, ['YYYY.MM.DD', 'DD.MM.YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY'], true).format('YYYY.MM.DD')
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
                            console.log(clc.red.bold(oldFileName) + " --> " + clc.green(newFileName));
                        });
                    } else {
                        console.log(`Renommage ignoré (Modèle déjà appliqué) - ${fileName}`)
                    }
                } else {
                    console.log(clc.red.bold(`Renommage ignoré car pas de date inclus (Formats testés: 'YYYY.MM.DD', 'DD.MM.YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY') - ${fileName}`));
                }
            }
        });
    });
}

module.exports = { modifyFiles_ACD }