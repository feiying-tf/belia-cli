"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULTS = exports.RC = exports.VERSION = void 0;

var _package = require("../../package.json");

const VERSION = _package.version; // 用户的根目录

exports.VERSION = VERSION;
const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']; // 配置文件目录

const RC = `${HOME}/.beliarc`; // 默认配置

exports.RC = RC;
const DEFAULTS = {
  registry: 'tfeng-use'
};
exports.DEFAULTS = DEFAULTS;