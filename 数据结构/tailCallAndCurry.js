function foo() {
    console.log('foo: ');
    console.log(foo.caller);
    return bar(1);
}

function bar(a) {
    console.log('bar: ');
    console.log(bar.caller); // 得出函数是被谁调用的
    return baz();
}

function baz() {
    console.log('baz: ');
    console.log(baz.caller);
    console.log(1);
}

// 一个函数如果没有new初始化一个对象 那么他的this 执行global

// foo();

// 阶乘
// 普通写法
function factorial(num) {
    if (num === 0) return 1;
    return num * factorial(num - 1);
    // 假设 num = 4 计算顺序是：1 * 2 * 3 * 4
}
// console.log(factorial(3));

function tailFactorial(num, total = 1) { // 利用 ES6 的语法 设置函数默认参数 这样在外部调用时不用传入 total 初始值
    if (num === 0) return total;  // 这里return的不是 1  是 total 
    // 0! = 1  尾递归优化之后 需要等于num 时 返回 total 的值
    // 没有进行尾递归优化时 下面的return 返回是累计的乘积 也就是函数本身调用几次 执行栈中就会存有 几个 函数 等到 num 是0 返回1 后再去执行栈中的函数 这也是为什么是栈的原因 利用了先进后出 后进先出的特性，调用函数 得出乘积 最后执行的是最先调用的 那一次的函数 返回来 结束
    // 这是 return total 和 return 1 的区别之处
    return tailFactorial(num - 1, num * total);
    // 假设 num = 4 计算顺序是：1 * 4 * 3 * 2 * 1
}
console.log(tailFactorial(3));

// 尾调用*优化*只在严格模式下有效
// 优化生效时 调用栈中 只会有当前这一个函数 前提是优化生效
// 空间复杂度从 O(n) 变为 O(1)

// 避免改写 递归函数
// 上述代码都有对 原递归函数 修改的部分 应该避免它

function outTailFactorial(num) {
    return innerFactorial(num, 1);
}

function innerFactorial(num, total) {
    if (num === 0) return total;
    return innerFactorial(num - 1, num * total);
}
console.log(outTailFactorial(4)); // 有点柯里化的意思

// 函数柯里化：将一个接受多个参数的函数改写成 接受一个参数 并返回一个函数【接受剩余参数并返回结果】的函数
// 普通加法：
function add(x, y, z) {
    return x + y + z;
}
console.log(add(1, 2, 3));
// 柯里化
function branchAdd(x) {
    return function (y) {
        return function (z) {
            return x + y + z;
        }
    }
}

console.log(branchAdd(2)(3)(4));

// 利用柯里化改写 阶乘函数
function curry(fn) {
    let _fnArgLength = fn.length; // fn.length 函数本应该需要的形式参数个数 不包含rest运算符的参数 如下面的...args的形式
    function wrap(...args) {
        let _args = args;
        if (_args.length === _fnArgLength) { // 如果第一次的参数全部传了进来 立马返回执行过的fn 函数
            return fn.apply(null, _args); // apply 传数组
        }

        function act(...args) {
            _args = _args.concat(args);
            if (_args.length === _fnArgLength) {
                return fn.apply(null, _args);
            }
            return act;
        }

        return act;
    }
    return wrap;
}

let curryFactorial = curry(innerFactorial);
console.log(curryFactorial(2)(1)); // 实现柯里化

// 此篇文章的作者还 大胆指出阮一峰老师 文章中关于实现柯里化 的不合理之处 👍
// 继续摘要：
// 经过测试：Chrome 和 Firefox  没有对尾调用进行优化 Safari 进行了优化 
// Node 高版本 去除了 通过 --harmony_tailcalls 参数启用尾调用的优化

// 摘自： https://juejin.im/post/5acdd7486fb9a028ca53547c#heading-4
