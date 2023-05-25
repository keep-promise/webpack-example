## Webpack打包原理
```js
(function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports// 开始加载模块
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
```

## mode: none
```js
// webpack运行函数参数为数组，数组中元素为函数，函数主体是模块
/* 0 */
(function(module, __webpack_exports__, __webpack_require__) {
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  __webpack_require__.d(__webpack_exports__, "render", function() { return render; }); // 导出模块
  var _a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
  function render() {
    document.write(`<div>${Object(_a__WEBPACK_IMPORTED_MODULE_0__["add"])('hello', ' world')}</div>`)
  }
}),
/* 1 */
(function(module, __webpack_exports__, __webpack_require__) {
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
  function add(a, b) {
    return a + b;
  }
})
```

## mode: development
```js
// webpack运行函数参数为对象，key是模块路径，value是执行函数，内容是模块

{

  "./a.js":
    (function(module, __webpack_exports__, __webpack_require__) {

    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"add\", function() { return add; });\n\nfunction add(a, b) {\n  return a + b;\n}\n\n//# sourceURL=webpack:///./a.js?");
    }),

  "./index.js":
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony import */ var _a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./a */ \"./a.js\");\n\n\n\nfunction render() {\n  document.write(`<div>${Object(_a__WEBPACK_IMPORTED_MODULE_0__[\"add\"])('hello', ' world')}</div>`)\n}\n\n\n\n//# sourceURL=webpack:///./index.js?");
    })
};

```

## webpack之library/libraryTarget
简介
------------------------------------------------------------
webpack 的 output.libraryTarget 有多种参数，每种参数都会影响最终编译后的文件。笔者在下文中，将结合实际编译完成后的文件，介绍 libraryTarget 对源代码的实际影响。


webpack 官方文档将 libraryTarget 主要分为三类：

1.  Expose a Variable: 暴露为一个变量
2.  Expose Via Object Assignment: 通过对象属性暴露
3.  Module Definition Systems: 模块定义系统



首先我们将 webpack 编译后的文件进行简化，去除模块系统相关的逻辑，只保留最终导出的结果和赋值语句，最后的代码如下：

```js
// webpack编译后的文件：dist/bundle.js
// 构建模块函数
(function(modules) {
  function __webpack_require__(moduleId){
    // ...
  }
  return __webpack_require__(__webpack_require__.s = 0);
})([
  function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    // 模块1
  },
  function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    // 模块2
  }
])
```

第一类：暴露为一个变量
---------------------------------------------------------------------

### 一、libraryTarget: “var”

webpack 配置：
```js
// library，赋值操作，赋值给 library 定义的变量，
// 如果没有配置，其他文件没法引用该对象
library: 'a', // 可选

libraryTarget: 'var',
```

编译后的文件如下所示：
```js
var a=
(function(modules) {
  function __webpack_require__(moduleId){
    // ...
  }
  return __webpack_require__(__webpack_require__.s = 0);
})([
  function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    // 模块1
  },
  function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    // 模块2
  }
])
```

### 二、libraryTarget: “assign”

webpack 配置：
```
library: 'a', // 必填，不填会出现语法错误

libraryTarget: 'assign',
```

```js
a=
(function(modules) {
  //...
  return __webpack_require__(__webpack_require__.s = 0);
})([
  //..
])
```

特点：

1.  赋值给全局变量， 可能会覆盖宿主环境下的同名属性值。

第二类：通过对象属性暴露
----------------------------------------------------------------------

### 一、libraryTarget: “this”

webpack 配置：
```js
library: 'a'
libraryTarget: 'this',
```

1. 不加library: 'a'，则将所有属性 mixin 到 this 上

```js
(function(e, a) { 
  for(var i in a) 
  e[i] = a[i]; 
}(this, (function(modules) {
    //...
    return __webpack_require__(__webpack_require__.s = 0);
  })([
    //..
  ])
)
```

2. 加library:a，则将对象挂载到 this\[library\]字段上
```js
this["a"] = (function(modules) {
  //...
  return __webpack_require__(__webpack_require__.s = 0);
})([
  //..
])
```

### 二、libraryTarget: “window”

逻辑同 this，只是将 this 替换成 window

### 三、libraryTarget: “global”

逻辑同 this，只是将 this 替换成 global（由于 webpack 默认 target 为"web"，所以默认即使设置 libraryTarget 为 global，最终的挂载对象仍然是 window。需要先将 libraryTarget 改为"node"，才能使得挂载对象为 global)


### 四、libraryTarget: “commonjs”

逻辑同 this，只是将 this 替换成 exports

第三类：更符合模块定义系统
-----------------------------------------------------------------------
### 一、libraryTarget：“commonjs2”

webpack 配置：
```js
library: 'a', // 无效果
libraryTarget: 'commonjs2',
```

```js
module.exports = (function(modules) {
  //...
  return __webpack_require__(__webpack_require__.s = 0);
})([
  //..
])

```
特点：

1.  符合 commonjs 规范
2.  加了 library 没有效果


### 二、libraryTarget：“amd”

webpack 配置：

```js
library: 'a',
libraryTarget: 'amd',
```

加了 library: 'a'
```js
define("a", [], (function(modules) {
  //...
  return __webpack_require__(__webpack_require__.s = 0);
})([
  //..
]))
```
不加了 library: 'a'
```js
define((function(modules) {
  //...
  return __webpack_require__(__webpack_require__.s = 0);
})([
  //..
]))
```
特点：
1.  符合 amd 规范
2.  加了 library，会改为定义 library 模块

### 三、libraryTarget：“umd”

webpack 配置：

```js
library: 'a',
libraryTarget: 'umd',
```

不加library: 'a'
```js
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function () {
  (function(modules) {
    //...
    return __webpack_require__(__webpack_require__.s = 0);
  })([
    //..
  ])
})

```

加library: 'a'
```js
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["a"] = factory();
	else
		root["a"] = factory();
})(window, function() {
  (function(modules) {
    //...
    return __webpack_require__(__webpack_require__.s = 0);
  })([
    //..
  ])
})
```


特点：

1.  定义了兼容各种模块的执行函数
2.  不加 library，则将所有属性 mixin 到导出模块上
3.  加 library，则将对象挂载到导出模块的 library 字段上

注意：  
同之前的 libraryTarget: "global"一样，需要将 libraryTarget 改为 node，编译后的 window 才会被改为 global