const axios = require('axios');
const BaseCommunicator = require('./BaseCommunicator');

const { webhookUrls } = require('../../config');

class MicrosoftMeet extends BaseCommunicator {
    constructor (options) {
        super(options);
    }

    getMessageCard() {
        let title = 'Deployment Completed';
        let themeColor = '00d100';
        let activityImage = 'https://i.ibb.co/xMDXNrN/success.png';

        if (this.options.status === 'failure') {
            title = 'Deployment Failed';
            themeColor = 'd60000';
            activityImage = 'https://i.ibb.co/gr5pJBX/failure.png';
        }

        let activityTitle = this.options.repoName.replace(/-/g, ' ');
        activityTitle = `${activityTitle[0].toUpperCase()}${activityTitle.slice(1)} Project`;

        const card = {
            "@type": "MessageCard",
            "@context": "https://schema.org/extensions",
            "summary": `Workflow Id : ${this.options.workflowId} | Workflow Run Id : ${this.options.workflowRunId}`,
            themeColor,
            title,
            "sections": [
                {
                    activityTitle,
                    "activitySubtitle": this.options.startedAt,
                    activityImage,
                    "facts": [
                        {
                            "name": "Repository:",
                            "value": this.options.repoName
                        },
                        {
                            "name": "Branch:",
                            "value": this.options.gitBranch
                        },
                        {
                            "name": "Commit #:",
                            "value": this.options.commitHash
                        },
                        {
                            "name": "Environment:",
                            "value": this.options.environment
                        },
                        {
                            "name": "Workflow:",
                            "value": this.options.workflowName
                        },
                    ]
                }
            ],
            "potentialAction": [
                {
                    "@type": "OpenUri",
                    "name": "View in GitHub",
                    "targets": [
                        {
                            "os": "default",
                            "uri": this.options.workflowUrl
                        }
                    ]
                }
            ]
        };

        return card;
    }
    
    async send() {
        const url = webhookUrls[this.options.environment];
        await axios.post(url, this.getMessageCard());
    }
}

module.exports = MicrosoftMeet;