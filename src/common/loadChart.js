import { createBar } from './bar'
// import { createLine } from './line'
// import { createPie } from './pie'
// import { createTreeMap } from './treeMap'
// import { createRadar } from './radar'
// import { createHeatMap } from './heatMap'
// import { createMap } from './map'
// import { createWordCloud } from './wordCloud'
import { CHART_TYPE } from './constant'

export const initChart = (chartType, childType, options) => {
    let result
    switch (chartType) {
        case CHART_TYPE.BAR:
            result = createBar(childType, options)
            break
        // case CHART_TYPE.TREEMAP:
        //     result = createTreeMap(childType, options)
        //     break
        // case CHART_TYPE.RADAR:
        //     result = createRadar(childType, options)
        //     break
        // case CHART_TYPE.HEATMAP:
        //     result = createHeatMap(childType, options)
        //     break
        // case CHART_TYPE.LINE:
        //     result = createLine(childType, options)
        //     break
        // case CHART_TYPE.PIE:
        //     result = createPie(childType, options)
        //     break
        // case CHART_TYPE.MAP:
        //     result = createMap(childType, options)
        //     break
        // case CHART_TYPE.WORDCLOUD:
        //     result = createWordCloud(childType, options)
        //     break
        default:
            break
    }
    return result
}
