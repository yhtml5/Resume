### react源码解析

#### 项目架构
从目录结构看出, 它是一个典型的大厂项目
项目分模块开发, 每一个模块都有自己的测试用例
官方文档也在这里面, 托管在github主机上, 可持续化集成
项目同时会发布 react/react-dom/react-native/react-art
里面代码的规范性写法对我启发颇多

#### components 组件

#### diff 算法

[diff算法][react-diff-zhihu]

* React 通过制定大胆的 diff 策略，将 O(n3) 复杂度的问题转换成 O(n) 复杂度的问题；
* React 通过分层求异的策略，对 tree diff 进行算法优化；
* React 通过相同类生成相似树形结构，不同类生成不同树形结构的策略，对 component diff 进行算法优化；
* React 通过设置唯一 key的策略，对 element diff 进行算法优化；
* 建议，在开发组件时，保持稳定的 DOM 结构会有助于性能的提升；
* 建议，在开发过程中，尽量减少类似将最后一个节点移动到列表首部的操作，当节点数量过大或更新操作过于频繁时，在一定程度上会影响 React 的渲染性能。