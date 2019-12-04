摘自：https://juejin.im/post/5cb66fdaf265da0384128445#heading-13

我自己确实疑惑的问题：
为什么项目中一定要引入React 
为何组件 一定要大写
key 的作用：我理解的是 增删改查 更准确
如何让写出高性能的组件
如何防止XSS 攻击

记忆点：1. 原生javascript程序中 直接对 dom 进行创建修改 
          React 会将代码转为一个 javascript对象 再转成真实DOM
      2. 为何使用虚拟DOM
          提高开发效率：使用javascript 关注点在于如何更新DOM 使用虚拟DOM 只需要关注 业务逻辑 告诉React 状态 就会帮助我们更新 应该更新的部分
          关于提升性能：第一次渲染性能并没有提升 而是 更新时 做的性能提升
          跨浏览器兼容：我们的事件都被绑定到了document上面 再通过React实现的事件机制 模拟冒泡和捕获的过程 采用事件代理 批量更新的方法 抹平了各个浏览器之间的事件兼容问题
          跨平台兼容：虚拟DOM为React带来了跨平台渲染的能力 比如react native 虚拟DOM根据情况画出相应平台的UI层
          
      jsx --> React.createElement() Babel 帮助我们 转换
      
