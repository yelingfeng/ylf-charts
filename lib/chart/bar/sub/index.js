/**
 * 横向柱形图以及横向堆积柱图现整合进属性（是否横向）
 * **/
import AxisChart from '../../../axisChart'
import { changeAxis } from '../../../props/axisHelper'
import { getSpecialProps } from '../../../helper/propsUtil'
// 是否堆积
const IS_STACK = '1'
// 是否横向
const IS_TRANSVERSE = '1'
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
        const props = getSpecialProps(this.options.props, 'bar')
        if (series instanceof Array) {
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
