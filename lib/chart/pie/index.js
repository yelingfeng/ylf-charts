import BasicClass from '../../core/base'
import { getNormalSeriesObj } from '../../helper/seriesCommond'
import { getSpecialProps } from '../../helper/propsUtil'
import { isArray } from '../../helper'
// 是否显示提示线，文字
const TRUE = '1'
const defaultProp = {
    // 是否切换环图
    'isRing': '1',
    // 内环半径
    'innerRadius': '30',
    // 外环半径
    'outerRadius': '70',
    // 是否显示提示线  series->labelLine-> normal-> show
    'isLabelLine': '1',
    // 保加利亚玫瑰图 series ->roseType
    'roseType': '0',
    'proportion': '0',
    'isLabel': '1',
    'centerX': '50',
    'centerY': '50',
    // 是否轮播
    'isCarousel': '0',
    // 轮播饼图，轮播时长
    'carouselTime': '1'
    // 'circleColor': ['#01f37e', '#00a8ff', '#fb6e12', '#00e5ff']
}
export class Pie extends BasicClass {
    constructor(op) {
        super(op)
        this.initPie()
    }
    initPie() {
        this.__chartName__ = 'pie'
    }
    render(d) {
        super.render(d)
    }
    /**
     * [pieChartSetting 单图构建 饼图的基本option]
     * @return {[type]} [description]
     */
    pieChartSetting() {
        const { seriesObj } = getNormalSeriesObj(this.originData, this.__chartName__)
        return this.getChartsSettings([seriesObj], 'item')
    }

    pieInjection(option) {
        let series = option.series
        this.sProps = getSpecialProps(this.options.props, 'pie') || defaultProp
        const me = this
        if (isArray(series)) {
            series.forEach(item => {
                Object.assign(item, {
                    radius: [me.sProps.innerRadius + '%', me.sProps.outerRadius + '%'],
                    label: {
                        normal: {
                            show: me.sProps.isLabel === TRUE
                        }
                    },
                    labelLine: {
                        normal: {
                            show: me.sProps.isLabelLine === TRUE
                        }
                    },
                    center: [me.sProps.centerX + '%', me.sProps.centerY + '%']
                })
            })
        }
        return option
    }

    built() {
        if (this.sProps.isCarousel === TRUE) this.carousel()
    }

    // 控制轮播
    carousel() {
        let i = 0
        clearInterval(this.EC.timeLong)
        this.EC.timeLong = setInterval(() => {
            // 高亮
            this.EC.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: i
            })
            // 选中后事件
            this.EC.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: i
            })
            // 取消高亮
            this.EC.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: i - 1 >= 0 ? i - 1 : this.originData.length - 1
            })
            i++
            if (i >= this.originData.length) i = 0
        }, this.sProps.carouselTime * 1000)
    }
}
