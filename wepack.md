一、前言
----

相信很多人在学习前端过程中，都接触过_webpack_。但可能在创建前端项目时，都只是用**脚手架vue-cli**的初始化命令跑一下，将webpack当成一个**黑盒**使用，刚开始我也是这样，但是虽然一切配置都能通过脚手架自动完成，我们不用学会如何手动去配置，但是我们也至少应该知道，**webpack每条配置的作用**。

今天，我就在这里分享一下——webpack常见配置及其作用。（不涉及webpack的深层原理，适合小白阅读）

_以下部分图片资源来源于网络，如有侵权，请联系我删除！_

在介绍webpack之前，我们先来了解一下什么是**前端工程化，**从而引入webpack产生的原因

大家可能会以为前端开发**仅仅只是**

> ⚫掌握HTML、CSS、JS  
> ⚫能够使用JQuery操作DOM并发起ajax请求  
> ⚫在美化页面样式时，导入bootstrap  
> ⚫实现网页布局时，导入Layui

### 二、前端工程化

**概念**：

在企业级的前端项目开发中，把前端开发所需的工具、技术、流程、经验等进行**规范化**、 **标准化。**

具体遵循以下四个“**现代化**”准则

> ⚫ 模块化（js 的模块化、css 的模块化、资源的模块化）  
> ⚫ 组件化（复用现有的 UI 结构、样式、行为）  
> ⚫ 规范化（目录结构的划分、编码规范化、接口规范化、文档规范化、 Git 分支管理）  
> ⚫ 自动化（自动化构建、自动部署、自动化测试）

*   **模块化**：对 js、css的**功能**，对静态资源的**类型**做**模块化拆分**，比如当你用node写接口时，单独把api接口的相关代码抽出来写在一个js文件里
*   **组件化**：如bootstrap、layui提供的按钮、导航栏等，都是可以直接拿来**复用**的组件
*   **规范化：**在构建目录结构、编写代码、接口等所要遵循的**一些规则**
*   **自动化：**像热部署、通过git自动发布我们新改动创建的代码等

如果做不到上述这四个“**现代化**”，那我们平时感觉在写的项目，其实都只是demo。

那么我们在开发时，有没有什么工具能**帮助**我们做到前端工程化呢？

三、webpack
---------

### 1、官方概念：

> _webpack_是一个现代 JavaScript 应用程序的_**静态模块打包器**(module bundler)_

实际上，它是目前主流的前端工程化的**解决方案。**

### 2、功能：

> 提供了友好的前端模块化开发支持，以及**代码压缩混淆**、处理不同浏览器端 JavaScript 的**兼容性**、**性**  
> **能优化**等强大的功能。

**代码压缩**能够提高我们程序的运行速度；

**解决了兼容性问题**，我们就能没有后顾之忧的在项目中写js的高级代码（如ES6）。

这就能让我们开发时只用把重心放到**具体功能的实现**上，提高了前端**开发效率**和**项目的可维护性。**

### **3、webpack的安装（需要在npm包管理器环境）**

> 新建项目空白目录，并运行 npm init –y 命令，初始化**包管理配置文件** package.json  
> 新建 src 源代码目录  
> 新建 src -> index.html 首页和 src -> index.js 脚本文件  
> 在项目**根目录终端**运行如下的命令，安装 webpack 相关的两个包：  
> npm install **webpack**@5.42.1 **webpack-cli**@4.7.2 -D

### 4、常用配置和基本使用

**4.1 在项目中配置 webpack**

> ① 在项目根目录中，创建名为 **webpack.config.js** 的 webpack 配置文件，并初始化如下的基本配置：

```
// 使用 Node.js 中的导出语法，向外导出一个 webpack 的配置对象
module.exports = {
  mode: 'development' //mode 用来指定构建模式。可选有development和production
}

```

webpack.config.js 是 **webpack 的配置文件**。webpack 在开始打包构建之前，会先**读取这个配置文件**，

并基于我们在配置文件中给定的配置，对项目进行**打包，**并生成dist文件夹，存储打包后的项目文件。

注意：由于 webpack 是**基于 node.js** 开发出来的打包工具，因此在它的配置文件中，支持使用 node.js 相关

的语法和模块进行 webpack 的个性化配置。

> ② 在 **package.json** 的 **scripts** 节点下，新增 dev 脚本如下：

```
"scripts": {
    "dev": "webpack",//scripts下的脚本可以通过npm run运行，如npm run dev，实际上是执行npm run webpack serve
    "build": "webpack --mode production"
  },
```

> ③ 在终端中运行 **npm run dev** 命令，启动 webpack 进行项目的**打包构建**

**4.2 mode 的可选值**

mode 节点的可选值有两个，分别是：

