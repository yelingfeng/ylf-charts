import _ from 'lodash'
import handlerHoverGData from './handlerHoverGData'
/**
 * callBackTooltip tooltip回调
 * @param  {[type]} params  [description]
 * @param  {[type]} trigger [description]
 * @param  {[type]} ylUnit  [description]
 * @return {[type]}         [description]
 */
export function callBackTooltip(params, trigger, unitObj) {
    let content = ''
    // 横轴类型
    if (trigger === 'axis') {
        if (params.length === 1 && params[0].data.group === 'noGroup') {
            let da = params[0].data.dataObj
            if (da.info) {
                content = da.info
            } else {
                content = da.name + '：' + da.value
            }
            handlerHoverGData(params)
        } else {
            content = params[0].name + '<br/>'
            let nv = _.chain(params)
                .sortBy(o => {
                    return parseFloat(o.value, 10)
                })
                .reverse()
                .value()
            let fArr = []
            nv.forEach(item => {
                if (
                    item.data &&
                    item.data.dataObj &&
                    item.data.dataObj.yIndex
                ) {
                    if (item.data.dataObj.yIndex === '1') {
                        fArr.push(item)
                    } else if (item.data.dataObj.yIndex === '0') {
                        fArr.unshift(item)
                    }
                }
            })
            if (fArr && fArr.length !== 0) {
                nv = fArr
            }
            _.forEach(nv, it => {
                if (it.data) {
                    if (it.data.dataObj && it.data.dataObj.info) {
                        content += it.data.dataObj.info
                    } else {
                        let name = it.seriesName
                        let val
                        if (it.data === undefined) {
                            val = ''
                        } else {
                            if (it.data.value === undefined) {
                                val = 0
                            } else {
                                val = it.data.value
                            }
                        }
                        if (/\-/.test(it.seriesName)) name = it.name
                        if (it.seriesIndex === 1 && unitObj.yrUnit) {
                            content +=
                                name + '：' + val + unitObj.yrUnit + '<br/>'
                        } else {
                            content +=
                                name + '：' + val + unitObj.ylUnit + '<br/>'
                        }
                    }
                }
            })
            handlerHoverGData(params)
        }
    } else {
        if (params.data) {
            let dataObj = params.data.dataObj || params.data
            if (
                params.seriesType === 'scatter' &&
                params.data[2] !== undefined
            ) {
                dataObj = {}
                dataObj.value = params.data[2]
                dataObj.name = params.data[3]
                dataObj.info = params.data[5]
            }
            if (dataObj) {
                content = dataObj.info ? dataObj.info : ''
            }
            // if (params.seriesType === 'heatmap' || params.seriesType === 'scatter' || props.specialProp.map.mapType === RC.MAP_RENDER_TYPE.POINT ||
            //     // props.specialProp.map.mapType === RC.MAP_RENDER_TYPE.HOT) {
            //     if (dataObj.info) {
            //         content = dataObj.info;
            //     } else {
            //         content = dataObj.value ? dataObj.name + '：' + dataObj.value : dataObj.name;
            //     }
            // }
            if (params.seriesType === 'pie') {
                if (dataObj.info && dataObj.info.match('%%PERCENT%%')) {
                    let replace
                    replace = params['percent']
                    content = dataObj.info.replace(
                        '%%PERCENT%%',
                        replace || '0'
                    )
                }
                if (
                    dataObj.percent !== undefined &&
                    dataObj.info === undefined
                ) {
                    content =
                        dataObj.name +
                        '：' +
                        dataObj.value +
                        '：' +
                        dataObj.percent +
                        '%'
                }
            }
            if (params.seriesType === 'liquidFill') {
                if (dataObj.info) {
                    content = dataObj.info
                } else {
                    content = Math.round(dataObj.value * 100).toFixed(0) + '%'
                }
            }
        }
        if (content === undefined || content === '') {
            if (isNaN(params.value)) {
                content = params.name
            } else {
                content = params.name + '：' + params.value
            }
        }
        handlerHoverGData(params)
    }
    return content
}
