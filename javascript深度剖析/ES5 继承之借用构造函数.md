借用构造函数  基本思想【在子类的构造函数中调用超类的构造函数 用call】
// 优点：1. 可以向超类传递参数初始化 2. 解决了原型链继承中包含引用类型值被所有实例共享的问题[刚实验过 基本类型不受影响]
// 缺点：方法都要在构造函数中定义 函数复用无从谈起 😢 超类原型中定义的属性和方法 对于子类 不可见【即不能用】
```javascript
function PersonFemale(hobby = ['唱歌', '敷面膜', '瑜伽']) {
    this.sex = 'female';
    this.hobby = [...hobby];
    this.getSex = function () {
        return this.sex;
    }
}

PersonFemale.prototype.getHobby = function () {
    return this.hobby;
}
PersonFemale.prototype.todo = ['郊游'];
PersonFemale.prototype.hobby = ['郊游', 'prototype原型爱好'];

PersonFemale.getFn = function () {
    return 'PersonFemale.调用函数';
}

function Student(hobby) {
    // console.log(hobby);
    this.type = 'student';
    // this.hobby = ['学习'];
    this.getType = function () {
        return this.type;
    }
    this.getSex = function () { // 可以复写
        return 'this.sex';
    }
    PersonFemale.call(this, hobby); // 借用构造函数
}

let bell = new Student(['哼 我自己也有🐧']);
let lisa = new Student(['list也有自己的爱好❤️']);
let lay = new Student(['lay传递参数初始化hobby']);

console.log('bell: ', bell.hobby);
console.log('bell: ', bell.todo);
console.log('bell: ', bell.type);
console.log('bell: ', bell.sex);
console.log('lay: ', lay.hobby);
console.log('lay: ', lay.todo);
console.log('lay: ', lay.type);
console.log('lay: ', lay.sex);
console.log('lisa: ', lisa.hobby);
console.log('lisa: ', lisa.todo);
console.log('lisa: ', lisa.type);
console.log('lisa: ', lisa.sex);
console.log(bell);

```
