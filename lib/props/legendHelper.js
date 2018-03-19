/**
 * Created by yelingfeng on 2016/8/25.
 */

import { getLegendProps } from '../helper/propsUtil'
import * as config from '../config/commonConfig'
import { LEGEND_ORIENT, PROP_TITLE_ALIGN } from '../constant'
/**
 * 图例设置
 * @param data
 * @param props
 * @returns {*}
 */
export function getLegend(data, props, type) {
    let legend = {}
    let lp = getLegendProps(props, [
        'isLegend',
        'legendPosition',
        'orientType',
        'legendLeft',
        'legendRight',
        'legendTop',
        'legendBottom',
        'legendFontSize'
    ])
    let isLength = false
    let orientType
    switch (lp.isLegend) {
        case '0':
            isLength = false
            break
        case '1':
            isLength = true
            break
        default:
            isLength = false
    }
    switch (lp.orientType) {
        case LEGEND_ORIENT.HORIZONTAL:
            orientType = 'horizontal'
            break
        case LEGEND_ORIENT.VERTICAL:
            orientType = 'vertical'
            break
        default:
            if (type === 'pie') {
                orientType = 'vertical'
            } else {
                orientType = 'horizontal'
            }
    }
    legend.orient = orientType
    legend.show = isLength
    switch (lp.legendPosition) {
        case PROP_TITLE_ALIGN.TOPLEFT:
            legend.left = 'left'
            legend.top = 'top'
            break
        case PROP_TITLE_ALIGN.TOPCENTER:
            legend.left = 'center'
            legend.top = 'top'
            break
        case PROP_TITLE_ALIGN.TOPRIGHT:
            legend.left = 'right'
            legend.top = 'top'
            break
        case PROP_TITLE_ALIGN.BOTTOMCENTER:
            legend.left = 'center'
            legend.top = 'bottom'
            break
        case PROP_TITLE_ALIGN.AUTO:
            legend.left = lp.legendLeft || '10'
            legend.top = lp.legendTop || '10'
            legend.right = lp.legendRight || '10'
            legend.bottom = lp.legendBottom || '10'
            break
        default:
            legend.left = 'center'
            legend.top = 'top'
    }
    legend.textStyle = {
        color: config.legendColor,
        fontFamily: config.commonFontFamily,
        fontSize: parseInt(lp.legendFontSize, 10) || 12
    }
    legend.itemWidth = config.legendIconWidth
    legend.itemHeight = config.legendIconHeight
    legend.itemGap = 6
    if (data && data.length) {
        legend.data = data
    }
    return legend
}
