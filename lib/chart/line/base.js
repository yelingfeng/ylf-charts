/**
 * Created by zhao on 2017/12/18.
 */
import { Line } from './index'
export class BaseLine extends Line {
    constructor(op) {
        super(op)
        this.name = 'BaseLine'
    }
    render(data) {
        super.render(data)
        this.create()
    }
    create() {
        let option = this.lineInjection(this.singleChartSetting())
        if(Object.keys(option.tooltip).length === 0){
            delete option.tooltip
        }
        this.build(option)
    }
}
