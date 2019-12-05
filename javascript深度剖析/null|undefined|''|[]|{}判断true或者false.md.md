null undefined '' 是一类
本身代表 false

[]  {}  是一类
他们虽然为空 但是 他们有地址 所以他们 代表 true

!null !undefined !''  ---> true
!!null !!undefined !!'' ---> false

![] !{}  ---> false
!![] !!{} ---> true

所以判断是否为空数组 用长度
是否为空对象 用可枚举属性

自己的拙见 有人看到的话 认为有错 欢迎指出！

```javascript
var b = []
if(b){
	console.log('b地址')
}
if(b.length){
	console.log('b不为空')
}else{
	console.log('b为空')
}

VM2737:3 b地址
VM2737:8 b为空
undefined
var b = ['1']
if(b){
	console.log('b地址')
}
if(b.length){
	console.log('b不为空')
}else{
	console.log('b为空')
}

VM2764:3 b地址
VM2764:6 b不为空
```
> 判断对象是否为空https://juejin.im/post/5c3b59d9518825254c319ecf
1. 用stringify 得到'{}'  和 '{}' 比较 【演变为字符串的比较】
2. for in 如果进入了 for in 循环 那么对象不为空 return true 否则 外层返回 false
3. ES6 Object.keys(obj) 返回可枚举属性 键 的一个数组 就相当于 是判断数组是否为空了～
试一下：
>  对了 对象没有length属性的！
1.
```javascript
var obj = {};

if(obj){
	console.log('obj 有地址的！');
}
if(obj.length){
	console.log('obj 对象有length？？');
}else{
	console.log('obj 对象有length 天哪 有 length !!', obj.length, '不它没有 哈哈哈 不管怎样 都是undefined');
}
if(JSON.stringify(obj) === '{}'){
	console.log(`注意--> 形式：${obj} 为空`);
	console.log(obj);
}else{
	console.log(`注意--> 形式：${obj} 不为空`);
	console.log(obj);
}
VM4972:4 obj 有地址的！
VM4972:9 obj 对象有length 天哪 有 length !! undefined 不它没有 哈哈哈 不管怎样 都是undefined
VM4972:12 注意--> 形式：[object Object] 为空
VM4972:13 {}
```
2.
```javascript
var obj = {};

if(obj){
	console.log('obj 有地址的！');
}
if(obj.length){
	console.log('obj 对象有length？？');
}else{
	console.log('obj 对象有length 天哪 有 length !!', obj.length, '不它没有 哈哈哈 不管怎样 都是undefined');
}
function isEmpty(_obj){
	for(const key in obj){
		return false;
	}
	return true;
}
console.log(isEmpty(obj))
VM5461:4 obj 有地址的！
VM5461:9 obj 对象有length 天哪 有 length !! undefined 不它没有 哈哈哈 不管怎样 都是undefined
VM5461:17 true
undefined
var obj = {a: 1};

if(obj){
	console.log('obj 有地址的！');
}
if(obj.length){
	console.log('obj 对象有length？？');
}else{
	console.log('obj 对象有length 天哪 有 length !!', obj.length, '不它没有 哈哈哈 不管怎样 都是undefined');
}
function isEmpty(_obj){
	for(const key in obj){
		return false;
	}
	return true;
}
console.log(isEmpty(obj))
VM5474:4 obj 有地址的！
VM5474:9 obj 对象有length 天哪 有 length !! undefined 不它没有 哈哈哈 不管怎样 都是undefined
VM5474:17 false
```
3.
```javascript
var obj = {};

if(obj){
	console.log('obj 有地址的！');
}
if(obj.length){
	console.log('obj 对象有length？？');
}else{
	console.log('obj 对象有length 天哪 有 length !!', obj.length, '不它没有 哈哈哈 不管怎样 都是undefined');
}
function isEmpty(_obj){
	if(Object.keys(obj).length > 0){
		return false;
	}
	return true;
}
console.log('key Array:', Object.keys(obj));
console.log(isEmpty(obj))
VM5914:4 obj 有地址的！
VM5914:9 obj 对象有length 天哪 有 length !! undefined 不它没有 哈哈哈 不管怎样 都是undefined
VM5914:17 key Array: []
VM5914:18 true
undefined
var obj = {a: 1};

if(obj){
	console.log('obj 有地址的！');
}
if(obj.length){
	console.log('obj 对象有length？？');
}else{
	console.log('obj 对象有length 天哪 有 length !!', obj.length, '不它没有 哈哈哈 不管怎样 都是undefined');
}
function isEmpty(_obj){
	if(Object.keys(obj).length > 0){
		return false;
	}
	return true;
}
console.log('key Array:', Object.keys(obj));
console.log(isEmpty(obj))
VM5930:4 obj 有地址的！
VM5930:9 obj 对象有length 天哪 有 length !! undefined 不它没有 哈哈哈 不管怎样 都是undefined
VM5930:17 key Array: ["a"]
VM5930:18 false
```
```javascript
// Object.values 同理！
var obj = {a: 1};

if(obj){
	console.log('obj 有地址的！');
}
if(obj.length){
	console.log('obj 对象有length？？');
}else{
	console.log('obj 对象有length 天哪 有 length !!', obj.length, '不它没有 哈哈哈 不管怎样 都是undefined');
}
function isEmpty(_obj){
	if(Object.values(obj).length > 0){
		return false;
	}
	return true;
}
console.log('key Array:', Object.values(obj));
console.log(isEmpty(obj))
VM6231:4 obj 有地址的！
VM6231:9 obj 对象有length 天哪 有 length !! undefined 不它没有 哈哈哈 不管怎样 都是undefined
VM6231:17 key Array: [1]
VM6231:18 false
```