① **development**

⚫ 开发环境

⚫ 不会对打包生成的文件进行代码压缩和性能优化

⚫ **打包速度快，适合在开发阶段使用**

② **production**

⚫ 生产环境

⚫ 会对打包生成的文件进行代码压缩和性能优化

⚫ **打包速度很慢，仅适合在项目发布阶段使用**

### **4.3 webpack 中的默认约定**

在 webpack 4.x 和 5.x 的版本中，有如下的默认约定：

> ① 默认的**打包入口**文件为 src -> index.js  
> ② 默认的**输出文件路径**为 dist -> main.js  
> 注意：可以在 webpack.config.js 中修改打包的默认约定

因此，在运行npm run dev后，系统会默认将src -> index.js文件，打包输出到dis -> main.js

**疑问**：那项目中其他的文件如css、less、jpg文件怎么被打包输出呢？（提前预告下文的loader知识点）

**回答：**webpack只能解析.js文件，这些类型文件需要对应的**loader加载器**来解析并打包，生成文件的路径可以自己配置

下面, 我们在 webpack.config.js 配置文件中，通过 **entry 节点**指定打包的入口。通过 **output 节点**指定打包的出口。

```
// entry: '指定要处理哪个文件'
  entry: path.join(__dirname, './src/index.js'),
  // 指定生成的文件要存放到哪里
  output: {
    // 存放的目录
    path: path.join(__dirname, 'dist'),
    // 生成的文件名
    filename: 'js/bundle.js'
  },

```

这样就能让系统将src->index.js,打包输出到dis -> js -> bundle.js

另外，应在 src文件夹下的 index.html 源代码中导入 dist 文件下的打包好的js文件，打包后的bundle.js文件会**解析转换index.js文件下的内容**，使得任何版本的浏览器都能兼容。

（先别动手，使用下面的webpack-dev-server插件后，就不用导入了）

```
<script src="../dist/bundle.js"></script>

```

**痛点**：但是，这也导致了我们每次对 index.js 文件进行修改，都需要npm run dev，来更新bundle.js文件内容。

### 五、webpack插件的使用

**① webpack-dev-server**

> ⚫ 类似于 node.js 阶段用到的 nodemon 工具  
> ⚫ 每当修改了源代码，webpack 会**自动进行项目的打包和构建**

webpack-dev-server 可以让 webpack **监听项目源代码的变化**，从而进行**自动打包构建**

**安装**：

```
npm install webpack-dev-server@3.11.2 -D
```

**配置**：

> 修改 package.json -> **scripts** 中的 dev 命令如下：

```
"scripts": {
    "dev": "webpack serve",
  },

```

> ② 再次运行 npm run dev 命令，重新进行项目的打包  
> ③ 在浏览器中访问 http://localhost:8080 地址，查看自动打包效果

此时，运行命令后，每次修改源代码，都会在**内存**自动构建生成新的bundle.js文件，进行**实时打包**

但是运行命令后，webpack-dev-server 会启动一个实时打包的 http 服务器 http://localhost:8080，打开网址后，会呈现我们**项目的根目录结构**（下面会说明如何配置更改网址）

