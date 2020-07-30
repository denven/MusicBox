import axios from "axios";

axios.defaults.baseURL = "https://api.mtnhao.com/";

// the api supports `post` to get data, but the timestamp is suggested to put in the parameter
// otherwise, the requests will be cached and will not get latest data each time

// return apromise
export const getBannerCarousel = () => axios.post(`/banner?type=0`);

export const getSearchResults = (params) =>
	axios.get(`/search`, { params: params });

export const getRecommendList = () => axios.get(`/personalized?limit=15`);

export const getNewReleases = () => axios.get(`/album/newest`);
