const PROXY_CONFIG = {
  '/api': {
    target: 'http://localhost:1337',
    changeOrigin: true,
    secure: false,
    logLevel: 'debug',
    pathRewrite: {
      "^/api": ""
    },
    onProxyReq: (proxyReq, req, res) => {
      // const cookieMap = {
      //   SID: '',
      // };
      // let cookie = '';
      // for (const key in cookieMap) {
      //   if (Object.prototype.hasOwnProperty.call(cookieMap, key)) {
      //     cookie += `${key}=${cookieMap[key]}; `;
      //   }
      // }
      // proxyReq.setHeader('cookie', cookie);
    },
  },
};

module.exports = PROXY_CONFIG;
