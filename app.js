//client and server side JS code
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const port = 3000;

const db = new sqlite3.Database('tables/tables.db');

app.use(express.json());

//Report #1 - Takes the value of a myShopifyDomain field as an input and returns their optimization settings.

    app.get('/report1',(req, res) => {
        const {myShopifyDomain} = req.query;
        const query = 
            `SELECT features
            FROM account
            WHERE shopifyId = ?;
            `;
        console.log('Executing query:', query);

        db.get(query, [myShopifyDomain], (err, row) => {
            if (err) {
                console.error('Error:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else if (row) {
                try {
                    const optimizationSettings = JSON.parse(row.features);
                    res.json(optimizationSettings);
                } catch (parseError) {
                    console.error('JSON Parsing Error:', parseError);
                    res.status(500).json({ error: 'Error Parsing Optimization Settings' });
                }
            } else {
                console.log('No Result For Shopify Domain:', myShopifyDomain);
                res.status(404).json({ error: 'No Shopify Domain Found' });
            }
        });

    });

//Report #2 - Loops through all organizations and shows the date they were created (DD/MM/YYYY), their status, and planName sorted by oldest to newest.

    app.get('/report2',(_, res) => {
        const query = `
            SELECT strftime('%d/%m/%y', createDate) AS createdDate, status, planName
            FROM organization
            ORDER BY createdDate;
            `;
        console.log('Executing query:', query);

        db.all(query,[], (err, rows) => {
            if (err) {
                console.error('Error:', err);
                res.status(500).json({error: 'Internal Server Error'});
            } else {
                res.json(rows);
            }
        });    
    });


//Report #3 - Returns the list of organizations whose status is cancelled.

    app.get('/report3', (_, res) => {
        const query = `
            SELECT *
            FROM organization
            WHERE status = 'CANCELLED';
            `;
        console.log('Executing query:', query);

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
        console.log('Executing query:', query);

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
        console.log(`Server is running on port ${port}`);
    });




