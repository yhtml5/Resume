### 给对象key赋值

```
var key= 'ttt',a={},b={},c={}

a[key] = 'Hello!';
b = {
  [key]: 'Hello!'
}
Object.defineProperty(c, key, { value: 'Hello!' });

console.log(a,b,c)
```