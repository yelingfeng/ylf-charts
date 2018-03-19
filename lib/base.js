import echarts from 'echarts'
import { deepCopy, isFunction } from './util'
import * as config from './config/commonConfig'
import { getCategory } from './helper/seriesCommond'
import { getCommonProps, getAxisProps } from './helper/propsUtil'
import { getLegend, getGirdOption } from './props'
import getTooltip from './tooltip/index'
/**
 * BasicClass
 * 基础底层封装echarts基本API 接收属性 初始化echarts实例`EC`
 * [class基类]
 */
export default class BasicClass {
    constructor(op) {
        this.options = op
        this._initEC()
    }
    _initEC() {
        if (this.options.el === undefined) {
            throw new Error('el not found. 请配置dom')
        }
        this.EC = echarts.init(this.options.el)
        this.EC.on('click', (...args) => {
            this.clickHandler(...args)
        })
    }

    clickHandler(...arg) {
        if(isFunction(this.options.onClick))this.options.onClick(...arg)
    }

    render(data) {
        if (this.EC && data) {
            this.EC.clear()
            this.originData =
                data instanceof Array ? deepCopy(data) : deepCopy(data.rows)
        }
    }
    updateProp(props) {
        this.options.props = props
        this.create()
    }
    build(option) {
        if (this.EC) {
            this.EC.clear()
            this.EC.setOption(option)
            if (this.built) {
                this.built()
            }
        }
    }
    resize() {
        if (this.EC) {
            this.EC.resize()
        }
    }
    getECId() {
        return this.EC.id
    }
    hideTip() {
        this.EC.dispatchAction({
            type: 'hideTip'
        })
    }
    showLoading() {
        this.EC.showLoading('', {
            text: 'loading',
            color: '#00ccff',
            textColor: '#fff',
            maskColor: 'rgba(0, 0, 0, 0.3)',
            zlevel: 0
        })
    }
    hideLoading() {
        this.EC.hideLoading()
    }
    // 取legend
    getLegendModel(category, props) {
        return getLegend(category, props)
    }
    // 取tooltip
    getTooltipModel(config, props) {
        return getTooltip(config, props)
    }
    // 取colorlist 和 axisColor
    getColorConfig(props) {
        return {
            color: getCommonProps(props, 'colorList') || config.commonColorList,
            nameColor: getAxisProps(props, 'axisColor')
        }
    }
    // 取grid
    getGirdOptionModel(props) {
        return getGirdOption(props)
    }
    // 取textStyle
    getTextStyleModel() {
        return {
            fontFamily: config.commonFontFamily,
            fontSize: config.commonFontSize
        }
    }
    /**
     * [getChartsSettings 拼装echarts option对象]
     * @param  {Array}  category
     * @param  {Array} xAxisData
     * @param  {Array}  series
     * @param  {Array}  data
     * @return {Object}
     */
    getChartsSettings(series, trigger) {
        const category = getCategory(this.originData)
        const props = deepCopy(this.options.props)
        const { color } = this.getColorConfig(props)
        const grid = this.getGirdOptionModel(props)
        const legend = this.getLegendModel(category, props)
        const tooltip = this.getTooltipModel(
            { trigger: trigger || 'axis' },
            props
        )
        const textStyle = this.getTextStyleModel()
        return {
            color,
            grid,
            legend,
            tooltip,
            textStyle,
            series
        }
    }
}
