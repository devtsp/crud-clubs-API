const getClubs = async () => {
	const response = await fetch('http://localhost:8080/api/clubs');
	const data = response.json();
	return data;
};

const handleDelete = async id => {
	const options = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	};
	const response = await fetch(
		`http://localhost:8080/api/clubs/${id}`,
		options
	);
	const data = await response.json();
	return data;
};

export const toDetails = {
	id: null,
};

const createClubItem = club => {
	const $clubItem = document
		.querySelector('#club-item-boilerplate')
		.cloneNode(true);
	$clubItem.classList.remove('visually-hidden');
	$clubItem.id = club.id;
	$clubItem.querySelector('#club-detail-link').innerText = club.name;
	$clubItem.querySelector('#club-detail-link').onclick = () => {
		toDetails.id = club.id;
		window.location.href = 'http://localhost:8080/club_detail.html';
	};
	$clubItem.querySelector('img').src = `../uploads/img/${club.crest}`;
	$clubItem.querySelector('#delete-club').onclick = () => handleDelete(club.id);
	document.querySelector('#club-list').appendChild($clubItem);
};

const clubs = await getClubs();
console.log(clubs);

if (!clubs.length) {
	document.querySelector('#no-clubs').classList.remove('visually-hidden');
} else {
	document.querySelector('#no-clubs').classList.add('visually-hidden');
	clubs.forEach(club => createClubItem(club));
}
