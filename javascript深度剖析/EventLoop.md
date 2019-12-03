摘自：https://juejin.im/post/5b73d7a6518825610072b42b
宏任务：I／O 触发事件 如click等、setTimeout、setInterval、setImmediate(node)、requestAnimationFrame(浏览器)
微任务：promise一家(then catch finally)、process.nextTick(创建一个微任务 即异步 一般用在事件触发上 可以随时被插入 保证下一次宏任务开始之前执行一次)、MutationObserver observe() 方法 在指定的DOM变化时调用

处理完一个宏任务后 会看看有没有微任务需要执行 如果有则先执行微任务 执行完之后再开启下一个宏任务时 我们称它为一个EventLoop
setImmediate 一次EventLoop执行完之后会执行setImmediate
setTimeout 计算延迟时间后执行

```
setTimeout(_ => console.log(4))

new Promise(resolve => {
  resolve()
  console.log(1)
}).then(_ => {
  console.log(3)
})

console.log(2)
// 执行输出：1 2 3 4
```
new Promise 在实例过程中是同步执行的 只有then catch finally 中的是 异步
即使嵌套的 Promise 也会先全部执行完毕 再去执行宏任务
```
setTimeout(_ => console.log(4))

new Promise(resolve => {
  resolve()
  console.log(1)
}).then(_ => {
  console.log(3)
  Promise.resolve().then(_ => {
    console.log('before timeout')
  }).then(_ => {
    Promise.resolve().then(_ => {
      console.log('also before timeout')
    })
  })
})

console.log(2)
```
当然了，实际情况下很少会有简单的这么调用Promise的，一般都会在里边有其他的异步操作，比如fetch、fs.readFile之类的操作。
而这些其实就相当于注册了一个宏任务，而非是微任务。
P.S. 在Promise/A+的规范中，Promise的实现可以是微任务，也可以是宏任务，但是普遍的共识表示(至少Chrome是这么做的)，Promise应该是属于微任务阵营的

await / async
await之前的代码可以看作是 new Promise 的同步执行部分 
await之后的代码 可以看作 then 里的回调部分
await ／ async 只是语法糖 是基于promise 封装
