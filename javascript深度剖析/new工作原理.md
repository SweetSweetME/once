我的理解：
1. 新建一个普通对象 {}
2. 给对象添加__proto__属性 = constructor.prototype 【构造函数的原型属性prototype】
3. 绑定this  construcor.apply({}, 参数)
4. return 对象本身 或者 构造函数的返回值

```javascript
// function _new() {
//     // 1. 新建一个普通对象
//     let obj = {};
//     // 2. _new 函数本身是可以接收参数的 但是又不知道具体会接收几个 接收什么参数 故用下面的方法
//     let [constructor, ...args] = [...arguments]; // 解构赋值 constructor 是 构造函数哈哈哈
//     // 3. 建立联系 生成的这个对象是constructor的实例 需要使用__proto__ 和 构造函数的 prototype 建立联系
//     obj.__proto__ = constructor.prototype;
//     // 4. 执行constructor构造函数 并且 this 指向 自己新建的对象
//     let result = constructor.apply(obj, args);
//     // 5. 判断构造函数是否返回的是 对象或者 函数 是的话直接返回这个结果 如果不是 那么返回 自己创建的obj 对象
//     if (result && (typeof (result) == "object" || typeof (result) == "function")) {
//         return result;
//     }
//     return obj;
// }
// 来试一下吧
// 原本是这样事儿的：
function Person(name, todo) {
    this.name = name;
    this.todo = function () {
        console.log(this.name + todo);
    }

    /***  以下三个实验很好的体现了 上述第 5 步的处理 当然构造函数要返回什么 并且怎么去用 都是要设计好的！并且合理。  ***/
    // return {
    //     name: name,
    //     age: 22,
    //     todo: this.todo
    // };
    // 👇
    // { name: '小初', age: 22, todo: [Function] }
    // 小初去拍照
    // { name: 'xiaobai', age: 22, todo: [Function] }
    // xiaobai去遛弯儿


    // return [name, todo];
    // 👇
    // [ '小初', '去拍照' ]
    // ['xiaobai', '去遛弯儿']

    // return this.todo;
    // 👇
    // [Function]
    // [Function]

}
let preP = new Person('小初', '去拍照');
console.log(preP);
preP.todo()

let p = _new(Person, 'xiaobai', '去遛弯儿');
console.log(p);
p.todo();

// 至此 写好了一个 _new 并且认识更加深刻 

// 备注：对于第 4 步 为什么使用apply 不使用call 是因为 传入的是一个数组 apply对应数组 call 对应列表list

// 思考：第 2 步 的解构赋是不是可以有另一种写法？
// 向下看👇👀
// 我去掉了第 2 步 但是 注意 _new(constructor, ...args) 的写法 ...args 是rest parameter的用法 【剩余参数】
// 那么第 2 步 正确的说法其实应该是 剩余参数 和 解构赋值 一起使用    不要单单只提 用到了解构赋值 忽略剩余参数
function _new(constructor, ...args) {
    // 1. 新建一个普通对象
    let obj = {};
    // 2. _new 函数本身是可以接收参数的 但是又不知道具体会接收几个 接收什么参数 故用下面的方法
    // let [constructor, ...args] = [...arguments]; // 解构赋值 constructor 是 构造函数哈哈哈
    // 3. 建立联系 生成的这个对象是constructor的实例 需要使用__proto__ 和 构造函数的 prototype 建立联系
    obj.__proto__ = constructor.prototype;
    // 4. 执行constructor构造函数 并且 this 指向 自己新建的对象
    let result = constructor.apply(obj, args);
    // 5. 判断构造函数是否返回的是 对象或者 函数 是的话直接返回这个结果 如果不是 那么返回 自己创建的obj 对象
    if (result && (typeof (result) == "object" || typeof (result) == "function")) {
        return result;
    }
    return obj;
}

```
