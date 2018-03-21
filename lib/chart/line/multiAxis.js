/**
 * Created by zhao on 2018/1/8.
 */
import { Line } from './index'
export class MultiLine extends Line {
    constructor(op) {
        super(op)
        this.name = 'MultiLine'
    }
    render(data) {
        super.render(data)
        this.create()
    }
    create() {
        let option = this.lineInjection(this.groupChartSetting())
        this.build(this.classifyAxis(option))
    }
    classifyAxis(option) {
        option.yAxis[1] = this.cloneAxis(option.yAxis[0])
        option.series[1].yAxisIndex = 1
        return option
    }
}
