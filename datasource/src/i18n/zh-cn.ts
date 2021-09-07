import {I18nStrings} from './I18nStrings'

export default {
  config_title: '数据源名称',
   //mysql
  mysql_title: 'mysql 数据库',
  mysql_description: '支持的版本 >= 5.x',
  mysql_config_host: '主机名',
  mysql_config_port: '端口',
  mysql_config_user: '用户名',
  mysql_config_password: '密码',
  mysql_config_database: '数据库',
  mysql_config_charset: '编码',
  mysql_config_ssl: '使用SSL',
  mysql_config_ssl_ca: 'CA证书',
  mysql_config_ssl_key: '客户端密钥',
  mysql_config_ssl_cert: '客户端证书',
  mysql_config_ssl_reject_unauthorized: '不验证证书',
  // sqlserver
  sqlserver_title: 'sql server 数据库',
  sqlserver_description: '支持的版本 2000/2005/2008/2012/2014/2016/2017',
  // excel
  excel_title: 'excel',
  excel_description: '支持 xlsx',
  excel_start_cols: '起始行',
  excel_source: '读取文件',
  // restful
  restful_title: 'restful',
  restful_description: '支持数组数据类型',
  restful_url: '请求地址',
  restful_result_type: '数据类型',
  restful_result_field: '数据所在字段',
  restful_method: '请求模式',
  restful_open_auth: '是否存在验证',
  restful_username: '账号',
  restful_password: '密码',
  restful_auth_mode: '验证模式',
  restful_request_body: '请求体',
  restful_params: '参数',
  restful_headers: '请求头',
} as I18nStrings
