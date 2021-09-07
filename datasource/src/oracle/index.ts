import {
  IControl,
  IDataSource,
  SourceCode,
  ITableDefinition,
  ComponentControl,
  ControlType
} from '@datahu/core'
import {I18n} from '../i18n'
import {BaseDataSource, BaseDataSourceOption} from '../base'
import {OracleHelper} from './OracleHelper'

export class OracleDataSourceOption extends BaseDataSourceOption {
  static controls: Array<IControl> = []

  @ComponentControl({
    type: ControlType.text,
    title: '服务器',
    required: true
  })
  host: string = 'localhost'

  @ComponentControl({
    type: ControlType.number,
    title: '端口',
    required: true
  })
  port: number = 1521

  @ComponentControl({
    type: ControlType.text,
    title: '用户名',
    required: true
  })
  username: string = ''

  @ComponentControl({
    type: ControlType.password,
    title: '密码',
    required: true
  })
  password: string = ''

  @ComponentControl({
    type: ControlType.text,
    title: '默认数据库',
    required: true
  })
  database: string = ''

  @ComponentControl({
    type: ControlType.text,
    title: 'Oracle Client 路径',
    description: '如果添加了环境变量，该路径可以为空'
  })
  oracleClient: string = ''
}

export class OracleDataSource extends BaseDataSource {
  helper?: OracleHelper
  constructor(language: string, config?: OracleDataSourceOption) {
    super(language, config)
    this.title = 'Oracle'
    this.description = 'Oracle数据库'
    if (config) {
      this.helper = new OracleHelper(config)
    }
  }

  // 数据源默认配置值
  config: OracleDataSourceOption = new OracleDataSourceOption()

  icon: string =
    '<svg t="1628748850626" class="icon" viewBox="0 0 8165 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2062"><path d="M3398.499037 666.115306h520.24153l-274.800972-442.904953-504.499351 800.60224-229.885787 0.187407 614.069914-961.397353A143.303803 143.303803 0 0 1 3643.564782 0.008746c48.350978 0 92.703942 22.801172 118.878438 60.907239l616.193859 963.084015-230.073194-0.187407-107.883901-178.973581h-527.175585l-114.942893-178.723706z m2386.751699 178.911113V10.00378h-195.090574v916.669574c0 25.362399 10.307379 49.600357 28.423379 67.716357 19.115503 18.928096 44.352964 29.360413 71.464494 29.360413h888.995824l114.693017-178.661236H5785.250736z m-3225.2726-149.425762a342.829673 342.829673 0 0 0 0-685.596877H1706.777029v1013.808813h194.903167V188.665016h644.867113a163.856092 163.856092 0 0 1 164.043499 164.105968 163.98103 163.98103 0 0 1-164.043499 164.168437l-549.414537-0.187407 581.77346 507.060579h283.234282l-391.430527-328.399343 89.268149 0.187407zM506.935641 1023.812593a506.873172 506.873172 0 1 1 0-1013.808813h589.269735a506.935641 506.935641 0 0 1 506.873173 506.935641 506.935641 506.935641 0 0 1-506.873173 507.060579l-589.269735-0.187407z m576.151253-178.661236a328.086998 328.086998 0 0 0 328.149467-328.211936 328.086998 328.086998 0 0 0-328.149467-328.211936H519.991655a328.274405 328.274405 0 0 0 0 656.423872h563.095239z m3702.285608 178.661236a506.935641 506.935641 0 1 1 0-1013.808813h700.277084l-114.755487 178.723705h-572.340646a328.274405 328.274405 0 1 0 0 656.423872h702.838312l-114.505611 178.661236h-601.576121z m2384.752692-178.661236a328.086998 328.086998 0 0 1-315.593205-238.506504h833.335977l114.755486-178.723705-948.341339-0.062469a328.211936 328.211936 0 0 1 315.843081-239.193663l572.028302 0.062469 114.942893-178.723705h-700.277084a506.935641 506.935641 0 0 0 0 1013.808813h601.576121l114.505611-178.661236h-702.775843zM7961.482027 117.950149a89.455556 89.455556 0 1 1 179.036051 0 89.455556 89.455556 0 1 1-179.036051 0z m89.580494 114.318204l0 0z m-10.744661-181.597278c17.553779 0 24.800179 0.187407 33.420895 3.435793 22.488827 7.558745 24.800179 28.235972 24.800179 35.794717a49.975171 49.975171 0 0 1-1.374317 10.494785 34.795213 34.795213 0 0 1-15.867117 21.926607c-1.311848 0.999503-2.061476 1.624193-5.747145 2.99851l29.672758 53.098619h-28.673254l-25.987089-48.850729h-17.303903v48.78826h-24.987586V50.671075h32.046579z m8.933061 57.721323c7.683683-0.124938 16.241931-0.687159 21.239448-7.996028a18.990565 18.990565 0 0 0 2.873572-10.932068 16.86662 16.86662 0 0 0-9.62022-15.492303c-5.747145-2.248883-11.619227-2.248883-23.425861-2.248883h-7.058993v36.669282h15.992054z" fill="#FF0000" p-id="2063"></path></svg>'
  sourceCode: SourceCode = SourceCode.Javascript
  getTables(): Promise<Array<ITableDefinition>> {
    return this.helper!.getTables()
  }
  getData(tables: Array<ITableDefinition>): Promise<Array<object>> {
    return this.helper!.getData(tables)
  }
}
