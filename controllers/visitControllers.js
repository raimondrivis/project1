
const fs = require('fs').promises;

const regTextRef = 'public/txt/visits.txt';

// Külastuste avaleht: näitame viimast külastust
const showVisits = async (req, res) => {
    try {
        const data = await fs.readFile(regTextRef, 'utf8');
        const visits = data.split(';').filter(name => name.trim() !== '');
        const lastVisit = visits.length > 0 ? visits[visits.length - 1] : null;

        res.render('visits', { lastVisit });
    } catch (err) {
        console.log(err);
        res.render('visits', { lastVisit: null });
    }
};

// Külastuse registreerimise vorm
const showRegisterVisit = (req, res) => {
    res.render('regvisit', { notice: null });
};

// Külastuse salvestamine
const registerVisit = async (req, res) => {
    const name = req.body.nameInput?.trim();

    if (!name) {
        return res.render('regvisit', {
            notice: 'Palun sisesta oma nimi!'
        });
    }

    try {
        await fs.appendFile(regTextRef, name + ';');
        res.render('regvisit', {
            notice: 'Külastus registreeritud!'
        });
    } catch (err) {
        console.log(err);
        res.render('regvisit', {
            notice: 'Külastuse registreerimine ebaõnnestus!'
        });
    }
};

module.exports = {
    showVisits,
    showRegisterVisit,
    registerVisit
};
