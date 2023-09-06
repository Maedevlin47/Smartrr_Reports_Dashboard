//client and server side JS code
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const port = 3000;

const db = new sqlite3.Database('tables.db');

app.use(express.json());

//Report #1 - Takes the value of a myShopifyDomain field as an input and returns their optimization settings.

    app.get('/report1',(req, res) => {
        const {myShopifyDomain} = req.query;
        const query = 
            `SELECT features
            FROM account
            WHERE shopifyId = ?;
            `;
        db.get(query, [myShopifyDomain], (err, row) => {
            if (err) {
                console.error('Error:', err);
                res.status(500).json({error: 'Internal Server Error'});
            } else if (row) {
                res.json(JSON.parse(row.features));
            } else {
                res.status(404).json({error: 'No Shopify Domain Not Found'});
            }
        });

    });

//Report #2 - Loops through all organizations and shows the date they were created (DD/MM/YYYY), their status, and planName sorted by oldest to newest.

    app.get('/report', (req, res) => {
        const query = `
            SELECT strftime('%d/%m/%y', createDate) AS createdDate, status, planName
            FROM organization
            ORDER BY createdDate;
            `;

        bd.all(query,[], (err, rows) => {
            if (err) {
                console.error('Error:', err);
                res.status(500).json({error: 'Internal Server Error'});
            } else {
                res.json(rows);
            }
        });    
    });


//Report #3 - Returns the list of organizations whose status is cancelled.

    app.get('/report3', (req, res) => {
        const query = `
            SELECT *
            FROM organization
            WHERE status = 'CANCELLED';
            `;

        db.all(query,[],(err,rows) => {
            if (err) {
                console.error('Error:', err);
                res.status(500).json({error: 'Internal Server Error'});
            } else { 
                res.json(rows);
            }
        });
    });


//Report #4 - Takes the value of an orgName and returns the organization record in JSON format.

    app.get('/report4', (req, res) => {
        const {orgName} = req.query;
        const query = `
                SELECT *
                FROM organization
                WHERE orgName = ?;
                `;
    
        db.get(query, [orgName], (err,row) => {
            if (err) {
                console.error('Error:', err);
                res.status(500).json({error: 'Internal Server Error'});
            } else if (row) {
                res.json(row);
            } else {
                res.status(404).json({error: 'Organization Records Not Found'});
            }
        });
    });

    app.use(express.static('public'));
    

    app.listen(port, () => {
        console.log('"Server is running on port ${port}');
    });




