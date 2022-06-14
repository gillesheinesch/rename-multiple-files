function run() {
    const settings = {
        softwareName: 'Launching the renaming software',
        possibleDateFormats: ['YYYY.MM.DD', 'DD.MM.YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD'],
        customerFolder: './test/%client',
        folders: [
            {
                searchFolder: './test/%client/%year/testfolder',
                destinationFolder: './test/%client/%year/testfolder',
                fileName: '%client - Test file - %date',
                keywords: ['keyword1', 'keyword2'],
            },
        ],
    }
    return settings;
}

module.exports = {
    run
}