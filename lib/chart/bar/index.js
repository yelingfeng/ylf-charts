/**
 * 横向柱形图以及横向堆积柱图现整合进属性（是否横向）
 * **/
import AxisChart from '../../core/axisChart'
import { changeAxis } from '../../props/axisHelper'
import { getSpecialProps } from '../../helper/propsUtil'
import { isArray } from '../../helper'
// 是否堆积
const IS_STACK = '1'
// 是否横向
const IS_TRANSVERSE = '1'
const defaultProp = {
    // 宽度（设置后柱图为固定宽度，不设置 为自适应）series-> barWidth
    width: '',
    // 圆角barBorderRadius Number
    barBorderRadius: 0,
    // 是否堆积 series->stack
    isStack: '0',
    // 划过颜色 series ->itemStyle->emphasis->color
    hoverColor: '#00ccff',
    // 颜色集合 （配置后 全局忽略）
    // 是否求和排序
    isSumSort: '0',
    // 排序顺序
    orderType: '0',
    // 是否横向
    isTransverse: '0'
}
export class Bar extends AxisChart {

    constructor(op) {
        super(op)
        this.initBar()
    }
    initBar() {
        this.__chartName__ = 'bar'
    }
    render(data) {
        super.render(data)
    }
    barInjection(option) {
        let series = option.series
        const props = getSpecialProps(this.options.props, 'bar') || defaultProp
        if (isArray(series)) {
            series.forEach(item => {
                Object.assign(item, {
                    barWidth: props.width || '',
                    itemStyle: {
                        normal: {
                            barBorderRadius: parseInt(props.barBorderRadius, 0)
                        },
                        emphasis: {
                            color: props.hoverColor
                        }
                    },
                    stack: props.isStack === IS_STACK
                })
            })
        }
        if (props.isTransverse === IS_TRANSVERSE) {
            option = changeAxis(option)
        }
        return option
    }
}
