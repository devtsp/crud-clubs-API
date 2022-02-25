const {
	createClub,
	deleteClub,
	getAllClubs,
	getClub,
	editClub,
} = require('./club_controller');

const fs = require('fs');

const express = require('express');
const PORT = 8080;
const app = express();

const multer = require('multer');
const upload = multer({ dest: '../public/uploads/img' });

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile('/public/index.html', { root: __dirname });
});

// app.post('/', upload.single('crest'), (req, res) => {
// 	createClub(req);
// 	res.redirect('/clubs');
// });

app.get('/clubs', (req, res) => {
	// const clubs = getAllClubs();
	res.sendFile('/public/clubs.html', { root: __dirname });
});

app.get('/clubs/:id', (req, res) => {
	// const club = getClub(req);
	// club['last-updated'] = club['last-updated'].match(/\d+-\d+-\d+(?=T)/);
	// club.tla = club.tla.toUpperCase();
	res.sendFile('/public/club_detail.html', { root: __dirname });
});

// app.get('/clubs/delete/:id', (req, res) => {
// 	deleteClub(req);
// 	res.redirect('/clubs');
// });

app.get('/clubs/edit/:id', (req, res) => {
	// const club = getClub(req);
	res.sendFile('/public/edit_club.html', { root: __dirname });
});

// app.post('/clubs/edit/:id', upload.single('crest'), (req, res) => {
// 	editClub(req);
// 	res.redirect(`/clubs/${req.params.id}`);
// });

app.listen(process.env.PORT || PORT);
console.log(`Listening on http://localhost:${PORT}`);
