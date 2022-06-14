function run() {
    const settings = {
        softwareName: 'Launching the renaming software',
        possibleDateFormats: ['YYYY.MM.DD', 'DD.MM.YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD'],
        customerFolder: './test/%client',
        folders: [
            // ACD
            {
                searchFolder: './test/%client/%year/Book keeping records/ACD',
                destinationFolder: './test/%client/%year/Book keeping records/ACD',
                fileName: '%client - ACD tableau d\'avances %year - %date',
                keywords: ['avance', 'avances', 'advance', 'd\'avance', 'd\'avances'],
            },
            {
                searchFolder: './test/%client/%year/Book keeping records/ACD',
                destinationFolder: './test/%client/%year/Book keeping records/ACD',
                fileName: '%client - ACD EDC - %date',
                keywords: ['edc', 'extrait', 'ext'],
            },
            {
                searchFolder: './test/%client/%year/Book keeping records/ACD',
                destinationFolder: './test/%client/%year/Book keeping records/ACD',
                fileName: '%client - ACD décompte - %date',
                keywords: ['décompte', 'decompte'],
            },

            // AED
            {
                searchFolder: './test/%client/%year/Book keeping records/AEDT',
                destinationFolder: './test/%client/%year/Book keeping records/AEDT',
                fileName: '%client - AED EDC - %date',
                keywords: ['edc', 'extrait', 'ext'],
            },
            {
                searchFolder: './test/%client/%year/Book keeping records/AEDT',
                destinationFolder: './test/%client/%year/Book keeping records/AEDT',
                fileName: '%client - AED décompte - %date',
                keywords: ['décompte', 'decompte'],
            },

             // CCSS
             {
                searchFolder: './test/%client/%year/Book keeping records/CCSS',
                destinationFolder: './test/%client/%year/Book keeping records/AEDT',
                fileName: '%client - CCSS-99 relevé - %date',
                keywords:  ['ccss-99', 'ccss', 'ccss99'],
            },
            {
                searchFolder: './test/%client/%year/Book keeping records/CCSS',
                destinationFolder: './test/%client/%year/Book keeping records/AEDT',
                fileName: 'undefined - CCSS-60 relevé - %date',
                keywords:  ['ccss-60', 'ccss', 'ccss60'],
            },
        ],
    }
    return settings;
}

module.exports = {
    run
}