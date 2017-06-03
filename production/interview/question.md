## interview question

### 从输入url到输出页面, 经历了哪些过程

**[从输入 URL 到页面加载完成的过程中都发生了什么事情][ulr-happen]**

#### 1. 从输入 URL 到浏览器接收的过程中发生了什么事情？

1. 从触屏/键盘到 CPU
2. CPU 内部的处理
3. 从 CPU 到操作系统内核
4. 从操作系统 GUI 到浏览器

#### 2. 浏览器如何向网卡发送数据？

1. 从浏览器到浏览器内核 
  * TCP 链接甚至渲染
  * 回车 URL 进行检查, 首先判断协议, 如果是 http 就按照 Web 来处理, 进行安全检查, 然后直接调用浏览器内核中的对应方法, 比如 WebView 中的 loadUrl 方法
  * 浏览器指的是 Chrome、Firefox，而浏览器内核则是 Blink、Gecko，浏览器内核只负责渲染，GUI 及网络连接等跨平台工作则是浏览器实现的
2. HTTP 请求的发送
3. DNS 查询 (dig +trace test.yhtml5.com)
  * 本机所设置的 DNS 服务器(8.8.8.8)向 DNS 根节点查询负责 .com 区域的域务器
  * 通过其中一个负责 .com 的服务器查询负责 baidu.com 的服务器
  * 最后由其中一个 baidu.com 的域名服务器查询 fex.baidu.com 域名的地址
4. 通过 Socket 发送数据
  * HTTP 常用的是 TCP 协议 (TCP 协议需要保证顺序)
  * HTTP 请求是纯文本格式的，所以在 TCP 的数据段中可以直接分析 HTTP 的文本

#### 3. 数据如何从本机网卡发送到服务器？

1. 从内核到网络适配器(Network Interface Card)
2. 连接 Wi-Fi 路由 / 移动蜂窝网络
3. OSI 七层网络结构 
4. 运营商网络内的路由-主干网间的传输-IDC 内网
5. 服务器 CPU 

#### 4. 服务器接收到数据后会进行哪些处理？

1. 负载均衡
2. 反向代理
  * 根据请求的域名不同, 将请求转发到内部的其它端口
  * 进行很多统一处理，比如防攻击策略、防抓取、SSL、gzip、自动性能优化等
  * 应用层的分流策略都能在这里做，比如对 /xx 路径的请求分到 a 服务器，对 /yy 路径的请求分到 b 服务器，或者按照 cookie 进行小流量测试等
  * 缓存，并在后端服务挂掉的时候显示友好的 404 页面
  * 监控后端服务是否异常
3. Web Server 中的处理 (Node.JS)
4. node js, 监听端口, 根据参数不同, 查询数据库, 处理业务逻辑, 缓存, 返回操作结果

#### 5. 服务器返回数据后浏览器如何处理？

1. gzip 解压
2. 外链资源的加载
3. JavaScript 的执行
4. 从字符到图片

#### 6. 浏览器如何将页面展现出来？

1. Framebuffer
2. 从内存到 LCD
3. LCD 显示

### 浏览器如何工作

**[how browsers work][how-browsers-work]**

#### 浏览器的高层结构

1. 用户界面 - 包括地址栏、前进/后退按钮、书签菜单等。除了浏览器主窗口显示的您请求的页面外，其他显示的各个部分都属于用户界面。
2. 浏览器引擎 - 在用户界面和呈现引擎之间传送指令。
3. 渲染引擎 - 负责显示请求的内容。如果请求的内容是 HTML，它就负责解析 HTML 和 CSS 内容，并将解析后的内容显示在屏幕上。
4. 网络 - 用于网络调用，比如 HTTP 请求。其接口与平台无关，并为所有平台提供底层实现。
5. 用户界面后端 - 用于绘制基本的窗口小部件，比如组合框和窗口。其公开了与平台无关的通用接口，而在底层使用操作系统的用户界面方法。
6. JavaScript 解释器。用于解析和执行 JavaScript 代码。
7. 数据存储。这是持久层。浏览器需要在硬盘上保存各种数据，例如 Cookie。新的 HTML 规范 (HTML5) 定义了“网络数据库”，这是一个完整（但是轻便）的浏览器内数据库。

