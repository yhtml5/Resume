# 前端开发面试题

加分项:
github 有项目, 附上项目地址
或者自己开发的应用, 附上二维码

## 选择题

### 1.下列哪些是块级元素____

1. input
2. ul
3. hr
4. li
5. div
6. form

### 2.哪些是javascript原始数据类型

1. String
2. Null
3. Undefined
4. Object
5. Boolean
6. Number

### 3.js数组的方法中，哪些方法不会改变自身数组

1. pop
2. concat
3. splice
4. map
5. sort
6. reduce

### 4.下面HTTP状态码中, 标志请求成功的有

1. 100
2. 202
3. 304
4. 404
5. 503

### 5.下列等式成立的有哪些

1. undefined === undefined
2. NaN === NaN
3. null === null
4. 0 === -0
5. '0' === 0
6. [] == []

## 填空题

### 1.现有如下html结构, 依次点击4个li标签，运行结果是____

``` javascript
<ul>
 <li>click me</li>
 <li>click me</li>
 <li>click me</li>
 <li>click me</li>
</ul>

var elements=document.getElementsByTagName('li');
var length=elements.length;
for(var i=0;i<length;i++){
    elements[i].onclick=function(){
        alert(i);
    }
}
```

### 2.css ID选择器、标签名称选择器、类选择器、伪类选择器、子选择器，权重排序___

### 3.写一个校验手机号的正则___

### 4.下面这个JS程序的输出是___

``` javascript
var x = 3
var foo = {
    x: 2,
    baz: {
        x: 1,
        bar: function() {
            return this.x
        }
    }
}
var go = foo.baz.bar
alert(go())
alert(foo.baz.bar())
```

### 5.下面这个JS程序的输出是___

``` javascript
const timeA = new Date()
const timeNow = () => new Date() - timeA
const timeoutA = setTimeout(function () {
  console.log('timeoutA', timeNow())
}, 2000)
for (var i = 0; i < 4; i++) {
  setTimeout(function () {
    console.log('timeoutB', timeNow(), i)
  }, 1000 * i)
}
```

## 解答题

1. [1,6,9,2,4,6,7,2,1], 实现对这个数组的从小到大排序并去重
2. 跨域原因及解决方案
3. 从多角度考虑如何优化前端性能
4. 移动端做三栏自适应布局
5. 写一个动画, 实现从方块左到右移动


## 答案

### 选择题
1. [2, 3, 4, 5, 6]
2. [1, 2, 3, 5, 6]
3. [2, 4, 6]
4. [2, 3]
5. [1, 3, 4]

### 填空题
1. 4, 4, 4, 4
2. ID选择器 > 类选择器 = 伪类选择器 > 子选择器 > 标签名称选择器
3. /^1\d{10}$/
4. 3, 1
5. 
> timeoutB 1 4
> timeoutB 1003 4
> timeoutA 2003
> timeoutB 2003 4
> timeoutB 3003 4

### 解答题

1. 自由发挥
2. [跨域问题及其解决方式](https://github.com/yhtml5/yhtml5-tutorial/blob/master/web/http/cross-domain.md)
3. 从技术选型/编码优化/服务端储存/http传输/浏览器执行效率等角度考虑
4. 自由发挥
5. [...new Set(array)].sort((a,b)=>{return a-b});  // 用for循环也ok

```js
var arr=[1,6,9,2,4,6,7,2,1]
var obj={}
for(let i=0;i<arr.length;i++){
  obj[arr[i]]=arr[i]//去重、排序
}
var a=Object.values(obj)
console.log(a);
```
