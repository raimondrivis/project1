const express = require('express');
const router = express.Router();

//kasutatavad kontrollerid
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

router.route('/').get(eestifilm);

router.route('/film_inimesed').get(eestifilmInimesed);

router.route('/lisa_film_inimesed').get(eestifilmInimesedLisa);

router.route('/lisa_film_inimesed').post(eestifilmInimesedLisaPost);

router.route('/filmid').get(filmid);

router.route('/filmid_add').get(filmidAdd);

router.route('/filmid_add').post(filmidAddPost);

router.route('/ametid').get(ametid);

router.route('/ametid_add').get(ametidAdd);

router.route('/ametid_add').post(ametidAddPost);

module.exports = router;
