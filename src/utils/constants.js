import { version } from '../../package.json'

export const VERSION = version

// 用户的根目录
const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']

// 配置文件目录
export const RC = `${HOME}/.sevenrc`

// 默认配置
export const DEFAULTS = {
  registry: 'tfeng-use'
}
