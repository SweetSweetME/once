https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises 
建议不定期看下文档加深理解
#### 拒绝事件
```javascript
window.addEventListener("unhandledrejection", event => {
  /* 你可以在这里添加一些代码，以便检查
     event.promise 中的 promise 和
     event.reason 中的 rejection 原因 */

  event.preventDefault();
}, false);
```
在使用node.js 可能有些依赖 会没有对 拒绝的promise的友好处理

防止控制台报错 拒绝的promise  event.preventDefault(); 阻止默认事件即打印错误

#### 旧式回调API中创建promise注意问题
本身不应该将旧的回调【如：setTimeout 】和 promise一起使用 以免引起时序问题
我们要做的：用promise构造函数将旧式回调 【包裹起来】 这段代码就是底层代码 我们不应该再去使用setTimeout 去尝试捕获错误 而是应该用封装的函数
```javascript
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

wait(10000).then(() => saySomething("10 seconds")).catch(failureCallback);
```

#### 组合
Promise.resolve() Promise.reject() 是快捷方法【用于创建已经有最终状态的promise 成功 or 失败】
Promise.all() Promise.race() 是并行运行异步操作的组合工具 也就是我们可以发起并行操作 等多个操作全部结束进行下一步

>我们可以发起并行操作，然后等多个操作全部结束后进行下一步操作，如下：

>
```javascript
Promise.all([func1(), func2(), func3()])
.then(([result1, result2, result3]) => { /* use result1, result2 and result3 */ });
```
>
>可以使用一些聪明的 JavaScript 写法实现时序组合：

>
```javascript
[func1, func2, func3].reduce((p, f) => p.then(f), Promise.resolve())
.then(result3 => { /* use result3 */ });
```
>

>>> ##### 想说一些 关于 reduce 的 注意事项 如果没有最后的默认参数 这里如 Promise.resolve() 那么执行时 将数组的第一个元素当成 默认值 reduce 的函数将从index为1 开始 如果有默认值 那么index从 0 开始这里是 Promise.resolve()的原因就是 then之后的返回都是 Promise.resolve() f 是数组里的value值

偷偷说一句 js 里函数 清一色 回调参数 都是 value key 本身的形式存在的 嘘！

>通常，我们递归调用一个由异步函数组成的数组时相当于一个 Promise 链：

>Promise.resolve().then(func1).then(func2).then(func3);
>这也是为什么 then 默认返回Promise.resolve

>
通常，我们递归调用一个由异步函数组成的数组时相当于一个 Promise 链：
```
Promise.resolve().then(func1).then(func2).then(func3);
我们也可以写成可复用的函数形式，这在函数式编程中极为普遍：

const applyAsync = (acc,val) => acc.then(val);
const composeAsync = (...funcs) => x => funcs.reduce(applyAsync, Promise.resolve(x));
composeAsync() 函数将会接受任意数量的函数作为其参数，并返回一个新的函数，该函数接受一个通过 composition pipeline 传入的初始值。这对我们来说非常有益，因为任一函数可以是异步或同步的，它们能被保证按顺序执行：

const transformData = composeAsync(func1, func2, func3);
const result3 = transformData(data);
```
>
#### 时序
为了避免意外，即使是一个已经变成 resolve 状态的 Promise，传递给 then() 的函数也总是会被异步调用：
```
Promise.resolve().then(() => console.log(2));
console.log(1); // 1, 2
```
```
传递到 then() 中的函数被置入了一个微任务队列，而不是立即执行，这意味着它是在 JavaScript 事件队列的所有运行时结束了，事件队列被清空之后，才开始执行：

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

wait().then(() => console.log(4));
Promise.resolve().then(() => console.log(2)).then(() => console.log(3));
console.log(1); // 1, 2, 3, 4
这段代码让我想起来：微任务或者说宏任务自身的带有的微任务 会连续执行 知道微任务队列为空 微任务与微任务之间有个您先我后的区别 但是微任务相对于其他任务总是老大
比如银行排队 老人家存完钱 柜台姐姐问需要买点理财产品吗？或者最近有XXX活动您参加一下？这时老人家想要做出的下一步动作 比如买理财产品 这个想法 比后面排队的人想法出现的晚【毕竟大家来银行都有事干 不然取啥票 排啥队 但是因为老人还有事要干 所以必须要等待⌛️】
setTimeout 生成一个宏任务 then 是微任务 这就是为什么 3 在 4 的前面出来 第一个then 运行完之后 返回Promise.resolve 将第二个then的回调加入了微任务队列 【在这里我认为then 早就注册看回调只是没有加入微任务队列而已 因为需要 Promise.resolve 触发】
```
