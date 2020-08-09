import * as axiosLib from "axios";

import { Loading } from "element-ui";

const axios = axiosLib.create({
	crossDomain: true,
	// this setup is not allowed from the server
	// headers: { "Cache-Control": "no-cache" },
});

axios.defaults.baseURL = `${process.env.VUE_APP_API_HOST}`;
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
			if (loader) {
				loader.close();
				loader = null;
			}
		}, 500);
	}

	return res;
}

// for error response
function errResProcess(err) {
	updateLoaderStatus();
	throw err;
}

export default axios;
