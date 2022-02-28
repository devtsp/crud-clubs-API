const uniqid = require('uniqid');
const fs = require('fs');

const createClub = req => {
	const newClub = new FootballClub(req.file, req.body);
	const newTeamJson = JSON.stringify(newClub);
	fs.writeFileSync(`db/${newClub.id}.json`, newTeamJson);
	fs.renameSync(
		`public/uploads/img/${req.file.filename}`,
		`public/uploads/img/${req.file.filename}.png`
	);
	return newClub;
};

const getAllClubs = () => {
	const files = fs.readdirSync('db');
	const allClubs = [];
	files.forEach(file => {
		const teamJson = fs.readFileSync(`db/${file}`);
		const clubObj = JSON.parse(teamJson);
		allClubs.push(clubObj);
	});
	return allClubs;
};

const deleteClub = req => {
	const toDeleteClubJson = fs.readFileSync(`db/${req.params.id}.json`);
	const toDeleteClubObj = JSON.parse(toDeleteClubJson);
	const toDeleteImg = toDeleteClubObj.crest;
	fs.rmSync(`public/uploads/img/${toDeleteImg}`);
	fs.rmSync(`db/${req.params.id}.json`);
	return toDeleteClubObj;
};

const getClub = req => {
	const clubJson = fs.readFileSync(`db/${req.params.id}.json`);
	const clubObj = JSON.parse(clubJson);
	return clubObj;
};

const handleCrest = (req, club) => {
	if (req.file) {
		fs.rmSync(`public/uploads/img/${club.crest}`);
		return req.file.filename;
	}
};

const editClub = req => {
	const clubJson = fs.readFileSync(`db/${req.params.id}.json`);
	const clubObj = JSON.parse(clubJson);
	const newCrest = handleCrest(req, clubObj);
	const newData = req.body;
	for (key in clubObj) {
		newData[key] ? (clubObj[key] = newData[key]) : clubObj[key];
	}
	clubObj.crest = newCrest || clubObj.crest;
	clubObj['last-updated'] = new Date();
	clubObj.colors[0] = newData.color1;
	clubObj.colors[1] = newData.color2;
	const editedClubJson = JSON.stringify(clubObj);
	fs.writeFileSync(`db/${clubObj.id}.json`, editedClubJson);
	return clubObj;
};

class FootballClub {
	constructor(file, body) {
		this.id = uniqid();
		this.crest = file.filename + '.png';
		this.colors = [body.color1, body.color2];
		this.name = body.name;
		this.tla = body.tla;
		this.area = body.area;
		this.adress = body.adress;
		this.phone = body.phone;
		this.email = body.email;
		this.founded = body.founded;
		this.venue = body.venue;
		this['last-updated'] = new Date();
	}
}

module.exports = { createClub, getAllClubs, deleteClub, getClub, editClub };
