const fs = require('fs');

function handleDefaultTemplatePost(req, res) {
    const defaultTemp = `
    Patient Name: ${req.body.PN}
    Patient ID: ${req.body.PID}
    Accession Number: ${req.body.ACN}
    Study Description: ${req.body.SD}

    PROCEDURES: ${req.body.procedures}
    TECHNIQUE: ${req.body.technique}
    FINDINGS: ${req.body.findings}
    IMPRESSION: ${req.body.impression}
  `;

    const folderPath = 'Reports';
    const filePath = `${folderPath}/${req.body.PID}_${req.body.ACN}.txt`;

    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);

    fs.writeFile(filePath, defaultTemp, (err) => {
        if (err) {
            console.error('Error saving default template:', err);
            res.status(500).send('Error saving default template');
        } else {
            res.send(`<script>alert("Form submitted successfully! You can now close this window/tab.");</script>`);
        }
    });
}

module.exports = { handleDefaultTemplatePost };