#### 渲染引擎

Firefox,Chrome,Safari 等浏览器都基于两种呈现引擎构建的。Firefox 使用的是 Gecko，这是 Mozilla 公司“自制”的呈现引擎。而 Safari 和 Chrome 浏览器使用的都是 WebKit。

WebKit 是一种开放源代码呈现引擎，起初用于 Linux 平台，随后由 Apple 公司进行修改，从而支持苹果机和 Windows。有关详情，请参阅 webkit.org

##### 主流程

* **渲染**引擎从**网络层**获取请求文档的内容
* 渲染引擎将开始**解析** HTML 文档，并将各标记逐个转化成**“内容树”上的DOM 节点**。同时也会解析外部 CSS 文件以及样式元素中的样式数据。HTML 中这些带有视觉指令的样式信息将用于创建另一个树结构：**呈现树**。
* 呈现树包含多个带有视觉属性（如颜色和尺寸）的矩形。这些矩形的排列顺序就是它们将在屏幕上显示的顺序。
* 呈现树构建完毕之后，进入**“布局/重排”**处理阶段，也就是为每个节点分配一个应出现在屏幕上的确切坐标。
* 下一个阶段是绘制 - 呈现引擎会**遍历呈现树**，由用户界面后端层将每个节点绘制出来。
* 需要着重指出的是，这是一个**渐进的过程**。为达到更好的用户体验，呈现引擎会力求尽快将内容显示在屏幕上。它不必等到整个 HTML 文档解析完毕之后，就会开始构建呈现树和设置布局。在不断接收和处理来自网络的其余内容的同时，呈现引擎会将部分内容解析并显示出来。 

##### html解析

解析文档是指将文档转化成为有意义的结构，也就是可让代码理解和使用的结构。解析得到的结果通常是代表了文档结构的节点树，它称作解析树或者语法树

* 解析的过程可以分成两个子过程：词法分析和语法分析
* 词法分析是将输入内容分割成大量标记的过程
* 语法分析是应用语言的语法规则的过程
* HTML 解析器的任务是将 HTML 标记解析成解析树

##### DOM

* 解析器的输出“解析树”是由**DOM 元素**和**属性节点**构成的树结构。
* DOM 是文档对象模型 (Document Object Model) 的缩写。
* 它是 HTML 文档的对象表示，同时也是外部内容（例如 JavaScript 与 HTML 元素之间的**接口**。
* 解析树的根节点是“Document”对象。
* DOM 与标记之间几乎是一一对应的关系。
* HTML5 规范详细地描述了解析算法; 此算法由两个阶段组成：标记化和树构建
* 标记化算法, 树构建算法
* 浏览器的容错机制

##### CSS 解析

* 词法语法（词汇）是针对各个标记用正则表达式定义的

##### 处理脚本和样式表的顺序

**脚本**

网络的模型是同步的。网页作者希望解析器遇到 `<script>` 标记时立即解析并执行脚本。文档的解析将停止，直到脚本执行完毕。
如果脚本是外部的，那么解析过程会停止，直到从网络同步抓取资源完成后再继续。
此模型已经使用了多年，也在 HTML4 和 HTML5 规范中进行了指定。
作者也可以将脚本标注为“defer”，这样它就不会停止文档解析，而是等到解析结束才执行。
HTML5 增加了一个选项，可将脚本标记为异步，以便由其他线程解析和执行。 

**预解析**

**样式表**

##### 呈现树构建


### 跨域问题及其解决方式

**[同源策略与JS跨域][cross-domain]**

浏览器同源策略: 同域名,同端口,同协议
> 协议或者端口的不同，只能通过后台来解决

#### 同源策略的限制
1. Cookie、LocalStorage和IndexDB无法读取。
2. DOM无法获得。
3. AJAX请求不能发送。

