import axios from "./config";

// the api supports `post` to get data, but the timestamp is suggested to put in the parameter
// otherwise, the requests will be cached and will not get latest data each time

// return apromise
export const getBannerCarousel = () => axios.post(`/banner?type=0`);

// 可选参数 :
// limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// type: 搜索类型；默认为 1 即单曲 , 取值意义 :
// 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
export const getSearchResults = (params) =>
	axios.get(`/search`, { params: params });

// get leadboards, use `/playlislt/detail?id=xxxx` instead of `/toplist?id=xxxx`
// export const getToplist = () => axios.get(`/toplist?id=19723756`);
// why it returns the same playlist?
export const getToplist = (params) =>
	axios.get(`/playlist/detail`, { params: params });
export const getFeaturedList = () => axios.get(`/personalized?limit=15`);
export const getNewReleases = () => axios.get(`/album/newest`);

// get song media file link address
export const getAudioUrl = (songId) =>
	axios.get(`/song/url`, { params: { id: songId, br: 999000 } });

export const getAudioDetail = (songIds) => {
	return axios.get(`/song/detail`, { params: { ids: songIds } });
};

// requests for mvs
export const getLatestMvs = () => axios.get(`/mv/first`);
export const getMvUrl = (mvid) =>
	axios.get(`/mv/url`, { params: { id: mvid } });

export const getMvDetail = (mvid) =>
	axios.get(`/mv/detail`, { params: { mvid } });

export const getMvArtist = (id) =>
	axios.get(`/artist/desc`, { params: { id } });

export const getMvArtistV2 = (id) => axios.get(`/artists`, { params: { id } });

export const getSimilarMvs = (mvid) =>
	axios.get("/simi/mv", { params: { mvid } });

export const getMvComments = (mvid) =>
	axios.get(`/comment/mv`, { params: { id: mvid } });
