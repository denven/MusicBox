export default {
	setPageData: (key, dataObj) => {
		let artist = JSON.stringify(dataObj);
		sessionStorage.setItem(key, [artist]);
	},

	getPageData: (key) => {
		return JSON.parse(sessionStorage.getItem(key));
	},
};

// const setPageData = (key, dataObj) => {
// 	let artist = JSON.stringify(dataObj);
// 	sessionStorage.setItem(key, [artist]);
// };

// const getPageData = (key) => {
// 	return JSON.parse(sessionStorage.getItem(key));
// };

// module.exports = {
// 	setPageData,
// 	getPageData,
// };
