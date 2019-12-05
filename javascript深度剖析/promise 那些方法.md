promise.all()
传入可迭代对象[数组或者字符串] 都完成时才会 结束    但是如果遇到了 错误 提前返回 
> 而不管其它 promise 是否完成
都成功返回数组 顺序是传入时的顺序 不是真正执行完成的顺序
有一个失败 返回第一个失败的reason
promise.race()
传入 可迭代对象 但是 碰到失败或者成功就会返回 谁先完成返回谁 不管传入的顺序 失败就失败 成功就成功

两者区别 ：
    all 当传入数组为空时 同步执行 不会等到 传入的都执行完毕再执行 否则 异步执行 【异步操作】
    race 不管是否为空 都是异步执行
    
    可以采用setTimeout 的方式等待异步操作执行完毕 打印 【原理： 先微任务 后宏任务】
    
    
Promise.resolve() 成功状态
Promise.reject() 失败状态
Promise.prototype.then(函数1 success, 函数2 error)
Promise.prototype.catch(error)
Promise.prototype.finally()总会执行
