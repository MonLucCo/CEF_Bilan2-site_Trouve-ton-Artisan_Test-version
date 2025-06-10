import express from "express";
import fs from "fs";

const router = express.Router();

router.get('/results', (req, res) => {
    let files = fs.readdirSync('results').filter(file => file.endsWith('_validation.json'));
    let results = files.map(file => JSON.parse(fs.readFileSync(`results/${file}`)));
    res.json(results);
});

export default router;
