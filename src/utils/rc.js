import { RC, DEFAULTS } from '../../dist/utils/constants'
import { decode, encode } from 'ini'
import { promisify } from 'util'
import chalk from 'chalk'
import fs from 'fs'

const access = promisify(fs.access) // promise化，查看文件是否存在
const readFile = promisify(fs.readFile) // 读文件
const writeFile = promisify(fs.writeFile) // 写文件

//RC 是配置文件
//DEFAULTS 是默认的配置
export const get = async key => {
  const exit = await access(RC, fs.constants.F_OK)
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    }) // 查看配置文件是否存在，避免文件不存在造成的报错，这个加上then、catch
  console.log('exit', exit)
  let opts
  if (exit) {
    // 如果存在，读取里面的内容并且返回对应的key
    opts = await readFile(RC, 'utf8')
    opts = decode(opts) // 解密
    return opts[key]
  }
  return ''
}

// 返回所有配置
export const getAll = async () => {
  const exit = await access(RC, fs.constants.F_OK)
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
  let opts
  if (exit) {
    opts = await readFile(RC, 'utf8')
    opts = decode(opts)
    return opts
  }
  return {
    ...DEFAULTS
  }
}

// 设置属性
export const set = async (key, value) => {
  const exit = await access(RC, fs.constants.F_OK)
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
  let opts
  if (exit) {
    opts = await readFile(RC, 'utf8')
    opts = decode(opts)
    if (!key) {
      console.log(chalk.red(chalk.bold('Error:')), chalk.red('key is required')) // 打印有颜色的提示
      return
    }
    if (!value) {
      console.log(
        chalk.red(chalk.bold('Error:')),
        chalk.red('value is required')
      )
      return
    }
    Object.assign(opts, { [key]: value })
  } else {
    opts = Object.assign(DEFAULTS, { [key]: value })
  }
  await writeFile(RC, encode(opts), 'utf8') // 将组合后的opts重新写入RC
}

// 移除属性
export const remove = async key => {
  const exit = await exits(RC)
  let opts
  if (exit) {
    opts = await readFile(RC, 'utf8')
    opts = decode(opts)
    delete opts[key]
    await writeFile(RC, encode(opts), 'utf8')
  }
}
