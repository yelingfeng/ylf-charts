import _ from 'lodash'
import { handlerHoverGData } from './handlerHoverGData'
// 双坐标标识
const LEFTAXIS = '0'
const RIGHTAXIS = '1'
// tooltip属性处理
// 处理分隔符，单位
// 目前系统有，name,value,info;处理这个三个值的后缀
function handlerInfoCon(type, infoArr, flag = true) {
    // 默认分割符 ‘：’；默认单位为空
    let str = ''
    if(infoArr.length === 0) return str;
    if (infoArr.length >= 1 && infoArr[0].contentColumn !== '') {
        infoArr.forEach(item => {
            if (item.contentColumn === type) {
                str = `${item.unit}${item.separate}`
            }
        })
    }
    // 处理name没有默认值得情况
    if (type === 'name' && str === '') {
        str = '：'
    }
    // 处理需要‘：’的情况
    if (!flag && str === '') {
        str = '：'
    }
    return str
}

// 多数据排序
function sequenceData(arr) {
    let nv = _.chain(arr)
        .sortBy(o => {
            return parseFloat(o.value, 10)
        })
        .reverse()
        .value()
    let fArr = []
    nv.forEach(item => {
        if (item.data && item.data.dataObj && item.data.dataObj.yIndex) {
            if (item.data.dataObj.yIndex === RIGHTAXIS) {
                fArr.push(item)
            } else if (item.data.dataObj.yIndex === LEFTAXIS) {
                fArr.unshift(item)
            }
        }
    })
    if (fArr.length !== 0) nv = fArr
    return nv
}

// 处理多数据
function handlerData(arr, unitObj) {
    let _content
    arr.forEach(item => {
        if (item.data) {
            if (item.data.dataObj && item.data.dataObj.info) {
                _content = item.data.dataObj.info
            } else {
                let name = item.seriesName
                let val
                if (new RegExp('/\\-').test(item.seriesName)) name = item.name
                if (item.data === undefined) {
                    val = ''
                } else {
                    val = item.data.value || 0
                }
                // 双坐标处理
                if (item.seriesIndex === 1 && unitObj.yrUnit) {
                    _content = `${name}：${val}${unitObj.yrUnit}<br>`
                } else {
                    _content = `${name}：${val}${unitObj.ylUnit}<br>`
                }
            }
        }
    })
    return _content
}
// item触发处理
function itemTooltip(params, props) {
    let _content
    let infoArr = props.toolTipProp.infoCon ||[]
    let per = props.toolTipProp.replace || '%%PERCENT%%'
    if (params.data) {
        let dataObj = params.data.dataObj ? params.data.dataObj : params.data
        if (params.seriesType === 'scatter' && params.data[2] !== undefined) {
            dataObj = {}
            dataObj.value = params.data[2]
            dataObj.name = params.data[3]
            dataObj.info = params.data[5]
        }
        if (dataObj) {
            _content = `${dataObj.info || ''}${handlerInfoCon('info', infoArr)}`
        }
        switch (params.seriesType) {
            case 'pie':
                if (dataObj.info && dataObj.info.match(per)) {
                    let replace
                    replace = params['percent']
                    _content = `${dataObj.info.replace(
                        per,
                        replace || '0'
                    )}${handlerInfoCon('info', infoArr)}`
                }
                if (
                    dataObj.percent !== undefined &&
                    dataObj.info === undefined
                ) {
                    _content = `${dataObj.name}${handlerInfoCon(
                        'name',
                        infoArr
                    )}
                    ${dataObj.value}${handlerInfoCon('value', infoArr, false)}
                    ${dataObj.percent}%`
                }
                break
            case 'liquidFill':
                if (dataObj.info) {
                    _content = `${dataObj.info}${handlerInfoCon(
                        'info',
                        infoArr
                    )}`
                } else {
                    _content = Math.round(dataObj.value * 100).toFixed(0) + '%'
                }
                break
            default:
                break
        }
    }
    if (_content === undefined || _content === '') {
        if (isNaN(params.value)) {
            _content = params.name
        } else {
            _content = `${params.name}${handlerInfoCon('name', infoArr)}${
                params.value
            }${handlerInfoCon('value', infoArr)}`
        }
    }
    return _content
}
// axis触发处理
function axisTooltip(params, unitObj, props) {
    let _content = ''
    let infoArr = props.toolTipProp.infoCon || []
    if(infoArr.length ){
        // 单一数据
        if (params.length === 1 && params[0].data.group === 'noGroup') {
            let data = params[0].data.dataObj
            _content = data.info ?
                `${data.info}${handlerInfoCon('info', infoArr)}` :
                `${data.name}${handlerInfoCon('name', infoArr)}${
                    data.value
                }${handlerInfoCon('value', infoArr)}`
        } else {
            // 多数据
            _content = `${params[0].name}<br>`
            let dataArr = sequenceData(params, props)
            _content += handlerData(dataArr, unitObj)
        }
        return _content
    }
}
/**
 * callBackTooltip tooltip回调
 * @param  {[type]} params  [description]
 * @param  {[type]} trigger [description]
 * @param  {[type]} ylUnit  [description]
 * @return {[type]}         [description]
 */
export default function callBackTooltip(params, trigger, unitObj, props) {
    let content = ''
    // 判断触发类型
    if (trigger === 'axis') {
        // 轴类型
        content = axisTooltip(params, unitObj, props)
    } else {
        // item 类型
        content = itemTooltip(params, props)
    }
    handlerHoverGData(params)
    return content
}
