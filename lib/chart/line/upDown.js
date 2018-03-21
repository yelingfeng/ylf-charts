/**
 * Created by zhao on 2018/1/8.
 */
import { Line } from './index'
import _ from 'lodash'
export class UpDownLine extends Line {
    constructor(op) {
        super(op)
        this.name = 'UpDownLine'
    }
    render(data) {
        super.render(data)
        this.create()
    }
    create() {
        let option = this.lineInjection(this.groupChartSetting())
        if (option.series.length > 0) option = this.upDownHandle(option)
        this.build(option)
    }
    changeSeries(series) {
        let up = []
        let down = []
        let upstack = []
        let downstack = []
        let Arr = [up, down, upstack, downstack]
        let result = []
        let data = []
        series.forEach(item => {
            data = data.concat(item.data)
        })
        data.forEach(item => {
            switch (item.dataObj.type) {
                case 'up':
                    up.push(item)
                    break
                case 'down':
                    down.push(item)
                    break
                case 'upstack':
                    upstack.push(item)
                    break
                case 'downstack':
                    downstack.push(item)
                    break
                default:
                    break
            }
        })
        Arr.forEach(item => {
            series.forEach(sItem => {
                if (item[0].dataObj.category === sItem.name) {
                    let obj = _.cloneDeep(sItem)
                    obj.data = item
                    result.push(obj)
                }
            })
        })
        return result
    }
    upDownHandle(option) {
        option.series = this.changeSeries(option.series)
        option.yAxis[0].axisLabel.formatter = value => {
            return Math.abs(value)
        }
        option.yAxis[1] = this.cloneAxis(option.yAxis[0])
        option.series.forEach(item => {
            let dataObj = item.data instanceof Array ? item.data[0].dataObj : {}
            if (dataObj.type === 'upstack' || dataObj.type === 'downstack') {
                item.smooth = true
                item.areaStyle.normal = {
                    opacity: 0.5
                }
            }
            if (dataObj.type === 'down' || dataObj.type === 'downstack') {
                item.data.forEach(dItem => {
                    dItem.value = -dItem.value
                })
            }
        })
        return option
    }
}
