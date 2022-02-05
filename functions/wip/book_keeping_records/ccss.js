const fs = require('fs');
const clc = require("cli-color");
var path = require('path')
const moment = require('moment')

function modifyFiles_CCSS(pathOfCustomer, nameOfCustomer, year) {
    fs.readdir(`${pathOfCustomer}/${year}/AED`, (err, files) => {
        files.forEach(async fileName => {
            const fileNameWithoutextname = fileName.replace(/\.[^/.]+$/, "");
            const splitFileName_ccss99 = fileNameWithoutextname.split(" ");
            const splitFileName_ccss60 = fileNameWithoutextname.split(" ");
            const splitFileName_ccss30 = fileNameWithoutextname.split(" ");

            // Rename CCSS-99
            const ccss99_conditions = ['ccss-99', 'ccss', 'ccss99'];
            if (ccss99_conditions.some(condition => fileName.toLowerCase().includes(condition))) {
                let correctDate;
                await splitFileName_ccss99.forEach(index => {
                    if (moment(index, ['YYYY.MM.DD', 'DD.MM.YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY'], true).isValid()) {
                        correctDate = moment(index, ['YYYY.MM.DD', 'DD.MM.YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY'], true).format('YYYY.MM.DD')
                    }
                })
                if (correctDate) {
                    const pathext = await path.extname(`${pathOfCustomer}/${year}/CCSS/${fileName}`);
                    if (fileName !== `${nameOfCustomer} - CCSS-99 relevé - ${correctDate}${pathext}`) {
                        const oldFilePath = `${pathOfCustomer}/${year}/CCSS/${fileName}`
                        const newFilePath = `${pathOfCustomer}/${year}/CCSS/${nameOfCustomer} - CCSS-99 relevé - ${correctDate}${pathext}`
                        const oldFileName = `${nameOfCustomer}/${year}/CCSS/${fileName}`
                        const newFileName = `${nameOfCustomer}/${year}/CCSS/${nameOfCustomer} - CCSS-99 relevé - ${correctDate}${pathext}`


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

            // Rename CCSS-60
            const ccss60_conditions = ['ccss-60', 'ccss60'];
            if (ccss60_conditions.some(condition => fileName.toLowerCase().includes(condition))) {
                let correctDate;
                await splitFileName_ccss60.forEach(index => {
                    if (moment(index, ['YYYY.MM.DD', 'DD.MM.YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY'], true).isValid()) {
                        correctDate = moment(index, ['YYYY.MM.DD', 'DD.MM.YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY'], true).format('YYYY.MM.DD')
                        
                    }
                })
                if (correctDate) {
                    const pathext = await path.extname(`${pathOfCustomer}/${year}/CCSS/${fileName}`);
                    if (fileName !== `${nameOfCustomer} - CCSS-60 relevé - ${correctDate}${pathext}`) {
                        const oldFilePath = `${pathOfCustomer}/${year}/CCSS/${fileName}`
                        const newFilePath = `${pathOfCustomer}/${year}/CCSS/${nameOfCustomer} - CCSS-60 relevé - ${correctDate}${pathext}`
                        const oldFileName = `${nameOfCustomer}/${year}/CCSS/${fileName}`
                        const newFileName = `${nameOfCustomer}/${year}/CCSS/${nameOfCustomer} - CCSS-60 relevé - ${correctDate}${pathext}`


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

        // Rename CCSS-30
        const ccss30_conditions = ['ccss-30', 'ccss30'];
        if (ccss30_conditions.some(condition => fileName.toLowerCase().includes(condition))) {
            let correctDate;
            await splitFileName_ccss30.forEach(index => {
                if (moment(index, ['YYYY.MM.DD', 'DD.MM.YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY'], true).isValid()) {
                    correctDate = moment(index, ['YYYY.MM.DD', 'DD.MM.YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY'], true).format('YYYY.MM.DD')
                    
                }
            })
            if (correctDate) {
                const pathext = await path.extname(`${pathOfCustomer}/${year}/CCSS/${fileName}`);
                if (fileName !== `${nameOfCustomer} - CCSS-60 relevé - ${correctDate}${pathext}`) {
                    const oldFilePath = `${pathOfCustomer}/${year}/CCSS/${fileName}`
                    const newFilePath = `${pathOfCustomer}/${year}/CCSS/${nameOfCustomer} - CCSS-30 relevé - ${correctDate}${pathext}`
                    const oldFileName = `${nameOfCustomer}/${year}/CCSS/${fileName}`
                    const newFileName = `${nameOfCustomer}/${year}/CCSS/${nameOfCustomer} - CCSS-30 relevé - ${correctDate}${pathext}`


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
}

module.exports = { modifyFiles_CCSS }