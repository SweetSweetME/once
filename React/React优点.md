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
      
      jsx 需要提前 被babel 编译 所以不能动态选择类型
      
      为什么组件要大写？
      babel 在编译时 会判读JSX中组件的首字母 小写则被认定为原生DOM标签 createElement 第一个变量编译为 字符串 大写 则编译为对象  认为是自定义组件
      
      ```
      ReactElement.createElement 三个参数 type config children 
      propName props key ref self source
      config != null 处理props 
      type && type.defaultProps 处理默认props
      
      ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
      createElement函数内部做的操作很简单 
      将props 和 子元素 进行处理后返回一个 ReactElement对象
      ```
      ReactElement 传入的属性：
          type 元素类型 是html (字符串) 还是自定义组件(class或者function)
          key   组件的唯一标识 用于DIFF算法
          ref 用于获取原生DOM对象
          props 传入组件的props
          owner 当前正在构建的Component的所属Component
          
          $$typeof: 一个不常见到的属性 被赋值为REACT_ELEMENT_TYPE (react_element_type)
          
          ```
          var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element')) || 0xeac7
          ```
          $$typeof Symbol 类型的变量 防止XSS
          ReactElement.isValidElement  
          判断  React组件是否有效 没有$$typeof  会被过滤掉
          
render函数实现原理
批处理 事务
时间紧 先不仔细看

