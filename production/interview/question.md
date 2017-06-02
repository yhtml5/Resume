## interview question


### 从输入url到输出页面, 经历了哪些过程

**参考:**

* [从输入 URL 到页面加载完成的过程中都发生了什么事情][ulr-happen]
* [how browsers work][how-browsers-work]

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

#### 浏览器如何工作



### 跨域问题及其解决方式

### 前端性能优化相关问题

### 用js实现基本算法

### 页面间通讯

### js基础问题


[ulr-happen]:http://fex.baidu.com/blog/2014/05/what-happen/
[how-browsers-work]:https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/





