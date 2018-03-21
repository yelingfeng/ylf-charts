import { MapChart } from 'charts/core/mapChart'
import { loadMapsResouces } from 'charts/chart/map/load'
import { MAP_RENDER_TYPE } from 'common/constants'
import _ from 'lodash'
export class Map extends MapChart {
    constructor(op) {
        super(op)
        this.initMap()
    }
    initMap() {
        this.__chartName__ = 'map'
    }
    render(data) {
        super.render(data)
        this.create()
    }
    create() {
        this.mapProps = _.cloneDeep(this.options.props)
        this.mapSub = this.options.sub === 'prov' ? this.mapProps.specialProp.map['provType'] : this.options.sub
        let opt = Object.create(null)
        loadMapsResouces(this.mapSub).then(res => {
            this.subCord = res
            switch (this.mapProps.specialProp.map['mapType']) {
                case MAP_RENDER_TYPE.BASE:
                    opt = this.buildNormalMap()
                    break
                case MAP_RENDER_TYPE.HOT:
                    opt = this.buildHotMap()
                    break
                case MAP_RENDER_TYPE.POINT:
                    opt = this.buildPointMap()
                    break
                default:
                    break
            }
            this.build(opt)
        })
    }
}