#### 如何跨域
* document.domain 
 1. 两个域只是子域不同
 2. 只适用于iframe窗口与父窗口之间互相获取cookie和DOM节点，不能突破LocalStorage和IndexDB的限制。
* window.name
 1. window.name容量很大，可以放置非常长的字符串
 2. 必须监听子窗口window.name属性的变化，影响网页性能
* window.postMessage

#### ajax/fetch跨域

##### jsonp

先在网页上添加一个script标签，设置这个script标签的src属性用于向服务器请求JSON数据，
需要注意的是，src属性的查询字符串一定要加一个callback函数，用来指定回调函数的名字 。
而这个函数是在资源加载之前就已经在前端定义好的，这个函数接受一个参数并利用这个参数做一些事情。
向服务器请求后，服务器会将JSON数据放在一个指定名字的回调函数里作为其参数传回来。
这时，因为函数已经在前端定义好了，所以会直接调用。

**特点:**
 1. 可以是两个完全不同源的域
 2. 只支持HTTP请求中的GET方式
 3. 老式浏览器全部支持
 4. 需要服务端支持
 5. 协作上多了一层沟通

**例子:**
```
function addScriptTag(src) {
    var script = document.createElement('script')
    script.setAttribute("type","text/javascript")
    script.src = src
    document.body.appendChild(script)
}

window.onload = function () {
    addScriptTag('http://example.com/ip?callback=foo');//请求服务器数据并规定回调函数为foo
}

function foo(data) {
    console.log('Your public IP address is: ' + data.ip)
}

foo({
    "ip": "8.8.8.8"
});
```

##### 网络代理
可以在服务器端设置一个代理，由服务器端向跨域下的网站发出请求，再将请求结果返回给前端

```
$(document).ready(function(){
    $.getJSON("http://query.yahooapis.com/v1/public/yql?callback=?", { //yahoo提供的jsonp代理  
    q: "select * from json where url='www.cainiu.com/adminstock/appVersion/158/appVersions?page=1&rows=20'" ,
    format: "json" 
        }, function(data) {   
            if (data.query.results) {  
                var result = JSON.stringify(data.query.results); 
                var obj = eval('('+result+')'); 
                var rowsLen = obj.json.rows.length;
                
                for (var i=0; i < rowsLen; i++) {
                    var version=obj.json.rows[i].appDesc
                    var appDesc=obj.json.rows[i].appDesc.split('\r\n')
                    for(j=0;j<appDesc.length;j++){
                        $(".ol"+i).append("<li>"+appDesc[j]+"</li>")
                    }
                   $(".appVersion"+i).html("<h2>"+obj.json.rows[i].createDate.substring(0,10)+"</h2>"+"<br>"+"版本号："+obj.json.rows[i].appVersion)
                   //class循环                                                         访问json行里的变量，截取字符串长度  
                  }} else {   
                alert("未能获取到信息请稍候再试！");//或者写你的其他逻辑，比如重新加载啥的。
            }   
        });   
  });
```

##### 通过CORS跨域 (Cross-Origin Resource Sharing)

CORS (跨域资源共享)是一个系统, 包括传输的 HTTP headers, 
其确定是否阻止或完成从该资源所在的域外的另一个域的网页上的受限资源的请求,
同源安全策略( same-origin security policy)默认禁止“跨域”请求. 
CORS 给予Web服务器跨域访问控制, 启用安全的跨域数据传输

浏览器将CORS请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）

1. 请求方法是以下三种方法之一: HEAD/GET/POST
2. HTTP的头信息不超出以下几种字段：
  * Accept
  * Acept-Language
  * Content-Language
  * Last-Event-ID
  * Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
3. 预检请求, option请求

```
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
```


**特点:**
1. 可以是两个完全不同源的域
2. 支持所有类型的HTTP请求
3. 被绝大多数现代浏览器支持，老式浏览器不支持
4. 需要服务端支持

**note**
1. 注意过滤option请求

##### web sockets

##### 反向代理

