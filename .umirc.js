let path = require('path')
import {routers} from './router'

export default {
    history: 'hash',
    publicPath: 'dist/',
    outputPath: "../resources/static/dist",
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva: true,
            dynamicImport: {
                webpackChunkName: true,
                // loadingComponent: './Loading'
            },
            locale: {
                default: 'zh-CN', //默认语言 zh-CN
                baseNavigator: true, // 为true时，用navigator.language的值作为默认语言
                antd: true // 是否启用antd的<LocaleProvider />
            }
        }],
        'umi-plugin-polyfill',
    ],
    alias: {
        common: path.resolve(__dirname, './src/common'),
        components: path.resolve(__dirname, './src/components'),
    },
    theme: {
        "@primary-color": "#0085E8",
        "@border-color-base": "hsv(0, 0, 85%)",
        "@main-color": "#2663bc",
        "@border-radius-base": "4px",
        "@btn-border-radius-base": "3px",
        "@btn-border-radius-sm": "3px",
        "@button-border-radius": "4px",
        "@second-color": "#5b9ee5",
        "@border-color": "#d9d9d9",
        "@primary-item-color": "purple",
        "@selected-color": "#eff7fd",
        "@font-size": "13px",
        "@grey-color": "#999",
        "@main-font-color": "#333"
    },
    // proxy: {
    //     '/': {
    //         target: 'http://localhost:8081',
    //         bypass: function (req, res, proxyOptions) {
    //             let path = req.path
    //             if (path.indexOf('umi') !== -1 || path.indexOf('chunk') !== -1 || path.indexOf('async') !== -1) {
    //                 return path
    //             }
    //         }
    //     }
    // },
    routes:routers
};
