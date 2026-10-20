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

const {
	seosedAdd,
	seosedAddPost
} = require('../controllers/eestifilmSeosedControllers');

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

router.get('/seosed_add', seosedAdd);
router.post('/seosed_add', seosedAddPost);

module.exports = router;
