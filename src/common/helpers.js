const convertMsToMinutes = (duration) => {
	let min = parseInt(duration / 1000 / 60);
	if (min < 10) {
		min = "0" + min;
	}
	let sec = parseInt((duration / 1000) % 60);
	if (sec < 10) {
		sec = "0" + sec;
	}
	return `${min}:${sec}`;
};

module.exports = { convertMsToMinutes };
