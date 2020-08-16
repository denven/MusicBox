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

const formatTime = (timestamp, fmt) => {
	if (isNaN(timestamp)) return "";

	const options = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	};

	if (fmt === "year") {
		return new Date(timestamp).toLocaleDateString("en-US", options).slice(6, 10);
	}

	if (fmt === "date") {
		return new Date(timestamp).toLocaleDateString("en-US", options).slice(0, 10);
	}
	if (fmt === "time") {
		return new Date(timestamp).toLocaleDateString("en-US", options).slice(12);
	}

	return new Date(timestamp).toLocaleDateString("en-US", options);
};

// format number with thousands separators
const formatNumberWithTS = (number) => {
	if (isNaN(number)) {
		return number;
	}

	return number.toString().replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,");
};

const encloseNumber = (number) => {
	if (isNaN(number)) {
		return number;
	}

	return `(` + number.toString().replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + `)`;
};

const convertPlayedCount = (count) => {
	if (count >= 1000 * 1000) {
		return (
			(count / 1000000)
				.toFixed(3)
				.slice(0, 3)
				.replace(/\.$/, "") + `M`
		);
	} else if (count >= 1000) {
		return (
			parseInt(count / 1000)
				.toFixed(3)
				.slice(0, 3)
				.replace(/\.$/, "") + `K`
		);
	}

	return count;
};

// generate small picture link adress
const getSmallPicture = (url, width, height) => {
	if (!height) {
		height = width;
	}
	let newPicUrl = url + `?param=${width}y${height}`;
	return newPicUrl;
};

module.exports = {
	convertMsToMinutes,
	convertSecToMinutes,
	formatTime,
	formatNumberWithTS,
	encloseNumber,
	convertPlayedCount,
	getSmallPicture,
};
