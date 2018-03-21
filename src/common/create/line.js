/**
 * Created by zhao on 2017/12/19.
 */
import { Line, GroupLine, MultiLine, UpDownLine } from '../../../lib/index'
import { LINE_TYPE as LineTypes } from '@/util/constant'

/**
 * [createLine description]
 * @param  {[type]} childType 三级类型
 * @param  {[type]} options   参数
 * @return {[type]}            [description]
 */
export const createLine = (childType, options) => {
    let { props, el, onClick } = options
    let obj = {
        el,
        sub: childType,
        props,
        onClick
    }
    let vm;
    switch (childType) {
        case LineTypes.BASE:
            vm = new Line(obj)
            break
        case LineTypes.GROUP:
            vm = new GroupLine(obj)
            break
        case LineTypes.MULTI_AXIS:
            vm = new MultiLine(obj)
            break
        case LineTypes.ZLD_SUPDOWN:
            vm = new UpDownLine(obj)
            break
        default:
            break
    }
    return vm
}
