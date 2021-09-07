import {
  IControl,
  ControlType,
  IDataSource,
  SourceCode,
  IControlOption
} from '@datahu/core'
import {I18nStrings} from '../i18n'
export default function getControls(i18n: I18nStrings): Array<IControl> {
  let charsets = [
    {value: '', label: 'default'},
    {value: 'utf8', label: 'utf8'},
    {value: 'latin1', label: 'latin1'},
    {value: 'gbk', label: 'gbk'},
    {value: 'utf8mb4', label: 'utf8mb4'}
  ] as Array<IControlOption>

  return [
    {
      type: ControlType.text,
      name: 'title',
      title: i18n.config_title,
      required: true
    },
    {
      type: ControlType.text,
      name: 'host',
      title: i18n.mysql_config_host,
      required: true
    },
    {
      type: ControlType.number,
      name: 'port',
      title: i18n.mysql_config_port,
      validate: ((data: any) => {
        return data.port > 0 && data.port < 100000 ? true : '(0 - 100000)'
      }).toString()
    },
    {
      type: ControlType.text,
      name: 'user',
      title: i18n.mysql_config_user,
      required: true
    },
    {
      type: ControlType.password,
      name: 'password',
      title: i18n.mysql_config_password
    },
    {
      type: ControlType.text,
      name: 'database',
      title: i18n.mysql_config_database
    },

    {
      type: ControlType.select,
      name: 'charset',
      title: i18n.mysql_config_charset,
      options: charsets
    },
    {type: ControlType.boolean, name: 'ssl', title: i18n.mysql_config_ssl},
    {
      type: ControlType.file,
      name: 'sslCa',
      title: i18n.mysql_config_ssl_ca,
      show: ((data: any) => {
        return data.ssl
      }).toString()
    },
    {
      type: ControlType.file,
      name: 'sslKey',
      title: i18n.mysql_config_ssl_key,
      show: ((data: any) => {
        return data.ssl
      }).toString()
    },
    {
      type: ControlType.file,
      name: 'sslCert',
      title: i18n.mysql_config_ssl_cert,
      show: ((data: any) => {
        return data.ssl
      }).toString()
    },
    {
      type: ControlType.boolean,
      name: 'sslRejectUnauthorized',
      title: i18n.mysql_config_ssl_reject_unauthorized,
      show: ((data: any) => {
        return data.ssl
      }).toString()
    }
  ]
}
