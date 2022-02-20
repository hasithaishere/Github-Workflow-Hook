const githubService = require('../services/github');

async function handleWebhook(req, res) {
    
    if (req.body.action && req.body.action === 'completed' && req.body.workflow_run) {
        const {
            workflow: { id: workflowId },
            workflow_run: {
                id: workflowRunId,
                event: triggerEvent,
                run_started_at: startedAt,
                updated_at: completedAt,
                conclusion: status,
                head_branch: gitBranch,
                head_sha: commitHash,
                html_url: workflowUrl
            }, repository, workflow_run: workflowRun
        } = req.body;

        const options = {
            sheetName: `${repository.name}[${repository.id}]`,
            workflowId,
            workflowRunId,
            workflowName: workflowRun.name.replaceAll('+', ' '),
            environment: workflowRun.event === 'push' ? 'qa' : 'production',
            triggerEvent,
            startedAt,
            completedAt,
            status,
            gitBranch,
            commitHash,
            workflowUrl,
            repoName: repository.name
        };

        await githubService.handleWebhook(options);
    }

    res.json({ message: 'Webhook received and executed' });
};

module.exports = { handleWebhook };