const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
    // /api/list へのリクエストをプロキシする
    app.use(
        "/api/list",
        createProxyMiddleware({
            target: "http://localhost:1323",
            changeOrigin: true,
        })
    );

    // /listPage へのリクエストをプロキシする
    app.use(
        "/listPage",
        createProxyMiddleware({
            target: "http://localhost:1323",
            changeOrigin: true,
        })
    );
};
