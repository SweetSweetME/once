http://fex.baidu.com/blog/2014/05/what-happen/
http 应用层协议 Tcp三次握手建立信息通道
https 在http上加了一层SSL/TLS协议 分为对称密钥和非对称密钥
对称密钥 客户端和服务端用相同的密钥去解密用同一把公钥处理过的信息 但是容易被第三方盗取 
非对称密钥 是客户端和服务端拥有两个不同的密钥 且双方带有不同的公钥 同时需要有CA证书 第三方服务 来确保这个公钥密钥的安全
#### 浏览器如何向网卡发送数据？
操作系统GUI将输入事件传递到了浏览器中 
敲下回车 浏览器开始检查URL 如果是http 那么 就按 web 来渲染
浏览器和浏览器内核 是两个不同的概念 浏览器是指chrome Firefox 浏览器内核是指blink Gecko 浏览器内核只负责渲染； GUI 和 网络连接等跨平台工作是由浏览器实现的

##### http请求的发送
网络的底层实现是和内核相关
从应用层角度来看主要有两件事：1. 通过DNS查询IP 通过Socket发送数据

###### DNS查询
DNS查询实际上是基于UDP实现的  是一个逐步缩小范围的查找过程 首先从本机的DNS服务器向DNS根节点查询负责.com 区域的域名器 然后通过其中的一个负责.com 的服务器查询负责baidu.com 的服务器 最后由其中一个查询baidu.com的域名服务器查询fex.baidu.com 域名的地址
127.0.0.1走loopback
Chrome在浏览器启动时会预先查询10个你可能访问的域名
Hosts文件
缓存时间TTL Time to live

##### 通过Socket发送数据
有了IP地址 就可以通过Socket API 发送数据 这是选择是TCP 还是 UDP协议
http常用的是TCP 
TCP的head-of-line blocking问题
假设客户端发送了3个TCP片段 segments 编号1、2、3 如果编号1的包 传输时输了 即便 2、3已经到达也只能等待 因为TCP 协议必须要保证顺序 这个问题在HTTP pipelining 下更严重 因为pipelining会让多个http请求通过一个TCP发送， 比如发送两张图片 可能第二张图片的数据已经全收到了 但还得等待第一张图片的数据传到
