/*  SERVER  */

const express = require('express');
const db = require('./connect/localize-db');
const connection = require('./connect/connect-APPtoDB');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res) => res.status(404).end());

app.get(db, (req, res) => { if(err)throw err });

app.get(connection, (req,res) => { if(err)throw err});

app.listen(PORT, () => console.log(`\nConnecting Database to local port ${PORT}!\n`));


/*  zMaG33z  */