/**
 * Created by zhao on 2018/1/3.
 */
import { Bar } from './index'
const TYPE_LINE = 'line'
export class MultiBar extends Bar {
    constructor(op) {
        super(op)
        this.name = 'MultiBar'
    }
    render(data) {
        if(data){
            super.render(data)
            this.create()
        }
    }
    create() {
        let option = this.barInjection(this.groupChartSetting())
        this.build(this.classifyAxis(option))
    }
    classifyAxis(option) {
        option.yAxis[1] = this.cloneAxis(option.yAxis[0])
        option.yAxis[1].splitLine.show = false;
        option.series.forEach(item => {
            let data = item.data
            if (data instanceof Array && data.length > 0) {
                if (data[0].dataObj && data[0].dataObj.type === TYPE_LINE) {
                    item.type = 'line'
                    item.yAxisIndex = 1
                    item.smooth = true
                }
            }
        })
        return option
    }
}
