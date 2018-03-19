import pkg from './package.json'
import buble from 'rollup-plugin-buble'
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const banner = `
/*
 * ylf-charts ${pkg.version}
 * the encapsulation two times of the framework based echarts.
 * Copyright (c) 2018 RenXiaoFan <yelingfeng521@gmail.com>
 */
`
export default {
    input: 'lib/index.js',
    plugins: [
        buble({
            transforms: { forOf: false }
        }),
        resolve({
            browser: true
        }),
        commonjs()
    ],
    globals: {
        _: 'lodash',
        'echarts/lib/echarts': 'echarts'
    },
    external: ['_', 'echarts'],
    output: [
        { file: 'dist/ylfCharts.js', name: 'ylfCharts', format: 'umd', banner:banner},
        { file: 'dist/ylfCharts.cjs.js', name: 'ylfCharts', format: 'cjs', banner:banner}
    ]
};
