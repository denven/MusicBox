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

const convertSecToMinutes = (duration) => {
	let min = parseInt(duration / 60);
	if (min < 10) {
		min = "0" + min;
	}

	let sec = parseInt(duration % 60);
	if (sec < 10) {
		sec = "0" + sec;
	}
	return `${min}:${sec}`;
};

const formatTime = (timestamp) => {
	var options = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	};

	return new Date(timestamp).toLocaleDateString("en-US", options);
};

// format number with thousands separators
const formatNumberWithTS = (number) => {
	if (isNaN(number)) {
		return number.toString();
	}

	return number.toString().replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,");
};

module.exports = {
	convertMsToMinutes,
	convertSecToMinutes,
	formatTime,
	formatNumberWithTS,
};
