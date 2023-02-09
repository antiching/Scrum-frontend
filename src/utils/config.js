//全站設定  前端相關設定放在config.js這裡
// REACT_APP_BASE_URL=http://localhost:3002 (env檔中設定)

// 打出去的API長這樣http://localhost:3002/api/1.0/stocks
export const API_URL = process.env.REACT_APP_BASE_URL + '/api/1.0';
export const IMAGE_URL = process.env.REACT_APP_BASE_URL;