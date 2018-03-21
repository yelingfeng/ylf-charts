import { getAxisProps } from '../helper/propsUtil'
import callBackTooltip from './base'
// 属性处理
// 背景色
function getBgColor(props) {
    if (props.toolTipProp && props.toolTipProp.bgColor) {
        return props.toolTipProp.bgColor
    }
    return 'rgba(1,75,117,0.5)'
}
// 触发方式
function getTrigger(config = {}) {
    return config.trigger || 'item'
}
// 字体设置
function getFontStyle(fontSize = 12, align = 'left') {
    return {
        fontSize: fontSize,
        align: align
    }
}
// tooltip背景样式
function getAxisPointer(
    type = 'shadow',
    shadowStyle = 'rgba(1, 91, 143, 0.4)'
) {
    return {
        type: type,
        shadowStyle: {
            color: shadowStyle
        }
    }
}
// padding
function getPadding(pade = 9) {
    return pade
}
// tooltip边框
function tooltipBox(type = '1', content) {
    let tpl = ''
    switch (type) {
        case '1':
            tpl = `<div style="position: relative;" class="ylf-tooltip__box">
                    <span  class="ylf-tooltip__span ylf-tooltip__row1 " ></span>
                    <span  class="ylf-tooltip__span ylf-tooltip__row2 " ></span>
                    <span  class="ylf-tooltip__span ylf-tooltip__col1 " ></span>
                    <span  class="ylf-tooltip__span ylf-tooltip__col2 " ></span>
                        ${content}
                    </div>`
            break
        case '2':
            tpl = `<div style="position: relative;" class="ylf-tooltip__box ylf-tooltip__boxTwo">
                        ${content}
                    </div>`
            break
        default:
            break
    }
    return tpl
}

// tip 通用格式
export default function getTooltip(config = {}, props) {
    let ylUnit = getAxisProps(props, 'ylUnit')
    let yrUnit = getAxisProps(props, 'yrUnit')
    let trigger = config.trigger || 'item'
    if(props && props.toolTipProp){
        let toolTipProp = props.toolTipProp
        let tipObj = {
            trigger: getTrigger(config),
            textStyle: getFontStyle(12, 'left'),
            axisPointer: getAxisPointer('shadow', 'rgba(1, 91, 143, 0.4)'),
            backgroundColor: getBgColor(props),
            padding: getPadding(9),
            formatter: function(params) {
                let tooltips = callBackTooltip(
                    params,
                    trigger,
                    { ylUnit, yrUnit },
                    props
                )
                return tooltipBox(toolTipProp.borderStyle, tooltips)
            }
        }
        return tipObj
    }
    return {}

}
