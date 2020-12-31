"use strict";

var _rc = require("./utils/rc");

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 管理 .eosrc 文件 (当前用户目录下)
let config = async (action, key, value) => {
  switch (action) {
    case 'get':
      if (key) {
        let result = await (0, _rc.get)(key);
        console.log(result);
      } else {
        let obj = await (0, _rc.getAll)();
        Object.keys(obj).forEach(key => {
          console.log(`${key}:`, _chalk.default.green(obj[key]));
        });
      }

      break;

    case 'set':
      (0, _rc.set)(key, value);
      break;

    case 'remove':
      (0, _rc.remove)(key);
      break;

    default:
      break;
  }
};

module.exports = config;