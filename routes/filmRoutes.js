
const express = require('express');
const router = express.Router();

const {
    eestifilm,
    eestifilmInimesed,
    eestifilmInimesedLisa,
    eestifilmInimesedLisaPost,
    filmid,
    filmidAdd,
    filmidAddPost,
    ametid,
    ametidAdd,
    ametidAddPost
} = require('../controllers/eestifilmControllers');

router.get('/', eestifilm);

router.get('/film_inimesed', eestifilmInimesed);
router.get('/lisa_film_inimesed', eestifilmInimesedLisa);
router.post('/lisa_film_inimesed', eestifilmInimesedLisaPost);

router.get('/filmid', filmid);
router.get('/filmid_add', filmidAdd);
router.post('/filmid_add', filmidAddPost);

router.get('/ametid', ametid);
router.get('/ametid_add', ametidAdd);
router.post('/ametid_add', ametidAddPost);

module.exports = router;
