import * as axiosLib from "axios";

import { Loading } from "element-ui";

const axios = axiosLib.create({
	crossDomain: true,
});

axios.defaults.baseURL = "https://api.mtnhao.com/";
axios.defaults.timeout = 30000;

// Add interceptor before request
axios.interceptors.request.use(insertLoader);

// Add interceptor when getting response
axios.interceptors.response.use(updateLoaderStatus, errResProcess);

let loader = null;
let curReqCount = 0;

// Note: All the interceptor functions don't support arrow function,
// they must be defined with a function keyword

// Insert Loading spinner
function insertLoader(config) {
	if (!loader) {
		loader = Loading.service({
			lock: true,
			target: "body",
			background: "transparent",
			// spinner: "el-icon-loading",
			text: "LOADING ...",
		});
	}
	curReqCount++;

	return config;
}

// for successful response
function updateLoaderStatus(res) {
	curReqCount--;
	if (curReqCount === 0) {
		setTimeout(() => {
			loader.close();
			loader = null;
		}, 1000);
	}

	return res;
}

// for error response
function errResProcess(err) {
	updateLoaderStatus();
	throw err;
}

export default axios;
