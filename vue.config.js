module.exports = {
    baseUrl: '/',
    // where to output built files
    outputDir: 'devlib',
    lintOnSave: true,
    compiler:true,
    productionSourceMap: false,
    devServer: {
        port: 8999,
        https: false,
        hotOnly: false,
        // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
        proxy: null// string | Object
    }
}
