null undefined '' 是一类
本身代表 false

[]  {}  是一类
他们虽然为空 但是 他们有地址 所以他们 代表 true

!null !undefined !''  ---> true
!!null !!undefined !!'' ---> false

![] !{}  ---> false
!![] !!{} ---> true

所以判断是否为空数组 用长度
是否为空对象 用可枚举属性

自己的拙见 有人看到的话 认为有错 欢迎指出！

