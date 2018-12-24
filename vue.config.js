module.exports = {
    devServer: {
		open: process.platform === 'darwin',
		host: 'localhost.corp.ebay.com',
		port: 8888,
		hotOnly: false,
		// See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
		proxy: null, // string | Object
		disableHostCheck: true,
		before: app => { }
	},
}