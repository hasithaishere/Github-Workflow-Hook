const config = {
    // Data Store Related Configs (Google Spreadsheet)
    googleDocId: '{{googleDocId}}',
    googleServiceEmail: '{{googleServiceEmail}}',
    googlePrivateKey: '{{googlePrivateKey}}',

    // Cmmunicator Related Configs
    webhookUrls: {
        production: '{{webhookUrls-production}}',
        qa: '{{webhookUrls-qa}}'
    }
};

module.exports = config;