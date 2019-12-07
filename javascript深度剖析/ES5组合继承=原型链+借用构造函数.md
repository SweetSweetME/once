// ES5 6种继承
// 组合继承
// 思考： 组合继承将两者代码同时写上 没有作任何改变 为什么就做到了以下三种功能？
// 1. 可以向超类传递参数
// 2. 每个实例都有自己的属性
// 3. 实现了函数复用

// 为什么 优点 2 成立？
// 自己给自己解答：还是那句话 先找实例属性或者方法 找不到再向原型找！
// var arr = [1, 2, 3];
// arr.join = () => 'join';
// arr.join()
// "join"
// 👆就像这样

// 缺点：无论什么情况 都会调用两次构造函数：1. 创建子类实例对象时  2. 在子类构造函数内部 去调用超类构造函数
function PersonFemale(hobby = ['唱歌', '敷面膜', '瑜伽']) {
    this.sex = 'female';
    this.hobby = [...hobby];
    this.getSex = function () {
        return this.sex;
    }
}

PersonFemale.prototype.getHobby = function () {
    return this.hobby + '原型方法';
}
PersonFemale.prototype.todo = ['郊游'];
PersonFemale.prototype.hobby = ['郊游', 'prototype原型爱好'];

PersonFemale.getFn = function () {
    return 'PersonFemale.调用函数';
}

function Student(hobby) {
    this.type = 'student';
    this.getType = function () {
        return this.type;
    }
    this.getSex = function () { // 可以复写
        return 'this.sex';
    }
    PersonFemale.call(this, hobby); // 借用构造函数 继承实例属性 不会共享地址
}

// Student.prototype = PersonFemale.prototype; // 只可以继承 原型上面的属性或者方法 为什么不可以这样写？💡
Student.prototype = new PersonFemale(); // 继承原型的属性和方法

// Student.prototype.construtor = Student; // ********这一步为什么有没想明白********

let bell = new Student(['哼 我自己也有🐧']);

let lisa = new Student(['list也有自己的爱好❤️']);

let lay = new Student(['lay传递参数初始化hobby']);

console.log('bell: ', bell.hobby);
console.log('bell: ', bell.getHobby());
console.log('lay: ', lay.hobby);
console.log('lay: ', lay.getHobby());
console.log('lisa: ', lisa.hobby);
console.log('lisa: ', lisa.getHobby());
