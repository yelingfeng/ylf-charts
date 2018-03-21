/**
 * 地图操作常量类
 * @author renxiaofan
 */

/**
 * [PROVINCES 地图省份常量]
 * @type {Array}
 */
export const PROVINCES = [
    'chongqing', 'xinjiang', 'jiangsu',
    'zhejiang', 'fujian', 'guizhou',
    'hubei', 'sichuan', 'shanxi'
]

/**
 * [COUNTRY 国家常量]
 * @type {Array}
 */
export const COUNTRY = [
    'china'
]

/**
 * [WORLD 世界常量]
 * @type {Array}
 */
export const WORLD = [
    'world'
]

/**
 * [MAP_KEYS ]
 * @type {Object}
 */
export const getMapKeys = () => { return [].concat(PROVINCES).concat(COUNTRY).concat(WORLD) }
