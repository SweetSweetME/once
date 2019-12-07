```javascript
// ES5 6种继承之原型链继承
// 缺点：1. 继承的属性 一个修改 都会被影响
        2. 无法向父级【超类传递初始化参数】 详请 查本文件diff 可看
// 1. 原型链继承
// 继承想要继承什么 属性 方法 
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
// console.log(PersonFemale.getFn());


var p = new PersonFemale();
// console.log(p.getHobby());
// console.log(p.todo);
// console.log(p.getSex());

function Student(hobby) {
    console.log(hobby);
    this.type = 'student';
    // this.hobby = ['学习'];
    this.getType = function () {
        return this.type;
    }
    this.getSex = function () { // 可以复写
        return 'this.sex';
    }
}

// Student.prototype = PersonFemale.prototype; // 只可以继承 原型上面的属性或者方法
Student.prototype = new PersonFemale(); // 可以继承实例+原型的方法  可以继承实例+原型的属性 如果本身有该属性直接返回【复写】 没有的话返回父级的 hobby
Student.prototype.construtor = Student; // ********这一步为什么有没想明白********
// Student.prototype.getHobby = function () { // 可以复写
//     return 'this.hobby';
// }

let bell = new Student();
// console.log('bell: ', bell.getType());
// console.log('bell: ', bell.getSex());
bell.hobby.push('bell新加了一个爱好');
bell.todo.push('bell有新的TODO');

// 自己实验完上述的代码后 对下面这句话的理解：
// 原型链继承的基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。
/**
 * 先抛开不说继承 先说原型属性、方法和实例属性、方法
 * 一个构造函数的实例本身可以访问实例属性 和 原型属性 并且有实例属性先访问实例属性 没有再去原型属性找
 * 继承怎么实现的呢？
 * "继承另一个引用类型的属性和方法" 为什么是另一个引用类型？
 * Student.prototype = new PersonFemale();
 * new PersonFemale() 这个已经实例化出一个 PersonFemale 的实例 拥有实例和原型的属性方法
 * Student.prototype 赋值为上述这个实例 那么原型上就有了 PersonFemale 所有的方法和属性
 * Student 实例化一个实例之后 该实例可以访问它的构造函数的原型也就是PersonFemale的方法和属性
 * 即实现了继承
 * 
 * 再说一句Student.prototype = new PersonFemale();
 * 这里 是将一个实例化对象的属性和方法 赋值给了 Student的原型上 那么 对于Student来说 继承过来的这些属性和方法都放在原型上
 * 说这么多是为了给下方做铺垫
 */
let lisa = new Student();
lisa.hobby.push('lisa新加了一个爱好');
lisa.todo.push('lisa有新的todo');

let lay = new Student(['lay传递参数初始化hobby']);
lay.hobby.push('lay新加了一个爱好');
lay.todo.push('lay有新的todo');
lay.type = 'Student三好学生';

console.log('bell: ', bell.hobby);
console.log('bell: ', bell.todo);
console.log('bell: ', bell.type);
console.log('lay: ', lay.hobby);
console.log('lay: ', lay.todo);
console.log('lay: ', lay.type);
console.log('lisa: ', lisa.hobby);
console.log('lisa: ', lisa.todo);
console.log('lisa: ', lisa.type);
console.log(Student.prototype.construtor);

// 继承的属性和方法 其中一个有变动 都会影响所有的改变 不管相对于父级来说是 原型属性还是实例属性
// 原型属性是共享的 那么 同时改变 是可以 的  但是原来父级的实例属性 最好不共享
// 那么为什么会共享呢？ 因为是一个实例【引用类型】 赋值给了Student.prototype

// undefined
// undefined
// ['lay传递参数初始化hobby']
// bell: ['唱歌', '敷面膜', '瑜伽', 'bell新加了一个爱好', 'lisa新加了一个爱好', 'lay新加了一个爱好']
// bell: ['郊游', 'bell有新的TODO', 'lisa有新的todo', 'lay有新的todo']
// bell: student
// lay: ['唱歌', '敷面膜', '瑜伽', 'bell新加了一个爱好', 'lisa新加了一个爱好', 'lay新加了一个爱好']
// lay: ['郊游', 'bell有新的TODO', 'lisa有新的todo', 'lay有新的todo']
// lay: Student三好学生
// lisa: ['唱歌', '敷面膜', '瑜伽', 'bell新加了一个爱好', 'lisa新加了一个爱好', 'lay新加了一个爱好']
// lisa: ['郊游', 'bell有新的TODO', 'lisa有新的todo', 'lay有新的todo']
// lisa: student
// [Function: Student]
```
