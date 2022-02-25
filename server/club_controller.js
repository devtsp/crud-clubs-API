const uniqid = require('uniqid');
const fs = require('fs');

const createClub = req => {
	const newClub = new FootballClub(req.file, req.body);
	fs.writeFileSync(`server/db/${newClub.id}.json`, JSON.stringify(newClub));
	return newClub;
};

const getAllClubs = () => {
	const files = fs.readdirSync('server/db');
	const allClubs = [];
	files.forEach(file => {
		const club = JSON.parse(fs.readFileSync(`server/db/${file}`));
		allClubs.push(club);
	});
	return allClubs;
};

const deleteClub = req => {
	const toDeleteClub = JSON.parse(
		fs.readFileSync(`server/db/${req.params.id}.json`)
	);
	const toDeleteImg = toDeleteClub.crest;
	fs.rmSync(`server/public/uploads/img/${toDeleteImg}`);
	fs.rmSync(`server/db/${req.params.id}.json`);
	return toDeleteClub;
};

const getClub = req => {
	return JSON.parse(fs.readFileSync(`server/db/${req.params.id}.json`));
};

const handleCrest = (req, club) => {
	if (req.file) {
		fs.rmSync(`server/public/uploads/img/${club.crest}`);
		return req.file.filename;
	}
};

const editClub = req => {
	const club = JSON.parse(fs.readFileSync(`server/db/${req.params.id}.json`));
	const newCrest = handleCrest(req, club);
	const newData = req.body;
	for (key in club) {
		newData[key] ? (club[key] = newData[key]) : club[key];
	}
	club.crest = newCrest || club.crest;
	club['last-updated'] = new Date();
	club.colors[0] = newData.color1;
	club.colors[1] = newData.color2;
	fs.writeFileSync(`server/db/${club.id}.json`, JSON.stringify(club));
	return club;
};

class FootballClub {
	constructor(file, body) {
		this.id = uniqid();
		this.crest = file.filename;
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
