const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (app) => {
	app.use(
		'/api',
		createProxyMiddleware({
			target: process.env.REACT_APP_API_URL,
			changeOrigin: true,
		})
	);
};
