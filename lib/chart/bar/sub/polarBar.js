/**
 * Created by zhao on 2018/1/9.
 */
import { Bar } from './index'
export class PolarBar extends Bar {
    constructor(op) {
        super(op)
        this.name = 'PolarBar'
    }
    render(data) {
        super.render(data)
        this.create()
    }
    create() {
        let option = this.barInjection(this.singleChartSetting())
        this.build(this.polarAxis(option))
    }
    polarAxis(option) {
        let obj = {
            angleAxis: {
                type: 'category',
                boundaryGap: false,
                data: (function() {
                    let data = []
                    for (let i = 0; i < 12; ++i) {
                        data.push(2 * i + '点')
                    }
                    return data
                })(),
                axisTick: {
                    show: false
                },
                z: 10
            },
            radiusAxis: {
                max: val => {
                    return val.max * 1.2
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(0, 0, 0, 0)'
                    }
                }
            },
            polar: {}
        }
        delete option.yAxis
        delete option.xAxis
        option.series[0].coordinateSystem = 'polar'
        return Object.assign(option, obj)
    }
}
