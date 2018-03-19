/**
 * Created by 14465 on 2017/3/14.
 */

import { axisMaxmin } from '../props/axisHelper'
import * as commonConfig from '../config/commonConfig'
import * as config from '../config/mapConfig'
import { MAP_RENDER_TYPE, PROP_TITLE_ALIGN } from '../constant'

// 获取visualMap的类型
export function visualMapType(props) {
    let type
    if (
        props.specialProp.map.mapType === MAP_RENDER_TYPE.HOT ||
        props.specialProp.map.mapType === MAP_RENDER_TYPE.POINT
    ) {
        type = 'piecewise'
    } else {
        type = 'continuous'
    }
    return type
}
// 获取染色块是否显示
function visualMapShow(props) {
    return props.specialProp.map.isVisualMap === '1'
}
// 获取染色块位置
function visualMapAlign(props) {
    let obj
    switch (props.specialProp.map.visualMapPos) {
        case PROP_TITLE_ALIGN.TOPLEFT:
            obj = {
                left: 'left',
                top: 'top'
            }
            break
        case PROP_TITLE_ALIGN.TOPCENTER:
            obj = {
                left: 'right',
                top: 'top'
            }
            break
        case PROP_TITLE_ALIGN.TOPRIGHT:
            obj = {
                left: 'left',
                top: 'bottom'
            }
            break
        case PROP_TITLE_ALIGN.BOTTOMCENTER:
            obj = {
                left: 'right',
                top: 'bottom'
            }
            break
        default:
            break
    }
    return obj
}
// visualMap设置
export function getVisualMap(data, props) {
    let maxMin = axisMaxmin(data, props, '1')
    let align = visualMapAlign(props)
    const visualConfig = {
        show: visualMapShow(props),
        type: visualMapType(props),
        left: align.left,
        top: align.top,
        color: config.visualBlock,
        min: maxMin.min,
        max: maxMin.max,
        textStyle: {
            color: config.visualRangeColor
        }
    }
    if (visualConfig.type === 'piecewise') {
        visualConfig.itemWidth = commonConfig.legendIconWidth
        visualConfig.itemHeight = commonConfig.legendIconHeight
        if (maxMin.max < 1) {
            visualConfig.pieces = [
                { min: 0.8, max: 1.0 },
                { min: 0.6, max: 0.8 },
                { min: 0.4, max: 0.6 },
                { min: 0.2, max: 0.4 },
                { min: 0.0, max: 0.2 }
            ]
            visualConfig.precision = 2
        }
    } else {
        visualConfig.realtime = false
        visualConfig.calculable = true
        if (maxMin.max < 1) {
            visualConfig.precision = 2
        }
        visualConfig.inRange = {
            color: config.visualInRange
        }
    }

    return visualConfig
}
