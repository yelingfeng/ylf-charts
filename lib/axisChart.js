import BasicClass from './base'
import { getNormalSeriesObj, getGroupSeriesObj } from './helper/seriesCommond'
import _ from 'lodash'
import {
    getAxisLabel,
    getAxisName,
    axisMaxmin,
    getSplitLine,
    getAxisLine
} from './props'
/**
 * AxisChart
 * 坐标系图表 基类
 */
export default class AxisChart extends BasicClass {
    render(d) {
        super.render(d)
    }
    // 取axisLine
    getAxisLineModel(chartName, props) {
        return getAxisLine(props, chartName)
    }

    /**
     * [singleChartSetting 单图构建 单柱图、 单线图]
     * @return {[type]} [description]
     */
    singleChartSetting() {
        const { seriesObj, category } = getNormalSeriesObj(
            this.originData,
            this.__chartName__
        )
        let axisSet = this.getAxisSettings(category)
        let chartSet = this.getChartsSettings([seriesObj])
        return Object.assign(chartSet, axisSet)
    }

    /**
     * [groupChartSetting 分组图构建 分组柱形图 分组折线图]
     * @return {[type]} [description]
     */
    groupChartSetting() {
        const { xAxis, series } = getGroupSeriesObj(
            this.originData,
            this.__chartName__
        )
        let axisSet = this.getAxisSettings(xAxis)
        let chartSet = this.getChartsSettings(series)
        return Object.assign(chartSet, axisSet)
    }

    /**
     * [getChartsSettings 拼装echarts option对象]
     * @param  {Array}  category
     * @param  {Array} xAxisData
     * @param  {Array}  series
     * @param  {Array}  data
     * @return {Object}
     */
    getAxisSettings(xAxisData) {
        const props = _.cloneDeep(this.options.props)
        const { nameColor } = this.getColorConfig(props)
        const aLine = this.getAxisLineModel(this.__chartName__, props)
        const xAxis = this.getxAxisConfig(xAxisData, aLine, nameColor)
        const yAxis = this.getyAxisConfig(this.originData, aLine, nameColor)
        return {
            xAxis,
            yAxis
        }
    }

    /**
     * [getxAxisConfig 构建xAxis]
     * @param  {Array}  category
     * @param  {Object} axisLine
     * @param  {String}  nameColor
     * @return {Array}
     */
    getxAxisConfig(category, axisLine, nameColor) {
        let config = []
        let props = this.options.props
        let name = getAxisName(props, 'xName', 'xUnit')
        let axisLabel = getAxisLabel(props, 'xAxis')
        config.push({
            name,
            type: 'category',
            nameTextStyle: {
                color: nameColor
            },
            data: category,
            axisTick: {
                show: true,
                alignWithLabel: true
            },
            splitLine: false,
            axisLabel,
            axisLine,
            boundaryGap: ['0%', '5%']
        })
        return config
    }

    /**
     * [getyAxisConfig 构建yAxis]
     * @param  {Array}  data
     * @param  {Object} axisLine
     * @param  {String}  nameColor
     * @return  {Array}
     */
    getyAxisConfig(data, axisLine, nameColor) {
        let config = []
        let props = this.options.props
        let name = getAxisName(props, 'ylName', 'ylUnit')
        this.maxMin = axisMaxmin(data, props, 0, { isAxis: true })
        let axisLabel = getAxisLabel(props, 'yAxis')
        let splitLine = getSplitLine()
        let aLine
        if (axisLine && _.isObject(axisLine)) {
            aLine = _.clone(axisLine)
            aLine.show = false
        }
        config.push({
            max: this.maxMin.ylmax,
            min: this.maxMin.ylmin,
            name,
            nameTextStyle: {
                color: nameColor
            },
            type: 'value',
            axisLabel,
            splitLine,
            axisLine: aLine,
            boundaryGap: ['0%', '5%'],
            axisTick: {
                show: false
            }
        })
        return config
    }

    /** 复制一个Axis，一般用于多y轴**/
    cloneAxis(axis) {
        let Axis = _.cloneDeep(axis)
        Axis.name = getAxisName(this.options.props, 'yrName', 'yrUnit')
        Axis.max = this.maxMin.yrmax
        Axis.min = this.maxMin.yrmin
        return Axis
    }
}
