import axios from "axios";

axios.defaults.baseURL = "https://api.mtnhao.com/";

// return a promise
export const getBannerCarousel = () => axios.post(`/banner?type=0`);

export const getRecommendList = () => axios.get(`/personalized?limit=15`);

export const getNewReleases = () => axios.get(`/album/newest`);
