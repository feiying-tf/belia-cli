"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.set = exports.getAll = exports.get = void 0;

var _constants = require("../../dist/utils/constants");

var _ini = require("ini");

var _util = require("util");

var _chalk = _interopRequireDefault(require("chalk"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const access = (0, _util.promisify)(_fs.default.access); // promise化，查看文件是否存在

const readFile = (0, _util.promisify)(_fs.default.readFile); // 读文件

const writeFile = (0, _util.promisify)(_fs.default.writeFile); // 写文件
//RC 是配置文件
//DEFAULTS 是默认的配置

const get = async key => {
  const exit = await access(_constants.RC, _fs.default.constants.F_OK).then(() => {
    return true;
  }).catch(() => {
    return false;
  }); // 查看配置文件是否存在，避免文件不存在造成的报错，这个加上then、catch

  console.log('exit', exit);
  let opts;

  if (exit) {
    // 如果存在，读取里面的内容并且返回对应的key
    opts = await readFile(_constants.RC, 'utf8');
    opts = (0, _ini.decode)(opts); // 解密

    return opts[key];
  }

  return '';
}; // 返回所有配置


exports.get = get;

const getAll = async () => {
  const exit = await access(_constants.RC, _fs.default.constants.F_OK).then(() => {
    return true;
  }).catch(() => {
    return false;
  });
  let opts;

  if (exit) {
    opts = await readFile(_constants.RC, 'utf8');
    opts = (0, _ini.decode)(opts);
    return opts;
  }

  return { ..._constants.DEFAULTS
  };
}; // 设置属性


exports.getAll = getAll;

const set = async (key, value) => {
  const exit = await access(_constants.RC, _fs.default.constants.F_OK).then(() => {
    return true;
  }).catch(() => {
    return false;
  });
  let opts;

  if (exit) {
    opts = await readFile(_constants.RC, 'utf8');
    opts = (0, _ini.decode)(opts);

    if (!key) {
      console.log(_chalk.default.red(_chalk.default.bold('Error:')), _chalk.default.red('key is required')); // 打印有颜色的提示

      return;
    }

    if (!value) {
      console.log(_chalk.default.red(_chalk.default.bold('Error:')), _chalk.default.red('value is required'));
      return;
    }

    Object.assign(opts, {
      [key]: value
    });
  } else {
    opts = Object.assign(_constants.DEFAULTS, {
      [key]: value
    });
  }

  await writeFile(_constants.RC, (0, _ini.encode)(opts), 'utf8'); // 将组合后的opts重新写入RC
}; // 移除属性


exports.set = set;

const remove = async key => {
  const exit = await exits(_constants.RC);
  let opts;

  if (exit) {
    opts = await readFile(_constants.RC, 'utf8');
    opts = (0, _ini.decode)(opts);
    delete opts[key];
    await writeFile(_constants.RC, (0, _ini.encode)(opts), 'utf8');
  }
};

exports.remove = remove;