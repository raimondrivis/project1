const mysql = require('mysql2/promise');

const dbConfig = () => ({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: 'if26_Raimond_Rivis'
});
//abifunktsioon: loeb rippmenüüde andmed ja renderdab vormi
const renderForm = async (res, notice, selected = {}) => {
	let conn;
	try {
		conn = await mysql.createConnection(dbConfig());
		const [personList] = await conn.execute('SELECT id, first_name, last_name FROM person ORDER BY last_name, first_name');
		const [movieList] = await conn.execute('SELECT id, title, release_year FROM movie ORDER BY title');
		const [professionList] = await conn.execute('SELECT id, title FROM profession ORDER BY title');
		res.render('eestifilmseosed_add', {notice, personList, movieList, professionList, selected});
	}
	catch (err) {
		console.log('Viga andmebaasist lugemisel: ' + err);
		res.render('eestifilmseosed_add', {notice: 'Andmebaasist lugemine ebaõnnestus!', personList: [], movieList: [], professionList: [], selected: {}});
	}
	finally {
		if(conn){
			await conn.end();
		}
	}
};

//@desc page for adding relations between people, films and professions
//@route GET /eestifilm/seosed_add
//@access public

const seosedAdd = async (req, res) => {
	await renderForm(res, 'Ootan sisestust!');
};

//@desc page for adding relations between people, films and professions
//@route POST /eestifilm/seosed_add
//@access public

const seosedAddPost = async (req, res) => {
	const personId = Number(req.body.personSelect);
	const movieId = Number(req.body.movieSelect);
	const professionId = Number(req.body.professionSelect);
	const roleName = (req.body.roleInput || '').trim();
	const selected = {
		person: req.body.personSelect,
		movie: req.body.movieSelect,
		profession: req.body.professionSelect,
		role: req.body.roleInput
	};

	if(!Number.isInteger(personId) || personId <= 0 || !Number.isInteger(movieId) || movieId <= 0 || !Number.isInteger(professionId) || professionId <= 0){
		return await renderForm(res, 'Vali isik, film ja amet!', selected);
	}

	let notice = '';
	let saved = false;
	let conn;
	try {
		conn = await mysql.createConnection(dbConfig());

		//kontrollime, mis amet valiti ja kas on vaja tegelaskuju nime
		const [profRes] = await conn.execute('SELECT title FROM profession WHERE id = ?', [professionId]);
		if(profRes.length === 0){
			notice = 'Valitud ametit ei leitud!';
		} else {
			const isActor = profRes[0].title.trim().toLowerCase() === 'näitleja';
			if(isActor && !roleName){
				notice = 'Näitleja puhul tuleb sisestada tegelaskuju nimi!';
			} else {
				const roleValue = isActor ? roleName : null;
				//kas täpselt selline seos on juba olemas? (<=> töötab ka NULLiga)
				const sqlCheck = 'SELECT id FROM person_in_movie WHERE person_id = ? AND movie_id = ? AND profession_id = ? AND role <=> ?';
				const [checkRes] = await conn.execute(sqlCheck, [personId, movieId, professionId, roleValue]);
				if(checkRes.length > 0){
					notice = 'Selline seos on juba olemas, uut ei salvestatud!';
				} else {
					const sqlInsert = 'INSERT INTO person_in_movie (person_id, movie_id, profession_id, role) VALUES (?,?,?,?)';
					await conn.execute(sqlInsert, [personId, movieId, professionId, roleValue]);
					notice = 'Seos salvestati! Ootan uut sisestust!';
					saved = true;
				}
			}
		}
	}
	catch (err) {
		console.log('Andmebaasiga suhtlemise viga: ' + err);
		notice = 'Tekkis viga, andmeid ei salvestatud!';
	}
	finally {
		if(conn){
			await conn.end();
		}
	}
	await renderForm(res, notice, saved ? {} : selected);
};

module.exports = {
	seosedAdd,
	seosedAddPost
};
