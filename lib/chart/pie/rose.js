/**
 * Created by zhao on 2017/12/28.
 */
import { Pie } from './index'
export class RosePie extends Pie {
    constructor(op) {
        super(op)
        this.name = 'RosePie'
    }
    render(data) {
        super.render(data)
        this.create()
    }
    create() {
        let option = this.pieInjection(this.pieChartSetting())
        this.build(this.getSpecial(option))
    }
    getSpecial(option) {
        if (option.series[0]) option.series[0].roseType = true
        return option
    }
}
