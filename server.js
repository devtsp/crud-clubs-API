const {
	createClub,
	deleteClub,
	getAllClubs,
	getClub,
	editClub,
} = require(__dirname + '/club_controller.js');

const fs = require('fs');
const cors = require('cors');

const express = require('express');
const PORT = 8080;
const app = express();

const multer = require('multer');
const upload = multer({ dest: __dirname + '/public/uploads/img' });

app.use(cors());
app.use(express.static(__dirname + '/public'));

app.get('/index', (req, res) => {
	const clubs = getAllClubs();
	const namesAndIds = [...clubs].map(club => {
		return {
			id: club.id,
			name: club.name,
			crest: club.crest,
			colors: club.colors,
		};
	});
	res.status(200).json(namesAndIds);
});

app.post('/', upload.single('crest'), (req, res) => {
	const posted = createClub(req);
	res.status(200).json(posted);
});

app.get('/:id', (req, res) => {
	const gotten = getClub(req);
	res.status(200).json(gotten);
});

app.delete('/:id', (req, res) => {
	const deleted = deleteClub(req);
	res.status(200).json(deleted);
});

app.post('/edit/:id', upload.single('crest'), (req, res) => {
	console.log(req.method, req.url);
	const edited = editClub(req);
	console.log(edited);
	res.json(edited);
});

app.get('*', (req, res) => {
	res.status(404).json({ message: 'The resource does not exists.' });
});

app.listen(process.env.PORT || PORT);
console.log(`Listening on http://localhost:${PORT}`);
