const { GoogleSpreadsheet } = require('google-spreadsheet');
const BaseDataSource = require('./BaseDataSource');

const {
    googleDocId,
    googleServiceEmail,
    googlePrivateKey
} = require('../../config');

class GoogleSheet extends BaseDataSource {
    constructor (options) {
        super(options);
        this.doc = null;
    }

    async getDoc() {
        if (this.doc === null) {
            const document = new GoogleSpreadsheet(googleDocId);
            await document.useServiceAccountAuth({
                client_email: googleServiceEmail,
                private_key: googlePrivateKey
            });

            await document.loadInfo();
            this.doc = document;
        }

        return this.doc;
    }

    async getSheet(sheetName) {
        const document = await this.getDoc();
        const sheetCount = document.sheetCount;

        let sheetIndex = 0;
        let actualSheet = null;
        while (sheetIndex < sheetCount && actualSheet === null) {
            const sheet = document.sheetsByIndex[sheetIndex];
            if (sheet.title === sheetName) {
                actualSheet = sheet;
            }
            sheetIndex++;
        }

        if (actualSheet === null) {
            const templateSheet = await document.sheetsByTitle['template'];
            await templateSheet.copyToSpreadsheet(googleDocId);
            await document.loadInfo();
            actualSheet = await document.sheetsByTitle['Copy of template'];
            await actualSheet.updateProperties({ title: sheetName });
        }

        return actualSheet;
    }
    
    async save() {
        const sheet = await this.getSheet(this.options.sheetName);
        await sheet.addRow(this.options);
    }
}

module.exports = GoogleSheet;