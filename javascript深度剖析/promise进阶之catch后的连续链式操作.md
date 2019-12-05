```javascript
new Promise( (resolve, reject)=>{

	resolve();
} ).then(()=>{ throw new Error('发生了错误❌'); console.log()})
.catch(()=>console.log('刚才发生了错误XXX'))
.then(()=>console.log('下面的正常执行'));
VM730:5 刚才发生了错误XXX
VM730:6 下面的正常执行
Promise {<resolved>: undefined}
new Promise( (resolve, reject)=>{

	resolve();
} ).then(()=>{ throw new Error('发生了错误❌'); console.log()})
.catch(()=>console.log('刚才发生了错误XXX'))
.catch(()=>console.log('下面的正常执行'));
VM747:5 刚才发生了错误XXX
Promise {<resolved>: undefined}
new Promise( (resolve, reject)=>{

	resolve();
} ).then(()=>{ throw new Error('发生了错误❌'); console.log()})
.catch(()=>console.log('刚才发生了错误XXX'))
.catch(()=>console.log('下面的正常执行'))
.then(()=>console.log('执行么？'));
VM814:5 刚才发生了错误XXX
VM814:7 执行么？
Promise {<resolved>: undefined}
new Promise( (resolve, reject)=>{

	resolve();
} ).then(()=>{ throw new Error('发生了错误❌'); console.log()})
.catch(()=>console.log('刚才发生了错误XXX'))
.catch(()=>console.log('下面的正常执行'))
.then(()=>console.log('执行么？'))
.then(()=>console.log('执行'));
VM832:5 刚才发生了错误XXX
VM832:7 执行么？
VM832:8 执行
Promise {<resolved>: undefined}
```
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises
```javascript
new Promise( (resolve, reject)=>{

	resolve();
} ).then(()=>{ throw new Error('发生了错误❌'); console.log()})
.then(()=>console.log('执行么？'))
.then(()=>console.log('执行！'));
Promise {<rejected>: Error: 发生了错误❌
    at <anonymous>:4:22}
```

catch作用: 如果


其中一个回调执行失败 抛出错误 接下来 使用 catch 不会影响 之后的then的执行

```javascript
new Promise( (resolve, reject)=>{

	resolve();
} ).then(()=>{ throw new Error('发生了错误❌'); console.log()})
.then(()=>console.log('执行么？'))
.then(()=>console.log('执行！'))
.catch(()=>console.log('error'))
.catch(()=>console.log('error 2'))
.then(()=>console.log('catch 之后'))
.catch(()=>console.log('catch  then 之后 '))
.then(()=>console.log('catch then  catch 之后'));
VM1298:7 error
VM1298:9 catch 之后
VM1298:11 catch then  catch 之后
```
catch 只有发生错误时才会执行 【非reject手动触发】
then 之前有错误不会执行 会报错 【之后的then都不触发的！】 但是catch一下 就可以避免程序崩溃
catch住错误之后 then 都会触发 但是由于是正常情况 不会引起catch
```javascript
new Promise( (resolve, reject)=>{

	resolve();
} ).then(()=>{ throw new Error('发生了错误❌'); console.log()})
.then(()=>console.log('执行么？'))
.then(()=>console.log('执行！'))
.then(null, ()=>console.log('error then 里的第二个参数'))
.catch(()=>console.log('error 2'))
.then(()=>console.log('catch 之后'))
.catch(()=>console.log('catch  then 之后 '))
.then(()=>console.log('catch then  catch 之后'));
VM1366:7 error then 里的第二个参数
VM1366:9 catch 之后
VM1366:11 catch then  catch 之后
```

.then(null, ()=>console.log('error then 里的第二个参数')) 和  .catch(()=>console.log('error')) 一样的！！
以上部分是所谓的错误传递
> 通常，一遇到异常抛出，Promise 链就会停下来，直接调用链式中的 catch 处理程序来继续当前执行。这看起来和以下的同步代码的执行很相似。
```javascript
try {
  let result = syncDoSomething();
  let newResult = syncDoSomethingElse(result);
  let finalResult = syncDoThirdThing(newResult);
  console.log(`Got the final result: ${finalResult}`);
} catch(error) {
  failureCallback(error);
}
```
>在 ECMAScript 2017 标准的 async/await 语法糖中，这种同步形式代码的对称性得到了极致的体现：
>```javascript
async function foo() {
  try {
    let result = await doSomething();
    let newResult = await doSomethingElse(result);
    let finalResult = await doThirdThing(newResult);
    console.log(`Got the final result: ${finalResult}`);
  } catch(error) {
    failureCallback(error);
  }
}
```
