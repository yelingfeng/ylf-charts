import _ from 'lodash'
import { LINE_HOVER_KEY } from '../constant'
/**
 *  处理折线图hover数据 存到全局变量
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function handlerHoverGData(params) {
    let d = ''
    let compType
    if (_.isArray(params)) {
        for (let i = 0; i <= params.length; i++) {
            let it = params[i]
            if (_.isObject(it.data.dataObj)) {
                d = it.data
            } else if (_.isString(it.data.dataObj)) {
                d = it.data
            }
            break
        }
        compType = params[0].componentSubType
    } else {
        d = params.data
        compType = params.componentSubType
    }

    if (compType === 'line') {
        let lineData = {}
        if (_.isObject(d)) {
            lineData = {
                value: d.value,
                name: d.name,
                data: { dataObj: d.dataObj }
            }
            if (d.xAxis) {
                lineData.xAxis = true
            }
        } else {
            lineData = { value: d, name: params.name, data: { dataObj: {} } }
        }
        window[LINE_HOVER_KEY] = lineData
    }
}
