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
export const getSearchResults = (params) => axios.get(`/search`, { params: params });

// get leadboards, use `/playlislt/detail?id=xxxx` instead of `/toplist?id=xxxx`
// export const getToplist = () => axios.get(`/toplist?id=19723756`);
// why it returns the same playlist?
export const getToplist = (params) => axios.get(`/playlist/detail`, { params: params });
export const getFeaturedList = () => axios.get(`/personalized?limit=15`);
export const getNewReleases = () => axios.get(`/album/newest`);

// get song media file link address
export const getAudioUrl = (songId) => axios.get(`/song/url`, { params: { id: songId, br: 999000 } });

export const getAudioDetail = (songIds) => {
	return axios.get(`/song/detail`, { params: { ids: songIds } });
};

// requests for mvs
export const getAllMvs = () => axios.get(`/mv/all`);
export const getLatestMvs = () => axios.get(`/mv/first`);
export const getMvUrl = (mvid) => axios.get(`/mv/url`, { params: { id: mvid } });

export const getMvDetail = (mvid) => axios.get(`/mv/detail`, { params: { mvid } });

export const getMvArtist = (id) => axios.get(`/artist/desc`, { params: { id } });

export const getMvArtistV2 = (id) => axios.get(`/artists`, { params: { id } });

export const getSimilarMvs = (mvid) => axios.get("/simi/mv", { params: { mvid } });

export const getMvComments = (mvid) => axios.get(`/comment/mv`, { params: { id: mvid } });

// requests for ordinory videos (how to get the vid ????)
export const getVideoUrl = (vid) => axios.get(`/video/url`, { params: { id: vid } });

export const getVideoDetail = (vid) => axios.get(`/video/detail`, { params: { id: vid } });

export const getVideoComments = (vid) => axios.get(`/comment/video`, { params: { id: vid } });

export const getSimilarVideos = (vid) => axios.get(`/related/allvideo`, { params: { id: vid } });

// Artists related requests
// 接口地址 : /artist/list
// 调用例子 : /artist/list?type=1&area=96&initial=b /artist/list?type=2&area=2&initial=b
// type 取值: -1:全部 1:男歌手 2:女歌手 3:乐队
// area 取值: -1:全部 7华语 96欧美 8:日本 16韩国 0:其他
export const getArtistsList = (params) => axios.get(`/artist/list`, { params: params });

// 说明: 获取歌手热门50首歌曲
// 必选参数 :id : 歌手 id
// 接口地址 : /artist/top/song
// 调用例子 : /artist/top/song?id=6452
export const getArtistTopTracks = (id) => axios.get(`/artist/top/song`, { params: { id: id } });

// 获取歌手 mv
// 说明 : 调用此接口传入歌手id可获得歌手 mv 信息, 具体 mv 播放地址可调用/mv传入此接口获得的 mvid 来拿到 ,
// 如 : /artist/mv?id=6452,/mv?mvid=5461064
// 必选参数 : id: 歌手 id, 可由搜索接口获得
// 接口地址 : /artist/mv
// 调用例子 : /artist/mv?id=6452
export const getArtistMvs = (id) => axios.get(`/artist/mv`, { params: { id: id } });

// 说明 : 调用此接口 , 传入歌手 id, 可获得歌手专辑内容
// 必选参数 : id: 歌手 id
// 可选参数 : limit: 取出数量 , 默认为 50
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
// 接口地址 : /artist/album
// 调用例子 : /artist/album?id=6452&limit=30 ( 周杰伦 )
export const getArtistAlbums = ({ id, limit, offset }) => axios.get(`/artist/album`, { params: { id, limit, offset } });

// 说明 : 调用此接口 , 传入歌手 id, 可获得歌手描述
// 必选参数 : id: 歌手 id
// 接口地址 : /artist/desc
// 调用例子 : /artist/desc?id=6452 ( 周杰伦 )
export const getArtistDesc = (id) => axios.get(`/artist/desc`, { params: { id: id } });

// 说明 : 调用此接口 , 传入歌手 id, 可获得相似歌手
// 必选参数 : id: 歌手 id
// 接口地址 : /simi/artist
// 调用例子 : /simi/artist?id=6452 ( 对应和周杰伦相似歌手 )
export const getSimilarArtists = (id) => axios.get(`/simi/artist`, { params: { id: id } });
