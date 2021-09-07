import {IControl, ControlType} from '@datahu/core'
import {I18nStrings} from '../i18n'
export default function getControls(i18n: I18nStrings): Array<IControl> {
  return [
    {
      type: ControlType.text,
      name: 'title',
      title: i18n.config_title,
      required: true
    },
    {
      type: ControlType.text,
      name: 'server',
      title: i18n.mysql_config_host,
      required: true
    },
    {
      type: ControlType.number,
      name: 'port',
      title: i18n.mysql_config_port
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
    }
  ]
}
