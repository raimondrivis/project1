const express = require('express');
const fs = require('fs').promises;
const bodyparser = require('body-parser');
const dateET = require('./src/dateTimeET');
//moodul keskkonnamuutujate lugemiseks
require('dotenv').config();

const textRef = 'public/txt/vanasonad.txt';

//käivitan express() funktsiooni ja tähistan töötava asja nimega "app"
const app = express();
//määrame veebilehe mallide järgi renderdamise mootori (EJS)
app.set('view engine', 'ejs');
//muudan "public" veebiserverile kättesaadavaks
app.use(express.static('public'));
//hakkame päringuid parsima
app.use(bodyparser.urlencoded({extended: false}));

app.get('/', (req, res)=>{
	const day = dateET.dayET();
	const date = dateET.dateET(0);
	const time = dateET.timeET();
	res.render('index', {day: day, date: date, time: time});
});

app.get('/vanasona', async (req, res)=>{
	try {
		const data = await fs.readFile(textRef, 'utf8');
		let folkWisdom = data.split(';');
		let wisdom = folkWisdom[Math.round(Math.random() * (folkWisdom.length - 1))];
		res.render('wisdom', {wisdom: wisdom});
	}
	catch (err){
		console.log(err);
		res.render('wisdom', {wisdom: 'Kahjuks ühtegi vanasõna ei leitud!'});
	}
});

const eestifilmRouter = require('./routes/eestifilmRoutes');
const visitRouter = require('./routes/visitRoutes');

app.use('/eestifilm', eestifilmRouter);
app.use('/visits', visitRouter);

app.listen(5301);
