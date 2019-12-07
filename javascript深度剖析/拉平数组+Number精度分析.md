1⃣️
```javascript
ES6 里有flat方法 用于拉平数组 传入的值代表需要拉平的层级 写大了没关系 小了就可能拉平不完整 所以可以给他一个最大安全数 【一般不会出现这么多的层级】
function flatDeep(arr){
	return arr.flat(Number.MAX_SAFE_INTEGER); // 可以使用Number.MAX_SAFE_INTEGER 最大安全数 
  //  或者 Math.pow(2, 53) - 1 这个值和Number.MAX_SAFE_INTEGER 相等 
  // Math.pow(base, exponent) 计算数值base 的 exponent 指数幂
}
var arr = [1, [2, 3, 4, [5, 6, [7, 8, [9]]]]];
flatDeep(arr);
(9) [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

2⃣️
```javascript
reduce concat [递归]
var arr = [1, [2, [3, [4]], 5]];
function flatDeep(arr){
	return arr.reduce((result, i)=>{ return Array.isArray(i) ? result.concat(flatDeep(i)) : result.concat(i) }, []);
  // 注意reduce 第一函数 要有返回值的 不加{} 可以不加return 但是加了 {} 也要记得加 return 
}
flatDeep(arr);
(5) [1, 2, 3, 4, 5]
```

```javascript
用栈解决 很棒！需要消化一下！
function flatDeep(input){
	const stack = [...input];
	const res = [];
	while(stack.length){
		const next = stack.pop();  
		if(Array.isArray(next)){
			console.log('stack: ', stack)
			stack.push(...next); //至于这里的 我觉得我需要一步步看一下 👀 其实我有点懵
		}else{
			res.push(next); // res 存储非数组类型的数组元素 且为倒序 因为 是从stack pop出来的 最后记得reverse
			console.log('res: ', res);
		}
	}
	return res.reverse();
}
console.log(flatDeep([1, [2, 3, [4, [5]]]]));

>>> 分解：🥛☕️☕️ 🍔🍜🍗🏠
stack                        next           res 
[1, 2, 3, [4, [5]]]   [2, 3, [4, [5]]]     []
                           [4, [5]]         []
[1, 2, 3, 4, [5]]            [5]            []

[1, 2, 3, 4, 5]               []             [5]
                                              [5] --> [5, 4] --> [5, 4, 3] --> [5, 4, 3, 2] --> [5, 4, 3, 2, 1]

VM13271:7 stack:  [1]
VM13271:7 stack:  (3) [1, 2, 3]
VM13271:7 stack:  (4) [1, 2, 3, 4]
VM13271:11 res:  [5]
VM13271:11 res:  (2) [5, 4]
VM13271:11 res:  (3) [5, 4, 3]
VM13271:11 res:  (4) [5, 4, 3, 2]
VM13271:11 res:  (5) [5, 4, 3, 2, 1]
VM13271:16 (5) [1, 2, 3, 4, 5]

```

#补充知识：
>> Infinity 正无穷 ∞ 

>> -Infinity 负无穷 -∞
 ```
Number.MAX_SAFE_INTEGER 9007199254740991 Math.pow(2, 53) - 1 最大安全数
Number.MIN_SAFE_INTEGER -9007199254740991 -(Math.pow(2, 53) - 1) 最小安全数
Number.MAX_SAFE_INTEGER < Infinity ---> true
Number.MAX_VALUE --> 1.7976931348623157e+308
Number.MIN_VALUE --> 5e-324
```
