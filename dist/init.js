"use strict";

var _get = require("./utils/get");

var _ora = _interopRequireDefault(require("ora"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _fs = _interopRequireDefault(require("fs"));

var _chalk = _interopRequireDefault(require("chalk"));

var _logSymbols = _interopRequireDefault(require("log-symbols"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 显示loading动画
// 交互式命令行工具
let init = async (templateName, projectName) => {
  //项目不存在
  if (!_fs.default.existsSync(projectName)) {
    //命令行交互
    _inquirer.default.prompt([{
      name: 'description',
      message: 'Please enter the project description: '
    }, {
      name: 'author',
      message: 'Please enter the author name: '
    }]).then(async answer => {
      //下载模板 选择模板
      //通过配置文件，获取模板信息
      let loading = (0, _ora.default)('downloading template ...');
      loading.start(); // 开始显示loading

      (0, _get.downloadLocal)(templateName, projectName).then(() => {
        loading.succeed(); // 显示√

        const fileName = `${projectName}/package.json`;

        if (_fs.default.existsSync(fileName)) {
          const data = _fs.default.readFileSync(fileName).toString();

          let json = JSON.parse(data); // 读出 package.json
          // 修改json中的name、author、description

          json.name = projectName;
          json.author = answer.author;
          json.description = answer.description; //修改项目文件夹中 package.json 文件

          _fs.default.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');

          console.log(_logSymbols.default.success, _chalk.default.green('Project initialization finished!'));
        }
      }, () => {
        loading.fail(); // 显示×
      });
    });
  } else {
    //项目已经存在
    console.log(_logSymbols.default.error, _chalk.default.red('The project already exists'));
  }
};

module.exports = init;