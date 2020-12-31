"use strict";

var _constants = require("./utils/constants");

var _index = _interopRequireDefault(require("./index"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const program = require('commander');

/**
 * seven commands
 *    - config
 *    - init
 */
let actionMap = {
  init: {
    // 拉取远程数据模板文件夹
    description: 'generate a new project from a template',
    usages: ['seven init templateName projectName'],
    // 用法
    alias: 'i'
  },
  config: {
    // 对配置文件里面的内容进行增删查改
    alias: 'cfg',
    description: 'config .sevenrc',
    usages: ['seven config set <k> <v>', 'seven config get <k>', 'seven config remove <k>']
  } //other commands

}; // 添加 init / config 命令

Object.keys(actionMap).forEach(key => {
  program.command(key).description(actionMap[key].description).alias(actionMap[key].alias).action(() => {
    // 在这个函数里面进行处理
    switch (key) {
      case 'config':
        //配置
        (0, _index.default)(key, ...process.argv.slice(3)); // process.argv 输入命令转换的数组 argv[0]是命令的路径，argv[1]开始是输入的命令

        break;

      case 'init':
        (0, _index.default)(key, ...process.argv.slice(3));
        break;

      default:
        break;
    }
  });
}); // 将用法打印出来

function help() {
  console.log('\r\nUsage:');
  Object.keys(actionMap).forEach(action => {
    actionMap[action].usages.forEach(usage => {
      console.log('  - ' + usage);
    });
  }); // console.log('\r')
}

program.usage('<command> [options]'); // 在使用-h的时候会显示到第一行

program.on('-h', help);
program.on('--help', help); // 最新版本的 commander parse之后的代码就不会执行了

program.version(_constants.VERSION, '-V --version').parse(process.argv); // parse(process.argv) 触发commands
// 不带参数时

if (!process.argv.slice(2).length) {
  program.outputHelp(make_green);
}

function make_green(txt) {
  return _chalk.default.green(txt);
}