![](https://pic2.zhimg.com/v2-1e68b16d9a0c76481728b1efcc9058ed_r.jpg)

点开src，便自动展现了index.html页面（系统会默认打开index.html文件），我们对源代码的任何更改效果都会呈现在上面。

而打包实时生成的bundle.js，保存在我们电脑的内存当中，可以通过**http://localhost:8080/bundle.js**来访问。

> ① 不配置 webpack-dev-server 的情况下，webpack 打包生成的bundle.js文件，会存放到**实际的物理磁盘**上  
> ⚫ 严格遵守开发者在 webpack.config.js 中指定配置  
> ⚫ 根据 **output 节点指定路径**进行存放  
> ② 配置了 webpack-dev-server 之后，打包生成的bundle.js文件存放到了**内存**中  
> ⚫ 不再根据 output 节点指定的路径，存放到实际的物理磁盘上  
> ⚫ 提高了实时打包输出的性能，**因为内存比物理磁盘速度快很多**

我们index.html的源代码页面上，也会**隐式**导入生成在内存的bundle.js文件。

```
<script src="/bundle.js"></script>//源代码页面上看不到,但是在网页上用"检查"可以看到

```

**痛点: 打开http://localhost:8080后不能直接展现我们index.js页面效果, 必须要点开src才行**

**疑问: 如何修改http服务器地址?**

**解决:**

1、使用html-webpack-plugin插件来复制index.html文件到项目根目录

2、配置**devServer**属性

**② html-webpack-plugin**

⚫ webpack 中的 HTML 插件（类似于一个**模板引擎插件**）

⚫ 可以通过此插件自定制 index.html 页面的内容

**思路**：通过 html-webpack-plugin 插件，将 src 目录下的 index.html 首页，**复制**一份到项目根目录中

**安装:**

```
npm install html-webpack-plugin@5.3.2 -D
```

**配置**:

在webpack.config.js文件中配置 **html-webpack-plugin**插件 和 **devServer**属性

```
// 1. 导入 html-webpack-plugin 这个插件，得到插件的构造函数
const HtmlPlugin = require('html-webpack-plugin')
// 2. new 构造函数，创建插件的实例对象
const htmlPlugin = new HtmlPlugin({
  // 指定要复制哪个页面
  template: './src/index.html',
  // 指定复制出来的文件名和存放路径
  filename: './index.html'//存放在内存中
})

module.exports = {
plugins: [htmlPlugin],
  devServer: {
    // 首次打包成功后，自动打开浏览器
    open: true,
    // 在 http 协议中，如果端口号是 80，则可以被省略
    port: 80,
    // 指定运行的主机地址
    host: '127.0.0.1'
  },
}
```

此时, 运行服务器后, **服务器网址会自动打开**,呈现index.html页面效果

注意: 复制的index.html文件存放在内存中, 且与源文件**不是同一个文件**, 复制的index.html生成后, 系统也会**自动给它注入内存中实时构建的bundle.js文件**

### **六、loader加载器**

### **1、概述：**

> 在实际开发过程中，webpack 默认只能打包处理以 **.js 后缀名结尾**的模块。其他非 .js 后缀名结尾的模块，  
> webpack 默认处理不了，**需要调用 loader 加载器才可以正常打包**，否则会报错！

### 2、作用

协助 webpack **打包处理特定的文件模块**

> 比如：  
> ⚫ css-loader 可以打包处理 .css 相关的文件  
> ⚫ less-loader 可以打包处理 .less 相关的文件  
> ⚫ babel-loader 可以打包处理 webpack 无法处理的高级 JS 语法

### 3、配置使用

下面挂一下loader加载器的工作流程图

![](https://pic2.zhimg.com/v2-c1add9db60723c57acd9fe662ea64fa5_r.jpg)

![](https://pic4.zhimg.com/v2-2e74a8d3369b5cbbe4f790ccd62b6fab_r.jpg)

### 4、常见配置代码：

```
module: {
    rules: [
      // 定义了不同模块对应的 loader

      { test: /\.css$/, use: ['style-loader', 'css-loader'] },

      // 处理 .less 文件的 loader
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },

      // 处理图片文件的 loader
      // 如果需要调用的 loader 只有一个，则只传递一个字符串也行，如果有多个loader，则必须指定数组

      // 打包处理样式表中与 url 路径相关的文件
      // 需要预先安装模块 npm i url-loader@4.1.1 file-loader@6.2.0 -D
      // 在配置 url-loader 的时候，多个参数之间，使用 & 符号进行分隔
      { test: /\.jpg|png|gif$/, use: 'url-loader?limit=470&outputPath=images' },

      // 使用 babel-loader 处理高级的 JS 语法
      // 在配置 babel-loader 的时候，一定要排除 node_modules 目录中的 JS 文件
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  },
```

### **5、babel-loader**

webpack 只能打包处理一部分高级的 JavaScript 语法。对于那些 webpack **无法处理的高级 js 语法**，需要借

助于 **babel-loader 进行打包处理**。

**安装**：

```
npm i babel-loader@8.2.2 @babel/core@7.14.6 @babel/plugin-proposal-decorators@7.14.5 -D
```

**配置**：

在项目根目录下，创建名为 **babel.config.js** 的配置文件，定义 Babel 的配置项如下：

```
module.exports = {
  // 声明 babel 可用的插件
  // 将来，webpack 在调用 babel-loader 的时候，会先加载 plugins 插件来使用
  plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]]
}
```

在 webpack.config.js 的 module -> **rules** 数组中，添加 loader 规则如下：

```
module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  },
```

### 七、打包发布

**1\. 为什么要打包发布**

> 项目开发完成之后，需要使用 webpack 对项目进行打包发布，主要原因有以下两点：  
> ① 开发环境下，打包生成的文件存**放于内存中**，无法获取到最终打包生成的文件  
> ② 开发环境下，打包生成的文件**不会进行代码压缩和性能优化**  
> 为了让项目能够在生产环境中高性能的运行，因此需要对项目进行打包发布。

**2\. 配置 webpack 的打包发布**

在 package.json 文件的 scripts 节点下，新增 **build** 命令如下：

```
"scripts": {
    "dev": "webpack serve",
    "build": "webpack --mode production"
  },
```

\--model 是一个参数项，用来**指定 webpack 的运行模式**。production 代表生产环境，会对打包生成的文件

进行代码压缩和性能优化。

注意：通过 --model 指定的参数项，会**覆盖** webpack.config.js 中的 model 选项。

### 3\. 打包后生成的dist文件夹结构配置

我们的项目中包含**图片资源、js文件、css文件**等等类型，我们需要进行配置，告诉系统每种类型文件的生成路径。

![](data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='324' height='128'></svg>)

**把 JavaScript 文件统一生成到 js 目录中**

在 webpack.config.js 配置文件的 output 节点中，进行如下的配置：

![](https://pic1.zhimg.com/v2-75a6e7e1e66b45a2a26df59f0207b910_r.jpg)

**把图片文件统一生成到 image 目录中**

修改 webpack.config.js 中的 **url-loader 配置项**，新增 **outputPath** 选项即可指定图片文件的输出路径：

![](https://pic4.zhimg.com/v2-890dc5a25550cceff787ec6d05081087_r.jpg)

**5\. 自动清理 dist 目录下的旧文件**

为了在每次打包发布时**自动清理掉 dist 目录中的旧文件**，可以安装并在webpack.config.js文件中配置 clean-webpack-plugin 插件：

![](https://pic3.zhimg.com/v2-bd091ca85cb1cc39f3bebaae692b16ea_r.jpg)

**八、Source Map**
----------------

**概念：**

> Source Map 就是一个**信息文件**，里面储存着**代码的位置信息**。也就是说，Source Map 文件中存储着**压缩混淆**后的代码，所对应的**转换前的位置**。  
> 有了它，出错的时候，除错工具将直接**显示原始代码所在位置**，而不是转换后的代码位置，能够极大的**方便后期的调试**

**原始代码大赏：**

![](https://pic1.zhimg.com/v2-1b9481f373d507eb40a0058778a44350_r.jpg)

> ⚫ 变量被替换成没有任何语义的名称  
> ⚫ 空行和注释被剔除

如何除错？Source Map！

### **开发环境下**

在开发环境下，webpack 默认启用了 Source Map 功能。当程序运行出错时，可以直接在控制台提示错误行

的位置，并**定位到具体的源代码。**

**问题**：开发环境下默认生成的 Source Map，记录的是**生成后的代码的位置**。会导致运行时报错的行数与源代码的行数不一致的问题。示意图如下：

![](https://pic4.zhimg.com/v2-a9ca4d678f680031f087ef5839767383_r.jpg)

![](data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='354' height='99'></svg>)

**解决**：在 webpack.config.js 中添加如下的配置

![](https://pic4.zhimg.com/v2-af378adf5184ee6a3c5320dfb66e5053_r.jpg)

### 生成环境下

如果生产环境下，使用Source Map，不可排除不法分子会利用它来“借鉴”你的源码。

此时可以将 devtool 的值设置为 **nosources-source-map**。实际效果如图所示：

![](https://pic4.zhimg.com/v2-6d9e5dc369b0f89a70a6c14b762bce13_r.jpg)

![](https://pic4.zhimg.com/v2-eb5d2a10164916728cc3d036e4a0fa93_r.jpg)

因此，对于Source Map

> ① 开发环境下：  
> ⚫ 建议把 devtool 的值设置为 **eval-source-map**  
> ⚫ 好处：可以精准定位到具体的错误行  
> ② 生产环境下：  
> ⚫ 建议关闭 Source Map 或将 devtool 的值设置为 **nosources-source-map**  
> ⚫ 好处：防止源码泄露，提高网站的安全性

八、总结
----

认真看完后，是不是对**常用的配置和插件的概念和作用**有了大致的了解呢？我在下面给你们总结了本篇文章的主要内容：

> ① **webpack** 的基本使用  
> ⚫ 安装、webpack.config.js、修改打包入口  
> ② **plugin** 的基本使用  
> ⚫ webpack-dev-server、html-webpack-plugin  
> ③ **loader** 的基本使用  
> ⚫ loader 的作用、loader 的调用过程  
> ④ **Source Map** 的作用  
> ⚫ 精准定位到错误行并显示对应的源码  
> ⚫ 方便开发者调试源码中的错误

完结撒花~新人“出道”不易，希望大家可以喜欢+收藏哦！

如果上述分享有不妥之处，欢迎大家在**评论区斧正**！

之后我还会陆续更新整理**算法心得**和**前后端技术**的文章，**欢迎大家关注赞同支持**~

  

本文转自 [https://zhuanlan.zhihu.com/p/463523330](https://zhuanlan.zhihu.com/p/463523330)，如有侵权，请联系删除。
