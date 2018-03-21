/**
 * Created by zhao on 2017/12/18.
 */
import { Line } from './index'
export class GroupLine extends Line {
    constructor(op) {
        super(op)
        this.name = 'GroupLine'
    }
    render(data) {
        super.render(data)
        this.create()
    }
    create() {
        let option = this.lineInjection(this.groupChartSetting())
        this.build(option)
    }
}
