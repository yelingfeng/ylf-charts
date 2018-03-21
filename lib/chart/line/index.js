import AxisChart  from '../../core/axisChart'
import { getSpecialProps } from '../../helper/propsUtil'
import { isArray } from '../../helper'
// 平滑或者面积
const TRUE = '1'
const defaultProp = {
    smooth: '1',
    // 空心圈 还是实心点  'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
    symbol: 'circle',
    // 大小
    symbolSize: 8,
    // 是否显示堆积
    isStack: '0',
    // 是否显示面积
    isArea: '1'
}
export class Line extends AxisChart {
    constructor(op) {
        super(op)
        this.initLine()
    }
    initLine() {
        this.__chartName__ = 'line'
    }
    render(data) {
        super.render(data)
    }
    lineInjection(option) {
        let series = option.series
        const props = getSpecialProps(this.options.props, 'line') || defaultProp;
        if (isArray(series)) {
            series.forEach(item => {
                Object.assign(item, {
                    stack: props.isStack === TRUE,
                    smooth: props.smooth === TRUE,
                    areaStyle: {
                        normal: {
                            opacity: props.isArea === TRUE ? 0.5 : 0
                        }
                    },
                    symbol: props.symbol,
                    symbolSize: props.symbolSize
                })
            })
        }
        return option
    }
}
