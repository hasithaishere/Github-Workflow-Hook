const GoogleSheet = require('../helpers/dataSource/GoogleSheet');
const MicrosoftMeet = require('../helpers/communicator/MicrosoftMeet');

function handleWebhook(options) {
    const googleSheet = new GoogleSheet(options);
    const microsoftMeet = new MicrosoftMeet(options);

    return Promise.all([
        googleSheet.save(),
        microsoftMeet.send()
    ]);
};

module.exports = { handleWebhook };