打包的时候我们会在命令行执行以下打包命令：

```js
webpack --config webpack.config.js
```
该命令在webpack-cli中相当于执行以下代码：
// 使用，这里模仿webpack-cli中的代码，相当于在命令行里输入webpack。
```js
const options = require("./webpack.config.js");
const compiler = webpack(options);
compiler.run();
```

简单解释：加载webpack配置文件，传给webpack，webpack文件返回一个编译器compiler，运行编译器。
so，我们先来看看webpack入口---webpack.js做了什么事情？
一 .webpack.js
下面这段代码是webpack.js的主要部分：
```js
const webpack = (options, callback) => {
	...
    // 用我们自定义的配置覆盖webpack默认的配置 返回综合配置
    options = new WebpackOptionsDefaulter().process(options);
    // 将代码入口传入编译器，实例化编译器
    compiler = new Compiler(options.context);
    // Node环境插件 挂载在编译器的钩子上
    new NodeEnvironmentPlugin({...}).apply(compiler);
    // 自定义插件 挂载在编译器的钩子上
    options.plugin.apply(compiler);
   ...
    // 将webpack配置的其他属性所用到的插件，都挂载在compiler上
    compiler.options = new WebpackOptionsApply().process(options, compiler);
	...
	return compiler;
}```

在这里解释几件事情：

webpack4.0可以实现零配置，没有用户配置的情况下，它会采用默认的配置将src文件夹下的index.js打包到dist文件夹下的main.js中（其他很多默认配置不赘述）。
new Compiler(options.context)这句代码的意思是将当前文件夹的绝对路径传给编译器。
依次调用插件的apply方法，将插件挂载在compiler上，插件可以监听后续所有的事件节点。同时会向插件传入compiler实例的引用，便于插件通过compiler调用webpack提供的API。

插件举例：
```js
class NodeEnvironmentPlugin {
	apply(compiler) {
		compiler.inputFileSystem = new CachedInputFileSystem(
			new NodeJsInputFileSystem(),
			60000
		);
		//....
		compiler.hooks.beforeRun.tap("NodeEnvironmentPlugin", compiler => {
			if (compiler.inputFileSystem === inputFileSystem) inputFileSystem.purge();
		});
	}
}
module.exports = NodeEnvironmentPlugin;```

上图中，是node环境下的一个插件的代码核心。我们在解析文件(resolver)的时候，需要用到的文件系统就是这个插件实现的。插件在compiler的beforeRun钩子上挂载了自己的事件，在执行beforeRun事件时，将文件读取系统挂载在compiler上，使得compiler中的其他插件可以使用文件读取系统。
webpack.js主要做了几件事：

整合配置参数（用户配置和默认配置）
将node环境的插件和用户配置的插件挂载在compiler各个钩子上，使得各个插件可以在编译的不同阶段执行自己的逻辑。
返回compiler实例

接下来，开始执行compiler.run();操作：
二. compiler.js
webpack.js是做编译之前的准备工作，compiler.js是用来控制编译流程的，compilation.js文件是真正的编译核心。
compiler.run方法逻辑如下：
beforeRun钩子-->run钩子-->编译compile方法-->编译结束回调onCompiled
run方法核心代码如下：
```js
run(callback) {
	const onCompiled = (err, compilation) => {
		// 编译结束后的回调函数
		// 文件输出
	}
	...
    // 触发beforeRun钩子，增加文件存取的功能 
    this.hooks.beforeRun.callAsync(this, err => {
      // 触发run钩子，处理缓存的模块 减少编译的模块 加快编译速度
      this.hooks.run.callAsync(this, err => {
       ...
          this.compile(onCompiled);
    });
  }```

虽然各种钩子嵌套，表面上并没有做任何的操作，但其实各种插件已经在各种hooks上绑定了回调函数（比如在beforeRun事件时实现了文件读取功能,run事件处理缓存的模块），webpack实现了功能与实现的解耦，使得代码逻辑非常清晰。
接下来，核心主要是compile方法：
```js
compile(callback) {
    this.hooks.beforeCompile.callAsync(params, err => {
      // 编译
      this.hooks.compile.call(params);
      // newCompilation是webpack使用的编译器
      const compilation = this.newCompilation(params);
      // 正式启动编译 
      this.hooks.make.callAsync(compilation, err => {
      		...
        // 编译结束
        compilation.finish(err => {
          ...
          // 封装 执行优化的钩子 chunk构建和打包优化
          compilation.seal(err => {
            ...

            this.hooks.afterCompile.callAsync(compilation, err => {
            ...
            return callback(null, compilation);
            });
          });
        });
      });
    });
  }
}```

compile函数的逻辑如下：
beforeCompile钩子-->compile钩子-->实例化编译器compilation对象-->make钩子(转换模块)-->编译结束-->seal封装-->afterCompile钩子-->执行compile回调函数
compiler.js文件做的几件事：

启动编译。通过实例化编译对象compilation并传给make钩子，编译开始，真正的核心编译工作是由compilation对象做的。
管理输出。编译结束后会执行onCompiled这个回调函数，整理输出数据。
通过钩子控制整个编译流程。
