import _ from 'lodash'
let BAR_OP = [
    {
        width: 500,
        height: 400,
        chartType: 'Bar',
        childType: 'base'
    },
    {
        width: 500,
        height: 400,
        chartType: 'Bar',
        childType: 'group'
    },
    {
        width: 1000,
        height: 400,
        chartType: 'Bar',
        childType: 'level'
    },
    {
        width: 1000,
        height: 400,
        chartType: 'Bar',
        childType: 'multiAxis'
    }
]


let LINE_OP = [
    {
        width: 1000,
        height: 400,
        chartType: 'Line',
        childType: 'base'
    },
    {
        width: 1000,
        height: 400,
        chartType: 'Line',
        childType: 'group'
    }
]

let PIE_OP = [
    {
        width: 600,
        height: 400,
        chartType: 'Pie',
        childType: 'base'
    },
    {
        width: 600,
        height: 400,
        chartType: 'Pie',
        childType: 'rose'
    }
]

export const initPieOption = () => {
    let obj = {
        props: {
            specialProp:{
                pie: {
                    // 是否切换环图
                    'isRing': '1',
                    // 内环半径
                    'innerRadius': '30',
                    // 外环半径
                    'outerRadius': '70',
                    // 是否显示提示线  series->labelLine-> normal-> show
                    'isLabelLine': '1',
                    // 保加利亚玫瑰图 series ->roseType
                    'roseType': '0',
                    'proportion': '0',
                    'isLabel': '1',
                    'centerX': '50',
                    'centerY': '50',
                    // 是否轮播
                    'isCarousel': '0',
                    // 轮播饼图，轮播时长
                    'carouselTime': '1'
                    // 'circleColor': ['#01f37e', '#00a8ff', '#fb6e12', '#00e5ff']
                }
            }
        }
    }
    let result = []
    PIE_OP.forEach(it => {
        let _tmp = _.cloneDeep(Object.assign({}, obj, it))
        if( _tmp.props && _tmp.childType === 'rose'){
            _tmp.props.specialProp.pie.roseType = '1'
        }
        result.push(_tmp)
    })
    return result
}

export const initLineOption = () => {
    let obj = {
        props: {
            specialProp:{
                line: {
                    //  是否平滑显示 series -> smooth
                    smooth: '1',
                    // 空心圈 还是实心点  'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                    symbol: 'circle',
                    // 大小
                    symbolSize: 8,
                    // 是否显示堆积
                    isStack: '0',
                    // 是否显示面积
                    isArea: '1'
                }
            }
        }
    }
    let result = []
    LINE_OP.forEach(it => {
        let _tmp = _.cloneDeep(Object.assign({}, obj, it))
        result.push(_tmp)
    })
    return result
}


export const initBarOption = () => {
    let obj = {
        props: {
            specialProp:{
                bar: {
                    width: '10',
                    barBorderRadius: 5,
                    hoverColor: '#00ccff',
                    isStack : '1'
                }
            }
        }
    }
    let result = []
    BAR_OP.forEach(it => {
        let _tmp = _.cloneDeep(Object.assign({}, obj, it))
        if(_tmp.childType === 'level') _tmp.props.specialProp.bar.isTransverse = '1'
        result.push(_tmp)
    })
    return result
}
