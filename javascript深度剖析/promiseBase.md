resolve reject 

resolve --> then(函数)
reject --> catch(函数error) 相当于 then(null, 函数error)
```javascript
new Promise((resolve, reject) => {
	resolve(5);

	console.log(1);

	new Promise((resolve)=>{
		resolve(3);

		console.log(2);

	}).then(res => console.log(res));;
}).then((res)=>{

	new Promise((resolve, reject)=>{
		reject(6);

		console.log(4);

	}).then(res=>console.log(res))

	console.log(res);
}).then(null, (res=>console.log(res)));
VM49941:4 1
VM49941:9 2
VM49941:11 3
VM49941:17 4
VM49941:21 5
```
```javascript
new Promise((resolve, reject) => {
	resolve(5);

	console.log(1);

	new Promise((resolve, reject)=>{
		reject(3);

		console.log(2);

	}).then(res => console.log(res)).then(null, res=>console.log(res));;
}).then((res)=>{

	new Promise((resolve, reject)=>{
		reject(6);

		console.log(4);

	}).then(res=>console.log(res))

	console.log(res);
}).then(null, (res=>console.log(res)));
VM50084:4 1
VM50084:9 2
VM50084:17 4
VM50084:21 5
VM50084:11 3
```

```javascript
new Promise((resolve, reject) => {
	reject('error');
}).then(res => console.log(res), res=>console.log(res));
VM50499:3 error
Promise {<resolved>: undefined}
new Promise((resolve, reject) => {
	resolve('success');
}).then(res => console.log(res), res=>console.log(res));
VM50524:3 success
Promise {<resolved>: undefined}
```

```javascript
new Promise((resolve, reject) => {
	reject('error');
}).then(res=>console.log(res, 'success') ).then(res => console.log(res), res=>console.log(res, 'error'));
VM50954:3 error error
Promise {<resolved>: undefined}
new Promise((resolve, reject) => {
	resolve('success');
}).then(res=>console.log(res, 'success') ).then(res => console.log(res), res=>console.log(res, 'error'));
VM50981:3 success success
VM50981:3 undefined
Promise {<resolved>: undefined}
new Promise((resolve, reject) => {
	reject('error');
}).then(res=>console.log(res, 'success'), res=>console.log(res, '1 error') ).then(res => console.log(res), res=>console.log(res, 'error'));
VM51131:3 error 1 error
VM51131:3 undefined
Promise {<resolved>: undefined}
```

现在第一个then里寻找 有没有对应error的函数参数 没有就去下一个then里找第二个参数 如果有就执行 没有不执行 也就是如果是reject了 会找最近的一个then的第二个参数或者catch里的那个参数 去执行

```javascript
new Promise((resolve, reject) => {
	reject('error');
}).then(res=>console.log(res, 'success')).then(res => console.log(res)).catch(res=>console.log(res, 'catch'));
VM51367:3 error catch
Promise {<resolved>: undefined}
new Promise((resolve, reject) => {
	reject('error');
}).then(res=>console.log(res, 'success')).then(res => console.log(res)).then(res=>console.log(res, '3  then'));
Promise {<rejected>: "error"}
new Promise((resolve, reject) => {
	reject('error');
}).then(res=>console.log(res, 'success')).then(res => console.log(res)).then(null, res=>console.log(res, '3  then'));
VM51429:3 error 3  then
Promise {<resolved>: undefined}
```
```javascript
new Promise((resolve, reject) => {
	reject('error');
	resolve('success ok?');
}).then(res=>console.log(res, 'success')).then(res => console.log(res)).then(null, res=>console.log(res, '3  then'));
VM51576:4 error 3  then
Promise {<resolved>: undefined}
new Promise((resolve, reject) => {
	resolve('success ok??');
	reject('error');
	resolve('success ok?');
}).then(res=>console.log(res, 'success')).then(res => console.log(res)).then(null, res=>console.log(res, '3  then'));
VM51597:5 success ok?? success
VM51597:5 undefined
Promise {<resolved>: undefined}
```
一旦状态改变 就是永恒！
>then里的参数是可选的，catch(failureCallback) 是 then(null, failureCallback) 的缩略形式。

进阶：
```javascript
new Promise((resolve, reject)=>{
	console.log('promise 1')
	resolve();
}).then(()=>{
	console.log('then 11');
	new Promise((resolve, reject)=>{
		console.log('promise 2');
		resolve();
	}).then(()=>{
		console.log('then 21');
	})
	.then(()=>{
		console.log('then 23');
	});
})
.then(()=>{
	console.log('then 12');
})
VM980:2 promise 1
VM980:5 then 11
VM980:7 promise 2
VM980:10 then 21
VM980:17 then 12
VM980:13 then 23
Promise {<resolved>: undefined}
```
我以为输出
VM980:2 promise 1
VM980:5 then 11
VM980:7 promise 2
VM980:17 then 12
VM980:10 then 21
VM980:13 then 23
有篇文章的作者 和我想的一样哈哈哈
>https://juejin.im/post/5dabf847e51d4524d674881c
但是结果 是有两个地方颠倒了 🙃️ then 12  then 21
    我刚开始理解是 外层的第二个then 进入队列 要比 内层的所有then 进入队列要早 所以要执行完毕后 才会去找内不得promise将他们的回调放入事件队列中 
    但是实际上不是这样的
    
