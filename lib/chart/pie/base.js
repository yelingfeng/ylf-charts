/**
 * Created by zhao on 2017/12/18.
 */
import { Pie } from './index'
export class BasePie extends Pie {
    constructor(op) {
        super(op)
        this.name = 'BasePie'
    }
    render(data) {
        super.render(data)
        this.create()
    }
    create() {
        let option = this.pieInjection(this.pieChartSetting())
        this.build(option)
    }
}
