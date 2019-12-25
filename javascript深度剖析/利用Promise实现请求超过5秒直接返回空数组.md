```javascript
var url = 'https://jsonplaceholder.typicode.com/posts';
new Promise((resolve, reject) => {
	setTimeout(()=>{resolve([])}, 5000);
	fetch(url).then(()=>{ resolve('fetch请求') });
}).then((data)=>{console.log(data)});
```
Promise只会执行一次resolve 如果fetch请求时间太长 那么 就会走setTimeout resolve执行完毕之后 Promise执行结束
