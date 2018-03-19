/**
 * Created by yelingfeng on 2016/8/16.
 */
/**
 * grid 配置
 */
import { getAxisPropsGroup } from '../helper/propsUtil'
export function getGirdOption(props) {
    let { gridleft, gridRight, gridBottom, gridTop } = getAxisPropsGroup(
        props,
        ['gridleft', 'gridRight', 'gridBottom', 'gridTop']
    )
    let grid = {
        left: gridleft || 10,
        right: gridRight || 10,
        bottom: gridBottom || '10%',
        top: gridTop || 10,
        containLabel: true
    }
    return grid
}
