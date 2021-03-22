import axios from "./config";

// the api supports `post` to get data, but the timestamp is suggested to put in the parameter
// otherwise, the requests will be cached and will not get latest data each time

// return apromise
export const getBannerCarousel = () => axios.post(`/banner?type=0`);
export const getFeaturedList = () => axios.get(`/personalized?limit=15`);

// 可选参数 :
// limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// type: 搜索类型；默认为 1 即单曲 , 取值意义 :
// 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
export const getSearchResults = (params) => axios.get(`/search`, { params: params });

// Leaderboard Requests
// get leaderboards, use `/playlislt/detail?id=xxxx` instead of `/toplist?id=xxxx`
export const getAllLeaderboards = () => axios.get(`/toplist`);

// Note: leaderboard detail and comments are fetched by playlist APIs
export const getPlaylistDetail = (params) => axios.get(`/playlist/detail`, { params: params });
export const getPlaylistComments = (params) => axios.get(`/comment/playlist`, { params: params });

// Playlists Requests
export const getAllCategories = (params) => axios.get(`/playlist/catlist`, { params: params });
export const getBestPlaylists = (params) => axios.get(`/top/playlist/highquality`, { params: params });
export const getTopPlaylists = (params) => axios.get("/top/playlist", { params: params });
export const getSimilarPlaylists = (params) => axios.get("/related/playlist", { params: params });

// 推荐歌单接口地址 : /personalized  可选参数 : limit: 默认为 30 (不支持 offset)
// 推荐新音乐接口地址 : /personalized/newsong
// 推荐电台接口地址 : /personalized/djprogram
// 推荐节目接口地址 : /program/recommend

// =================  Albums realted requests ================================================
export const getNewAlbums = () => axios.get(`/album/newest`);
export const getAllAlbums = (params) => axios.get(`/album/new`, { params });
//export const getAllAlbums = (params) =>
//	axios.get(`/album/new`, { baseURL: `${process.env.VUE_APP_API_BACKUP}`, params: params });

//专辑内容：包含了大部分页面需要的内容（含album/detail/dynamic的内容，因此没有必要再次请求dynamic内容）
export const getAlbumTracks = (id) => axios.get(`/album`, { params: { id } });

export const getAlbumDetail = (id) => axios.get(`/album/detail/dynamic`, { params: { id } });
export const getAlbumComments = (id) => axios.get(`/comment/album`, { params: { id } });

// =================  Track realted requests ================================================
export const getAudioUrl = (id) => axios.get(`/song/url`, { params: { id, br: 999000 } });
export const getAudioDetail = (songIds) => axios.get(`/song/detail`, { params: { ids: songIds } });
export const checkAudioValid = (id) => axios.get(`/check/music`, { params: { id } });

// =================  MV realted requests ================================================

// area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
// type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
// order: 排序,可选值为上升最快,最热,最新,不填则为上升最快
// limit: 取出数量 , 默认为 30
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
export const getAllMvs = (params) => axios.get(`/mv/all`, { params: params });

export const getLatestMvs = () => axios.get(`/mv/first`);
export const getMvUrl = (mvid) => axios.get(`/mv/url`, { params: { id: mvid } });
export const getMvDetail = (mvid) => axios.get(`/mv/detail`, { params: { mvid } });
export const getMvArtist = (id) => axios.get(`/artist/desc`, { params: { id } });
export const getMvArtistV2 = (id) => axios.get(`/artists`, { params: { id } });
export const getSimilarMvs = (mvid) => axios.get("/simi/mv", { params: { mvid } });
export const getMvComments = (mvid) => axios.get(`/comment/mv`, { params: { id: mvid } });

// Requests for ordinory videos (how to get the vid ????)
export const getVideoUrl = (vid) => axios.get(`/video/url`, { params: { id: vid } });
export const getVideoDetail = (vid) => axios.get(`/video/detail`, { params: { id: vid } });
export const getVideoComments = (vid) => axios.get(`/comment/video`, { params: { id: vid } });
export const getSimilarVideos = (vid) => axios.get(`/related/allvideo`, { params: { id: vid } });

// =================  Artists realted requests ================================================
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
export const getArtistMvs = ({ id, limit }) => axios.get(`/artist/mv`, { params: { id, limit } });

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

// 调用此接口 , 可获取热门歌手数据
// 可选参数 : limit: 取出数量 , 默认为 50
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
// 接口地址 : /top/artists
// 调用例子 : /top/artists?offset=0&limit=30
export const getTopArtists = () => axios.get(`/top/artists`, { params: { limit: 50 } });
