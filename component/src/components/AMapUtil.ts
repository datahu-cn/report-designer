import * as AMapLoader from '@amap/amap-jsapi-loader'
export class AMapUtil {
  static AMap = null
  static loadPromise?: Promise<any>

  static getAMap(): Promise<any> {
    if (!AMapUtil.loadPromise) {
      AMapUtil.loadPromise = AMapLoader.load({
        key: '810e216e93e59317933d8071d171a777', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          'AMap.Autocomplete',
          'AMap.PlaceSearch',
          'AMap.Scale',
          'AMap.OverView',
          'AMap.ToolBar',
          'AMap.MapType',
          'AMap.Geolocation',
          'AMap.Geocoder',
          'AMap.AMapManager',
          'AMap.Marker',
          'Map3D',
          'AMap.PolyEditor',
          'AMap.DistrictLayer',
          'AMap.DistrictSearch'
        ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        AMapUI: {
          // 是否加载 AMapUI，缺省不加载
          version: '1.1', // AMapUI 缺省 1.1
          plugins: [] // 需要加载的 AMapUI ui插件
        }
        // Loca: {
        //   // 是否加载 Loca， 缺省不加载
        //   version: '1.3.2' // Loca 版本，缺省 1.3.2
        // }
      })
    }
    return AMapUtil.loadPromise!
  }
}
