```
for(var i = 0; i < 5; i++){
	console.log(i); // 同步代码
}
 0
 1
 2
 3
 4
```

```
for(let i = 0; i < 5; i++){
	console.log(i); // 同步代码
}
 0
 1
 2
 3
 4
```
```
for(var i = 0; i < 5; i++){
	function fn(){
		console.log(i);
	}
	fn(); // 依旧是同步代码
  // 这里说一句为什么之前刚开始学习js时 点击事件 用var 定义i 或者 index 会在用户点击事件触发函数时 index 变为了
  // 最大临界值 因为 for 循环帮助我们为节点添加了监听事件 当然for循环已经执行完毕 等待我们的触发 此时节点上的index 
  // 已经不是那个 绑定那一瞬间的 index 【而是已经增加了】
  // 等待点击触发就像是 添加定时器 promise 等 的 异步操作
  // 用let 不提升变量 可以解决这个问题
}
 0
 1
 2
 3
 4
```

```
for(var i = 0; i < 5; i++){
	function fn(){
		console.log(i);
	}
	setTimeout(fn(), 0);
}
// 会报错 因为setTimeout(fn(), 0); 这里不能写fn(); 应该写 fn 不然 fn() 就直接执行了 且没有返回值或者返回值不是函数 都会报错 因为会把结果放到调用栈里 等待同步代码以及微任务执行完毕之后 再执行“放进去的函数”
0
1
2
3
4
// 也打印 以同步代码运行但是也报错
```

```
for(var i = 0; i < 5; i++){
	function fn(){
		console.log(i);
	}
	setTimeout(fn); // 和setTimeout(fn, 0)一样的
}
5个5
var 变量提升 异步执行导致的 无块级作用域概念
```

```
for(let i = 0; i < 5; i++){
	function fn(){
		console.log(i);
	}
	setTimeout(fn);
}
0
1
2
3
4
// let 不会变量提升 有块级作用域概念
```
