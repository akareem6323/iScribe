const express = require('express');
const bodyParser = require('body-parser');
const sendmail = require('sendmail')();
const excel = require('exceljs');
const fs = require('fs');
const path = require('path');
const { getValueFromLine } = require('./utils/fileUtils'); // helper function
const { handleDefaultTemplatePost } = require('./controllers/defaultTemplate'); // logic separation

const app = express();
const port = 8889;

// Serve static files (HTML, CSS, JS) from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Homepage
app.get('/homepage', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/homepage.html'));
});

// Report Templates
app.get('/Templates', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/ReportTemplates.html'));
});

// Default Template (GET + POST)
app.get('/DefaultTemplate', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/DefaultTemplate.html'));
});

app.post('/DefaultTemplate', handleDefaultTemplatePost);

// Downtime Logs Page
app.get('/DowntimeLogs', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/DowntimeLogs.html'));
});

// Serve generated report files
app.use('/Reports', express.static(path.join(__dirname, 'Reports')));

// Get Downtime Reports
app.get('/getDowntimeLogs', (req, res) => {
    const folderPath = 'Reports';

    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading Reports folder:', err);
            return res.status(500).send('Error reading Reports folder');
        }

        const filePromises = files.map(file =>
            new Promise((resolve, reject) => {
                fs.readFile(path.join(folderPath, file), 'utf8', (err, data) => {
                    if (err) reject(err);
                    else resolve({ file, data });
                });
            })
        );

        Promise.all(filePromises)
            .then(results => {
                let tableHtml = `
          <table border="1">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Patient ID</th>
                <th>Accession Number</th>
                <th>Study Description</th>
                <th>Open Report</th>
              </tr>
            </thead>
            <tbody>
        `;

                results.forEach(({ file, data }) => {
                    const lines = data.split('\n');
                    const PN = getValueFromLine(lines, 'Patient Name');
                    const PID = getValueFromLine(lines, 'Patient ID');
                    const ACN = getValueFromLine(lines, 'Accession Number');
                    const SD = getValueFromLine(lines, 'Study Description');

                    tableHtml += `
            <tr>
              <td>${PN}</td>
              <td>${PID}</td>
              <td>${ACN}</td>
              <td>${SD}</td>
              <td><a href="/Reports/${file}" target="_blank">Open Report</a></td>
            </tr>
          `;
                });

                tableHtml += `</tbody></table>`;
                res.send(`
          <!DOCTYPE html>
          <html lang="en">
          <head><meta charset="UTF-8"><title>Downtime Reports</title></head>
          <body>${tableHtml}</body>
          </html>
        `);
            })
            .catch(error => {
                console.error('Error processing files:', error);
                res.status(500).send('Error processing files');
            });
    });
});

// CT pages
app.get('/CTAPTrauma', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/CTAPTrauma.html'));
});
app.get('/CTCapTrauma', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/CTCapTrauma.html'));
});
app.get('/CTChestTrauma', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/CTChestTrauma.html'));
});
app.get('/CTHead', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/CTHead.html'));
});
app.get('/CTHeadFaceCspine', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/CTHeadFaceCspine.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Imole App listening on http://localhost:${port}`);
});
