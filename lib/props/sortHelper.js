import _ from 'lodash'
/**
 * Created by zhao on 2017/5/11.
 */
export function sortSeriesHelper(seriesObj, data, sortType) {
    // 默认降序
    let _sortType = sortType || 'desc';
    let s = seriesObj.series;
    // 按name分组求value合 之后 按value大小排序
    let newAxis = _.chain(data)
        .groupBy(function(it) {
            return it.name
        })
        .map(function(group, name) {
            let sum = 0;
            _.each(group, function(it) {
                sum += parseInt(it.value, 0)
            })
            return {
                name: name,
                value: sum
            }
        })
        .orderBy('value', _sortType)
        .map(function(it) {
            return it.name
        })
        .value();
    s.forEach(function(it) {
        let data = it.data;
        let newData = [];
        newAxis.forEach(function(it) {
            data.forEach(function(od) {
                if (it === od.name) {
                    newData.push(od)
                }
            })
        })
        it.data = newData
    })
    let xAxisArr = []
    if (s instanceof Array && s.length >= 0) {
        s[0].data.forEach(item => {
            xAxisArr.push(item.name)
        })
    }
    return { series: s, xAxis: xAxisArr }
}