> 这段代码不仅考察 promise的使用 还在考察 链式调用的顺序 还有为什么可以链式调用？因为then catch 同样的返回一个promise 可以进行链式调用
> 首先要清楚 Promise 能够链式调用的原理，即
> promise 的 then/catch 方法执行后会也返回一个 promise
> 结论1⃣️：当执行 then 方法时，如果前面的 promise 已经是 resolved 状态，则直接将回调放入微任务队列中
> 执行 then 方法是同步的，而 then 中的回调是异步的
    promise 实例化时里边的代码是同步执行的 then 方法也是同步执行的 但是 then里的 回调是异步的 也就是 只有回调是异步 会先放入微任务队列中 当同步代码执行完毕 会依次取出来执行
    
> 同时在同步执行 then 方法时，会进行判断：

>   如果前面的 promise 已经是 resolved 状态，则会立即将回调推入微任务队列（但是执行回调还是要等到所有同步任务都结束后）
>   如果前面的 promise 是 pending 状态则会将回调存储在 promise 的内部，一直等到 promise 被 resolve 才将回调推入微任务队列
> 结论 2 ：
> 当一个 promise 被 resolve 时，会遍历之前通过 then 给这个 promise 注册的所有回调，将它们依次放入微任务队列中
```javascript
let p = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000);
});
p.then(() => {
  console.log("log: 外部第一个then");
});
p.then(() => {
  console.log("log: 外部第二个then");
});
p.then(() => {
  console.log("log: 外部第三个then");
});
```
一秒 之后 都会打印
resolve之后 将 注册的所有的回调放入 微任务队列 合适的时机去执行
resolve之后 将 注册的所有的回调放入 微任务队列 合适的时机去执行
注意 ：
then 负责 注册回调 resolve执行后 负责将回调放入 微任务队列 事件循环将回调取出 去执行
由于 文章剩下的部分不太好理解了 有空再看 先自己考虑一下 是上一个遗留问题是为什么吧😢
 看下面：
 ```javascript
 new Promise((resolve, reject)=>{
	console.log('promise 1')
	resolve();
}).then(()=>{
	console.log('then 11');
	new Promise((resolve, reject)=>{
		console.log('promise 2');
		resolve();
	}).then(()=>{
		console.log('then 21');
	})
	.then(()=>{
		console.log('then 23');
	});
})
.then(()=>{
	console.log('then 12');
})
VM3770:2 promise 1
VM3770:5 then 11
VM3770:7 promise 2
VM3770:10 then 21
VM3770:17 then 12
VM3770:13 then 23
Promise {<resolved>: undefined}
``` 
重点看 外部和内部 第二个then 怎么何时执行：
第一个then 里的回调执行完 之后会默认返回一个promise 并且已经resolve 【没有其他自定义返回值的情况 比如自己返回一个promise 就需要手动resolve或者reject】
所以只有当then里的回调执行完毕之后 默认返回一个已经resolve的promise 
将接下来的then 里的回调放入 微任务队列中
所以在 resolve 负责将 回调 放入队列中 then 负责注册回调
微任务队列：首先外部 第一个then 当promise resolve之后 then里的回调放入队列中 
对应代码块： console.log('then 11');  因为只有这个回调执行完毕才会 默认返回resolve的promise将第二个外部then已经注册的回调放进微任务队列
所以现在 微任务队列中只有 一个微任务 同步代码也已经执行完毕  【外部第二个then只是注册回调 没有放进微任务队列中】
现在执行微任务 新的一个promise出现了 第一个 因为已经resolve 所以将第一个then里的回调放进微任务队列中 因为回调没有执行 所以第二个then只是注册 无法将回调放进微任务队列 与上方同理  
执行完微任务之后 回调完成 返回默认的promise状态为 resolve 紧接着  第二个then里的回调放进去 现在微任务队列中有两个任务 队列 先进先出
内部第一个then的回调先进的 所以先执行 此时

默认返回
promise resolve状态 将内部第二个then里的回调放进 微任务队列 
但是先进先出  【回调执行时 如果有新的promise 可以当作是同步代码 好理解一点 异步里的同步 😄 】
先执行 外部的第二个then里的回调 再执行 内部的第二个then的回调 最终微任务队列为空 执行完毕！✌️

再加点注释： 
```
new Promise((resolve, reject)=>{
		console.log('promise 2');
		resolve();
	}).then(()=>{
		console.log('then 21');
	})
	.then(()=>{
		console.log('then 23');
	})
```
1. 执行resolve时 将第一个then里的回调放进 微任务队列  
2. 这时相对同步代码才算执行完毕 也就是【外层第一个then里的回调执行完毕 返回Promise.resolve 】
3. 将外层第二个then里的回调放进 微任务队列 同步都完成 
4. 事件循环取出先进去的回调 执行 那么内部第二个then里的回调放进微任务队列 依次执行
记住几点：
1. then是同步执行的 但是只负责注册 回调【异步操作】
2. Promise.resolve 是将回调 放入事件队列里面的 只有放的动作 【现在的实验仅限于 then 的第一个参数 对应 resolve】
3. 事件循环 将回调从 事件队列中取出来 执行 直到微任务队列完毕  
4. 微任务与微任务之间没有特权 谁先进 谁先被执行
