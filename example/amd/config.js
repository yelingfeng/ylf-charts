require.config({
    baseUrl:'./',
    paths: {
        'echarts': '../lib/echarts.min',
        'lodash': '../lib/lodash.min',
        'ylfCharts':'../../dist/ylfCharts'
    }
});


/* eslint-disable no-undef */
/**
 * AMD 创建方式
 * @param  {[type]} ylfCharts [description]
 * @return {[type]}           [description]
 */
define(['ylfCharts'], function(ylfCharts){
    const mockData = [
        {name : '星期一', value:'10'},
        {name : '星期二', value:'30'},
        {name : '星期三', value:'40'},
        {name : '星期四', value:'60'},
        {name : '星期五', value:'22'}
    ]
    const vm = new ylfCharts.Bar({
        el :document.querySelector('#chart'),
        sub:'base',
        props:{
            specialProp:{
                bar: {
                    width: '10',
                    barBorderRadius: 5
                }
            }
        }
    })
    vm.render(mockData)

    const pie = new ylfCharts.Pie({
        el :document.querySelector('#chart2'),
        sub:'base'
    })
    pie.render(mockData)
})
