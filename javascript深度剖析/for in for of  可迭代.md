for in 
几乎可遍历所有  能够获取索引值 或者 键值
for of 
只可遍历 可迭代对象 【数组 字符串 arguments Map Set NodeList 】
获取 数组元素； map[有size 属性的] 的 一个键值对；字符串的单个字符 
     以数组为中心 可迭代对象是可以通过Array.from()函数 将可迭代对象【类数组】转化为 真正的数组 
```javascript

var arr = new Map([[2, 1], [3, 1]]);
for( var key of arr ){ // 遍历Map
	console.log(key);
}
arr
VM1866:3 (2) [2, 1]
VM1866:3 (2) [3, 1]
Map(2) {2 => 1, 3 => 1}

Map(2) {2 => 1, 3 => 1}
var arr = new Map([[2, 1], [3, 1]]);
for( var [value, key] of arr ){  // 这里遍历Map 并且用到了 解构赋值
	console.log(value, key);
}
arr
VM1272:3 2 1
VM1272:3 3 1
Map(2) {2 => 1, 3 => 1}


var arr = [[2, 1], [3, 1]];
for( var [value, key] of arr ){ // 遍历数组 获取元素值 这里有解构赋值
	console.log(value, key);
}
arr
VM1305:3 2 1
VM1305:3 3 1
(2) [Array(2), Array(2)]


var arr = [[2, 1], [3, 1]];
for( var value of arr ){  // 遍历数组 无解构
	console.log(value);
}
arr
VM1348:3 (2) [2, 1]
VM1348:3 (2) [3, 1]
(2) [Array(2), Array(2)]


var arr = [[2, 1], [3, 1]];
for( var value in arr ){
	console.log(value);  // 变了哦 这里是 for in 啦 遍历得到的是 数组索引值
}
arr
VM1363:3 0
VM1363:3 1
(2) [Array(2), Array(2)]


var arr = '123';
for( var value in arr ){  // for in 遍历字符串 得到字符索引
	console.log(value);
}
arr
VM1380:3 0
VM1380:3 1
VM1380:3 2
"123"



var arr = '123';
for( var value of arr ){ // for of  遍历 字符串 得到单个字符
	console.log(value);
}
arr
VM1394:3 1
VM1394:3 2
VM1394:3 3
"123"



var arr = 'abc';
for( var value of arr ){
	if(value === 'b'){   // for of 可以 break 
		break;
	}
	console.log(value);
}
arr
VM1497:6 a
"abc"


var arr = 'abc';
for( var value of arr ){
	if(value === 'b'){  // for of 可以continue
		continue;
	}
	console.log(value);
}
arr
VM1514:6 a
VM1514:6 c
"abc"


var arr = 'abc';
for( var value in arr ){
	if(value === 1){  // 这个 for in 其实可以break 和 continue 这次试的时候没有成功验证 
  // 是因为 for in 之后得到的 索引 是 字符串 和 数组索引强等于 肯定不行 无法触发break or continue 
  // 可以这么比较 +index === 1 将字符串索引转变为 number类型
		continue;
	}
	console.log(value);
}
arr
VM1536:6 0
VM1536:6 1
VM1536:6 2
"abc"



var arr = 'abc';
for( var value in arr ){
	if(value === 1){ // 不管用～  应该为 +value === 1
		break
	}
	console.log(value);
}
arr
VM1556:6 0
VM1556:6 1
VM1556:6 2
"abc"


var arr = 'abc';
for( var value in arr ){
	// if(value === 1){  // 注释掉判断 直接 break  ok 👌是可以break 说明自己if里的判断 写的不对 
		break
	// }
	console.log(value);
}
arr
"abc"
var arr = 'abc';
for( var value in arr ){
	if(value == 1){
		break
	}
	console.log(value);
}
arr
VM1600:6 0
"abc"

var arr = 'abc';
for( var value in arr ){  //  ✌️成功 可以break 我相信肯定可以 continue的  注意是for in 得到的索引  +value === 1
	if(+value === 1){
		break
	}
	console.log(value);
}
arr
VM1619:6 0
"abc"

for( var value in arr ){  
	if(+value === 1){
		continue  // 为了严谨 还是试可一下 哈哈哈 可以continue的
	}
	console.log(value);
}
arr
VM67215:6 0
VM67215:6 2
"abc"

```
