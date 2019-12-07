> 利用隐式类型转换
```
// Symbol.toPrimitive 获取对象原始属性
hint: number --> +a    string --> `${a}`   default --> a + ''
理解还不是很深入避免给自己挖坑 这个不主动提出来
var b = {
	[Symbol.toPrimitive]: ((hint)=>{
		let i = 1;
		return ()=>{
			return i++; // 注意此时返回一个函数  和下方一样的
		}
	})()
}
b == 1 && b == 2 && b == 3
true
```
> 利用数据劫持 Object.defineProperty 或者 ES6 Proxy
```javascript
var b = new Proxy({}, {
	i: 1,
	get: function(){
		return () => this.i++; // 注意此时返回一个函数 返回的一个函数里返回了 i 相当于 () => { return this.i++ } 和上方逻辑一样
	}
});
b == 1 && b == 2 && b == 3 && b == 4 && b == 5
true
```

```javascript

-❌toString 默认调用 join 方法 将join方法写成了shift 方法 注意需要是Array.prototype 的方法-

arr.join = arr.shift; 这样是可以的！！！之前测试时可能哪个地方出现问题 没看出来 但不是这个的问题 因为无意间又试了一下 没问题🆗
又来更新了 只是相差10秒而已 我知道之前哪里错了
arr.join = arr.shift();
我给arr.shift 加了括号 说明已经执行 那么 arr.join = 1 arr.join() 就是1() 😂

var arr = [1, 2, 3];
Array.prototype.join = Array.prototype.shift;
// arr.toString()
arr == 1 && arr == 2 && arr == 3

true

```