可以在 反向代理服务器nginx 或 由nginx转发到内网服务器中处理(nodejs)

**特点:**
1. 告诉浏览器, 我是同源的
2. 向真正的api服务器请求数据, 并返回
3. 不需要改变目标源服务器配置
4. 不需要改变客户端的请求方式

总结: 

在有自己服务器做中间层情况下使用反向代理/CORS(跨域资源共享)
在无权改变目标服务器, 又没有自己服务器做中间层, 使用jsonp/网络代理等方式

### 前端性能优化相关问题

这是一个非常大的概念, 也是一个工程性问题

再谈优化之前我们先了解一下项目需求, 这是一个什么项目, 活动页? pc网站? 
然后进行技术选型 使用native, react, jquery等等组合

然后使用webpack等工具进行优化

优化的方向: 减少http请求/降低资源大小/缓存/代码规范

具体的优化措施有:

**构建工具webpack**
* 打包/压缩/合并/混淆  html/css/js 等资源
* 压缩jpg/png/gif图片资源, 使用雪碧图, 小图片合成大图片, 减少http请求
* 少用图片, 使用iconfont, svg
* 使用uglifyJs删除调试信息/未使用的函数/if(false)
* 打包策略: 按需打包/代码切割
* 加载策略: 异步加载/并线加载/预加载
* 缓存策略: 长久缓存公用代码/业务逻辑代码加上版本号,hash

**其它**
* 规范的客户端代码结构
* 减少dom操作,使用js(for循环/diff算法)
* 提取公共的资源,模块,函数,样式 / 内联样式
* 熟悉浏览器工作原理, 尤其是渲染引擎, 合理的加载资源顺序
* 使用localstorage本地储存

**服务器支持**
* 开启gzip, 二进制文本压缩率通常非常高, (jquery 89k -> 23k)
* 上cdn (Content Delivery Network) 
* 选择优良的域名提供商, 域名解析需要时间
* 服务端渲染, 服务端缓存静态文件到内存
* 服务器使用合适的 cpu/memory/ssd
* 单机集群, 负载均衡
* 规范的服务端代码结构

产品上测试环境时候, 使用专门的[网站性能检测工具][gtmetrix]进行测试, 看看需要哪里需要优化的, 

### 浏览器兼容性等问题

在项目开发之前, 我们要考虑中到产品的面向人群, 已经对应的兼容程度
然后选定最合适的开发框架或类库

- [ ] [html5shiv][html5shiv]  --创建新的HTML5标签,自动完成了设置 IE 浏览器和新语义元素的兼容性
- [ ] [normalize][normalize]  --清除各浏览器自带的标签样式规则, 消除样式差异
- [ ] 浏览器前缀  --现代浏览器,不同浏览器厂商, 使用构建工具自动添加 css浏览器前缀
- [ ] [es5-shim][es5-shim]  --为低版本浏览器, 添加es5规则
- [ ] [json2][json2]  --IE6 IE7 IE8 不支持 JSON 对象
- [ ] [Modernizr][modernizr]  --监测浏览器特性, 根据不同是否支持某个属性添加 相对于的css,js
- [ ] es6 使用babel转换成es5
- [ ] 提示用户更换浏览器  (天猫 >ie7)
- [ ] 开启服务端渲染, react/vue/模板嵌套

### js的闭包/原形链/作用域

### js的设计模式
### 页面间通讯
### js基础问题
### react 源码解析
### 用js实现基本算法


[ulr-happen]:http://fex.baidu.com/blog/2014/05/what-happen/
[how-browsers-work]:https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/
[cross-domain]:https://segmentfault.com/a/1190000009624849?utm_source=75teamweekly&utm_medium=referral
[Access-control-CORS]:https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS
[gtmetrix]:https://gtmetrix.com/
[es5-shim]:https://github.com/es-shims/es5-shim
[html5shiv]:https://github.com/aFarkas/html5shiv
[karma]: http://karma-runner.github.io
[modernizr]:https://github.com/Modernizr/Modernizr


