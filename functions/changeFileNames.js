const fs = require('fs');
var path = require('path')
const moment = require('moment')

const logger = require('./winstonLogger').logger();

function modifyFileNames(pathOfCustomer, nameOfCustomer, year, settings, nameOfCustomerWithId) {
    for (let i = 0; i < settings.folders.length; i += 1) {
        const variable_searchFolder = settings.folders[i].searchFolder.replace('%client', nameOfCustomerWithId).replace('%year', year);
        fs.readdir(variable_searchFolder, (err, files) => {
            if (err) return err;
            files.forEach(async fileName => {
                const fileNameWithoutextname = fileName.replace(/\.[^/.]+$/, "");
                const splitFileName = fileNameWithoutextname.split(" ");

                const keywords = settings.folders[i].keywords;
                if (keywords.some(condition => fileName.toLowerCase().includes(condition))) {
                    const pathext = await path.extname(`${variable_searchFolder}/${fileName}`);
                    let correctDate;
                    await splitFileName.forEach(index => {
                        if (moment(index, ['YYYY.MM.DD', 'DD.MM.YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY'], true).isValid()) {
                            correctDate = moment(index, ['YYYY.MM.DD', 'DD.MM.YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY'], true).format('YYYY.MM.DD')

                        }
                    })

                    const variable_filename = `${settings.folders[i].fileName.replace('%client', nameOfCustomer).replace(`%year`, year).replace('%date', correctDate)}${pathext}`
                    if (fileName !== variable_filename) {
                        const oldFilePath = `${variable_searchFolder}/${fileName}`
                        const newFilePath = `${variable_searchFolder}/${variable_filename}`
                        const oldFileName = `${variable_searchFolder}/${fileName}`
                        const newFileName = `${variable_searchFolder}/${variable_filename}`


                        await fs.rename(oldFilePath, newFilePath, async function (err) {
                            if (err) {
                                logger.error({
                                    level: 'error',
                                    message: err
                                  });
                            }
                            logger.log({
                                level: 'info',
                                message: oldFileName + " --> " + newFileName
                              });
                        });
                    } else {
                        logger.log({
                            level: 'info',
                            message: `Renommage ignoré (Syntax déjà appliqué) - ${fileName}`
                          });
                    }
                }
            });
        });
    }
}

module.exports = {
    modifyFileNames
}