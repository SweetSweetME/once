```javascript
// 原型式继承
// 基本思想: 借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型
// 优点： 没有必要创建构造函数 仅让一个对象于另一个对象保持相似的情况下 原型式继承可以胜任
// 缺点： 和原型链继承一样 引用类型的值共享堆内存 被所有实例共享
let person = {
    name: 'bell',
    hobby: ['喝酸奶', '写代码(认真的吗？)']
}
let person1 = Object.create(person, { age: { value: 12 } });
// person1.name = 'lisa';
person1.hobby.push('聚餐');
console.log(person);
console.log(person1.hobby);
console.log(person1);
console.log(person1.name);
console.log(person1.age);

// { name: 'bell', hobby: ['喝酸奶', '写代码(认真的吗？)', '聚餐'] }
// ['喝酸奶', '写代码(认真的吗？)', '聚餐']
// { } 想不通为什么为空
// bell
// 12 额外属性 create 第二个参数 是为新对象定义额外的属性的对象 和 Object.defineProperty() 传入的配置很像
```
